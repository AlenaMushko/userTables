'use client';
import React, {useEffect, useState} from "react";
import {useRouter} from 'next/navigation';
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import {useTheme} from "@mui/system";
import DoneAllIcon from '@mui/icons-material/DoneAll';

import {MyContainer, UsersTable} from "@/components";
import {useAppDispatch, useAppSelector} from "@/hooks ";
import {userAction} from "@/redux/slices/usersSlice";
import {MyPagination} from "@/components/MyPagination";


const UserPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const themeColor = useTheme();

    const {isLoading} = useAppSelector((state) => state.users);
    const {isLogin} = useAppSelector(state => state.users);
    const {count} = useAppSelector(state => state.users);
    const {next} = useAppSelector(state => state.users);
    const {previous} = useAppSelector(state => state.users);
    const {limit} = useAppSelector((state) => state.users);
    const {results} = useAppSelector(state => state.users);

    const totalPages = Math.ceil(count / limit);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [url, setUrl] = useState<string | null>(null)
    const [newLimit, setNewLimit] = useState<string>('8')

    useEffect(() => {
        if (!isLogin) {
            router.push('/login');
        }
    }, [isLogin]);

    useEffect(() => {
        dispatch(userAction.getAll({url, limit}));
    }, [limit, url]);

    const handleLimitChange = () => {
        const parsedLimit = parseInt(newLimit, 10);
        if (!isNaN(parsedLimit)) {
            dispatch(userAction.setLimit(parsedLimit));
        }
    };

    return (isLogin && !isLoading && results.length === 0
            ? <Typography>No users available</Typography>
            : <MyContainer>
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
                        value={newLimit}
                        onChange={event => {
                            setNewLimit(event.target.value);
                        }}
                        sx={{
                            minWidth: '50px',
                            color: themeColor.palette.text.primary,
                            maxWidth: ['100%', '100px'],
                            '& .MuiInputLabel-root': {
                                color: themeColor.palette.text.primary,
                            }
                        }}
                    />
                    <DoneAllIcon onClick={handleLimitChange}
                                 sx={{
                                     '&:hover': {
                                         cursor: 'pointer',
                                         color: '#f57c00',
                                     }
                                 }}/>
                </Box>
            </MyContainer>
    )
}

export default UserPage;
