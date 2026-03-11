import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProspect, addQuoteToExisting } from "../../store/slices/prospectData.js";
import { setProspectModVis } from "../../store/slices/visibility.js";

import { buildNewProspect } from  '../../functions/prospects.js';

import { FaCarCrash } from "react-icons/fa";
import { GiPirateGrave } from "react-icons/gi";
import { FaHospital } from "react-icons/fa6";
import { FaHouseFire } from "react-icons/fa6";

const CreateProspectQuotes = () => {
    const dispatch = useDispatch();

    const visibility = useSelector(state => state.visibility.prospectModalVis);
    const quoteContVis = useSelector(state => state.visibility.quoteContVis);
    const currProspect = useSelector(state => state.prospectData.currProspect);
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(Number(0));

    const [auto, setAuto] = useState(false);
    const [dss, setDSS] = useState(false);

    const [life, setLife] = useState(false);
    const [term, setTerm] = useState(false);
    const [gife, setGife] = useState(false);

    const [health, setHealth] = useState(false);
    const [stdi, setStdi] = useState(false);
    const [suppHealth, setSuppHealth] = useState(false);

    const [fire, setFire] = useState(false);
    const [renters, setRenters] = useState(false);
    const [homeowners, setHomeowners] = useState(false);

    const [addingQuote, setAddingQuote] = useState(false);

    useEffect(() => {
        if (age < 0) setAge(0);
    }, [age]);

    useEffect(() => {
        if (quoteContVis && currProspect.id.length) {
            setAddingQuote(true);
            setFirstName(currProspect.firstName);
            setLastName(currProspect.lastName);
            setAge(currProspect.age);
        };
    }, [currProspect, visibility]);
    
    if (!visibility) return null;
    return (
        <div
        className={`
            ${
                visibility ? "visible" 
                : "hidden"
            }
            fixed inset-0 z-50 flex items-center justify-center select-none
        `}>
            <div className="absolute inset-0 bg-black opacity-50" />

            <div className="relative bg-slate-50 w-[40vw] p-8 rounded-lg shadow-lg z-50">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-4">
                        {
                            addingQuote ?
                            "Add a New Quote" :
                            "Add a New Prospect"
                        }
                    </h2>

                    <div 
                    onClick={() => dispatch(setProspectModVis())}
                    className="bg-red-500 text-white h-full w-8 py-1 rounded text-center font-bold cursor-pointer">
                        X
                    </div>
                </div>

                <div className="flex justify-between w-full">
                    <input
                    disabled={addingQuote}
                    onChange={e => {
                        setFirstName(e.target.value);
                    }}
                    onBlur={() => firstName.length}
                    type="text"
                    placeholder="First Name"
                    className={`
                        ${addingQuote && "opacity-50"}
                        w-[49%] border border-gray-300 rounded p-2 mb-4    
                    `}
                    value={
                        addingQuote ?
                        firstName.toUpperCase() :
                        null
                    }
                    />
    
                    <input
                    disabled={addingQuote}
                    onChange={e => {
                        setLastName(e.target.value);
                    }}
                    onBlur={() => firstName.length}
                    type="text"
                    placeholder="Last Name"
                    className={`
                        ${addingQuote && "opacity-50"}
                        w-[49%] border border-gray-300 rounded p-2 mb-4    
                    `}
                    value={
                        addingQuote ?
                        lastName.toUpperCase() :
                        null
                    }
                    />
                </div>
            
                <input
                disabled={addingQuote}
                onChange={e => {
                    setAge(Number(e.target.value));
                }}
                type="number"
                placeholder="Age"
                className={`
                    ${addingQuote && "opacity-50"}
                    w-full border border-gray-300 rounded p-2 mb-4    
                `}
                value={
                    addingQuote ?
                    age :
                    null
                }
                />

                <div
                className={`
                    ${
                        (!auto && !life && !health && !fire) ?
                        "pb-3" :
                        (auto && !life && !health && !fire) ?
                        "pb-10" :
                        (life || health || fire) &&
                        "pb-[70px]"
                    }
                    flex flex-wrap justify-between w-full shadow rounded-2xl px-3 pt-1 mb-6
                `}>
                    <h2 className="w-full text-xl font-bold mb-4">
                        Select Lines
                    </h2>

                    <div 
                    onClick={() => {
                        if (auto) {
                            setAuto(false);
                            setDSS(false);
                            return;
                        };

                        setAuto(true);
                    }}
                    className={`
                        ${
                            auto ?
                            "opacity-100" :
                            "opacity-50 border-2 border-blue-800"
                        }
                        flex flex-wrap ml-16 justify-center bg-blue-800 text-white h-16 w-16 p-4 rounded cursor-pointer
                    `}>
                        <FaCarCrash 
                        className="w-8 h-8"
                        />

                        <div 
                        onClick={e => {
                            e.stopPropagation();
                            setDSS(!dss);
                        }}
                        className={`
                            ${
                                (auto && !dss) ? "opacity-50 translate-y-0" :
                                dss ? "opacity-100"
                                : "opacity-0 -translate-y-3"
                            }
                            transition-all duration-300 ease-out
                            bg-blue-800 text-white mt-5 px-[13px] py-[2px] rounded text-center cursor-pointer
                        `}>
                            +DSS
                        </div>
                    </div>

                    <div 
                    onClick={() => {
                        if (life) {
                            setTerm(false);
                            setGife(false);
                        };

                        setLife(!life);
                    }}
                    className={`
                        ${
                            life ?
                            "opacity-100" :
                            "opacity-50 border-2 border-green-600"
                        }
                        flex flex-wrap justify-center bg-green-600 text-white h-16 w-16 p-4 rounded cursor-pointer
                    `}>
                        <GiPirateGrave 
                        className="w-8 h-8"
                        />

                        <div 
                        onClick={e => {
                            e.stopPropagation();

                            gife && setGife(false);
                            setTerm(!term);
                        }}
                        className={`
                            ${
                                (life && !term) ? "opacity-50 translate-y-0" :
                                term ? "opacity-100"
                                : "opacity-0 -translate-y-3"
                            }
                            transition-all duration-300 ease-out
                            bg-green-600 text-white mt-5 px-[10px] py-[2px] rounded text-center cursor-pointer
                        `}>
                            +Term
                        </div>

                        <div 
                        onClick={e => {
                            e.stopPropagation();

                            term && setTerm(false);
                            setGife(!gife);
                        }}
                        className={`
                            ${
                                (life && !gife) ? "opacity-50 translate-y-0" :
                                gife ? "opacity-100"
                                : "opacity-0 -translate-y-1"
                            }
                            transition-all duration-300 ease-out
                            bg-green-600 text-white mt-[2px] px-[11.8px] py-[2px] rounded text-center cursor-pointer
                        `}>
                            +GIFE
                        </div>
                    </div>

                    <div 
                    onClick={() => {
                        if (health) {
                            setStdi(false);
                            setSuppHealth(false);
                        };

                        setHealth(!health);
                    }}
                    className={`
                        ${
                            health ?
                            "opacity-100" :
                            "opacity-50 border-2 border-pink-700"
                        }
                        flex flex-wrap justify-center bg-pink-700 text-white h-16 w-16 p-4 rounded cursor-pointer
                    `}>
                        <FaHospital 
                        className="w-8 h-8"
                        />

                        <div 
                        onClick={e => {
                            e.stopPropagation();

                            suppHealth && setSuppHealth(false);
                            setStdi(!stdi);
                        }}
                        className={`
                            ${
                                (health && !stdi) ? "opacity-50 translate-y-0" :
                                stdi ? "opacity-100"
                                : "opacity-0 -translate-y-3"
                            }
                            transition-all duration-300 ease-out
                            bg-pink-700 text-white mt-5 px-[10px] py-[2px] rounded text-center cursor-pointer
                        `}>
                            +STDI
                        </div>

                        <div 
                        onClick={e => {
                            e.stopPropagation();

                            stdi && setStdi(false);
                            setSuppHealth(!suppHealth);
                        }}
                        className={`
                            ${
                                (health && !suppHealth) ? "opacity-50 translate-y-0" :
                                suppHealth ? "opacity-100"
                                : "opacity-0 -translate-y-1"
                            }
                            transition-all duration-300 ease-out
                            bg-pink-700 text-white mt-[2px] px-[8px] py-[2px] rounded text-center cursor-pointer
                        `}>
                            +SUPP
                        </div>
                    </div>

                    <div 
                    onClick={() => {
                        if (fire) {
                            setRenters(false);
                            setHomeowners(false);
                        };

                        setFire(!fire);
                    }}
                    className={`
                        ${
                            fire ?
                            "opacity-100" :
                            "opacity-50 border-2 border-red-600"
                        }
                        mr-16 flex flex-wrap justify-center bg-red-600 text-white h-16 w-16 p-4 rounded cursor-pointer
                    `}>
                        <FaHouseFire 
                        className="w-8 h-8"
                        />

                        <div 
                        onClick={e => {
                            e.stopPropagation();

                            homeowners && setHomeowners(false);
                            setRenters(!renters);
                        }}
                        className={`
                            ${
                                (fire && !renters) ? "opacity-50 translate-y-0" :
                                renters ? "opacity-100"
                                : "opacity-0 -translate-y-3"
                            }
                            transition-all duration-300 ease-out
                            bg-red-600 text-white mt-5 px-[4px] py-[2px] rounded text-center cursor-pointer
                        `}>
                            +RNTRS
                        </div>

                        <div 
                        onClick={e => {
                            e.stopPropagation();

                            renters && setRenters(false);
                            setHomeowners(!homeowners);
                        }}
                        className={`
                            ${
                                (fire && !homeowners) ? "opacity-50 translate-y-0" :
                                homeowners ? "opacity-100"
                                : "opacity-0 -translate-y-1"
                            }
                            transition-all duration-300 ease-out
                            bg-red-600 text-white mt-[2px] px-[6px] py-[2px] rounded text-center cursor-pointer
                        `}>
                            +HOME
                        </div>
                    </div>
                </div>
            
                <div 
                onClick={() => {
                    if (firstName.length <= 2 || lastName.length <= 2 || age <= 1) {
                        setFirstName("Error: invalid entry");
                        setAge(0);

                        return;
                    };

                    dispatch(setProspectModVis());

                    if (addingQuote) {
                        dispatch(
                            addQuoteToExisting(
                                buildNewProspect(
                                    firstName, lastName, age,
                                    auto, dss,
                                    life, term, gife,
                                    health, stdi, suppHealth,
                                    fire, renters, homeowners,
                                    currProspect.id, [...currProspect.quotes]
                                )
                            )
                        );
                        
                        return;
                    };

                    dispatch(
                        addProspect(
                            buildNewProspect(
                                firstName, lastName, age,
                                auto, dss,
                                life, term, gife,
                                health, stdi, suppHealth,
                                fire, renters, homeowners
                            )
                        )
                    );
                }}
                className={`
                    ${
                        (firstName.length && lastName.length) && 
                        age > 0 && 
                        (auto || life || health || fire) ?
                        "opacity-100" :
                        "opacity-50"
                    }
                    bg-green-500 text-white px-4 py-2 rounded text-center cursor-pointer
                `}>
                    Save
                </div>
            </div>
        </div>
    )
};

export default CreateProspectQuotes;