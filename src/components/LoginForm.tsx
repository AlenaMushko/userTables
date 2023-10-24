'use client';
import React, {Dispatch, SetStateAction} from 'react';
import {Button, FormControl, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useRouter} from 'next/navigation';

import {IUserLogin} from "@/interfaces";
import {ContainerForForm} from "@/components";
import {LoginValidators} from "@/validators/LoginValidators";
import {useAppDispatch} from "@/hooks ";
import {userAction} from "@/redux/slices/usersSlice";

interface IProps {
    setIsAlert: Dispatch<SetStateAction<boolean>>
}

const LoginForm: React.FC<IProps> = ({setIsAlert}) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<IUserLogin>({
        mode: 'all',
        resolver: joiResolver(LoginValidators),
    });

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogin = async (user: IUserLogin) => {
        try {
            const password = 'testpassword123';
            const username = 'testuser';

            if (user.password === password.trim() && user.username === username.trim()) {
                reset();
                dispatch(userAction.setIsLogin(true));
                router.push('/table');
            } else {
                setIsAlert(true)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (<ContainerForForm className="formAnimation">
        <FormControl
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            sx={{width: '80%', gap: 3}}
        >
            <TextField
                label="Name"
                variant="outlined"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message as string}
            />
            <TextField
                label="Password"
                variant="outlined"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message as string}
            />

            <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon/>}
                sx={{padding: '12px'}}
                disabled={!isValid}
            >
                Login
            </Button>
        </FormControl>
    </ContainerForForm>)
}

export default LoginForm;
