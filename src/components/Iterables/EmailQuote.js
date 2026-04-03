import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { MdMarkEmailRead } from "react-icons/md";

const EmailQuote = () => {
    const prospectName = useSelector(state => state.prospectData.currProspect?.firstName);

    const autoTotal = useSelector(state => state.prospectData.currQuote.auto?.price);
    const lifeTotal = useSelector(state => state.prospectData.currQuote.life?.price);
    const healthTotal = useSelector(state => state.prospectData.currQuote.health?.price);
    const fireTotal = useSelector(state => state.prospectData.currQuote.fire?.price);

    // const auto = useSelector(state => state.prospectData.currQuote?.auto);
    // const dss = useSelector(state => state.prospectData.currQuote.auto?.DSS);
    const liabilityBi = useSelector(state => state.prospectData.currQuote.auto?.coverages?.liabilityBi);
    const liabilityPd = useSelector(state => state.prospectData.currQuote.auto?.coverages?.liabilityPd);
    const uninsuredBi = useSelector(state => state.prospectData.currQuote.auto?.coverages?.uninsuredBi);
    const uninsuredPd = useSelector(state => state.prospectData.currQuote.auto?.coverages?.uninsuredPd);
    const comp = useSelector(state => state.prospectData.currQuote.auto?.coverages?.comp);
    const collision = useSelector(state => state.prospectData.currQuote.auto?.coverages?.collision);
    const pip = useSelector(state => state.prospectData.currQuote.auto?.coverages?.pip);

    const termAdded = useSelector(state => state.prospectData.currQuote?.life?.TERM?.add);
    // const gifeAdded = useSelector(state => state.prospectData.currQuote?.life?.GIFE?.add);

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

    useEffect(() => {
        const total =
        (autoTotal ?? 0) +
        (lifeTotal ?? 0) +
        (healthTotal ?? 0) +
        (fireTotal ?? 0);

        const roundedTotal = Math.round(total * 100) / 100;
        setTotalBundlePrice(roundedTotal.toFixed(2));
    }, [autoTotal, lifeTotal, healthTotal, fireTotal]);

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

    return (
        <div className={`
            flex justify-center items-center bg-yellow-500 p-2 rounded-lg w-16 h-15 border-b-4 border-yellow-700 cursor-pointer
        `}>
            <MdMarkEmailRead 
            onClick={async () => {
                const emailText = `
                    Hi ${prospectName},

                    Just wanted to reach out to you and provide you with some options for an auto policy here at Tyler Johns State Farm, if you’re still interested in getting a better deal. I’ve attached a copy of the quoted policies for you to review. Here’s a breakdown of the coverages:

                    [Liability – Bodily Injury] 
                    I’ve set your liability limits at $${liabilityBi?.[0]},000/per person & $${liabilityBi?.[1]},000/per accident in case you were to hurt or kill another motorist(s).

                    [Liability – Property Damage]
                    I set your property damage liability limits at $${liabilityPd},000 in case you were to damage one or multiple vehicles.

                    [Uninsured/Underinsured Motorist Coverage]
                    If you were hit by another driver who didn’t have insurance coverage and you were injured, I’ve set you up with uninsured motorist coverage, which will pay up to $${uninsuredBi?.[0]},000/per person & $${uninsuredBi?.[1]},000/per accident. Plus, we would pay up to $${uninsuredPd},000 to have your vehicle repaired.

                    [Life Insurance]
                    In addition to that, I’ve set you up with ${
                        termAdded ? "term" : "final expense"
                    } life insurance coverage. So, heaven forbid, if you were to pass away, State Farm would pay $${
                        termAdded ? "100,000" : "10,000"
                    } directly to your loved ones.

                    [Disability Coverage]
                    In addition, if you are disabled in an accident or some other way and can’t go back to work for a while, we will pay you ${stdiAdded ? stdiBenefit : suppBenefit}/mo to cover your car note/auto insurance payments.

                    [Personal Injury Protection]
                    Your personal injury protection is set at $${pip}.

                    [Comprehensive Coverage]
                    Your deductible is $${comp}.

                    [Collision Coverage]
                    Your collision deductible is $${collision}.

                    The total amount for all discussed coverages is $${totalBundlePrice}/mo.

                    Looking forward to speaking with you again soon,
                `;

                await copyToClipboard(emailText);
            }}
            className="text-white w-10 h-10"
            />
        </div>
    )
};

export default EmailQuote;