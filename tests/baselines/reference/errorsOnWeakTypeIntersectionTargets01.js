//// [errorsOnWeakTypeIntersectionTargets01.ts]
interface A {
    a: number;
}

interface B {
    b?: string;
}

// 'b' is incompatible.
export let x1: A & B = {
    a: 0,
    b: 12,
}

// 'a' is incompatible, 'b' is present and compatible.
export let x2: A & B = {
    a: "hello",
    b: "hello",
}

// 'a' is incompatible, 'b' is absent.
export let x3: A & B = {
    a: "hello",
}

// Both 'a' and 'b' are incompatible
export let x4: A & B = {
    a: "hello",
    b: 0,
}

// 'b' is compatible, 'a' is missing
export let x5: A & B = {
    b: 0,
}

// 'b' is incompatible, 'a' is missing
export let x6: A & B = {
    b: "",
}


//// [errorsOnWeakTypeIntersectionTargets01.js]
"use strict";
exports.__esModule = true;
// 'b' is incompatible.
exports.x1 = {
    a: 0,
    b: 12
};
// 'a' is incompatible, 'b' is present and compatible.
exports.x2 = {
    a: "hello",
    b: "hello"
};
// 'a' is incompatible, 'b' is absent.
exports.x3 = {
    a: "hello"
};
// Both 'a' and 'b' are incompatible
exports.x4 = {
    a: "hello",
    b: 0
};
// 'b' is compatible, 'a' is missing
exports.x5 = {
    b: 0
};
// 'b' is incompatible, 'a' is missing
exports.x6 = {
    b: ""
};
