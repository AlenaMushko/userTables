'use client';

import React, {useEffect, useState} from "react";
import {MyContainer, UsersTable} from "@/components";
import {useAppDispatch, useAppSelector} from "@/hooks ";
import {userAction} from "@/redux/slices/usersSlice";
import {MyPagination} from "@/components/MyPagination";
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";


const UserPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const {count} = useAppSelector(state => state.users);
    const {results} = useAppSelector(state => state.users);
    const {next} = useAppSelector(state => state.users);
    const {previous} = useAppSelector(state => state.users);

    const [limit, setLimit] = useState<number>(8)

    const totalPages = Math.ceil(count / limit);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [url, setUrl] = useState<string | null>(null)

    useEffect(() => {
        dispatch(userAction.getAll({url,limit}));
    }, [limit, url]);

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit);
    };

    console.log(currentPage, url)
    return (results.length > 0 ? <MyContainer>
                <UsersTable/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: ['column', 'row'],
                    alignItems: 'baseline',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap'
                }}>
                    <MyPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        nextPage={next}
                        previousPage={previous}
                        setUrl={setUrl}
                    />
                    <TextField
                        variant="standard"
                        label="Rows per page"
                        type="number"
                        value={limit}
                        onChange={handleLimitChange}
                        sx={{minWidth: '50px', maxWidth: ['100%', '100px']}}
                    />
                </Box>
            </MyContainer>
            : <Typography>No users available</Typography>
    )
}

export default UserPage;