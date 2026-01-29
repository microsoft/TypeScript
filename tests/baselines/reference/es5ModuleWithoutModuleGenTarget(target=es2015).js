//// [tests/cases/compiler/es5ModuleWithoutModuleGenTarget.ts] ////

//// [es5ModuleWithoutModuleGenTarget.ts]
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

//// [es5ModuleWithoutModuleGenTarget.js]
export class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
