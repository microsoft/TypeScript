//// [tests/cases/conformance/classes/members/privateNames/privateNamesAndIndexedAccess.ts] ////

//// [privateNamesAndIndexedAccess.ts]
class C {
    foo = 3;
    #bar = 3;
    constructor () {
        const ok: C["foo"] = 3;
        // not supported yet, could support in future:
        const badForNow: C[#bar] = 3;   // Error
        // will never use this syntax, already taken:
        const badAlways: C["#bar"] = 3; // Error
    }
}


//// [privateNamesAndIndexedAccess.js]
class C {
    foo = 3;
    #bar = 3;
    constructor() {
        const ok = 3;
        // not supported yet, could support in future:
        const badForNow, #bar;
        3; // Error
        // will never use this syntax, already taken:
        const badAlways = 3; // Error
    }
}
