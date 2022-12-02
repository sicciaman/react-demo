import {Person} from './Person';

export interface LastFileReading {
    columns: Array<keyof Person>,
    people: Person[],
    uploadingDate: Date,
    fileName: string,
    fileSize: number
}
