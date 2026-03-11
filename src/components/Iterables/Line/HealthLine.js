import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { updateQuoteHealth } from "../../../store/slices/prospectData";

import { FaHospital } from "react-icons/fa6";
import { MdContentPasteGo } from "react-icons/md";

const HealthLine = () => {
    const dispatch = useDispatch();

    const health = useSelector(state => state.prospectData.currQuote?.health);
    const stdiAdded = useSelector(state => state.prospectData.currQuote?.health?.STDI.add);
    const suppAdded = useSelector(state => state.prospectData.currQuote?.health?.SUPP.add);

    const monthlyTotal = useSelector(state => state.prospectData.currQuote.health?.price);
    const stdiBenefit = useSelector(state => state.prospectData.currQuote.health?.STDI.benefit);
    const suppBenefit = useSelector(state => state.prospectData.currQuote.health?.SUPP.benefit);

    const termTypes = [10, 20, 30];
    return (
        <div className="flex flex-wrap items-center gap-y-6 justify-center w-full h-full rounded ml-2 rounded-xl border-b-4 shadow-xl bg-pink-700 border-pink-900 overflow-auto py-8">
            <div className="relative left-0 top-0 w-0 h-0">
                <FaHospital
                className="absolute w-24 h-24 text-white relative left-[-145px] top-[-120px]" 
                />
            </div>

            <div className="flex justify-center flex-wrap items-center w-[55%] h-[32%]">
                <input
                onChange={e => {
                    const value = Number(e.target.value);

                    const currHealthQuote = {
                        ...health,
                        price: value
                    };

                    dispatch(updateQuoteHealth(currHealthQuote));
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

                    const currHealthQuote = {
                        ...health,
                        price: text
                    };
                
                    dispatch(updateQuoteHealth(currHealthQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />

                <input
                onChange={e => {
                    const value = Number(e.target.value);

                    const currHealthQuote = {
                        ...health,
                        price: value / 6
                    };

                    dispatch(updateQuoteHealth(currHealthQuote));
                }}
                type="number"
                placeholder="6 Month Total"
                className="w-[80%] border border-gray-300 rounded p-2"
                value={monthlyTotal && monthlyTotal * 6}
                />

                <MdContentPasteGo 
                onClick={async e => {
                    e.stopPropagation();

                    const text = Number(await navigator.clipboard.readText());

                    const currHealthQuote = {
                        ...health,
                        price: text / 6
                    };
                
                    dispatch(updateQuoteHealth(currHealthQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />
            </div> 

            <div className="flex flex-wrap justify-center w-full mb-20">
                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <div 
                    onClick={e => {
                        e.stopPropagation();
                        const currHealthQuote = {
                            ...health,
                            STDI: {
                                ...health.STDI,
                                add: true
                            },
                            SUPP: {
                                ...health.SUPP,
                                add: false
                            }
                        };
                                
                        dispatch(updateQuoteHealth(currHealthQuote));
                    }}
                    className={`
                        ${
                            stdiAdded ?
                            "bg-pink-400" :
                            "bg-pink-950"
                        }
                        w-full text-center text-white font-bold rounded h-12 items-center flex justify-center cursor-pointer
                    `}>
                        STDI
                    </div>

                    <input
                    onChange={e => {
                        const value = Number(e.target.value);

                        const currHealthQuote = {
                            ...health,
                            STDI: {
                                ...health.STDI,
                                benefit: value
                            },
                        };

                        dispatch(updateQuoteHealth(currHealthQuote));
                    }}
                    type="number"
                    placeholder="Benefit Amount"
                    className={`         
                        ${
                            stdiAdded ?
                            "opacity-100" :
                            "opacity-0"
                        }
                        w-full text-black my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                    `}
                    value={stdiBenefit}
                    />
                </div>

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <div onClick={e => {
                        e.stopPropagation();
                        const currHealthQuote = {
                            ...health,
                            STDI: {
                                ...health.STDI,
                                add: false
                            },
                            SUPP: {
                                ...health.SUPP,
                                add: true
                            }
                        };
                                
                        dispatch(updateQuoteHealth(currHealthQuote));
                    }}
                    className={`
                        ${
                            suppAdded ?
                            "bg-pink-400" :
                            "bg-pink-950"
                        }
                        w-full text-center text-white font-bold rounded h-12 items-center flex justify-center cursor-pointer
                    `}>
                        SHIP
                    </div>

                    <input
                    onChange={e => {
                        const value = Number(e.target.value);

                        const currHealthQuote = {
                            ...health,
                            SUPP: {
                                ...health.SUPP,
                                benefit: value
                            },
                        };

                        dispatch(updateQuoteHealth(currHealthQuote));
                    }}
                    type="number"
                    placeholder="Benefit Amount"
                    className={`         
                        ${
                            suppAdded ?
                            "opacity-100" :
                            "opacity-0"
                        }
                        w-full text-black my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                    `}
                    value={suppBenefit}
                    />
                </div>
            </div>
        </div>
    );
};

export default HealthLine;