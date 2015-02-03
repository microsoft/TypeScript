//// [templateStringsArrayTypeNotDefinedES5Mode.ts]

function f(x: TemplateStringsArray, y: number, z: number) {
}

f({}, 10, 10);

f `abcdef${ 1234 }${ 5678 }ghijkl`;

//// [templateStringsArrayTypeNotDefinedES5Mode.js]
function f(x, y, z) {
}
f({}, 10, 10);
f "abcdef" + 1234 + 5678 + "ghijkl";
