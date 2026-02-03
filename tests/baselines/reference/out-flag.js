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
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    // my function comments
    MyClass.prototype.Count = function () {
        return 42;
    };
    MyClass.prototype.SetCount = function (value) {
        //
    };
    return MyClass;
}());
//# sourceMappingURL=out-flag.js.map

//// [out-flag.d.ts]
declare class MyClass {
    Count(): number;
    SetCount(value: number): void;
}
