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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
// my class comments
var MyClass = (function () {
    function MyClass() {
    }
    // my function comments
    MyClass.prototype.Count = function () {
        return 42;
    };
    MyClass.prototype.SetCount = function (value) {
        //
    };
    __names(MyClass.prototype, ["Count", "SetCount"]);
    return MyClass;
}());
//# sourceMappingURL=out-flag.js.map

//// [out-flag.d.ts]
declare class MyClass {
    Count(): number;
    SetCount(value: number): void;
}
