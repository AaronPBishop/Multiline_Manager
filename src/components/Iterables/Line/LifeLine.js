import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { updateQuoteLife } from "../../../store/slices/prospectData";

import { roundToTwo } from "../../../functions/totals";

import { RiLifebuoyFill } from "react-icons/ri";
import { MdContentPasteGo } from "react-icons/md";

const LifeLine = () => {
    const dispatch = useDispatch();

    const life = useSelector(state => state.prospectData.currQuote?.life);
    const termAdded = useSelector(state => state.prospectData.currQuote?.life?.TERM.add);
    const gifeAdded = useSelector(state => state.prospectData.currQuote?.life?.GIFE.add);
    const termType = useSelector(state => state.prospectData.currQuote?.life?.TERM.type);

    const monthlyTotal = useSelector(state => state.prospectData.currQuote.life?.price);

    const [monthlyInput, setMonthlyInput] = useState("");
    const [twelveMonthInput, setTwelveMonthInput] = useState("");

    const termTypes = [10, 20, 30];

    useEffect(() => {
        if (monthlyTotal !== undefined && monthlyTotal !== null) {
            setMonthlyInput(monthlyTotal.toFixed(2));
            setTwelveMonthInput((monthlyTotal * 12).toFixed(2));
        };
    }, [monthlyTotal]);

    return (
        <div className="flex flex-wrap items-center gap-y-6 justify-center w-full h-full rounded ml-2 rounded-xl border-b-4 shadow-xl bg-emerald-600 border-blue-950 overflow-auto py-8">
            <div className="relative left-0 top-0 w-0 h-0">
                <RiLifebuoyFill
                className="absolute w-24 h-24 text-white relative left-[-140px] top-[-140px]" 
                />
            </div>

            <div className="flex justify-center flex-wrap items-center w-[57%] h-[54%] bg-emerald-900 p-2 rounded-xl">
                <div className="w-full text-white font-bold">
                    Monthly Total
                </div>

                <input
                type="text"
                placeholder="Monthly Total"
                className="w-[80%] border border-gray-300 rounded p-2 mb-2"
                value={monthlyInput}
                onChange={e => {
                    setMonthlyInput(e.target.value);
                }}
                onBlur={() => {
                    const num = Number(monthlyInput);
                                
                    if (!isNaN(num)) {
                        const rounded = roundToTwo(num);
                    
                        dispatch(updateQuoteLife({ ...life, price: rounded }));
                        setMonthlyInput(rounded.toFixed(2));
                    } else setMonthlyInput("");
                }}
                />
                
                <MdContentPasteGo 
                onClick={async e => {
                    e.stopPropagation();

                   const pastedValue = roundToTwo(Number(await navigator.clipboard.readText()));

                    const currLifeQuote = {
                        ...life,
                        price: pastedValue
                    };
                
                    dispatch(updateQuoteLife(currLifeQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />

                <div className="w-full text-white font-bold">
                    12-month Total
                </div>

                <input
                type="text"
                className="w-[80%] border border-gray-300 rounded p-2"
                placeholder="12 Month Total"
                value={twelveMonthInput}
                onChange={e => {
                    setTwelveMonthInput(e.target.value);
                }}
                onBlur={() => {
                    const num = Number(twelveMonthInput);
                                
                    if (!isNaN(num)) {
                        const monthly = roundToTwo(num / 12);
                    
                        dispatch(updateQuoteLife({ ...life, price: monthly }));
                        setTwelveMonthInput((monthly * 12).toFixed(2));
                    } else setTwelveMonthInput("");
                }}
                />

                <MdContentPasteGo 
                onClick={async e => {
                    e.stopPropagation();

                    const pastedValue = roundToTwo(Number(await navigator.clipboard.readText()) / 12);

                    const currLifeQuote = {
                        ...life,
                        price: pastedValue
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