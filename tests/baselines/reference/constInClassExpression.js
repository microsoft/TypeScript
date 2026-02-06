//// [tests/cases/compiler/constInClassExpression.ts] ////

//// [constInClassExpression.ts]
let C = class {
    const a = 4;
};


//// [constInClassExpression.js]
"use strict";
let C = class {
    constructor() {
        this.a = 4;
    }
};
