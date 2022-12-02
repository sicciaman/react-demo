import React, {useEffect, useState} from 'react';
import {PeopleSearch} from './PeopleSearch';
import {PeopleTable} from './PeopleTable';
import {FileUploader} from './FileUploader';
import {Section} from '../../../shared/components/Section';
import {Person} from '../../../models/Person';
import {LastFileReading} from '../../../models/LastFileReading';
import {LastReadingMetadata} from './LastReadingMetadata';

export function Home() {
    const [columns, setColumns] = useState<Array<keyof Person>>([]);
    const [people, setPeople] = useState<Person[]>([]);
    const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
    const [lastReading, setLastReading] = useState<LastFileReading | null>(null);

    /**
     * Filter people data by their firstName property
     * @param query Query search
     */
    const filterPeopleDetails = (query: string): void => {
        console.log(query);
        if (!!query) {
            setFilteredPeople(people.filter(people => people.firstName.toLowerCase().includes(query.toLowerCase())));
            console.log(filteredPeople);
        } else {
            setFilteredPeople(people);
        }
    };

    /**
     * Initialize people data on file upload
     * @param people Parsed JSON file People data
     */
    const initPeopleData = (people: Person[]): void => {
        setPeople(people);
        setFilteredPeople(people);
    };

    useEffect(() => {
        const lastFileReading = localStorage.getItem('lastReading');
        if (lastFileReading) {
            const parsedFileReading: LastFileReading = JSON.parse(lastFileReading);
            initPeopleData(parsedFileReading.people);
            setColumns(parsedFileReading.columns);
            setLastReading({...parsedFileReading});
        }
    }, []);

    return (
        <div className="w-full flex flex-col gap-5">
            <Section>
                <FileUploader
                    setColumns={setColumns}
                    setPeople={initPeopleData}/>
            </Section>
            {
                !!lastReading &&

                <Section>
                    <LastReadingMetadata uploadingDate={lastReading.uploadingDate}
                                         fileName={lastReading.fileName}
                                         fileSize={lastReading.fileSize}/>
                </Section>
            }
            <Section>
                <PeopleSearch setSearchQuery={filterPeopleDetails}/>
            </Section>

            {
                !!people.length &&
                <Section>
                    <PeopleTable columns={columns} peopleDetails={filteredPeople}/>
                </Section>
            }
        </div>
    );
}
