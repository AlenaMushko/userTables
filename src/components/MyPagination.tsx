import React from 'react';
import Box from '@mui/material/Box';
import {Pagination, PaginationItem} from '@mui/material';

interface IProps {
    currentPage: number;
    totalPages: number;
    nextPage: string,
    previousPage: string,
    setUrl: React.Dispatch<React.SetStateAction<string | null>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const MyPagination: React.FC<IProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   setCurrentPage,
                                                   nextPage,
                                                   previousPage,
                                                   setUrl
                                               }) => {
    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        if (newPage > currentPage && nextPage) {
            setUrl(nextPage);
        } else if (newPage < currentPage && previousPage) {
            setUrl(previousPage);
        }
        setCurrentPage(newPage);
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '60px'}}>
            <Pagination
                count={totalPages || 0}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        disabled={item.type === 'page'}
                        sx={
                            item.type === 'page' && item.page === currentPage
                                ? {
                                    backgroundColor: '#3048d2',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#6179f9',
                                    }
                                }
                                : {}
                        }
                    />
                )}
            />
        </Box>
    );
};
