//// [ambiguousCallsWhereReturnTypesAgree.ts]
class TestClass {
    public bar(x: string): void;
    public bar(x: string[]): void;
    public bar(x: any): void {
        
    }
 
    public foo(x: string): void;
    public foo(x: string[]): void;
    public foo(x: any): void {
        this.bar(x); // should not error
    }
}

class TestClass2 {
    public bar(x: string): number;
    public bar(x: string[]): number;
    public bar(x: any): number {
        return 0;
    }
 
    public foo(x: string): number;
    public foo(x: string[]): number;
    public foo(x: any): number {
        return this.bar(x); // should not error
    }
}


//// [ambiguousCallsWhereReturnTypesAgree.js]
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
var TestClass = (function () {
    function TestClass() {
    }
    TestClass.prototype.bar = function (x) {
    };
    TestClass.prototype.foo = function (x) {
        this.bar(x); // should not error
    };
    __names(TestClass.prototype, ["bar", "foo"]);
    return TestClass;
}());
var TestClass2 = (function () {
    function TestClass2() {
    }
    TestClass2.prototype.bar = function (x) {
        return 0;
    };
    TestClass2.prototype.foo = function (x) {
        return this.bar(x); // should not error
    };
    __names(TestClass2.prototype, ["bar", "foo"]);
    return TestClass2;
}());
