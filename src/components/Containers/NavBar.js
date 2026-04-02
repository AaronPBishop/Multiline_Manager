import { useSelector, useDispatch } from "react-redux";

import { persistQuoteData, searchProspects, duplicateQuote } from "../../store/slices/prospectData.js";
import { setProspectModVis, setProspectContVis, setNotesVis } from "../../store/slices/visibility.js";

import { TbHomeMove } from "react-icons/tb";
import { BsSuitSpadeFill } from "react-icons/bs";
import { MdStickyNote2 } from "react-icons/md";
import { MdRequestQuote } from "react-icons/md";


import CreateProspectQuotes from "../Modals/CreateProspectQuotes.js";

const NavBar = () => {
    const dispatch = useDispatch();

    const visibilityState = useSelector(state => state.visibility);
    const prospectSearch = useSelector(state => state.prospectData.prospectSearch);
    const prospectState = useSelector(state => state.prospectData);

    return (
        <div
        className="flex justify-between items-center fixed top-0 left-0 w-full h-20 shadow-xl bg-slate-900 z-50 p-3 border-b-1 border-slate-700 select-none">
            <CreateProspectQuotes
            key={Date.now()}
            />

            {
                visibilityState?.prospectContVis ?
                <>
                    <div
                    onClick={() => dispatch(setProspectModVis())}
                    className={`
                        ${
                            visibilityState?.prospectContVis ?
                            "bg-emerald-600 border-emerald-900" :
                            "bg-orange-500 border-orange-800"
                        }
                        flex h-full justify-between text-xl text-white px-8 py-4 mx-6 rounded-md border-b-4 shadow-lg text-center flex align-center items-center cursor-pointer font-bold w-[50%]
                    `}>
                        New Prospect

                        <BsSuitSpadeFill 
                        className="text-slate-900 text-[35px]"
                        />
                    </div>

                    <input
                    type="text"
                    placeholder="Search Prospects"
                    className="w-[30%] py-4 border-b-2 border-slate-300 px-4 rounded-lg p-2 mx-6 font-bold bg-slate-50"
                    value={prospectSearch}
                    onChange={e => {
                        dispatch(searchProspects(e.target.value))
                    }}
                    />
                </> :
                <>
                    <div className={`
                        flex justify-center items-center bg-green-600 p-2 rounded-lg w-16 h-15 ml-1 mr-2 border-b-4 border-green-900 cursor-pointer
                    `}>
                        <TbHomeMove 
                        onClick={() => {
                            dispatch(persistQuoteData());
                            dispatch(setProspectContVis());
                        }}
                        className="text-white w-10 h-10"
                        />
                    </div>

                    <div className={`
                        flex justify-center items-center bg-purple-700 p-2 rounded-lg w-16 h-15 ml-1 border-b-4 border-purple-900 cursor-pointer
                    `}>
                        {
                            visibilityState.notesVis ?
                            <MdRequestQuote 
                            onClick={() => {
                                dispatch(persistQuoteData());
                                dispatch(setNotesVis());
                            }}
                            className="text-white w-10 h-10"
                            /> :
                            <MdStickyNote2 
                            onClick={() => {
                                dispatch(persistQuoteData());
                                dispatch(setNotesVis());
                            }}
                            className="text-white w-10 h-10"
                            />
                        }
                    </div>

                    <div className="flex justify-end gap-5 text-white font-bold w-[50%] text-xl bg-slate-900 p-2">
                        { prospectState?.currProspect?.firstName?.toUpperCase() } { prospectState?.currProspect?.lastName?.toUpperCase() }

                        <h1 className={`
                            ${
                                prospectState?.currProspect?.age > 59 ?
                                "text-red-400" :
                                "text-green-400"
                            }
                        `}>
                            ( { prospectState?.currProspect?.age } )
                        </h1>
                    </div>

                    <div className="flex h-full justify-end text-xl text-white font-bold w-[50%]">
                        <div
                        onClick={() => dispatch(setProspectModVis())}
                        className={`
                            ${
                                visibilityState?.prospectContVis ?
                                "bg-emerald-600 border-emerald-900" :
                                "bg-orange-500 border-orange-800"
                            }
                            flex h-full px-8 py-4 mr-2 rounded-md border-b-4 shadow-lg text-center justify-center align-center items-center cursor-pointer font-bold w-[35.2%]
                        `}>
                            New Quote
                        </div>

                        <div
                        onClick={() => dispatch(duplicateQuote())}
                        className={`
                            bg-emerald-600 border-emerald-900
                            flex h-full px-8 py-4 ml-2 rounded-md border-b-4 shadow-lg text-center justify-center align-center items-center cursor-pointer font-bold w-[35.2%]
                        `}>
                            Duplicate Current
                        </div>
                    </div>
                </>
            }
        </div>
    )
};

export default NavBar;