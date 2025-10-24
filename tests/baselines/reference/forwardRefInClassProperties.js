//// [tests/cases/compiler/forwardRefInClassProperties.ts] ////

//// [forwardRefInClassProperties.ts]
class Test
{
    _b = this._a; // undefined, no error/warning
    _a = 3;

    static _B = Test._A; // undefined, no error/warning
    static _A = 3;

    method()
    {
        let a = b; // Property 'b' is used before its initialization.
        let b = 3;
    }
}


//// [forwardRefInClassProperties.js]
class Test {
    constructor() {
        this._b = this._a; // undefined, no error/warning
        this._a = 3;
    }
    method() {
        let a = b; // Property 'b' is used before its initialization.
        let b = 3;
    }
}
Test._B = Test._A; // undefined, no error/warning
Test._A = 3;
