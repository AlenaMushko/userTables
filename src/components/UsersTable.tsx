'use client';
import React from "react";

import {useAppSelector} from "@/hooks ";
import {IResult} from "@/interfaces";

export const UsersTable: React.FC = () => {
    const users = useAppSelector(state => state.users.results);
    const columns = users && users.length > 0 ? Object.keys(users[0]) : [];

    return (
        <table>
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
        </table>
    );
}



