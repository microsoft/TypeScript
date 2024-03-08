//// [tests/cases/conformance/externalModules/esnext/esnextmodulekind.ts] ////

//// [esnextmodulekind.ts]
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

//// [esnextmodulekind.js]
export default class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
