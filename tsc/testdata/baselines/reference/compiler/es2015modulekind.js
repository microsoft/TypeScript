//// [tests/cases/compiler/es2015modulekind.ts] ////

//// [es2015modulekind.ts]
export default class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}

//// [es2015modulekind.js]
export default class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
