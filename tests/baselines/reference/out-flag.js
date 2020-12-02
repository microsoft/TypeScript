//// [out-flag.ts]
//// @out: bin\

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
//// @out: bin\
// my class comments
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    var MyClass_prototype = MyClass.prototype;
    // my function comments
    MyClass_prototype.Count = function () {
        return 42;
    };
    MyClass_prototype.SetCount = function (value) {
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
