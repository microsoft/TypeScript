//// [tests/cases/conformance/es6/templates/taggedTemplateStringsPlainCharactersThatArePartsOfEscapes01.ts] ////

//// [taggedTemplateStringsPlainCharactersThatArePartsOfEscapes01.ts]
function f(...x: any[]) {

}

f `0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 2028 2029 0085 t v f b r n`

//// [taggedTemplateStringsPlainCharactersThatArePartsOfEscapes01.js]
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
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
f(__makeTemplateObject(["0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 2028 2029 0085 t v f b r n"], ["0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 2028 2029 0085 t v f b r n"]));
