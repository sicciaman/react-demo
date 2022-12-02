import peopleFile from '../fixtures/people.json';
import {
    PARTIAL_METADATA,
    extractTableColumns,
    parseFile,
    validatePersonDetails
} from '../../src/pages/home/services/PeopleDataParser';

const convertToFile = (content: string, name: string): File => {
    let blob = new Blob([content], {type: 'application/json'});
    blob['name'] = name;
    return blob as File;
};


describe('People Parsing Data service methods unit tests', () => {
    it('should parse correctly JSON file', async () => {

        const convertedFile = convertToFile(JSON.stringify(peopleFile), 'people.json');
        const peopleDetails = await parseFile(convertedFile);

        expect(peopleDetails.values.length).to.eq(5);
        expect(Object.keys(peopleDetails.values[0]).length).to.eq(6);
        expect(peopleDetails.values[0].firstName).to.eq('John');
        expect(peopleDetails.values[0].lastName).to.eq('Doe');
    });

    it('should return an error when invalid JSON', () => {
        const corruptedFile = JSON.stringify(peopleFile) + '@@@';

        const convertedFile = convertToFile(corruptedFile, 'people.json');
        parseFile(convertedFile).catch(err => expect(err).to.include('JSON file parsing failed'));
    });

    it('should extract all unique properties from person objects', async () => {
        const convertedFile = convertToFile(JSON.stringify(peopleFile), 'people.json');
        const peopleDetails = await parseFile(convertedFile);

        const columns = extractTableColumns(peopleDetails.values);
        expect(columns.size).to.eq(6);
        expect(columns).not.include(PARTIAL_METADATA);
        expect(columns).include('firstName');
        expect(columns).include('lastName');
        expect(columns).include('address');
        expect(columns).include('city');
        expect(columns).include('state');
        expect(columns).include('postalCode');
    });

    it('should tag person objects as partial when info uncompleted', async () => {
        const convertedFile = convertToFile(JSON.stringify(peopleFile), 'people.json');
        const peopleDetails = await parseFile(convertedFile);

        const columns = [...extractTableColumns(peopleDetails.values)];

        const completePerson = peopleDetails.values[0];
        validatePersonDetails(columns, completePerson);
        expect(completePerson._partial).to.eq('');

        const uncompletePerson = peopleDetails.values[1];
        validatePersonDetails(columns, uncompletePerson);
        expect(uncompletePerson._partial).to.eq('❌');
    });


});
