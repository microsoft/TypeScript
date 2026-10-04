//// [tests/cases/compiler/es2015modulekindWithES6Target.ts] ////

//// [es2015modulekindWithES6Target.ts]
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

//// [es2015modulekindWithES6Target.js]
export default class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
