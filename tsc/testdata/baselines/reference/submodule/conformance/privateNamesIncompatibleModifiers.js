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
    #foo = 3;
    #bar = 3;
    #baz = 3;
    #qux = 3;
    #fooMethod() { return 3; }
    #barMethod() { return 3; }
    #bazMethod() { return 3; }
    #quxMethod() { return 3; }
    async #asyncMethod() { return 1; }
    *#genMethod() { return 1; }
    async *#asyncGenMethod() { return 1; }
    get #fooProp() { return 3; }
    set #fooProp(value) { }
    get #barProp() { return 3; }
    set #barProp(value) { }
    get #bazProp() { return 3; }
    set #bazProp(value) { }
    get #quxProp() { return 3; }
    set #quxProp(value) { }
    async get #asyncProp() { return 1; }
    async set #asyncProp(value) { }
}
class B {
    #quux = 3;
}
