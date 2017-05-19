//// [templateStringsArrayTypeDefinedInES5Mode.ts]
class TemplateStringsArray {
}

function f(x: TemplateStringsArray, y: number, z: number) {
}

f({}, 10, 10);

f `abcdef${ 1234 }${ 5678 }ghijkl`;

//// [templateStringsArrayTypeDefinedInES5Mode.js]
var TemplateStringsArray = (function () {
    function TemplateStringsArray() {
    }
    return TemplateStringsArray;
}());
function f(x, y, z) {
}
f({}, 10, 10);
(_a = ["abcdef", "", "ghijkl"], _a.raw = ["abcdef", "", "ghijkl"], f(_a, 1234, 5678));
var _a;
