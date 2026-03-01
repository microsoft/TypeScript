//// [tests/cases/conformance/externalModules/es6/es6modulekind.ts] ////

//// [es6modulekind.ts]
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

//// [es6modulekind.js]
export default class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
