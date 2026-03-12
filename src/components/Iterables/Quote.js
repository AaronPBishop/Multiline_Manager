import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { deleteProspect, setCurrQuote, persistQuoteData } from "../../store/slices/prospectData.js"

import { FaCarCrash } from "react-icons/fa";
import { GiPirateGrave } from "react-icons/gi";
import { FaHospital } from "react-icons/fa6";
import { FaHouseFire } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const Quote = ({ quoteId }) => {
    const dispatch = useDispatch();

    const currQuote = useSelector(state => state.prospectData.currQuote);

    const storedQuote = useSelector(state =>
        state.prospectData.currProspect?.quotes?.find(q => q.id === quoteId)
    );

    const [autoPrice, setAutoPrice] = useState(0);
    const [lifePrice, setLifePrice] = useState(0);
    const [healthPrice, setHealthPrice] = useState(0);
    const [firePrice, setFirePrice] = useState(0);

    const [autoActive, setAutoActive] = useState(false);
    const [lifeActive, setLifeActive] = useState(false);
    const [healthActive, setHealthActive] = useState(false);
    const [fireActive, setFireActive] = useState(false);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!currQuote || currQuote.id !== quoteId) return;

        const quote = currQuote;

        setAutoPrice(quote.auto?.price ?? 0);
        setLifePrice(quote.life?.price ?? 0);
        setHealthPrice(quote.health?.price ?? 0);
        setFirePrice(quote.fire?.price ?? 0);

        setAutoActive(quote.auto?.add ?? false);
        setLifeActive(quote.life?.TERM?.add || quote.life?.GIFE?.add || false);
        setHealthActive(quote.health?.STDI?.add || quote.health?.SUPP?.add || false);
        setFireActive(quote.fire?.RNTRS?.add || quote.fire?.HOME?.add || false);

        const total =
            (quote.auto?.price ?? 0) +
            (quote.life?.price ?? 0) +
            (quote.health?.price ?? 0) +
            (quote.fire?.price ?? 0);

        setTotal(Math.round((total + Number.EPSILON) * 100) / 100);

    }, [currQuote, quoteId]);

    return (
        <div
        onClick={() => {
            dispatch(setCurrQuote(quoteId));
            dispatch(persistQuoteData());
        }}
        key={quoteId}
        className="flex justify-center items-center w-full h-fit text-white"
        >
            <div
                onClick={() => {
                    if (quoteId) dispatch(setCurrQuote(quoteId));
                }}
                className="flex w-full items-center h-20 pl-4 py-10 shadow-lg my-2 rounded-lg border-b-4 border-slate-900 text-xl bg-emerald-700 cursor-pointer"
            >

                <div className="font-bold mr-4">
                    ${total.toFixed(2)}
                </div>

                <div className="flex justify-evenly w-full">

                    <div className={`${autoActive ? "opacity-100" : "opacity-10"} flex justify-center bg-blue-800 text-white h-14 w-14 p-4 rounded`}>
                        <FaCarCrash className="w-6 h-6" />
                    </div>

                    <div className={`${lifeActive ? "opacity-100" : "opacity-10"} flex justify-center bg-green-600 text-white h-14 w-14 p-4 rounded`}>
                        <GiPirateGrave className="w-6 h-6" />
                    </div>

                    <div className={`${healthActive ? "opacity-100" : "opacity-10"} flex justify-center bg-pink-700 text-white h-14 w-14 p-4 rounded`}>
                        <FaHospital className="w-6 h-6" />
                    </div>

                    <div className={`${fireActive ? "opacity-100" : "opacity-10"} flex justify-center bg-red-600 text-white h-14 w-14 p-4 rounded`}>
                        <FaHouseFire className="w-6 h-6" />
                    </div>

                </div>

                <div className="flex justify-end w-[19%]">
                    <div
                        onClick={e => {
                            e.stopPropagation();
                            dispatch(deleteProspect(quoteId));
                        }}
                        className="flex relative right-1 items-center justify-center bg-red-500 text-white w-8 h-8 mb-10 rounded-lg text-center text-[16px] cursor-pointer"
                    >
                        <FaTrashAlt />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Quote;