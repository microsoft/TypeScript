//// [exportPrivateType.ts]
module foo {
    class C1 {
        x: string;
        y: C1;
    }
 
    class C2 {
        test() { return true; }
    }
 
    interface I1 {
        (a: string, b: string): string;
        (x: number, y: number): I1;
    }
 
    interface I2 {
        x: string;
        y: number;
    }
 
    // None of the types are exported, so per section 10.3, should all be errors
    export var e: C1;
    export var f: I1;
    export var g: C2;
    export var h: I2;
}
 
var y = foo.g; // Exported variable 'y' has or is using private type 'foo.C2'.



//// [exportPrivateType.js]
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
var foo;
(function (foo) {
    var C1 = (function () {
        function C1() {
        }
        return C1;
    }());
    var C2 = (function () {
        function C2() {
        }
        C2.prototype.test = function () { return true; };
        __names(C2.prototype, ["test"]);
        return C2;
    }());
})(foo || (foo = {}));
var y = foo.g; // Exported variable 'y' has or is using private type 'foo.C2'.
