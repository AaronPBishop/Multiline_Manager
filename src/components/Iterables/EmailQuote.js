import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { BsEnvelopeArrowUpFill } from "react-icons/bs";
import { BsEnvelopeCheckFill } from "react-icons/bs";

const EmailQuote = () => {
    const prospectName = useSelector(state => state.prospectData.currProspect?.firstName);

    const autoTotal = useSelector(state => state.prospectData.currQuote.auto?.price);
    const lifeTotal = useSelector(state => state.prospectData.currQuote.life?.price);
    const healthTotal = useSelector(state => state.prospectData.currQuote.health?.price);
    const fireTotal = useSelector(state => state.prospectData.currQuote.fire?.price);

    const liabilityBi = useSelector(state => state.prospectData.currQuote.auto?.coverages?.liabilityBi);
    const liabilityPd = useSelector(state => state.prospectData.currQuote.auto?.coverages?.liabilityPd);
    const uninsuredBi = useSelector(state => state.prospectData.currQuote.auto?.coverages?.uninsuredBi);
    const uninsuredPd = useSelector(state => state.prospectData.currQuote.auto?.coverages?.uninsuredPd);
    const comp = useSelector(state => state.prospectData.currQuote.auto?.coverages?.comp);
    const collision = useSelector(state => state.prospectData.currQuote.auto?.coverages?.collision);
    const pip = useSelector(state => state.prospectData.currQuote.auto?.coverages?.pip);

    const termAdded = useSelector(state => state.prospectData.currQuote?.life?.TERM?.add);
    const gifeAdded = useSelector(state => state.prospectData.currQuote?.life?.GIFE?.add);

    const health = useSelector(state => state.prospectData.currQuote?.health) || {
        price: 0,
        STDI: { add: false, benefit: 0 },
        SUPP: { add: false, benefit: 0 }
    };

    const stdiAdded = health.STDI?.add ?? false;
    const suppAdded = health.SUPP?.add ?? false;

    const stdiBenefit = health.STDI?.benefit ?? "";
    const suppBenefit = health.SUPP?.benefit ?? "";
    
    const [totalBundlePrice, setTotalBundlePrice] = useState(0);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const total =
        (autoTotal ?? 0) +
        (lifeTotal ?? 0) +
        (healthTotal ?? 0) +
        (fireTotal ?? 0);

        const roundedTotal = Math.round(total * 100) / 100;
        setTotalBundlePrice(roundedTotal.toFixed(2));
    }, [autoTotal, lifeTotal, healthTotal, fireTotal]);

    useEffect(() => {
        if (clicked) {
            const timer = setTimeout(() => {
                setClicked(false);
            }, 1500);

            return () => clearTimeout(timer);
        };
    }, [clicked]);

    const copyToClipboard = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        };
    };

    const formatName = (name) => {
        if (!name) return "";

        return name
            .split(" ") // split by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" "); // join back with spaces
    };

    return (
        <div 
        className={`
            ${
                clicked ?
                "bg-green-600 border-green-900" :
                "bg-yellow-500 border-yellow-700"
            }
            flex justify-center items-center p-2 rounded-lg w-16 h-15 border-b-4 cursor-pointer
        `}
        onClick={async () => {
                setClicked(true);

                const formattedName = formatName(prospectName);
                const sections = [];

                // Greeting
                sections.push(`Hi ${formattedName},\n
Just wanted to reach out to you and provide you with some options for an auto policy here at Tyler Johns State Farm, if you’re still interested in getting a better deal. I’ve attached a copy of the quoted policies for you to review. Here’s a breakdown of the coverages:\n`);

                // Liability BI
                sections.push(`[Liability – Bodily Injury] 
I’ve set your liability limits at $${liabilityBi?.[0]},000/per person & $${liabilityBi?.[1]},000/per accident in case you were to hurt or kill another motorist(s).\n`);

                // Liability PD
                sections.push(`[Liability – Property Damage]
I set your property damage liability limits at $${liabilityPd},000 in case you were to damage one or multiple vehicles.\n`);

                // Uninsured/Underinsured
                if ((uninsuredBi?.[0] || uninsuredBi?.[1] || uninsuredPd) > 0) {
                    sections.push(`[Uninsured/Underinsured Motorist Coverage]
If you were hit by another driver who didn’t have insurance coverage and you were injured, I’ve set you up with uninsured motorist coverage, which will pay up to $${uninsuredBi?.[0]},000/per person & $${uninsuredBi?.[1]},000/per accident for your medical expenses and/or pain & suffering. Plus, we would pay up to $${uninsuredPd},000 to have your vehicle repaired.\n`);
                };

                // Life Insurance
                if (termAdded || gifeAdded) {
                    sections.push(`[Life Insurance]
In addition to that, I’ve set you up with ${termAdded ? "term" : "final expense"} life insurance coverage which does get you a better deal on your auto policy. So, heaven forbid, if you were to pass away in an accident or some other way, State Farm would pay $${termAdded ? "100,000" : "10,000"} directly to a spouse, family member, or loved one of your choosing. Bundling with this coverage gives you a direct discount on your auto insurance and is included in the final overall price.\n`);
                };

                // Disability Coverage
                if (stdiAdded || suppAdded) {
                    sections.push(`[Disability Coverage]
In addition, if you are disabled in an accident or some other way and can’t go back to work for a while, we will pay you $${stdiAdded ? stdiBenefit : suppBenefit}/mo to help cover your car note, insurance payments, or cost of living.\n`);
                };

                // PIP
                if (pip > 0) {
                    sections.push(`[Personal Injury Protection]
Your personal injury protection is set at $${pip} in case you or any passenger were injured in an accident, whether you are at fault or not, to help cover your health insurance deductible, and/or lost wages.\n`);
                };

                // Comprehensive
                if (comp > 0) {
                    sections.push(`[Comprehensive Coverage]
Your comprehensive deductible is $${comp}, so if your car is flooded or stolen, you would pay the first $${comp} and State Farm would pay for the rest.\n`);
                };

                // Collision
                if (collision > 0) {
                    sections.push(`[Collision Coverage]
If you hit another car or debris on the road, your collision deductible is $${collision} and State Farm would pay for the rest.\n`);
                };

                // Towing + Rental (always present)
                sections.push(`[Towing + Rental]
Your policy also includes coverage for car rental & towing expenses if your vehicle has to go to a shop for repair.\n`);

                // Total
                sections.push(`The total amount for all discussed coverages is $${totalBundlePrice}/mo. Please let me know how that compares to your current price/coverage, and if you’d like to set up a call to discuss options further or adjust these coverages.\n
Looking forward to speaking with you again soon,`);

                const emailText = sections.join("\n");
                await copyToClipboard(emailText);
            }}>
            
            {
                clicked ?
                <BsEnvelopeCheckFill
                className={`
                    text-white w-10 h-10 transform ${
                        clicked ? "animate-bounce_small" : "scale-0"
                    }
                `}
                /> :
                <BsEnvelopeArrowUpFill 
                className="text-white w-10 h-10"
                />
            }
        </div>
    )
};

export default EmailQuote;