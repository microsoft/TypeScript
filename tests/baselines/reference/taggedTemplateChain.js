//// [taggedTemplateChain.ts]
declare let a: any;
a?.`b`;

a?.`b${1}c`;

//// [taggedTemplateChain.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
a(templateObject_177671_1 || (templateObject_177671_1 = __makeTemplateObject(["b"], ["b"])));
a(templateObject_254931998_1 || (templateObject_254931998_1 = __makeTemplateObject(["b", "c"], ["b", "c"])), 1);
var templateObject_177671_1, templateObject_254931998_1;
