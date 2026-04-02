import { useSelector } from "react-redux";

import Prospect from '../Iterables/Prospect.js'

import { SiFireship } from "react-icons/si";

const ProspectContainer = () => {
    const prospectState = useSelector(state => state.prospectData);
    const prospectSearch = useSelector(state => state.prospectData.prospectSearch);
    
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
                <div>
                    <div className={`
                        ${prospectSearch.trim().length && "hidden"}
                        ${
                            ![...prospectState.prospects].filter(p => p.isBookmarked).length ?
                            "hidden" :
                            "mb-4"
                        }
                        shadow-2xl border-b-4 border-slate-950 bg-slate-950 rounded-2xl pb-4
                    `}>
                        <div className="text-red-500 text-[40px] px-5 pb-2 pt-4">
                            <SiFireship />
                        </div>

                        {
                            [...prospectState.prospects].reverse().map(prospect => {
                                if (prospect.isBookmarked) {
                                    return (
                                        <Prospect
                                            key={prospect.id}
                                            id={prospect.id}
                                            firstName={prospect.firstName}
                                            lastName={prospect.lastName}
                                            age={prospect.age}
                                            auto={prospect.auto}
                                            life={prospect.life}
                                            health={prospect.health}
                                            fire={prospect.fire}
                                            isBookmarked={prospect.isBookmarked}
                                        />
                                    );
                                };
                            
                                return null;
                            })
                        }
                    </div>

                    <div>
                        {
                            [...prospectState.prospects].reverse().map(prospect => {
                                const search = prospectSearch.trim().toLowerCase();
                            
                                if (!search.length) {
                                    if (prospect.isBookmarked) return null;

                                    return (
                                        <Prospect
                                            key={prospect.id}
                                            id={prospect.id}
                                            firstName={prospect.firstName}
                                            lastName={prospect.lastName}
                                            age={prospect.age}
                                            auto={prospect.auto}
                                            life={prospect.life}
                                            health={prospect.health}
                                            fire={prospect.fire}
                                            isBookmarked={prospect.isBookmarked}
                                        />
                                    );
                                };
                            
                                if (
                                    prospect.firstName.toLowerCase().includes(search) ||
                                    prospect.lastName.toLowerCase().includes(search) ||
                                    `${prospect.firstName.toLowerCase()} ${prospect.lastName.toLowerCase()}`.includes(search)
                                ) {
                                    return (
                                        <Prospect
                                            key={prospect.id}
                                            id={prospect.id}
                                            firstName={prospect.firstName}
                                            lastName={prospect.lastName}
                                            age={prospect.age}
                                            auto={prospect.auto}
                                            life={prospect.life}
                                            health={prospect.health}
                                            fire={prospect.fire}
                                            isBookmarked={prospect.isBookmarked}
                                        />
                                    );
                                };
                            
                                return null;
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default ProspectContainer;