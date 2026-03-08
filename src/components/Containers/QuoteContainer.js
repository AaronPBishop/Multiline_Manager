import { useSelector } from "react-redux";

import Quote from '../Iterables/Quote.js'

const QuoteContainer = () => {
    const prospectState = useSelector(state => state.prospectData);

    console.log(prospectState)
    
    return (
        <div className="
            items-center h-[90%] mt-16 w-screen
        ">
            {
                !prospectState.currProspect?.quotes?.length ?
                <div className="flex w-full h-full">
                    <div className="flex w-[80%] items-center h-20 p-2 border-2 shadow mr-1 my-2 bg-lilac-100 rounded-md text-[20px] cursor-pointer">
                        
                    </div>

                    <div className="flex w-[20%] items-center h-20 p-2 border-2 shadow mr-1 my-2 bg-lilac-100 rounded-md text-[20px] cursor-pointer">

                    </div>
                </div> 
                :
                [...prospectState.currProspect.quotes].reverse().map(prospect => {
                    return ( 
                        <Quote
                            id={prospect.id}
                        />
                    )
                })
            }
        </div>
    );
};

export default QuoteContainer;