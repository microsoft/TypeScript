// @strict: true
// @target: esnext

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
