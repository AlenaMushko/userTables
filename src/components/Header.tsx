'use client';
import React, {useContext} from 'react';
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Avatar, Box, Skeleton, Typography} from "@mui/material";
import {useTheme} from "@mui/system";
import Button from "@mui/material/Button";

import {AppRoutes} from "@/routing /appRoutes";
import {MyContainer} from "@/components/MyContainer";
import {ThemeContext, ThemeSwitcher} from "@/themes";
import {useAppDispatch, useAppSelector} from "@/hooks ";
import {userAction} from "@/redux/slices/usersSlice";


export const Header: React.FC = () => {
    const dispatch = useAppDispatch();

    const {isLogin} = useAppSelector(state => state.users);

    const {isLoading} = useAppSelector((state) => state.users);

    const router = useRouter();
    const {theme} = useContext(ThemeContext);
    const pathname = usePathname();
    const themeColor = useTheme();

    const handleLogout = () => {
        dispatch(userAction.setIsLogin(false))
        router.push('/login');
    }

    return (<>
            <MyContainer>
                <Box component='nav' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {theme.palette.mode === 'light'
                        ? <Image src="/assets/logo.png" alt="Logo" width={120} height={40} priority/>
                        : <Typography variant="h5" sx={{letterSpacing: '0.25em', color: themeColor.palette.info.main}}>
                            ICAP
                        </Typography>}
                    {isLogin ? (<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4vw'}}>
                            <Avatar
                                sx={{
                                    bgcolor: themeColor.palette.text.secondary,
                                    color: themeColor.palette.primary.main
                                }}
                                alt="Remy Sharp"
                                src="/broken-image.jpg"
                            >
                                B
                            </Avatar>
                            <ThemeSwitcher/>
                            <Button onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                    ) : (<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4vw'}}>
                            <Link href={AppRoutes.LOGIN}>
                                <Typography
                                    variant="button"
                                    sx={{
                                        backgroundColor: pathname === AppRoutes.LOGIN ? themeColor.palette.text.secondary : '',
                                        color: pathname === AppRoutes.LOGIN ? themeColor.palette.text.main : themeColor.palette.text.primary,
                                    }}
                                >
                                    Login
                                </Typography>
                            </Link>
                            <Link href={AppRoutes.REGISTER}>
                                <Typography
                                    variant="button"
                                    sx={{
                                        backgroundColor: pathname === AppRoutes.REGISTER ? themeColor.palette.text.secondary : '',
                                        color: pathname === AppRoutes.REGISTER ? themeColor.palette.text.main : themeColor.palette.text.primary,
                                    }}
                                >
                                    Register
                                </Typography>
                            </Link>
                            <ThemeSwitcher/>
                        </Box>
                    )}
                </Box>
            </MyContainer>
            {isLoading && <Skeleton variant="rectangular" sx={{bgcolor: themeColor.palette.text.secondary}}/>}
        </>
    )
}
