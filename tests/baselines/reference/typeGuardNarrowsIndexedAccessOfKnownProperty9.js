//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty9.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty9.ts]
class C1 {
    private a = "a"; // ok
    private b = "b"; // ok

    private c = "c"; // error unused prop
    private d = "d"; // error unused prop

    getValue(key: "a" | "b") {
        return this[key];
    }
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty9.js]
"use strict";
class C1 {
    a = "a"; // ok
    b = "b"; // ok
    c = "c"; // error unused prop
    d = "d"; // error unused prop
    getValue(key) {
        return this[key];
    }
}
