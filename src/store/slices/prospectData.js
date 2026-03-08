import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prospects: [],
    currProspect: {
        // id: "",
        // name: "",
        // age: 0,
        // quotes: []
    }
};

export const prospectDataSlice = createSlice({
    name: "prospects",
    initialState,
    reducers: {
        // Prospects
        setProspects: (state, action) => {
            state.prospects = action.payload;
        },

        addProspect: (state, action) => {
            state.prospects.push(action.payload);
        },

        deleteProspect: (state, action) => {
            state.prospects = state.prospects.filter(prospect =>
                prospect.id !== action.payload
            );
        },

        clearProspects: (state) => {
            state.prospects = [];
        },
        
        // Current Prospect
        setCurrProspect: (state, action) => {
            state.currProspect = state.prospects.filter(prospect =>
                prospect.id === action.payload
            );
        },
    },
});

export const {
    setProspects,
    addProspect,
    deleteProspect,
    clearProspects,
    setCurrProspect
} = prospectDataSlice.actions;

export default prospectDataSlice.reducer;