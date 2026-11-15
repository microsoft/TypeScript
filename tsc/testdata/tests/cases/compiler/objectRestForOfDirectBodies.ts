// @target: es2015, es2017, es2018
// @module: commonjs
// @noTypesAndSymbols: true

let blockSum = 0;
for (const { ...outer } of [{ a: 1 }]) {
    for (const { ...inner } of [{ b: 2 }]) {
        blockSum += outer.a + inner.b;
    }
}
console.log(blockSum);

let unbracedSum = 0;
for (const { ...outer } of [{ a: 1 }])
    for (const { ...inner } of [{ b: 2 }])
        unbracedSum += outer.a + inner.b;
console.log(unbracedSum);

let functionResult = 0;
for (const { ...outer } of [{ a: 1 }]) {
    functionResult = outer.a + read({ value: 2, factor: 3 });
    function read({ value, ...rest }: { value: number; factor: number }) {
        return value + rest.factor;
    }
}
console.log(functionResult);

const closures: (() => number)[] = [];
for (const { ...outer } of [{ a: 1 }, { a: 2 }]) {
    closures.push(() => outer.a);
}
console.log(closures[0]() + closures[1]());

let continued = 0;
for (const { ...outer } of [{ a: 1 }, { a: 2 }]) {
    if (outer.a === 1) continue;
    continued += outer.a;
}
console.log(continued);
