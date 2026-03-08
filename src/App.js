import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProspects } from "./store/slices/prospectData";

import NavBar from './components/Containers/NavBar.js'
import ProspectContainer from './components/Containers/ProspectContainer.js'
import QuoteContainer from "./components/Containers/QuoteContainer.js";

const App = () => {
    const dispatch = useDispatch();

    const visibility = useSelector(state => state.visibility);

    useEffect(() => {
        const data = localStorage.getItem("prospect_data");

        if (data) dispatch(setProspects(JSON.parse(data)));
    }, []);

    return (
        <div className="flex flex-wrap items-center justify-center h-screen w-screen bg-white-100">
            <NavBar />

            {
                visibility?.prospectContVis ?
                <ProspectContainer /> :
                visibility?.quoteContVis &&
                <QuoteContainer />
            }
        </div>
    );
};

export default App;