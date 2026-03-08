import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prospectContVis: true,
    quoteContVis: false,
    prospectModalVis: false
};

export const visibilitySlice = createSlice({
    name: "visibility",
    initialState,
    reducers: {
        setProspectContVis: (state) => {
            state.prospectContVis = true;
            state.quoteContVis = false;
        },

        setQuoteContVis: (state) => {
            state.prospectContVis = false;
            state.quoteContVis = true;
        },

        setProspectModVis: (state) => {
            state.prospectModalVis = !state.prospectModalVis;
        },
    },
});

export const {
    setProspectContVis,
    setQuoteContVis,
    setProspectModVis
} = visibilitySlice.actions;

export default visibilitySlice.reducer;