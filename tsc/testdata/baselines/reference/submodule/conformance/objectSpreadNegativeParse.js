//// [tests/cases/conformance/types/spread/objectSpreadNegativeParse.ts] ////

//// [objectSpreadNegativeParse.ts]
let o7 = { ...o? };
let o8 = { ...*o };
let o9 = { ...matchMedia() { }};
let o10 = { ...get x() { return 12; }};


//// [objectSpreadNegativeParse.js]
let o7 = { ...o ?  :  };
let o8 = { ... * o };
let o9 = { ...matchMedia() }, {};
;
let o10 = { ...get, x() { return 12; } };
