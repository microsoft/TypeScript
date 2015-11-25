// doc 2.2
// Due to Typed Objects being nonextensible and non-configurable, accessors are not allowed.

struct C {
    private _foo: string;

    get foo() { // error, getters are not allowed in struct
        return this._foo;
    }
}