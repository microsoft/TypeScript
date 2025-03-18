//// [tests/cases/compiler/es5-declaration-amd.ts] ////

//// [es5-declaration-amd.ts]
class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}

//// [es5-declaration-amd.js]
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
