import { useDispatch } from "react-redux";

import { setQuoteContVis } from "../../store/slices/visibility.js"
import { deleteProspect, setCurrProspect } from "../../store/slices/prospectData.js"

import { FaCarCrash } from "react-icons/fa";
import { GiPirateGrave } from "react-icons/gi";
import { FaHospital } from "react-icons/fa6";
import { FaHouseFire } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const Quote = ({
    id,
    quoteData
}) => {
    const dispatch = useDispatch();

    const {
        auto: { DSS, price: autoPrice },
        life: { TERM, GIFE, price: lifePrice },
        health: { STDI, SUPP, price: healthPrice },
        fire: { RNTRS, HOME, price: firePrice }
    } = quoteData;

    const total = Object.values(quoteData).reduce(
        (sum, category) => sum + category.price, 0
    );

    return (
        <div className="flex justify-center items-center w-full h-fit text-white">
            <div 
            onClick={() => {
                // if (id) {
                //     dispatch(setCurrProspect(id));
                //     dispatch(setQuoteContVis());
                // };

                return;
            }}
            className="flex w-[97%] items-center h-20 pl-10 py-10 shadow-lg mr-1 my-2 rounded-md border-b-4 border-slate-900 text-xl bg-slate-800 cursor-pointer">
                <div className="w-[20%] font-bold">
                    {/* { firstName.toUpperCase() } { lastName.toUpperCase() } */}
                </div>

                <div className={`
                    ml-10 mr-44 font-bold
                `}>
                    ${ total }
                </div>

                <div className="flex justify-between w-[22%]">
                    <div 
                    className={`
                        ${
                            auto.length ? 
                            "opacity-100" :
                            "opacity-10"
                        }
                        flex justify-center bg-blue-800 text-white h-16 w-16 p-4 rounded
                    `}>

                        <FaCarCrash 
                        className="w-8 h-8"
                        />
                    </div>

                    <div 
                    className={`
                        ${
                            life.length ? 
                            "opacity-100" :
                            "opacity-10"
                        }
                        flex justify-center bg-green-600 text-white h-16 w-16 p-4 rounded
                    `}>

                        <GiPirateGrave 
                        className="w-8 h-8"
                        />
                    </div>

                    <div 
                    className={`
                        ${
                            health.length ? 
                            "opacity-100" :
                            "opacity-10"
                        }
                        flex justify-center bg-pink-700 text-white h-16 w-16 p-4 rounded
                    `}>

                        <FaHospital 
                        className="w-8 h-8"
                        />
                    </div>

                    <div 
                    className={`
                        ${
                            fire.length ? 
                            "opacity-100" :
                            "opacity-10"
                        }
                        flex justify-center bg-red-600 text-white h-16 w-16 p-4 rounded
                    `}>
                        <FaHouseFire 
                        className="w-8 h-8"
                        />
                    </div>
                </div>

                <div className="flex justify-end w-[38.5%] ">
                    <div 
                    onClick={e => {
                        e.stopPropagation();
                        
                        dispatch(deleteProspect(id));
                    }}
                    className="flex right-1 items-center justify-center bg-red-500 text-white w-8 h-8 mb-10 rounded-lg text-center text-[16px] cursor-pointer">
                        <FaTrashAlt />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Quote;