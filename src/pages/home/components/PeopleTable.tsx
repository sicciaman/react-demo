import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Person} from '../../../models/Person';

type Props = {
    columns: Array<keyof Person>;
    peopleDetails: Person[];
}

export function PeopleTable({columns, peopleDetails}: Props) {

    /**
     * Create all table columns
     */
    const getTableColumns = () => {
        return columns.map((col, index) => <TableCell key={`${col}_${index}`}>{col}</TableCell>);
    };

    /**
     * Create all table rows
     */
    const getTableRows = () => {
        return peopleDetails.map((person, index) => <TableRow
            key={`${person.firstName}_${index}`}
        >
            {
                columns.map((col, index) => {
                    return (
                        <TableCell key={`${col}_${index}`}>
                            <span>{person[col]}</span>
                        </TableCell>);
                })
            }
        </TableRow>);
    };

    return (
        <TableContainer component={Paper}>
            <Table data-testid="data-table">
                <TableHead>
                    <TableRow>
                        {getTableColumns()}
                    </TableRow>
                </TableHead>
                <TableBody data-testid="table-body">
                    {getTableRows()}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
