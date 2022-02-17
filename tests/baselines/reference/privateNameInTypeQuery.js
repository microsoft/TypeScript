//// [privateNameInTypeQuery.ts]
class C {
    #a = 'a';

    constructor() {
        const a: typeof this.#a = ''; // Ok
        const b: typeof this.#a = 1;  // Error
    }
}

const c = new C();
const a: typeof c.#a = '';


//// [privateNameInTypeQuery.js]
"use strict";
class C {
    #a = 'a';
    constructor() {
        const a = ''; // Ok
        const b = 1; // Error
    }
}
const c = new C();
const a = '';
