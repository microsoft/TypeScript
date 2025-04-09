//// [tests/cases/compiler/out-flag.ts] ////

//// [out-flag.ts]
//// @outFile: bin\

// my class comments
class MyClass
{
    // my function comments
    public Count(): number
    {
        return 42;
    }

    public SetCount(value: number)
    {
        //
    }
}


//// [out-flag.js]
//// @outFile: bin\
// my class comments
class MyClass {
    // my function comments
    Count() {
        return 42;
    }
    SetCount(value) {
        //
    }
}
//# sourceMappingURL=out-flag.js.map