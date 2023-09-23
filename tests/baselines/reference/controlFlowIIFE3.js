//// [tests/cases/conformance/controlFlow/controlFlowIIFE3.ts] ////

//// [controlFlowIIFE3.ts]
class Foo {
  prop: number; // currently there's an error with strictPropertyInitialization

  constructor() {
    (async () => (this.prop = await 1))();
  }
}


//// [controlFlowIIFE3.js]
"use strict";
class Foo {
    prop; // currently there's an error with strictPropertyInitialization
    constructor() {
        (async () => (this.prop = await 1))();
    }
}
