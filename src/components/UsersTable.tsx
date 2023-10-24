'use client';
import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeIcon from '@mui/icons-material/Mode';
import {Table, TableCell, TableHead, TableRow, TableBody} from "@mui/material";
import {useRouter} from "next/navigation";

import {useAppDispatch, useAppSelector} from "@/hooks ";
import {IResult} from "@/interfaces";
import {useTheme} from "@mui/system";
import {userAction} from "@/redux/slices/usersSlice";

export const UsersTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const users = useAppSelector(state => state.users.results);
    const themeColor = useTheme();

    const columns = users && users.length > 0 ? Object.keys(users[0]) : [];

    const handleDelete = (id: number) => {
        dispatch(userAction.deleteUser({id}));
    }

    const handleUpdate = (userId: number) => {
        router.push(`/user/${userId}`);
    }
// Стралася зробити таблиць по тз, максимально універсальною. Тому в шапці прописані дані з бд.
    return (
        <Table sx={{
            width: '100%',
            '& th, & td': {
                border: `1px solid ${themeColor.palette.text.primary}`,
                padding: '8px 12px',
                textAlign: 'left',
                color: themeColor.palette.text.primary,
            },
            '& thead': {
                backgroundColor: themeColor.palette.text.secondary,
                color: '#fff',
            },
            '& tbody tr:nth-of-type(odd)': {
                backgroundColor: themeColor.palette.text.disabled
            }
        }}>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    {columns.map(colKey => (
                        <TableCell key={colKey}>{colKey}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <DeleteForeverIcon onClick={() => handleDelete(user.id)}
                                               sx={{
                                                   '&:hover': {
                                                       cursor: 'pointer',
                                                       color: '#f57c00',
                                                   }
                                               }}/>
                            <ModeIcon onClick={() => handleUpdate(user.id)}
                                      sx={{
                                          '&:hover': {
                                              cursor: 'pointer',
                                              color: '#f57c00',
                                          }
                                      }}/>
                        </TableCell>

                        {columns.map(colKey => (
                            <TableCell key={colKey}>{user[colKey as keyof IResult]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
