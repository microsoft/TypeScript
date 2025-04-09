//// [tests/cases/compiler/properties.ts] ////

//// [properties.ts]
class MyClass
{
    public get Count(): number
    {
        return 42;
    }

    public set Count(value: number)
    {
        //
    }
}

//// [properties.js]
class MyClass {
    get Count() {
        return 42;
    }
    set Count(value) {
        //
    }
}
//# sourceMappingURL=properties.js.map