import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { persistQuoteData } from "../../store/slices/prospectData.js";
import { setProspectModVis, setProspectContVis } from "../../store/slices/visibility.js"

import { TbHomeMove } from "react-icons/tb";
import { BsSuitSpadeFill } from "react-icons/bs";

import CreateProspectQuotes from "../Modals/CreateProspectQuotes.js";

const NavBar = () => {
    const dispatch = useDispatch();

    const visibilityState = useSelector(state => state.visibility);

    return (
        <div
        className="flex justify-between items-center fixed top-0 left-0 w-full h-20 shadow-xl bg-slate-900 z-50 p-3 border-b-1 border-slate-700">
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
                </> :
                <>
                    <TbHomeMove 
                    onClick={() => {
                        dispatch(setProspectContVis());
                    }}
                    className="text-slate-300 w-14 h-14 mr-5 cursor-pointer"
                    />

                    <div className="flex h-full justify-end text-xl text-white font-bold w-full">
                        <div
                        onClick={() => dispatch(setProspectModVis())}
                        className={`
                            ${
                                visibilityState?.prospectContVis ?
                                "bg-emerald-600 border-emerald-900" :
                                "bg-orange-500 border-orange-800"
                            }
                            flex h-full px-8 py-4 mr-2 rounded-md border-b-4 shadow-lg text-center justify-center align-center items-center cursor-pointer font-bold w-[16.7%]
                        `}>
                            New Quote
                        </div>

                        <div
                        onClick={() => dispatch(persistQuoteData())}
                        className={`
                            bg-emerald-600 border-emerald-900
                            flex h-full px-8 py-4 ml-2 rounded-md border-b-4 shadow-lg text-center justify-center align-center items-center cursor-pointer font-bold w-[16.7%]
                        `}>
                            Save
                        </div>
                    </div>
                </>
            }
        </div>
    )
};

export default NavBar;