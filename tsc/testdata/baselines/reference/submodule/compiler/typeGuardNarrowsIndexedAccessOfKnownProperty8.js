//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty8.ts] ////

//// [a.ts]
export const key = "a";

//// [b.ts]
import * as a from "./a";
export class C {
    [a.key]: string;

    constructor() {
        this[a.key] = "foo";
    }
}


//// [a.js]
export const key = "a";
//// [b.js]
import * as a from "./a";
export class C {
    [a.key];
    constructor() {
        this[a.key] = "foo";
    }
}
