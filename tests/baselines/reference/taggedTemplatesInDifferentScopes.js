//// [tests/cases/compiler/taggedTemplatesInDifferentScopes.ts] ////

//// [taggedTemplatesInDifferentScopes.ts]
export function tag(parts: TemplateStringsArray, ...values: any[]) {
    return parts[0];
}
function foo() {
    tag `foo`;
    tag `foo2`;
}

function bar() {
    tag `bar`;
    tag `bar2`;
}

foo();
bar();


//// [taggedTemplatesInDifferentScopes.js]
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tag = tag;
function tag(parts) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return parts[0];
}
function foo() {
    tag(templateObject_1 || (templateObject_1 = __makeTemplateObject(["foo"], ["foo"])));
    tag(templateObject_2 || (templateObject_2 = __makeTemplateObject(["foo2"], ["foo2"])));
}
function bar() {
    tag(templateObject_3 || (templateObject_3 = __makeTemplateObject(["bar"], ["bar"])));
    tag(templateObject_4 || (templateObject_4 = __makeTemplateObject(["bar2"], ["bar2"])));
}
foo();
bar();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
