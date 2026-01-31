//// [tests/cases/compiler/templateStringsArrayTypeDefinedInES5Mode.ts] ////

//// [templateStringsArrayTypeDefinedInES5Mode.ts]
class TemplateStringsArray {
}

function f(x: TemplateStringsArray, y: number, z: number) {
}

f({}, 10, 10);

f `abcdef${ 1234 }${ 5678 }ghijkl`;

//// [templateStringsArrayTypeDefinedInES5Mode.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var TemplateStringsArray = /** @class */ (function () {
    function TemplateStringsArray() {
    }
    return TemplateStringsArray;
}());
function f(x, y, z) {
}
f({}, 10, 10);
f(__makeTemplateObject(["abcdef", "", "ghijkl"], ["abcdef", "", "ghijkl"]), 1234, 5678);
