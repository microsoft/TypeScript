// https://github.com/microsoft/TypeScript/issues/30953
"use strict";
const x = 1;
class C {
    [x] = true;
    constructor() {
        const { a, b } = { a: 1, b: 2 };
    }
}