import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 'system'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        darkMode: (state) => {
            state.value = 'dark'
        },
        lightMode: (state) => {
            state.value = 'light'
        },
        systemMode: (state, actions) => {
            state.value = actions.payload;
        }
    }
})

export const { darkMode, lightMode, systemMode } = themeSlice.actions;
export default themeSlice.reducer;