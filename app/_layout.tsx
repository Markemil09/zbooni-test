import { Slot } from "expo-router";
import React from "react";
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
    return (
        <AppProvider>
            <Slot />
        </AppProvider>
        
    );
}