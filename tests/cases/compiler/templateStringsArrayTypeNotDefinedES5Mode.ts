// @target: es5

function f(x: TemplateStringsArray, y: number, z: number) {
}

f({}, 10, 10);

f `abcdef${ 1234 }${ 5678 }ghijkl`;