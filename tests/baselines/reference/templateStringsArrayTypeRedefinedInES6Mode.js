//// [templateStringsArrayTypeRedefinedInES6Mode.ts]
class TemplateStringsArray {
}

function f(x: TemplateStringsArray, y: number, z: number) {
}

f({}, 10, 10);

f `abcdef${ 1234 }${ 5678 }ghijkl`;

//// [templateStringsArrayTypeRedefinedInES6Mode.js]
class TemplateStringsArray {
}
function f(x, y, z) {
}
f({}, 10, 10);
f `abcdef${1234}${5678}ghijkl`;
