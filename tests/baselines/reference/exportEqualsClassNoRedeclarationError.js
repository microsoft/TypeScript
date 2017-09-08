//// [exportEqualsClassNoRedeclarationError.ts]
class SomeClass {
    static get someProp(): number {
        return 0;
    }

    static set someProp(value: number) {}
}
export = SomeClass;

//// [exportEqualsClassNoRedeclarationError.js]
"use strict";
class SomeClass {
    static get someProp() {
        return 0;
    }
    static set someProp(value) { }
}
module.exports = SomeClass;
