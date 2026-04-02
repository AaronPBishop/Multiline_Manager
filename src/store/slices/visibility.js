import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prospectContVis: true,
    quoteContVis: false,
    prospectModalVis: false,
    notesVis: false
};

export const visibilitySlice = createSlice({
    name: "visibility",
    initialState,
    reducers: {
        setProspectContVis: (state) => {
            state.prospectContVis = true;
            state.quoteContVis = false;
            state.notesVis = false;
        },

        setQuoteContVis: (state) => {
            state.prospectContVis = false;
            state.quoteContVis = true;
        },

        setProspectModVis: (state) => {
            state.prospectModalVis = !state.prospectModalVis;
            state.notesVis = false;
        },

        setNotesVis: (state) => {
            state.notesVis = !state.notesVis;
        },
    },
});

export const {
    setProspectContVis,
    setQuoteContVis,
    setProspectModVis,
    setNotesVis
} = visibilitySlice.actions;

export default visibilitySlice.reducer;