//// [tests/cases/conformance/expressions/optionalChaining/taggedTemplateChain/taggedTemplateChain.ts] ////

//// [taggedTemplateChain.ts]
declare let a: any;
a?.`b`;

a?.`b${1}c`;

//// [taggedTemplateChain.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.freeze) {
        Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
a(__makeTemplateObject(["b"], ["b"]));
a(__makeTemplateObject(["b", "c"], ["b", "c"]), 1);
