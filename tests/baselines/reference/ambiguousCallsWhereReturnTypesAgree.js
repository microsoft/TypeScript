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
    var TestClass_prototype = TestClass.prototype;
    TestClass_prototype.bar = function (x) {
    };
    TestClass_prototype.foo = function (x) {
        this.bar(x); // should not error
    };
    return TestClass;
}());
var TestClass2 = /** @class */ (function () {
    function TestClass2() {
    }
    var TestClass2_prototype = TestClass2.prototype;
    TestClass2_prototype.bar = function (x) {
        return 0;
    };
    TestClass2_prototype.foo = function (x) {
        return this.bar(x); // should not error
    };
    return TestClass2;
}());
