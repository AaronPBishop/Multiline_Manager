import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProspects } from "./store/slices/prospectData";

import NavBar from './components/Containers/NavBar.js'
import ProspectContainer from './components/Containers/ProspectContainer.js'
import QuotesContainer from "./components/Containers/QuotesContainer.js";

const App = () => {
    const dispatch = useDispatch();

    const visibility = useSelector(state => state.visibility);

    useEffect(() => {
        const data = localStorage.getItem("prospect_data");
    
        if (data) dispatch(setProspects(JSON.parse(data)));
    }, []);

    return (
        <div className="flex flex-wrap items-center justify-center h-screen w-screen bg-slate-950">
            <NavBar />

            {
                visibility?.prospectContVis ?
                <ProspectContainer /> :
                visibility?.quoteContVis &&
                <QuotesContainer />
            }

            <h6 className="text-white fixed bottom-0 left-1 text-[8px]">
                Intellectual property of Aaron Bishop © - Intended for use by employees of Tyler Johns State Farm Agency only
            </h6>
        </div>
    );
};

export default App;