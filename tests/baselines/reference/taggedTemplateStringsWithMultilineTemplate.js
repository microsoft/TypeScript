//// [tests/cases/compiler/taggedTemplateStringsWithMultilineTemplate.ts] ////

//// [taggedTemplateStringsWithMultilineTemplate.ts]
function f(...args: any[]): void {
}

f `
\

`;

//// [taggedTemplateStringsWithMultilineTemplate.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.freeze) {
        Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
function f() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
f(__makeTemplateObject(["\n\n"], ["\n\\\n\n"]));
