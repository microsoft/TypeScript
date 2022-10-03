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
var TestClass = /** @class */ (function () {
    function TestClass() {
    }
    TestClass.prototype.bar = function (x) {
    };
    TestClass.prototype.foo = function (x) {
        this.bar(x); // should not error
    };
    return TestClass;
}());
var TestClass2 = /** @class */ (function () {
    function TestClass2() {
    }
    TestClass2.prototype.bar = function (x) {
        return 0;
    };
    TestClass2.prototype.foo = function (x) {
        return this.bar(x); // should not error
    };
    return TestClass2;
}());
