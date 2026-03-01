//// [tests/cases/compiler/returnValueInSetter.ts] ////

//// [returnValueInSetter.ts]
class f {
    set x(value) {
        return null; // Should be an error
    }
}



//// [returnValueInSetter.js]
"use strict";
class f {
    set x(value) {
        return null; // Should be an error
    }
}
