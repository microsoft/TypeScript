//// [tests/cases/compiler/objectRestForOfDirectBodies.ts] ////

//// [objectRestForOfDirectBodies.ts]
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


//// [objectRestForOfDirectBodies.js]
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
let blockSum = 0;
for (let _a of [{ a: 1 }]) {
    const outer = __rest(_a, []);
    for (let _b of [{ b: 2 }]) {
        const inner = __rest(_b, []);
        blockSum += outer.a + inner.b;
    }
}
console.log(blockSum);
let unbracedSum = 0;
for (let _c of [{ a: 1 }]) {
    const outer = __rest(_c, []);
    for (let _d of [{ b: 2 }]) {
        const inner = __rest(_d, []);
        unbracedSum += outer.a + inner.b;
    }
}
console.log(unbracedSum);
let functionResult = 0;
for (let _e of [{ a: 1 }]) {
    const outer = __rest(_e, []);
    functionResult = outer.a + read({ value: 2, factor: 3 });
    function read(_a) {
        var { value } = _a, rest = __rest(_a, ["value"]);
        return value + rest.factor;
    }
}
console.log(functionResult);
const closures = [];
for (let _f of [{ a: 1 }, { a: 2 }]) {
    const outer = __rest(_f, []);
    closures.push(() => outer.a);
}
console.log(closures[0]() + closures[1]());
let continued = 0;
for (let _g of [{ a: 1 }, { a: 2 }]) {
    const outer = __rest(_g, []);
    if (outer.a === 1)
        continue;
    continued += outer.a;
}
console.log(continued);
