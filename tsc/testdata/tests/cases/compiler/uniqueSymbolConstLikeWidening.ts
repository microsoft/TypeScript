// @target: es2015
// @noEmit: true

const us = Symbol.match;
const us2 = us;
let widened = us;
let asserted = us as const;

let sameAsSource: typeof us = us2;
let sameAsAsserted: typeof us = asserted;
let symbolFromConst: symbol = us2;
let symbolFromAsserted: symbol = asserted;
