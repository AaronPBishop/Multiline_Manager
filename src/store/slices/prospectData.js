import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prospects: [],
    currProspect: {
        id: "",
        firstName: "",
        lastName: "",
        age: 0,
        // Initial auto/life/health/fire data to populate a partial quote summary
        auto: "",
        life: "",
        health: "",
        fire: "",
        // All quotes saved under prospect record
        quotes: []
    },
    currQuote: {
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
            state.currProspect = state.prospects.find(prospect =>
                prospect.id === action.payload
            );
            console.log("CURR PROSPECT: ", state.currProspect)
        },

        // Current Quote
        setCurrQuote: (state, action) => {
            console.log("CURR PROSPECT QUOTES: ", state.currProspect.quotes);
            console.log("ACTION PAYLOAD: ", action.payload)
            state.currQuote = state.currProspect.quotes.find(quote =>
                quote.id === action.payload
            );
        },
    },
});

export const {
    setProspects,
    addProspect,
    deleteProspect,
    clearProspects,
    setCurrProspect,
    setCurrQuote
} = prospectDataSlice.actions;

export default prospectDataSlice.reducer;