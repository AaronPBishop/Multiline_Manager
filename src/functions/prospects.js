export const processQuoteData = (currProspect) => {
    const quoteData = {
        id: crypto.randomUUID(),
        auto: {
            DSS: { add: false }, price: 0
        },
        life: {
            TERM: {
                add: false,
                type: Number(0) // TERM PERIOD
            },
            GIFE: { add: false }, price: 0
        },
        health: {
            STDI: {
                add: false,
                benefit: Number(0) // MONTHLY BENEFIT TO BE PAYED
            },
            SUPP: {
                add: false,
                benefit: Number(0) // MONTHLY BENEFIT TO BE PAYED
            }, price: 0
        },
        fire: {
            RNTRS: { add: false },
            HOME: {
                add: false,
                type: "" // TENANT / NON-TENANT
            }, price: 0
        }
    };

    if (currProspect.auto === "DSS") quoteData.auto.DSS.add = true;

    if (currProspect.life === "TERM") quoteData.life.TERM.add = true;
    if (currProspect.life === "GIFE") quoteData.life.GIFE.add = true;

    if (currProspect.health === "STDI") quoteData.health.STDI.add = true
    if (currProspect.health === "SUPP") quoteData.health.SUPP.add = true;

    if (currProspect.fire === "RNTRS") quoteData.fire.RNTRS.add = true;
    if (currProspect.fire === "HOME") quoteData.fire.HOME.add = true;

    return quoteData;
};

export const buildNewProspect = (
    firstName, lastName, age,
    auto, dss,
    life, term, gife,
    health, stdi, suppHealth,
    fire, renters, homeowners
) => {

    const autoValue = auto ? (dss ? "DSS" : "NO_DSS") : "";
    const lifeValue = life ? (term ? "TERM" : gife ? "GIFE" : "") : "";
    const healthValue = health ? (stdi ? "STDI" : suppHealth ? "SUPP" : "") : "";
    const fireValue = fire ? (renters ? "RNTRS" : homeowners ? "HOME" : "") : "";

    const currProspect = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        age,
        auto: autoValue,
        life: lifeValue,
        health: healthValue,
        fire: fireValue,
        quotes: []
    };

    const quoteData = processQuoteData(currProspect);
    currProspect.quotes.push(quoteData);

    return currProspect;
};