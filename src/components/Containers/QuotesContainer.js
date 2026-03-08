import { useSelector } from "react-redux";

import Quote from '../Iterables/Quote.js'

const QuotesContainer = () => {
    const prospectState = useSelector(state => state.prospectData);

    console.log(prospectState)
    
    return (
        <div className="items-center h-[90%] mt-16 w-screen">
            <div className="flex justify-between flex-wrap w-full h-full">
                <div 
                className="flex w-[60%] items-center h-[75%] mt-10 p-2 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[20px]">
                    
                </div>

                <div 
                className="flex w-[38%] items-center h-[75%] mt-10 mr-3 p-2 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[20px]">
                    
                </div>

                <div 
                className="flex w-full items-center h-[10%] mr-3 p-2 border-b-4 border-t-2 border-slate-900 rounded-tr-lg rounded-br-lg shadow-xl mr-1 my-2 bg-slate-900 rounded-md text-[20px]">
                    
                </div>
            </div> 
        </div>
    );
};

export default QuotesContainer;