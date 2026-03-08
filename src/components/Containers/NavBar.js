import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setProspectContVis } from "../../store/slices/visibility.js"

import { TbHomeMove } from "react-icons/tb";
import { BsSuitSpadeFill } from "react-icons/bs";

import CreateProspect from "../Modals/CreateProspect";

const NavBar = () => {
    const visibilityState = useSelector(state => state.visibility);

    const dispatch = useDispatch();

    const [prospectModalVisible, setProspectModalVisible] = useState(false);

    useEffect(() => {
        console.log(visibilityState)
        console.log(visibilityState.prospectContVisible)
    }, [prospectModalVisible]);

    return (
        <div
        className="flex justify-between items-center fixed top-0 left-0 w-full h-20 shadow-xl bg-slate-900 z-50 p-3 border-b-1 border-slate-700">
            <CreateProspect
            visibility={prospectModalVisible}
            setVisibility={setProspectModalVisible}
            key={Date.now()}
            />

            <div
            onClick={() => setProspectModalVisible(!prospectModalVisible)}
            className="flex h-full justify-between bg-emerald-600 text-xl text-white px-8 py-4 mx-6 rounded-md border-b-4 border-emerald-900 shadow-lg text-center flex align-center items-center cursor-pointer font-bold w-[50%]">
                {
                    visibilityState?.prospectContVis ?
                    "New Prospect" :
                    "New Quote"
                }

                <BsSuitSpadeFill 
                className="text-slate-900 text-[35px]"
                />
            </div>

            <TbHomeMove 
            onClick={() => {
                dispatch(setProspectContVis());
            }}
            className="text-white w-14 h-14 mr-5 cursor-pointer"
            />
        </div>
    )
};

export default NavBar;