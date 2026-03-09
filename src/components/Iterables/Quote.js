import { useDispatch } from "react-redux";

import { deleteProspect, setCurrQuote } from "../../store/slices/prospectData.js"

import { FaCarCrash } from "react-icons/fa";
import { GiPirateGrave } from "react-icons/gi";
import { FaHospital } from "react-icons/fa6";
import { FaHouseFire } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const Quote = ({ quoteData }) => {
    const dispatch = useDispatch();

    const {
        id,
        auto = {},
        life = {},
        health = {},
        fire = {}
    } = quoteData || {};

    const { DSS = {}, price: autoPrice = 0 } = auto;
    const { TERM = {}, GIFE = {}, price: lifePrice = 0 } = life;
    const { STDI = {}, SUPP = {}, price: healthPrice = 0 } = health;
    const { RNTRS = {}, HOME = {}, price: firePrice = 0 } = fire;

    const autoActive = true;
    const lifeActive = TERM?.add || GIFE?.add;
    const healthActive = STDI?.add || SUPP?.add;
    const fireActive = RNTRS?.add || HOME?.add;

    const total = autoPrice + lifePrice + healthPrice + firePrice;

    return (
        <div className="flex justify-center items-center w-full h-fit text-white">
            <div 
            onClick={() => {
                if (id) dispatch(setCurrQuote(id));
            }}
            className="flex w-full items-center h-20 pl-10 py-10 shadow-lg my-2 rounded-lg border-b-4 border-slate-900 text-xl bg-emerald-700 cursor-pointer">

                <div className={`
                    font-bold mr-14
                `}>
                    ${ total }
                </div>

                <div className="flex justify-evenly w-[65%]">
                    <div 
                    className={`
                        ${
                            autoActive ? 
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
                            lifeActive ? 
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
                            healthActive ? 
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
                            fireActive ? 
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

                <div className="flex justify-end w-[19%]">
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