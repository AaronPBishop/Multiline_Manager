import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prospects: [],
    currProspect: {
        id: "",
        firstName: "",
        lastName: "",
        age: 0,
        auto: "",
        life: "",
        health: "",
        fire: "",
        quotes: [
            {
                id: "",
                auto: {
                    DSS: { add: false }, price: 0
                },
                life: {
                    TERM: {
                        add: false,
                        type: Number(0) // TERM PERIOD
                    },
                    GIFE: { add: false }, price: 0
                },
                health: {
                    STDI: {
                        add: false,
                        benefit: Number(0) // MONTHLY BENEFIT TO BE PAYED
                    },
                    SUPP: {
                        add: false,
                        benefit: Number(0) // MONTHLY BENEFIT TO BE PAYED
                    }, price: 0
                },
                fire: {
                    RNTRS: { add: false },
                    HOME: {
                        add: false,
                        type: "" // TENANT / NON-TENANT
                    }, price: 0
                }
            }
        ]
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

            console.log(state.prospects)
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