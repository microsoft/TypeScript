//// [tests/cases/compiler/emitThisInObjectLiteralGetter.ts] ////

//// [emitThisInObjectLiteralGetter.ts]
const example = {
    get foo() {
        return item => this.bar(item);
    }
};


//// [emitThisInObjectLiteralGetter.js]
"use strict";
const example = {
    get foo() {
        return item => this.bar(item);
    }
};
