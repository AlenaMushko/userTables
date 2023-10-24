'use client';
import React from "react";

import {useAppSelector} from "@/hooks ";
import {IResult} from "@/interfaces";
import {styled} from "@mui/system";

const StyledTable = styled('table')({
    width: '100%',
    borderCollapse: 'collapse',
    '& th, & td': {
        border: '1px solid #2c46df',
        padding: '8px 12px',
        textAlign: 'left',
    },
    '& thead': {
        backgroundColor: '#2c46df',
        color: '#fff',
    },
    '& tbody tr:nth-of-type(odd)': {
        backgroundColor: '#e6f0ff',
    }
});
export const UsersTable: React.FC = () => {
    const users = useAppSelector(state => state.users.results);

    const columns = users && users.length > 0 ? Object.keys(users[0]) : [];

    return (
        <StyledTable>
            <thead>
            <tr>
                {columns.map(colKey => (
                    <th key={colKey}>{colKey}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {users.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map(colKey => (
                        <td key={colKey}>{row[colKey as keyof IResult]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </StyledTable>
    );
}



