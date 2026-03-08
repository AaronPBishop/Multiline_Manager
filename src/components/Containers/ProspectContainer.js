import { useSelector } from "react-redux";

import Prospect from '../Iterables/Prospect.js'

const ProspectContainer = () => {
    const prospectState = useSelector(state => state.prospectData);
    
    return (
        <div className="
            items-center h-[85%] mt-20 w-[99%] mr-[2%] shadow-xl border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg bg-slate-900 p-4 overflow-y-auto
        ">
            {
                !prospectState.prospects?.length ?
                <div className="flex justify-center items-center w-full h-full">
                    <h1 className="text-center text-white text-4xl font-bold italic">
                        Get started by adding a new prospect above.
                    </h1>
                </div> :
                [...prospectState.prospects].reverse().map(prospect => {
                    return ( 
                        <Prospect
                            id={prospect.id}
                            firstName={prospect.firstName}
                            lastName={prospect.lastName}
                            age={prospect.age}
                            auto={prospect.auto}
                            life={prospect.life}
                            health={prospect.health}
                            fire={prospect.fire}
                        />
                    )
                })
            }
        </div>
    );
};

export default ProspectContainer;