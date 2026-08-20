//// [tests/cases/compiler/protoInIndexer.ts] ////

//// [protoInIndexer.ts]
class X {
    constructor() {
        this['__proto__'] = null; // used to cause ICE
    }
}

//// [protoInIndexer.js]
"use strict";
class X {
    constructor() {
        this['__proto__'] = null; // used to cause ICE
    }
}
