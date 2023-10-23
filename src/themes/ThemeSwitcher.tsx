'use client';
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { ThemeContext } from './ThemeProvider';
import {useTheme} from "@mui/system";

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const themeColor = useTheme();

    return (
        <IconButton onClick={toggleTheme}  sx={{ fontSize: "2rem", color:themeColor.palette.info.main }}>
            {theme.palette.mode === 'light' ? <Brightness4Icon fontSize="inherit" /> : <Brightness7Icon fontSize="inherit" />}
        </IconButton>
    );
};
