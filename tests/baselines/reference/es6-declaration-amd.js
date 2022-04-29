//// [es6-declaration-amd.ts]
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

//// [es6-declaration-amd.js]
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}


//// [es6-declaration-amd.d.ts]
declare class A {
    constructor();
    B(): number;
}
