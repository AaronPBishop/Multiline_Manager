import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { updateQuoteLife } from "../../../store/slices/prospectData";

import { GiPirateGrave } from "react-icons/gi";
import { MdContentPasteGo } from "react-icons/md";

const LifeLine = () => {
    const dispatch = useDispatch();

    const life = useSelector(state => state.prospectData.currQuote?.life);
    const termAdded = useSelector(state => state.prospectData.currQuote?.life?.TERM.add);
    const gifeAdded = useSelector(state => state.prospectData.currQuote?.life?.GIFE.add);
    const termType = useSelector(state => state.prospectData.currQuote?.life?.TERM.type);

    const monthlyTotal = useSelector(state => state.prospectData.currQuote.life?.price);

    const termTypes = [10, 20, 30];
    return (
        <div className="flex flex-wrap items-center gap-y-6 justify-center w-full h-full rounded ml-2 rounded-xl border-b-4 shadow-xl bg-emerald-600 border-blue-950 overflow-auto py-8">
            <div className="relative left-0 top-0 w-0 h-0">
                <GiPirateGrave
                className="absolute w-24 h-24 text-white relative left-[-155px] top-[-100px]" 
                />
            </div>

            <div className="flex justify-center flex-wrap items-center w-[55%] h-[32%]">
                <input
                onChange={e => {
                    const value = Number(e.target.value);

                    const currLifeQuote = {
                        ...life,
                        price: value
                    };

                    dispatch(updateQuoteLife(currLifeQuote));
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

                    const currLifeQuote = {
                        ...life,
                        price: text
                    };
                
                    dispatch(updateQuoteLife(currLifeQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />

                <input
                onChange={e => {
                    const value = Number(e.target.value);

                    const currLifeQuote = {
                        ...life,
                        price: value / 12
                    };

                    dispatch(updateQuoteLife(currLifeQuote));
                }}
                type="number"
                placeholder="6 Month Total"
                className="w-[80%] border border-gray-300 rounded p-2"
                value={monthlyTotal && monthlyTotal * 12}
                />

                <MdContentPasteGo 
                onClick={async e => {
                    e.stopPropagation();

                    const text = Number(await navigator.clipboard.readText());

                    const currLifeQuote = {
                        ...life,
                        price: text / 12
                    };
                
                    dispatch(updateQuoteLife(currLifeQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />
            </div> 

            <div className="flex flex-wrap justify-center w-full">
                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <div 
                    onClick={e => {
                        e.stopPropagation();
                        const currLifeQuote = {
                            ...life,
                            TERM: {
                                add: true,
                                type: ""
                            },
                            GIFE: {
                                add: false
                            }
                        };
                                
                        dispatch(updateQuoteLife(currLifeQuote));
                    }}
                    className={`
                        ${
                            termAdded ?
                            "bg-emerald-500" :
                            "bg-emerald-900"
                        }
                        w-full text-center text-white font-bold rounded h-12 items-center flex justify-center cursor-pointer
                    `}>
                        Term
                    </div>

                    {
                        termTypes.map((type, key) => {
                            return (
                                <div 
                                onClick={e => {
                                    e.stopPropagation();
                                    const currLifeQuote = {
                                        ...life,
                                        TERM: {
                                            add: true,
                                            type: type
                                        },
                                        GIFE: {
                                            add: false
                                        }
                                    };
                                
                                    dispatch(updateQuoteLife(currLifeQuote));
                                }}
                                className={`
                                    ${
                                        termType === type ?
                                        "bg-emerald-500" :
                                        "bg-emerald-900"
                                    }
                                    ${
                                        termAdded ?
                                        "opacity-100" :
                                        "opacity-0"
                                    }
                                    w-full text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                                `}>
                                    {type}-Year Term
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <div onClick={e => {
                        e.stopPropagation();
                        const currLifeQuote = {
                            ...life,
                            TERM: {
                                add: false,
                                type: ""
                            },
                            GIFE: {
                                add: true
                            }
                        };
                                
                        dispatch(updateQuoteLife(currLifeQuote));
                    }}
                    className={`
                        ${
                            gifeAdded ?
                            "bg-emerald-500" :
                            "bg-emerald-900"
                        }
                        w-full text-center text-white font-bold rounded h-12 items-center flex justify-center cursor-pointer
                    `}>
                        GIFE
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LifeLine;