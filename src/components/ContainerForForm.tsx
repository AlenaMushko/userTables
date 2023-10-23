import { Container} from '@mui/material';
import React, {ReactNode} from 'react';

interface CenteredContainerProps {
    children: ReactNode;
    className?: string
}

export const ContainerForForm: React.FC<CenteredContainerProps> = ({className,children}) => {
    return (<div className={className}>
        <Container  sx={{
            width: '70vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx:'30vh',
            my: '20vh',
            py: '80px',
            borderRadius: '8px',
            boxShadow: '-1px -2px 126px 0px rgba(48,79,254,0.6)'
        }}>
            {children}
        </Container>
        </div>
    );
};
