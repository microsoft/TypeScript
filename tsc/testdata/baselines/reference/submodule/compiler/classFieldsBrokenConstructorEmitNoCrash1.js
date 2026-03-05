//// [tests/cases/compiler/classFieldsBrokenConstructorEmitNoCrash1.ts] ////

//// [classFieldsBrokenConstructorEmitNoCrash1.ts]
class Test {
  prop = 42;
  constructor
}


//// [classFieldsBrokenConstructorEmitNoCrash1.js]
"use strict";
class Test {
    constructor() {
        this.prop = 42;
    }
}
