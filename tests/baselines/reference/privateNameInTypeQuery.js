//// [tests/cases/conformance/classes/members/privateNames/privateNameInTypeQuery.ts] ////

//// [privateNameInTypeQuery.ts]
class C {
    a = 'a';
    #b = 'b';

    constructor() {
        const a: typeof this['a'] = 1;
        const b: typeof this['a'] = ''; // ok

        const c: typeof this[#b]  = 1;
        const d: typeof this[#b] = '';  // ok
    }
}

const c = new C();
const a: typeof c['a'] = '';
const b: typeof c[#b]  = '';


//// [privateNameInTypeQuery.js]
"use strict";
class C {
    a = 'a';
    #b = 'b';
    constructor() {
        const a = 1;
        const b = ''; // ok
        const c = 1;
        const d = ''; // ok
    }
}
const c = new C();
const a = '';
const b = '';
