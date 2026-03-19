import { useSelector, useDispatch } from "react-redux";

import { updateQuoteHealth } from "../../../store/slices/prospectData";

import { roundToTwo } from "../../../functions/totals";

import { useState, useEffect } from "react";

import { FaHospital } from "react-icons/fa6";
import { MdContentPasteGo } from "react-icons/md";

const HealthLine = () => {
    const dispatch = useDispatch();

    // Subscribe to the whole health object once
    const health = useSelector(state => state.prospectData.currQuote?.health) || {
        price: 0,
        STDI: { add: false, benefit: 0 },
        SUPP: { add: false, benefit: 0 }
    };

    const stdiAdded = health.STDI?.add ?? false;
    const suppAdded = health.SUPP?.add ?? false;

    const monthlyTotal = health.price ?? 0;

    const stdiBenefit = health.STDI?.benefit ?? "";
    const suppBenefit = health.SUPP?.benefit ?? "";

    const [monthlyInput, setMonthlyInput] = useState("");
    const [sixMonthInput, setSixMonthInput] = useState("");

    const updateHealth = (newHealth) => {
        dispatch(updateQuoteHealth(newHealth));
    };

    useEffect(() => {
        if (monthlyTotal !== undefined && monthlyTotal !== null) {
            setMonthlyInput(monthlyTotal.toFixed(2));
            setSixMonthInput((monthlyTotal * 6).toFixed(2));
        };
    }, [monthlyTotal]);

    return (
        <div className="flex flex-wrap items-center gap-y-6 justify-center w-full h-full rounded ml-2 rounded-xl border-b-4 shadow-xl bg-pink-700 border-pink-900 overflow-auto py-8">

            <div className="relative left-0 top-0 w-0 h-0">
                <FaHospital
                    className="absolute w-24 h-24 text-slate-200 relative left-[-140px] top-[-140px]"
                />
            </div>

            <div className="flex justify-center flex-wrap items-center w-[57%] h-[54%] bg-pink-900 p-2 rounded-xl">
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
                        
                            updateHealth({ ...health, price: rounded });
                            setMonthlyInput(rounded.toFixed(2));
                        } else setMonthlyInput("");
                    }}
                />

                <MdContentPasteGo
                    className="w-[20%] h-[20%] text-white cursor-pointer"
                    onClick={async e => {
                        e.stopPropagation();

                        const pastedValue = roundToTwo(Number(await navigator.clipboard.readText()));

                        updateHealth({
                            ...health,
                            price: pastedValue
                        });
                    }}
                />

                <div className="w-full text-white font-bold">
                    6-month Total
                </div>

                <input
                type="text"
                placeholder="6 Month Total"
                className="w-[80%] border border-gray-300 rounded p-2"
                value={sixMonthInput}
                onChange={e => {
                    setSixMonthInput(e.target.value);
                }}
                onBlur={() => {
                    const num = Number(sixMonthInput);
                                
                    if (!isNaN(num)) {
                        const monthly = roundToTwo(num / 6);
                    
                        updateHealth({ ...health, price: monthly });
                        setSixMonthInput((monthly * 6).toFixed(2));
                    } else setSixMonthInput("");
                }}
                />

                <MdContentPasteGo
                className="w-[20%] h-[20%] text-white cursor-pointer"
                onClick={async e => {
                    e.stopPropagation();

                    const pastedValue = roundToTwo(Number(await navigator.clipboard.readText()) / 6);

                    const currHealthQuote = {
                        ...health,
                        price: pastedValue
                    };
                
                    updateHealth(currHealthQuote);
                }} 
                />

            </div>

            <div className="flex flex-wrap justify-center w-full mb-20">

                {/* STDI */}
                <div className="flex justify-center flex-wrap w-[30%] p-2">

                    <div
                        className={`
                            ${stdiAdded ? "bg-pink-400" : "bg-pink-950"}
                            w-full text-center text-white font-bold rounded h-12 flex justify-center items-center cursor-pointer
                        `}
                        onClick={e => {
                            e.stopPropagation();

                            updateHealth({
                                ...health,
                                STDI: {
                                    ...health.STDI,
                                    add: true
                                },
                                SUPP: {
                                    ...health.SUPP,
                                    add: false
                                }
                            });
                        }}
                    >
                        STDI
                    </div>

                    <input
                        type="number"
                        placeholder="Benefit Amount"
                        className={`${
                            stdiAdded ? "opacity-100" : "opacity-0"
                        } w-full text-black my-1 px-[13px] py-[2px] rounded text-center`}
                        value={stdiBenefit}
                        onChange={e => {
                            const value = e.target.value === "" ? "" : Number(e.target.value);
                            updateHealth({ ...health, STDI: { ...health.STDI, benefit: value } });
                        }}
                    />

                </div>

                {/* SUPP */}
                <div className="flex justify-center flex-wrap w-[30%] p-2">

                    <div
                        className={`
                            ${suppAdded ? "bg-pink-400" : "bg-pink-950"}
                            w-full text-center text-white font-bold rounded h-12 flex justify-center items-center cursor-pointer
                        `}
                        onClick={e => {
                            e.stopPropagation();

                            updateHealth({
                                ...health,
                                STDI: {
                                    ...health.STDI,
                                    add: false
                                },
                                SUPP: {
                                    ...health.SUPP,
                                    add: true
                                }
                            });
                        }}
                    >
                        SHIP
                    </div>

                    <input
                        type="number"
                        placeholder="Benefit Amount"
                        className={`${
                            suppAdded ? "opacity-100" : "opacity-0"
                        } w-full text-black my-1 px-[13px] py-[2px] rounded text-center`}
                        value={suppBenefit}
                        onChange={e => {
                            const value = e.target.value === "" ? "" : Number(e.target.value);
                            updateHealth({ ...health, SUPP: { ...health.SUPP, benefit: value } });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HealthLine;