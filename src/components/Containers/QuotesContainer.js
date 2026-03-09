import { useSelector } from "react-redux";

import { FaCarCrash } from "react-icons/fa";
import { GiPirateGrave } from "react-icons/gi";
import { FaHospital } from "react-icons/fa6";
import { FaHouseFire } from "react-icons/fa6";

import { useEffect, useState } from "react";

import Quote from '../Iterables/Quote.js'

const QuotesContainer = () => {
    const prospectState = useSelector(state => state.prospectData);
    const currProspect = prospectState.currProspect;

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

    const [autoPrice, setAutoPrice] = useState(false);
    const [dss, setDSS] = useState(false);

    const [lifePrice, setLifePrice] = useState(false);
    const [termType, setTermType] = useState(0);

    const [healthPrice, setHealthPrice] = useState(false);
    const [stdiBenefit, setStdiBenefit] = useState(0);
    const [suppHealthBenefit, setSuppHealthBenefit] = useState(0);

    const [firePrice, setFirePrice] = useState(false);
    const [homeownersType, setHomeownersType] = useState("");

    const selected = lines.find(line => line.key === selectedLine);
    const remaining = lines.filter(line => line.key !== selectedLine);

    useEffect(() => {
        console.log("CURR QUOTE: ", prospectState.currQuote);
    }, [currProspect?.quotes]);
    
    return (
        <div className="items-center h-[90%] mt-16 w-screen">
            <div className="flex justify-between flex-wrap w-full h-full">
                <div 
                className="flex w-[65%] items-center h-[75%] mt-10 p-2 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[20px]">
                    <div className="w-[70%] h-full flex items-center justify-center">
                        {
                            selected && (
                                <div 
                                className={`
                                    ${selected.color} 
                                    ${selected.borderColor}
                                    flex flex-wrap items-center justify-center w-full h-full rounded cursor-pointer ml-2 rounded-xl border-b-4 shadow-xl
                                `}>
                                    <selected.icon 
                                    className="w-44 h-44 text-white" 
                                    />

                                    <div 
                                    key={selectedLine}
                                    onClick={e => {
                                        e.stopPropagation();
                                    }}
                                    className={`
                                        ${
                                            selectedLine && "opacity-100 translate-y-2"
                                        }
                                        transition-all duration-300 ease-out
                                        bg-red-600 text-white mt-[2px] px-[6px] py-[2px] rounded text-center cursor-pointer w-[80%]
                                    `}> 
                                            {
                                                selectedLine === "auto" ? "DSS" :
                                                selectedLine === "life" ? "Term Type" :
                                                selectedLine === "health" ? "Benefit Amount" :
                                                selectedLine === "fire" ? "Occupancy Type" :
                                                null
                                            }
                                    </div>

                                    <input
                                    onChange={e => {
                                        selectedLine === "auto" ? setAutoPrice(e.target.value) :
                                        selectedLine === "life" ? setLifePrice(e.target.value) :
                                        selectedLine === "health" ? setHealthPrice(e.target.value) :
                                        selectedLine === "fire" && setFirePrice(e.target.value)
                                    }}
                                    type="text"
                                    placeholder="Price"
                                    className="w-[80%] border border-gray-300 rounded p-2 mb-4"
                                    />
                                </div>
                            )
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
                className="flex w-[33%] h-[75%] mt-10 mr-3 p-2 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[20px]">
                    {
                        currProspect?.quotes?.map(quote => {
                            return (
                                <Quote
                                key={quote.id}
                                quoteData={quote}
                                />
                            )}
                        )
                    }
                </div>

                <div 
                className="flex w-full items-center h-[10%] mr-3 p-2 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[20px]">
                    
                </div>
            </div> 
        </div>
    );
};

export default QuotesContainer;