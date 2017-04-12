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
var MyClass = (function () {
    function MyClass() {
    }
    Object.defineProperty(MyClass.prototype, "Count", {
        get: function () {
            return 42;
        },
        set: function (value) {
            //
        },
        enumerable: true,
        configurable: true
    });
    return MyClass;
}());
//# sourceMappingURL=properties.js.map

//// [properties.d.ts]
declare class MyClass {
    Count: number;
}
