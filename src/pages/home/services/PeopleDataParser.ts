import {Person} from '../../../models/Person';
import {PeopleDetails} from '../../../models/PeopleDetails';

const PARTIAL_METADATA = '_partial';

/**
 * Parse JSON file
 * @param file Uploaded file
 * @returns {Promise<any>} Parsed JSON file content
 */
async function parseFile(file: File): Promise<PeopleDetails> {
    const fileReader = new FileReader();
    return new Promise((res, rej) => {
        fileReader.onload = (event) => {
            try {
                let fileContent: PeopleDetails = { values: []};
                if (event.target) {
                    fileContent = JSON.parse(event.target.result as string)
                }
                res(fileContent);
            } catch (err) {
                console.error(err);
                rej('JSON file parsing failed, check the browser logs for more info');
            }
        }
        fileReader.onerror = (err) => {
            console.error(err);
            rej('Error during file reading');
        }
        fileReader.readAsText(file);
    });
}

/**
 * Validate personDetails object marking object with 'partial' metadata if there are uncompleted info
 * @param columns Table columns
 * @param personDetails Object that contains person info
 */
function validatePersonDetails(columns: Array<keyof Person>, personDetails: Partial<Person>): void {
    const PARTIAL_METADATA = '_partial';

    if (!columns.every(column => !!personDetails[column])) {
        console.log('Missing info on person', personDetails);
        personDetails[PARTIAL_METADATA] = '❌';
    } else {
        personDetails[PARTIAL_METADATA] = '';
    }
}


/**
 * Extract all the properties from peopleDetails data
 * @param peopleDetails Array of peopleDetails objects
 * @returns A set of unique properties
 */
function extractTableColumns(peopleDetails: Partial<Person[]>): Set<keyof Person> {
    // @ts-ignore
    return peopleDetails.reduce((acc, person) => {
        return new Set([...acc, ...Object.keys(person ?? {})])
    }, new Set() as Set<keyof Person>);
}

export {parseFile, extractTableColumns, validatePersonDetails, PARTIAL_METADATA};

