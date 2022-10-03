//// [taggedTemplateChain.ts]
declare let a: any;
a?.`b`;

a?.`b${1}c`;

//// [taggedTemplateChain.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
a(__makeTemplateObject(["b"], ["b"]));
a(__makeTemplateObject(["b", "c"], ["b", "c"]), 1);
