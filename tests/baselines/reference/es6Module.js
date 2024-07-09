//// [tests/cases/compiler/es6Module.ts] ////

//// [es6Module.ts]
export class A
{
    constructor ()
    {
    }

    public B()
    {
        return 42;
    }
}

//// [es6Module.js]
export class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
