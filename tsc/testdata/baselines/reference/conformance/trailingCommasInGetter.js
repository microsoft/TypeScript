//// [tests/cases/conformance/es7/trailingCommasInGetter.ts] ////

//// [trailingCommasInGetter.ts]
class X {
    get x(,) { return 0; }
}


//// [trailingCommasInGetter.js]
"use strict";
class X {
    get x() { return 0; }
}
