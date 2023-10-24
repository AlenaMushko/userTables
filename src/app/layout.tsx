'use client';

import './globals.css';
import {Container} from '@mui/system';
import Head from 'next/head';
import {Provider} from "react-redux";

import {Header} from '@/components';
import {MyThemeProvider} from '@/themes';
import {inter} from './metadata.config';
import {store} from "@/redux/store";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <Head>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Provider store={store}>
            <MyThemeProvider>
                <body className={inter.className}>
                <Header/>

                <Container component="main" sx={{marginTop: '15vh'}}>
                    {children}
                </Container>
                </body>
            </MyThemeProvider>
        </Provider>
        </html>
    );
}
