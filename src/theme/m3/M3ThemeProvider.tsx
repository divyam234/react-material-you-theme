
import React, { FC, useContext, useMemo } from "react";

import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from './M3Theme';
import { deepmerge } from "@mui/utils";
import { ThemeModeContext } from '../context/ThemeModeContext';
import { ThemeSchemeContext } from '../context/ThemeSchemeContext';
import { CssBaseline } from "@mui/material";
import { Theme } from '@mui/material';

interface M3ThemeProps {
    children: React.ReactNode,
    overrides?: (...args: any[]) => Theme['components'];
};

export const M3ThemeProvider: FC<M3ThemeProps> = ({ children, overrides = () => ({}) }) => {

    const { themeMode } = useContext(ThemeModeContext);
    const { themeScheme } = useContext(ThemeSchemeContext);

    const m3Theme = useMemo(() => {
        const designTokens = getDesignTokens(themeMode, themeScheme[themeMode], themeScheme.tones);
        let newM3Theme = createTheme(designTokens);
        newM3Theme = deepmerge(newM3Theme, deepmerge(getThemedComponents(newM3Theme), overrides(newM3Theme)));

        return newM3Theme;
    }, [themeMode, themeScheme]);

    return (
        <ThemeProvider theme={m3Theme}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
}
