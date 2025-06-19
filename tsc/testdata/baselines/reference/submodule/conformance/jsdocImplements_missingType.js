//// [tests/cases/conformance/jsdoc/jsdocImplements_missingType.ts] ////

//// [a.js]
class A { constructor() { this.x = 0; } }
/** @implements */
class B  {
}




//// [a.d.ts]
declare class A {
    constructor();
}
/** @implements */
declare class B implements  {
}


//// [DtsFileErrors]


out/a.d.ts(5,27): error TS1097: 'implements' list cannot be empty.


==== out/a.d.ts (1 errors) ====
    declare class A {
        constructor();
    }
    /** @implements */
    declare class B implements  {
                              
!!! error TS1097: 'implements' list cannot be empty.
    }
    