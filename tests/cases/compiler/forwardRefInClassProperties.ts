class Test
{
    _b = this._a; // undefined, no error/warning
    _a = 3;

    static _B = Test._A; // undefined, no error/warning
    static _A = 3;

    method()
    {
        let a = b; // Block-scoped variable 'b' used before its declaration
        let b = 3;
    }
}
