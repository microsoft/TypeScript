//// [tests/cases/compiler/objectRestForOfNestedLowering.ts] ////

//// [objectRestForOfNestedLowering.ts]
// https://github.com/microsoft/TypeScript/issues/65513

let sum = 0;
for (const {...outer} of [{a: 1}]) {
    for (const {...inner} of [{b: 2}]) {
        sum += outer.a + inner.b;
    }
}
console.log(sum);

let sum2 = 0;
for (const {...outer} of [{a: 1}])
    for (const {...inner} of [{b: 2}])
        sum2 += outer.a + inner.b;
console.log(sum2);

let result = 0;
for (const {...outer} of [{a: 1}]) {
    function read({value, ...rest}: {value: number, factor: number}) {
        return value + rest.factor;
    }
    result = outer.a + read({value: 2, factor: 3});
}
console.log(result);


//// [objectRestForOfNestedLowering.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/65513
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
let sum = 0;
for (let _a of [{ a: 1 }]) {
    const outer = __rest(_a, []);
    for (let _b of [{ b: 2 }]) {
        const inner = __rest(_b, []);
        sum += outer.a + inner.b;
    }
}
console.log(sum);
let sum2 = 0;
for (let _c of [{ a: 1 }]) {
    const outer = __rest(_c, []);
    for (let _d of [{ b: 2 }]) {
        const inner = __rest(_d, []);
        sum2 += outer.a + inner.b;
    }
}
console.log(sum2);
let result = 0;
for (let _e of [{ a: 1 }]) {
    const outer = __rest(_e, []);
    function read(_a) {
        var { value } = _a, rest = __rest(_a, ["value"]);
        return value + rest.factor;
    }
    result = outer.a + read({ value: 2, factor: 3 });
}
console.log(result);
