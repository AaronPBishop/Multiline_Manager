import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaCarCrash } from "react-icons/fa";
import { GiPirateGrave } from "react-icons/gi";
import { FaHospital } from "react-icons/fa6";
import { FaHouseFire } from "react-icons/fa6";

import Quote from '../Iterables/Quote.js'
import AutoLine from "../Iterables/Line/AutoLine.js";
import LifeLine from "../Iterables/Line/LifeLine.js";
import HealthLine from "../Iterables/Line/HealthLine.js";
import FireLine from "../Iterables/Line/FireLine.js";

const QuotesContainer = () => {
    const prospectState = useSelector(state => state.prospectData);

    const autoTotal = useSelector(state => state.prospectData.currQuote.auto?.price);
    const lifeTotal = useSelector(state => state.prospectData.currQuote.life?.price);
    const healthTotal = useSelector(state => state.prospectData.currQuote.health?.price);
    const fireTotal = useSelector(state => state.prospectData.currQuote.fire?.price);

    const [totalBundlePrice, setTotalBundlePrice] = useState(0);

    useEffect(() => {
        const total =
        (autoTotal ?? 0) +
        (lifeTotal ?? 0) +
        (healthTotal ?? 0) +
        (fireTotal ?? 0);

        const roundedTotal = Math.round(total * 100) / 100;
        setTotalBundlePrice(roundedTotal.toFixed(2));
    }, [autoTotal, lifeTotal, healthTotal, fireTotal]);

    const [selectedLine, setSelectedLine] = useState("auto");
    const lines = [
        {
          key: "auto",
          icon: FaCarCrash,
          color: "bg-blue-800",
          borderColor: "border-blue-950"
        },
        {
          key: "life",
          icon: GiPirateGrave,
          color: "bg-green-600",
          borderColor: "border-green-900"
        },
        {
          key: "health",
          icon: FaHospital,
          color: "bg-pink-700",
          borderColor: "border-pink-900"
        },
        {
          key: "fire",
          icon: FaHouseFire,
          color: "bg-red-600",
          borderColor: "border-red-900"
        }
    ];

    const selected = lines.find(line => line.key === selectedLine);
    const remaining = lines.filter(line => line.key !== selectedLine);
    
    return (
        <div className="items-center h-[90%] mt-16 w-screen overflow-hidden">
            <div className="flex justify-between flex-wrap w-full h-full">
                <div 
                className="flex w-[65%] items-center h-[75%] mt-10 p-2 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[20px]">
                    <div className="w-[70%] h-full flex items-center justify-center">
                        {
                            selected && selectedLine === "auto" ?
                            <AutoLine /> :
                            selected && selectedLine === "life" ?
                            <LifeLine /> :
                            selected && selectedLine === "health" ?
                            <HealthLine /> :
                            selected && selectedLine === "fire" &&
                            <FireLine />
                        }
                    </div>

                    <div className="w-[30%] h-full flex flex-wrap justify-end items-center gap-2 px-6 items-start">
                        {
                            remaining.map(line => {
                                const Icon = line.icon;

                                return (
                                    <div
                                    key={line.key}
                                    onClick={() => setSelectedLine(line.key)}
                                    className={`
                                        ${line.color} 
                                        ${line.borderColor}
                                        flex justify-center items-center text-white h-[150px] w-56 rounded-xl border-b-4 cursor-pointer shadow-xl
                                    `}>
                                        <Icon className="w-20 h-20" />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div 
                className="w-[33%] h-[75%] mt-10 mr-3 p-2 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[20px]">
                    {
                        prospectState.currProspect?.quotes?.map(quote => {
                            console.log(quote.id)
                            return (
                                <Quote
                                quoteId={quote?.id}
                                key={quote?.id}
                                />
                            )}
                        )
                    }
                </div>

                <div 
                className="flex w-full justify-between items-center h-[15%] mr-3 pl-1 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[24px] overflow-hidden">
                    <div className="flex w-[65%] gap-x-10 py-2">
                        <div 
                        className={`
                            ${
                                autoTotal ? 
                                "opacity-100" :
                                "opacity-10"
                            }
                            flex justify-center flex-wrap align-items text-center bg-blue-800 text-white h-full w-[15.5%] p-4 rounded-lg
                        `}>
                            <FaCarCrash 
                            className="w-8 h-8"
                            />

                            <div className="w-full">
                                ${autoTotal}
                            </div>
                        </div>

                        <div 
                        className={`
                            ${
                                lifeTotal ? 
                                "opacity-100" :
                                "opacity-10"
                            }
                            flex justify-center flex-wrap align-items text-center bg-green-600 text-white h-full w-[15.5%] p-4 rounded-lg
                        `}>
                            <GiPirateGrave 
                            className="w-8 h-8"
                            />

                            <div className="w-full">
                                ${lifeTotal}
                            </div>
                        </div>

                        <div 
                        className={`
                            ${
                                healthTotal ? 
                                "opacity-100" :
                                "opacity-10"
                            }
                            flex justify-center flex-wrap align-items text-center bg-pink-700 text-white h-full w-[15.5%] p-4 rounded-lg
                        `}>
                            <FaHospital 
                            className="w-8 h-8"
                            />

                            <div className="w-full">
                                ${healthTotal}
                            </div>
                        </div>

                        <div 
                        className={`
                            ${
                                fireTotal ? 
                                "opacity-100" :
                                "opacity-10"
                            }
                            flex justify-center flex-wrap align-items text-center bg-red-600 text-white h-full w-[15.5%] p-4 rounded-lg
                        `}>
                            <FaHouseFire 
                            className="w-8 h-8"
                            />

                            <div className="w-full">
                                ${fireTotal}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-[33%] text-center flex justify-center items-center text-3xl h-full pb-4">
                        <div 
                        className={`
                            justify-center bg-red-600 text-white h-full w-full p-4 rounded-bl-lg border-b-4 border-red-800
                        `}>
                            ${ totalBundlePrice }/mo
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default QuotesContainer;