import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { updateQuoteAuto } from "../../../store/slices/prospectData";

import { FaCarCrash } from "react-icons/fa";
import { MdContentPasteGo } from "react-icons/md";

const AutoLine = () => {
    const dispatch = useDispatch();

    const auto = useSelector(state => state.prospectData.currQuote?.auto);
    const dss = useSelector(state => state.prospectData.currQuote.auto?.DSS);
    const liabilityBi = useSelector(state => state.prospectData.currQuote.auto?.coverages?.liabilityBi);
    const liabilityPd = useSelector(state => state.prospectData.currQuote.auto?.coverages?.liabilityPd);
    const uninsuredBi = useSelector(state => state.prospectData.currQuote.auto?.coverages?.uninsuredBi);
    const uninsuredPd = useSelector(state => state.prospectData.currQuote.auto?.coverages?.uninsuredPd);
    const comp = useSelector(state => state.prospectData.currQuote.auto?.coverages?.comp);
    const collision = useSelector(state => state.prospectData.currQuote.auto?.coverages?.collision);
    const pip = useSelector(state => state.prospectData.currQuote.auto?.coverages?.pip);

    const monthlyTotal = useSelector(state => state.prospectData.currQuote.auto?.price);

    const biLimits = [[30, 60], [50, 100], [100, 300], [250, 500], [500, 500]];
    const pdLimits = [25, 50, 100, 250, 500];
    const pipLimits = [2500, 5000, 10000];
    const deductibleLimits = [250, 500, 1000, 2000, 5000, 10000];

    return (
        <div className="flex flex-wrap items-center gap-y-6 justify-center w-full h-full rounded ml-2 rounded-xl border-b-4 shadow-xl bg-blue-800 border-blue-950 overflow-auto py-8">
            <div className="relative left-0 top-0 w-0 h-0">
                <FaCarCrash
                className="absolute w-24 h-24 text-slate-200 relative left-[-145px] top-[-120px]" 
                />
            </div>

            <div className="flex justify-center flex-wrap items-center w-[55%] h-[43%]">
                <input
                type="number"
                placeholder="Monthly Total"
                className="w-[80%] border border-gray-300 rounded p-2"
                value={monthlyTotal ?? ""}
                onChange={e => {
                    const value = e.target.value === "" ? "" : Number(e.target.value);
                    dispatch(updateQuoteAuto({ ...auto, price: value }));
                }}
                />
                
                <MdContentPasteGo 
                onClick={async e => {
                    e.stopPropagation();

                    const text = Number(await navigator.clipboard.readText());

                    const currAutoQuote = {
                        ...auto,
                        price: text
                    };
                
                    dispatch(updateQuoteAuto(currAutoQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />

                <input
                onChange={e => {
                    const value = Number(e.target.value);

                    const currAutoQuote = {
                        ...auto,
                        price: value / 6
                    };

                    dispatch(updateQuoteAuto(currAutoQuote));
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

                    const currAutoQuote = {
                        ...auto,
                        price: text / 6
                    };
                
                    dispatch(updateQuoteAuto(currAutoQuote));
                }}              
                className="w-[20%] h-[20%] text-white cursor-pointer" 
                />

                <div 
                    onClick={e => {
                        e.stopPropagation();
                        const currAutoQuote = {
                            ...auto,
                            DSS: !dss
                        };

                        dispatch(updateQuoteAuto(currAutoQuote));
                    }}
                    className={`
                        ${
                            dss ? 
                            "bg-green-600" : 
                            "bg-blue-900"
                        }
                        w-full text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                    `}>
                        DSS
                </div>
            </div> 

            <div className="flex flex-wrap items-center justify-center w-full">
                <h2 className="w-full text-center text-white font-bold">
                    Liability
                </h2>

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <h2 className="w-full text-center text-white font-bold">
                        Bodily Injury
                    </h2>

                    {
                        biLimits.map((limit, key) => {
                            const [perPerson, perAccident] = limit;

                            return (
                                <div 
                                key={key}
                                onClick={e => {
                                    e.stopPropagation();
                                    const currAutoQuote = {
                                        ...auto,
                                        coverages: {
                                            ...auto.coverages,
                                            liabilityBi: [perPerson, perAccident]
                                        }
                                    };

                                    dispatch(updateQuoteAuto(currAutoQuote));
                                }}
                                className={`
                                    ${
                                        liabilityBi && 
                                        (liabilityBi[0] === perPerson &&
                                        liabilityBi[1]) === perAccident ?
                                        "bg-green-600" :
                                        "bg-blue-900"
                                    }
                                    w-full text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                                `}>
                                    {perPerson}/{perAccident}
                                </div>
                            )
                        })
                    }
                </div>   
                

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <h2 className="w-full text-center text-white font-bold">
                        Property Damage
                    </h2>

                    {
                        pdLimits.map((limit, key) => {
                            return (
                                <div 
                                key={key}
                                onClick={e => {
                                    e.stopPropagation();
                                    const currAutoQuote = {
                                        ...auto,
                                        coverages: {
                                            ...auto.coverages,
                                            liabilityPd: limit
                                        }
                                    };
                                    
                                    dispatch(updateQuoteAuto(currAutoQuote));
                                }}
                                className={`
                                    ${
                                        liabilityPd === limit ?
                                        "bg-green-600" :
                                        "bg-blue-900"
                                    }
                                    w-full text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                                `}>
                                    {limit}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center w-full">
                <h2 className="w-full text-center text-white font-bold">
                    Uninsured Motorist
                </h2>

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <h2 className="w-full text-center text-white font-bold">
                        Bodily Injury
                    </h2>

                    {
                        biLimits.map((limit, key) => {
                            const [perPerson, perAccident] = limit;

                            return (
                                <div 
                                onClick={e => {
                                    e.stopPropagation();
                                    const currAutoQuote = {
                                        ...auto,
                                        coverages: {
                                            ...auto.coverages,
                                            uninsuredBi: [perPerson, perAccident]
                                        }
                                    };
                                    
                                    dispatch(updateQuoteAuto(currAutoQuote));
                                }}
                                className={`
                                    ${
                                        uninsuredBi && 
                                        (uninsuredBi[0] === perPerson &&
                                        uninsuredBi[1]) === perAccident ?
                                        "bg-green-600" :
                                        "bg-blue-900"
                                    }
                                    w-full bg-blue-900 text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                                `}>
                                    {perPerson}/{perAccident}
                                </div>
                            )
                        })
                    }
                </div>   
                

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <h2 className="w-full text-center text-white font-bold">
                        Property Damage
                    </h2>

                    {
                        pdLimits.map((limit, key) => {
                            return (
                                <div 
                                onClick={e => {
                                    e.stopPropagation();
                                    const currAutoQuote = {
                                        ...auto,
                                        coverages: {
                                            ...auto.coverages,
                                            uninsuredPd: limit
                                        }
                                    };
                                    
                                    dispatch(updateQuoteAuto(currAutoQuote));
                                }}
                                className={`
                                    ${
                                        uninsuredPd === limit ?
                                        "bg-green-600" :
                                        "bg-blue-900"
                                    }
                                    w-full bg-blue-900 text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                                `}>
                                    {limit}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center w-full">
                <h2 className="w-full text-center text-white font-bold">
                    Deductibles
                </h2>

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <h2 className="w-full text-center text-white font-bold">
                        Comprehensive
                    </h2>

                    {
                        deductibleLimits.map((limit, key) => {
                            return (
                                <div 
                                key={key}
                                onClick={e => {
                                    e.stopPropagation();
                                    const currAutoQuote = {
                                        ...auto,
                                        coverages: {
                                            ...auto.coverages,
                                            comp: limit
                                        }
                                    };
                                    
                                    dispatch(updateQuoteAuto(currAutoQuote));
                                }}
                                className={`
                                    ${
                                        comp === limit ?
                                        "bg-green-600" :
                                        "bg-blue-900"
                                    }
                                    w-full bg-blue-900 text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                                `}>
                                    ${limit}
                                </div>
                            )
                        })
                    }
                </div>   
                

                <div className="flex justify-center flex-wrap w-[30%] p-2">
                    <h2 className="w-full text-center text-white font-bold">
                        Collision
                    </h2>

                    {
                        deductibleLimits.map((limit, key) => {
                            return (
                                <div 
                                key={key}
                                onClick={e => {
                                    e.stopPropagation();
                                    const currAutoQuote = {
                                        ...auto,
                                        coverages: {
                                            ...auto.coverages,
                                            collision: limit
                                        }
                                    };
                                    
                                    dispatch(updateQuoteAuto(currAutoQuote));
                                }}
                                className={`
                                    ${
                                        collision === limit ?
                                        "bg-green-600" :
                                        "bg-blue-900"
                                    }
                                    w-full bg-blue-900 text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                                `}>
                                    ${limit}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center w-full">
                <h2 className="w-full text-center text-white font-bold">
                    Personal Injury Protection
                </h2>

                {
                    pipLimits.map((limit, key) => {
                        return (
                            <div 
                            key={key}
                            onClick={e => {
                                e.stopPropagation();
                                const currAutoQuote = {
                                        ...auto,
                                        coverages: {
                                            ...auto.coverages,
                                            pip: limit
                                        }
                                    };
                                    
                                    dispatch(updateQuoteAuto(currAutoQuote));
                            }}
                            className={`
                                ${
                                    pip === limit ?
                                    "bg-green-600" :
                                    "bg-blue-900"
                                }
                                w-[60%] bg-blue-900 text-white my-1 px-[13px] py-[2px] rounded text-center cursor-pointer
                            `}>
                                ${limit}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AutoLine;