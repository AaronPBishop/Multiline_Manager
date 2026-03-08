import { useDispatch } from "react-redux";

import { setQuoteContVis } from "../../store/slices/visibility.js"
import { deleteProspect, setCurrProspect } from "../../store/slices/prospectData.js"

const Prospect = ({
    id,
    name, 
    age
}) => {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-center items-center w-full h-fit">
            <div 
            onClick={() => {
                if (id) {
                    dispatch(setCurrProspect(id));
                    dispatch(setQuoteContVis());
                };

                return;
            }}
            className="flex w-[95%] items-center h-20 p-2 border-2 shadow mr-1 my-2 bg-lilac-100 rounded-md text-[20px] cursor-pointer">
                <div className="w-[25%] mr-1">
                    { name }
                </div>

                <div className="mr-10">
                    ({ age })
                </div>

                <div>
                    ALH
                </div>
            </div>

            <div 
            onClick={() => {
                dispatch(deleteProspect(id));
            }}
            className="bg-red-500 text-white w-10 h-16 py-4 my-2 rounded text-center font-bold cursor-pointer">
                X
            </div>
        </div>
    )
};

export default Prospect;