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
export namespace a {
    const x: string;
}
export namespace b {
    const x_1: string;
    export { x_1 as x };
}
declare namespace _default {
    const x_2: string;
    export { x_2 as x };
}
export default _default;
export namespace c {
    const x_3: string;
    export { x_3 as x };
}
export namespace d {
    const e: number;
}
//// [mod2.d.ts]
export {};
