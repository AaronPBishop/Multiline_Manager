import { configureStore } from "@reduxjs/toolkit";
import prospectDataReducer from './slices/prospectData.js';
import visibilityReducer from "./slices/visibility.js";

export const store = configureStore({
    reducer: {
        prospectData: prospectDataReducer,
        visibility: visibilityReducer
    },
});

store.subscribe(() => {
    const state = store.getState();

    console.log("I SAVED TO LOCAL")
    console.log("ALL THE STATE: ", state);


    localStorage.setItem(
        "prospect_data",
        JSON.stringify(state.prospectData.prospects)
    );
});