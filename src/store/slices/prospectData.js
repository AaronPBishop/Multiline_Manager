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
            add: false,
            coverages: {
                liabilityBi: [30, 60],
                liabilityPd: Number(25),
                uninsuredBi: [0, 0],
                uninsuredPd: Number(0),
                pip: Number(0),
                comp: Number(0),
                collision: Number(0)
            },
            DSS: { add: false }, 
            price: 0
        },
        life: {
            TERM: {
                add: false,
                type: "" // TERM PERIOD - ACCEPTED TYPES: TERM_10, TERM_20, TERM_30
            },
            GIFE: { add: false }, 
            price: 0
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
                liability: 0,
                deductible: 0,
                type: "" // TENANT / NON-TENANT
            }, 
            price: 0
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

            state.currQuote = state.currProspect.quotes[0];
        },

        // Current Quote
        setCurrQuote: (state, action) => {
            const quote = state.currProspect.quotes.find(q => q.id === action.payload);
            if (quote) state.currQuote = { ...quote }; // create a new reference
        },

        updateQuoteAuto: (state, action) => {
            state.currQuote.auto = action.payload;

            // Persist immediately to currProspect.quotes
            const index = state.currProspect.quotes.findIndex(q => q.id === state.currQuote.id);
            if (index !== -1) state.currProspect.quotes[index] = { ...state.currQuote };
        },

        updateQuoteLife: (state, action) => {
            state.currQuote.life = action.payload;
        
            const index = state.currProspect.quotes.findIndex(q => q.id === state.currQuote.id);
            if (index !== -1) state.currProspect.quotes[index] = { ...state.currQuote };
        },

        updateQuoteHealth: (state, action) => {
            state.currQuote.health = action.payload;
        
            const index = state.currProspect.quotes.findIndex(q => q.id === state.currQuote.id);
            if (index !== -1) state.currProspect.quotes[index] = { ...state.currQuote };
        },

        updateQuoteFire: (state, action) => {
            state.currQuote.fire = action.payload;
        
            const index = state.currProspect.quotes.findIndex(q => q.id === state.currQuote.id);
            if (index !== -1) state.currProspect.quotes[index] = { ...state.currQuote };
        },

        persistQuoteData: (state) => {
            const prospect = state.prospects.find(p => p.id === state.currProspect.id);
        
            if (!prospect) return;
        
            const quoteIndex = prospect.quotes.findIndex(q => q.id === state.currQuote.id);
        
            if (quoteIndex !== -1) prospect.quotes[quoteIndex] = state.currQuote;
        },

        addQuoteToExisting: (state, action) => {
            const { ...newQuote } = action.payload;
            const prospect = state.prospects.find(p => p.id === state.currProspect.id);

            if (prospect) {
                prospect.quotes = [...newQuote.quotes];
                state.currQuote = newQuote;
                state.currProspect.quotes = prospect.quotes;
            };
        },
    },
});

export const {
    setProspects,
    addProspect,
    deleteProspect,
    clearProspects,
    setCurrProspect,
    setCurrQuote,
    updateQuoteAuto,
    updateQuoteLife,
    updateQuoteHealth,
    updateQuoteFire,
    persistQuoteData,
    addQuoteToExisting
} = prospectDataSlice.actions;

export default prospectDataSlice.reducer;