//// [tests/cases/conformance/jsdoc/moduleExportsElementAccessAssignment.ts] ////

//// [mod1.js]
exports.a = { x: "x" };
exports["b"] = { x: "x" };
exports["default"] = { x: "x" };
module.exports["c"] = { x: "x" };
module["exports"]["d"] = {};
module["exports"]["d"].e = 0;

//// [mod2.js]
const mod1 = require("./mod1");
mod1.a;
mod1.b;
mod1.c;
mod1.d;
mod1.d.e;
mod1.default;



//// [mod1.d.ts]
export declare var a: {
    x: string;
};
declare const _exported: {
    x: string;
};
export { _exported as "b" };
declare const _exported_1: {
    x: string;
};
export { _exported_1 as "default" };
declare const _exported_2: {
    x: string;
};
export { _exported_2 as "c" };
declare const _exported_3: {};
export { _exported_3 as "d" };
//// [mod2.d.ts]
export {};
