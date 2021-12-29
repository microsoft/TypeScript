//// [narrowingTypeofFunction.ts]
type Meta = { foo: string }
interface F { (): string }

const x = (a: (F & Meta) | string) => {
    if (typeof a === "function") {
        // ts.version >= 4.3.5: never -- unexpected
        // ts.version <= 4.2.3: F & Meta -- expected
        a;
    }
    else {
        a;
    }
}

//// [narrowingTypeofFunction.js]
"use strict";
var x = function (a) {
    if (typeof a === "function") {
        // ts.version >= 4.3.5: never -- unexpected
        // ts.version <= 4.2.3: F & Meta -- expected
        a;
    }
    else {
        a;
    }
};
