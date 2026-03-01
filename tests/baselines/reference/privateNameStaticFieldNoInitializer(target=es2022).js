//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticFieldNoInitializer.ts] ////

//// [privateNameStaticFieldNoInitializer.ts]
const C = class {
    static #x;
}

class C2 {
    static #x;
}


//// [privateNameStaticFieldNoInitializer.js]
"use strict";
const C = class {
    static #x;
};
class C2 {
    static #x;
}
