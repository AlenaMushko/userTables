'use client';

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#fff',
        },
        info: {
            main: 'rgb(157,173,238)',
        },
        background: {
            default: '#fff',
            paper: '#fff',
        },
        text: {
            primary: '#03071f',
            secondary: '#304ffe',
            disabled: '#6179f9',
        },
    },

    components: {
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'button' },
                    style: {
                        color:'#fff',
                        borderRadius: '8px',
                        padding: '12px 28px',
                        transition: 'backgroundColor 0.5s ease',
                        '&:hover': {
                            backgroundColor: '#2979ff',
                        },
                    },
                },
            ],
        },
        // MuiLink: {
        //     styleOverrides: {
        //         root: {
        //             color: '#f5f5f5',
        //             textDecoration: 'none',
        //             transition: 'border 0.5s ease',
        //             '&:hover': {
        //                 borderRadius: '8px',
        //                 borderColor: '#f5f5f5',
        //                 border: '1px solid',
        //             },
        //         },
        //     },
        // },
        MuiButton: {
            styleOverrides: {
                root: {
                    background: '#304ffe',
                    transition: 'backgroundColor 0.5s ease',
                    '&:hover': {
                        backgroundColor: '#2979ff',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#304ffe',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    '&.Mui-focused': {
                        color: '#304ffe',
                    },
                },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f5f5f5',
        },
        info: {
            main: 'rgb(197, 191, 222)',
        },
        background: {
            default: '#151223',
            paper: '#211847',
        },
        text: {
            primary: '#3b9fed',
            secondary: '#2e2262',
            // disabled: '#79a4eb',
        },
    },
    components: {
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'button' },
                    style: {
                        color:'#e0e0e0',
                        borderRadius: '8px',
                        padding: '12px 28px',
                        '&:hover': {
                            backgroundColor: 'rgb(34,15,113)',
                        },
                    },
                },
            ],
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    background: '#2e2262',
                    transition: 'backgroundColor 0.5s ease',
                    '&:hover': {
                        backgroundColor: '#3a2a7c',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    color: '#e0e0e0',
                },
            },
        },
    },
});

export { darkTheme, lightTheme };
