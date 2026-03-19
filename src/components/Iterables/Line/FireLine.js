import { useSelector, useDispatch } from "react-redux";

import { updateQuoteFire } from "../../../store/slices/prospectData";

import { roundToTwo } from "../../../functions/totals";

import { useState, useEffect } from "react";

import { FaHouseFire } from "react-icons/fa6";
import { MdContentPasteGo } from "react-icons/md";

const FireLine = () => {
    const dispatch = useDispatch();

    const fire = useSelector(state => state.prospectData.currQuote?.fire);

    const {
        price = 0,
        HOME = { add: false, type: "TENANT" },
        RNTRS = { add: false }
    } = fire;

    const homeAdded = HOME.add;
    const rentersAdded = RNTRS.add;
    const homeType = HOME.type;

    const monthlyTotal = price ?? 0;
    const yearlyTotal = monthlyTotal * 12;

    const [monthlyInput, setMonthlyInput] = useState("");
    const [twelveMonthInput, setTwelveMonthInput] = useState("");

    const updateFire = updates => {
        dispatch(
            updateQuoteFire({
                ...fire,
                ...updates
            })
        );
    };

    const setHome = type => {
        updateFire({
            HOME: {
                ...HOME,
                add: true,
                type
            },
            RNTRS: {
                ...RNTRS,
                add: false
            }
        });
    };

    const setRenters = () => {
        updateFire({
            HOME: {
                ...HOME,
                add: false
            },
            RNTRS: {
                ...RNTRS,
                add: true
            }
        });
    };

    useEffect(() => {
        if (monthlyTotal !== undefined && monthlyTotal !== null) {
            setMonthlyInput(monthlyTotal.toFixed(2));
            setTwelveMonthInput((monthlyTotal * 12).toFixed(2));
        };
    }, [monthlyTotal]);

    return (
        <div className="flex flex-wrap items-center gap-y-6 justify-center w-full h-full rounded ml-2 rounded-xl border-b-4 shadow-xl bg-red-600 border-red-900 overflow-auto py-8">

            <div className="relative left-0 top-0 w-0 h-0">
                <FaHouseFire className="absolute w-24 h-24 text-slate-200 relative left-[-140px] top-[-140px]" />
            </div>

            <div className="flex justify-center flex-wrap items-center w-[57%] h-[54%] bg-red-900 p-2 rounded-xl">
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
                    
                        updateFire({ price: rounded });
                        setMonthlyInput(rounded.toFixed(2));
                    } else setMonthlyInput("");
                }}
                />

                <MdContentPasteGo
                className="w-[20%] h-[20%] text-white cursor-pointer"
                onClick={async e => {
                    e.stopPropagation();

                    const pastedValue = roundToTwo(Number(await navigator.clipboard.readText()));

                    updateFire({ price: pastedValue });
                }} 
                />

                <div className="w-full text-white font-bold">
                    12-month Total
                </div>

                <input
                type="text"
                placeholder="12 Month Total"
                className="w-[80%] border border-gray-300 rounded p-2"
                value={twelveMonthInput}
                onChange={e => {
                    setTwelveMonthInput(e.target.value);
                }}
                onBlur={() => {
                    const num = Number(twelveMonthInput);
                
                    if (!isNaN(num)) {
                        const monthly = roundToTwo(num / 12);
                    
                        updateFire({ price: monthly });
                        setTwelveMonthInput((monthly * 12).toFixed(2));
                    } else setTwelveMonthInput("");
                }}
                />

                <MdContentPasteGo
                    className="w-[20%] h-[20%] text-white cursor-pointer"
                onClick={async e => {
                    e.stopPropagation();

                    const pastedValue = roundToTwo(Number(await navigator.clipboard.readText()) / 12);

                    updateFire({ price: pastedValue });
                }}   
                />
            </div>

            <div className="flex flex-wrap justify-center w-full mb-20">

                <div className="flex justify-center flex-wrap w-[30%] p-2">

                    <div
                        className={`
                            ${homeAdded ? "bg-red-400" : "bg-red-950"}
                            w-full text-center text-white font-bold rounded h-12 items-center flex justify-center cursor-pointer
                        `}
                        onClick={e => {
                            e.stopPropagation();
                            setHome(homeType || "TENANT");
                        }}
                    >
                        HOMEOWNERS
                    </div>

                    <div
                        className={`
                            ${homeType === "TENANT" ? "bg-red-500" : "bg-red-900"}
                            ${homeAdded ? "opacity-100" : "opacity-0"}
                            w-full text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                        `}
                        onClick={e => {
                            e.stopPropagation();
                            setHome("TENANT");
                        }}
                    >
                        Tenant
                    </div>

                    <div
                        className={`
                            ${homeType === "NON_TENANT" ? "bg-red-500" : "bg-red-900"}
                            ${homeAdded ? "opacity-100" : "opacity-0"}
                            w-full text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                        `}
                        onClick={e => {
                            e.stopPropagation();
                            setHome("NON_TENANT");
                        }}
                    >
                        Non-tenant
                    </div>

                </div>

                <div className="flex justify-center flex-wrap w-[30%] p-2">

                    <div
                        className={`
                            ${rentersAdded ? "bg-red-400" : "bg-red-950"}
                            w-full text-center text-white font-bold rounded h-12 items-center flex justify-center cursor-pointer
                        `}
                        onClick={e => {
                            e.stopPropagation();
                            setRenters();
                        }}
                    >
                        RENTERS
                    </div>

                </div>

            </div>

        </div>
    );
};

export default FireLine;