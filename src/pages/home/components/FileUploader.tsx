import React, {useState} from 'react';
import {extractTableColumns, parseFile, PARTIAL_METADATA, validatePersonDetails} from '../services/PeopleDataParser';
import {Person} from '../../../models/Person';
import {ErrorAlert} from '../../../shared/components/ErrorAlert';
import {LastFileReading} from '../../../models/LastFileReading';

type Props = {
    setColumns: (columns: Array<keyof Person>) => void,
    setPeople: (people: Person[]) => void,
};

export function FileUploader({setColumns, setPeople}: Props) {
    const [error, setError] = useState<string>('');

    const resetUpload = (): void => {
        setColumns([]);
        setPeople([]);
    };

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const JSON_FILE_TYPE: string = 'application/json';
        const files = event.target.files;

        // Remove an old error message, if present, on a new file upload
        setError('');

        if (!files || !files.length) {
            setError('No file attached');
            resetUpload();
            return;
        }

        const uploadedFile = files[0];
        // When file type not allowed show an error & clear input field
        if (uploadedFile.type !== JSON_FILE_TYPE) {
            setError('Only JSON files are allowed');
            resetUpload();
            return;
        }

        // Start file parsing
        parseFile(uploadedFile)
            .then((data) => {
                const peopleDetails = data.values ?? [];

                const columns: Array<keyof Person> = [...extractTableColumns(peopleDetails)];

                // Checking for uncompleted info in person objects
                peopleDetails.forEach(person => validatePersonDetails(columns, person));

                // Adding partial column
                columns.push(PARTIAL_METADATA);

                // Callbacks to set state on parent
                setColumns(columns);
                setPeople(peopleDetails);

                // Save data on local storage
                const fileData: LastFileReading = {
                    columns,
                    people: peopleDetails,
                    fileName: uploadedFile.name,
                    fileSize: uploadedFile.size,
                    uploadingDate: new Date()
                };

                // Persist reading on localStorage
                localStorage.setItem('lastReading', JSON.stringify(fileData));
            })
            .catch(error => {
                setError(error);
                resetUpload();
            });


    };

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl text-green-900 font-semibold">Upload your JSON file here</h1>
            <input type="file" onChange={onFileUpload} accept="application/json"/>
            {
                error && <ErrorAlert message={error} />
            }
        </div>
    );
}
