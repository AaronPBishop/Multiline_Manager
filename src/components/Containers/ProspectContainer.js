import { useSelector } from "react-redux";

import Prospect from '../Iterables/Prospect.js'

const ProspectContainer = () => {
    const prospectState = useSelector(state => state.prospectData);
    
    return (
        <div className="
            items-center h-[90%] mt-16 w-screen
        ">
            {
                !prospectState.prospects?.length ?
                "Start by adding a new prospect..." :
                [...prospectState.prospects].reverse().map(prospect => {
                    return ( 
                        <Prospect
                            id={prospect.id}
                            name={prospect.name}
                            age={prospect.age}
                        />
                    )
                })
            }
        </div>
    );
};

export default ProspectContainer;