import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { addProspect } from "../../store/slices/prospectData.js"

const CreateProspect = ({ 
    visibility,
    setVisibility
}) => {
    const dispatch = useDispatch();
    
    const [name, setName] = useState("");
    const [age, setAge] = useState(Number(0));

    const [nameFinished, setNameFinished] = useState(false);

    useEffect(() => {
        if (age < 0) setAge(0);
    }, [age]);
    
    if (!visibility) return null;
    return (
        <div
        className={`
            ${
                visibility ? "visible" 
                : "hidden"
            }
            fixed inset-0 z-50 flex items-center justify-center
        `}>
            <div className="absolute inset-0 bg-black opacity-50" />

            <div className="relative bg-white w-[40vw] p-8 rounded-lg shadow-lg z-50">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-4">
                        {
                            (nameFinished && name.length) && (age <= 0) ? 
                            name :
                            (nameFinished && name.length) && (age > 0) ?
                            `${name} (${age})` :
                            "New Prospect"
                        }
                    </h2>

                    <div 
                    onClick={() => setVisibility(false)}
                    className="bg-red-500 text-white h-full w-8 py-1 rounded text-center font-bold cursor-pointer">
                        X
                    </div>
                </div>

                <input
                    onChange={e => {
                        setNameFinished(false);
                        setName(e.target.value);
                    }}
                    onBlur={() => name.length && setNameFinished(true)}
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                />
            
                <input
                    onChange={e => {
                        setAge(Number(e.target.value))
                        setName(name);
                    }}
                    type="number"
                    placeholder="Age"
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                />
            
                <div 
                onClick={() => {
                    setNameFinished(true);

                    if (name.length < 4 || age <= 0) {
                        setName("Error: invalid entry");
                        setAge(0);

                        return;
                    };

                    dispatch(addProspect({
                        id: crypto.randomUUID(),
                        name,
                        age,
                        quotes: []
                    }));

                    setName("");
                    setAge(0);
                    setVisibility(false);
                }}
                className="
                    bg-green-500 text-white px-4 py-2 rounded text-center cursor-pointer
                ">
                    Save
                </div>
            </div>
        </div>
    )
};

export default CreateProspect;