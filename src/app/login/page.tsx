'use client';
import React, {useEffect, useState} from 'react';
import {Alert} from "@mui/material";

import LoginForm from "@/components/LoginForm";

const LoginPage: React.FC = () => {
    const [isAlert, setIsAlert] = useState<boolean>(false);

    useEffect(() => {
        let timer: any = null;
        if (isAlert) {
            timer = setTimeout(() => {
                setIsAlert(false);
            }, 3 * 1000);
        }
        return () => clearTimeout(timer);
    }, [isAlert]);

    return (
        <>
            {isAlert && (
                <Alert variant="filled" severity="error" sx={{padding: '20px', zIndex: '10'}}>
                    "Incorrect name or password"
                </Alert>
            )}
            <LoginForm setIsAlert={setIsAlert}/>
        </>

    )
}

export default LoginPage;
