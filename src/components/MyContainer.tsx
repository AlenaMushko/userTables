import {Box, Container, CssBaseline} from '@mui/material';
import React, {ReactNode} from 'react';

interface CenteredContainerProps {
    children: ReactNode;
}

export const MyContainer: React.FC<CenteredContainerProps> = ({children}) => {
    return (
        <Container>
            <CssBaseline/>
            <Box sx={{pt: '28px', px: '8px'}}>
                {children}
            </Box>
        </Container>
    );
};
