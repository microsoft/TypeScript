//// [tests/cases/conformance/classes/members/privateNames/privateNamesIncompatibleModifiers.ts] ////

//// [privateNamesIncompatibleModifiers.ts]
class A {
    public #foo = 3;         // Error
    private #bar = 3;        // Error
    protected #baz = 3;      // Error
    readonly #qux = 3;       // OK
    declare #what: number;   // Error

    public #fooMethod() { return  3; }         // Error
    private #barMethod() { return  3; }        // Error
    protected #bazMethod() { return  3; }      // Error
    readonly #quxMethod() { return  3; }       // Error
    declare #whatMethod()                      // Error
    async #asyncMethod() { return 1; }         //OK
    *#genMethod() { return 1; }                //OK
    async *#asyncGenMethod() { return 1; }     //OK

    public get #fooProp() { return  3; }         // Error
    public set #fooProp(value: number) {  }      // Error
    private get #barProp() { return  3; }        // Error
    private set #barProp(value: number) {  }     // Error
    protected get #bazProp() { return  3; }      // Error
    protected set #bazProp(value: number) {  }   // Error
    readonly get #quxProp() { return  3; }       // Error
    readonly set #quxProp(value: number) {  }    // Error
    declare get #whatProp()                      // Error
    declare set #whatProp(value: number)         // Error
    async get #asyncProp() { return 1; }         // Error
    async set #asyncProp(value: number) { }      // Error
}

abstract class B {
    abstract #quux = 3;      // Error
}


//// [privateNamesIncompatibleModifiers.js]
class A {
    #foo = 3; // Error
    #bar = 3; // Error
    #baz = 3; // Error
    #qux = 3; // OK
    #fooMethod() { return 3; } // Error
    #barMethod() { return 3; } // Error
    #bazMethod() { return 3; } // Error
    #quxMethod() { return 3; } // Error
    async #asyncMethod() { return 1; } //OK
    *#genMethod() { return 1; } //OK
    async *#asyncGenMethod() { return 1; } //OK
    get #fooProp() { return 3; } // Error
    set #fooProp(value) { } // Error
    get #barProp() { return 3; } // Error
    set #barProp(value) { } // Error
    get #bazProp() { return 3; } // Error
    set #bazProp(value) { } // Error
    get #quxProp() { return 3; } // Error
    set #quxProp(value) { } // Error
    async get #asyncProp() { return 1; } // Error
    async set #asyncProp(value) { } // Error
}
class B {
    #quux = 3; // Error
}
