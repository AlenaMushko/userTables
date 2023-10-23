'use client';

import './globals.css';
import { Container } from '@mui/system';
import Head from 'next/head';

import { Header } from '@/components';
import { MyThemeProvider } from '@/themes';
import { inter } from './metadata.config';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MyThemeProvider>
        <body className={inter.className}>
        <Header />
        <Container component="main" sx={{ marginTop: '15vh' }}>
          {children}
        </Container>
        </body>
      </MyThemeProvider>
      </html>
  );
}
