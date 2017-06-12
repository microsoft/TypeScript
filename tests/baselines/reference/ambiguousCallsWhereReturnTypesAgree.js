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
var TestClass = (function () {
    function TestClass() {
    }
    var proto_1 = TestClass.prototype;
    proto_1.bar = function (x) {
    };
    proto_1.foo = function (x) {
        this.bar(x); // should not error
    };
    return TestClass;
}());
var TestClass2 = (function () {
    function TestClass2() {
    }
    var proto_2 = TestClass2.prototype;
    proto_2.bar = function (x) {
        return 0;
    };
    proto_2.foo = function (x) {
        return this.bar(x); // should not error
    };
    return TestClass2;
}());
