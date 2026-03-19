export const roundToTwo = (num) =>
    Math.round((num + Number.EPSILON) * 100) / 100;