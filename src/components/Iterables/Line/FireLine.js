import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { updateQuoteFire } from "../../../store/slices/prospectData";

import { FaHouseFire } from "react-icons/fa6";
import { MdContentPasteGo } from "react-icons/md";

const FireLine = () => {
    const dispatch = useDispatch();

    const fire = useSelector(state => state.prospectData.currQuote?.fire);
    const homeAdded = useSelector(state => state.prospectData.currQuote?.fire?.HOME.add);
    const homeDeductible = useSelector(state => state.prospectData.currQuote.fire?.deductible);
    const homeLiability = useSelector(state => state.prospectData.currQuote.fire?.liability);
    const homeType = useSelector(state => state.prospectData.currQuote.fire?.type);
    const rentersAdded = useSelector(state => state.prospectData.currQuote?.fire?.RNTRS.add);
    const monthlyTotal = useSelector(state => state.prospectData.currQuote.fire?.price);
    
    return (
        <div className="flex flex-wrap items-center gap-y-6 justify-center w-full h-full rounded ml-2 rounded-xl border-b-4 shadow-xl bg-red-600 border-red-900 overflow-auto py-8">
            <div className="relative left-0 top-0 w-0 h-0">
                <FaHouseFire
                className="absolute w-24 h-24 text-white relative left-[-145px] top-[-100px]" 
                />
            </div>

            <div className="flex justify-center flex-wrap items-center w-[55%] h-[35%]">
                <input
                onChange={e => {
                    const value = Number(e.target.value);

                    const currFireQuote = {
                        ...fire,
                        price: value
                    };

                    dispatch(updateQuoteFire(currFireQuote));
                }}
                type="number"
                placeholder="Monthly Total"
                className="w-[80%] border border-gray-300 rounded p-2"
                value={monthlyTotal}
                />
                
                <MdContentPasteGo 
                onClick={async e => {
                    e.stopPropagation();

                    const text = Number(await navigator.clipboard.readText());

                    const currFireQuote = {
                        ...fire,
                        price: text
                    };
                
                    dispatch(updateQuoteFire(currFireQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />

                <input
                onChange={e => {
                    const value = Number(e.target.value);

                    const currFireQuote = {
                        ...fire,
                        price: value / 12
                    };

                    dispatch(updateQuoteFire(currFireQuote));
                }}
                type="number"
                placeholder="12 Month Total"
                className="w-[80%] border border-gray-300 rounded p-2"
                value={monthlyTotal && monthlyTotal * 12}
                />

                <MdContentPasteGo 
                onClick={async e => {
                    e.stopPropagation();

                    const text = Number(await navigator.clipboard.readText());

                    const currFireQuote = {
                        ...fire,
                        price: text / 12
                    };
                
                    dispatch(updateQuoteFire(currFireQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />
            </div> 

            <div className="flex flex-wrap justify-center w-full mb-20">
                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <div 
                    onClick={e => {
                        e.stopPropagation();
                        const currFireQuote = {
                            ...fire,
                            HOME: {
                                ...fire.HOME,
                                add: true
                            },
                            RNTRS: {
                                ...fire.RNTRS,
                                add: false
                            }
                        };
                                
                        dispatch(updateQuoteFire(currFireQuote));
                    }}
                    className={`
                        ${
                            homeAdded ?
                            "bg-red-400" :
                            "bg-red-950"
                        }
                        w-full text-center text-white font-bold rounded h-12 items-center flex justify-center cursor-pointer
                    `}>
                        HOMEOWNERS
                    </div>

                    <div 
                    onClick={e => {
                        e.stopPropagation();
                        const currFireQuote = {
                            ...fire,
                            HOME: {
                                ...fire.HOME,
                                type: "TENANT",
                                add: true
                            },
                            RNTRS: {
                                ...fire.RNTRS,
                                add: false
                            }
                        };
                                
                        dispatch(updateQuoteFire(currFireQuote));
                    }}
                    className={`
                        ${
                            homeType === "TENANT" ?
                            "bg-red-500" :
                            "bg-red-900"
                        }
                        ${
                            homeAdded ?
                            "opacity-100" :
                            "opacity-0"
                        }
                        w-full text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                    `}>
                        Tenant
                    </div>

                    <div 
                    onClick={e => {
                        e.stopPropagation();
                        const currFireQuote = {
                            ...fire,
                            HOME: {
                                ...fire.HOME,
                                type: "NON_TENANT",
                                add: true
                            },
                            RNTRS: {
                                ...fire.RNTRS,
                                add: false
                            }
                        };
                                
                        dispatch(updateQuoteFire(currFireQuote));
                    }}
                    className={`
                        ${
                            homeType === "NON_TENANT"  ?
                            "bg-red-500" :
                            "bg-red-900"
                        }
                        ${
                            homeAdded ?
                            "opacity-100" :
                            "opacity-0"
                        }
                        w-full text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                    `}>
                        Non-tenant
                    </div>

                </div>

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <div onClick={e => {
                        e.stopPropagation();
                        const currFireQuote = {
                            ...fire,
                            HOME: {
                                ...fire.HOME,
                                add: false
                            },
                            RNTRS: {
                                ...fire.RNTRS,
                                add: true
                            }
                        };
                                
                        dispatch(updateQuoteFire(currFireQuote));
                    }}
                    className={`
                        ${
                            rentersAdded ?
                            "bg-red-400" :
                            "bg-red-950"
                        }
                        w-full text-center text-white font-bold rounded h-12 items-center flex justify-center cursor-pointer
                    `}>
                        RENTERS
                    </div>

                  
                </div>
            </div>
        </div>
    );
};

export default FireLine;