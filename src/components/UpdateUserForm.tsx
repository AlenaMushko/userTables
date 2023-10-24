import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {userAction} from "@/redux/slices/usersSlice";
import {joiResolver} from "@hookform/resolvers/joi";
import {Button, FormControl, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import {ContainerForForm} from "@/components";
import {useAppDispatch, useAppSelector} from "@/hooks ";
import {UserValidators} from "@/validators/UserValidation";
import {IResult} from "@/interfaces";
import {SubmitHandler, useForm} from "react-hook-form";

interface IProps {
    userId: number
}

export const UpdateUserForm: React.FC<IProps> = ({userId}) => {
    const {register, reset, setValue, handleSubmit, formState: {errors, isValid}} = useForm<IResult>({
        mode: 'all',
        resolver: joiResolver(UserValidators),
    });

    const dispatch = useAppDispatch();
    const router = useRouter();

    const {currentUser} = useAppSelector((state) => state.users);
    useEffect(() => {
        dispatch(userAction.getUserById({id: userId}));
    }, [dispatch]);


    useEffect(() => {
        if (currentUser) {
            setValue('name', currentUser.name);
            setValue('email', currentUser.email);
            setValue('phone_number', currentUser.phone_number);
            setValue('address', currentUser.address || '');
            setValue('birthday_date', currentUser.birthday_date);
        }
    }, [currentUser, setValue]);

    const handleUpdate: SubmitHandler<IResult> = async (user) => {
        if (currentUser) {
            await dispatch(userAction.update({id: currentUser.id, user}))
            reset();
            router.back();
        }

    };
    return (<ContainerForForm className='page-entering'>
        <FormControl component="form" onSubmit={handleSubmit(handleUpdate)}
                     sx={{width: '70%', gap: 3}}>
            <TextField
                label="User name"
                variant="outlined"
                type="string"
                InputLabelProps={{
                    shrink: true
                }}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message as string}
            />
            <TextField
                label="Email"
                variant="outlined"
                type="string"
                InputLabelProps={{
                    shrink: true
                }}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message as string}
            />
            <TextField
                label="Phone number"
                variant="outlined"
                type="string"
                InputLabelProps={{
                    shrink: true
                }}
                {...register('phone_number')}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message as string}
            />
            <TextField
                label="Address"
                variant="outlined"
                type="string"
                InputLabelProps={{
                    shrink: true
                }}
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message as string}
            />
            <TextField
                label="Birthday date"
                variant="outlined"
                type="string"
                InputLabelProps={{
                    shrink: true
                }}
                {...register('birthday_date')}
                error={!!errors.birthday_date}
                helperText={errors.birthday_date?.message as string}
            />

            <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon/>}
                sx={{padding: '12px'}}
                disabled={!isValid}
            >
                Update
            </Button>
        </FormControl>
    </ContainerForForm>)
}
