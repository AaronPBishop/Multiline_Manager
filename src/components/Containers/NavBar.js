import { useState } from "react";
import { useSelector } from "react-redux";
import CreateProspect from "../Modals/CreateProspect";

const NavBar = () => {
    const visibilityState = useSelector(state => state.visibility);

    const [prospectModalVisible, setProspectModalVisible] = useState(false);

    return (
        <div
        className="fixed top-0 left-0 w-full h-16 shadow-md bg-white z-50 p-2 border-2 rounded">
            <CreateProspect
                visibility={prospectModalVisible}
                setVisibility={setProspectModalVisible}
            />

            <div
            onClick={() => 
                setProspectModalVisible(!prospectModalVisible)
            }
            className="bg-green-500 text-white px-4 py-2 mx-2 rounded text-center cursor-pointer font-bold w-[35%]">
                {
                    visibilityState.prospectContVisible ?
                    "New Prospect +" :
                    "New Quote +"
                }
            </div>
        </div>
    )
};

export default NavBar;