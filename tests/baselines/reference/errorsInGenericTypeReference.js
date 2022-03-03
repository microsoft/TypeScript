//// [errorsInGenericTypeReference.ts]
interface IFoo<T> { }

class Foo<T> { }


// in call type arguments
class testClass1 {
    method<T>(): void { }
}
var tc1 = new testClass1();
tc1.method<{ x: V }>(); // error: could not find symbol V


// in constructor type arguments
class testClass2<T> {
}
var tc2 = new testClass2<{ x: V }>(); // error: could not find symbol V


// in method return type annotation
class testClass3 {
    testMethod1(): Foo<{ x: V }> { return null; } // error: could not find symbol V
    static testMethod2(): Foo<{ x: V }> { return null } // error: could not find symbol V
    set a(value: Foo<{ x: V }>) { } // error: could not find symbol V
    property: Foo<{ x: V }>; // error: could not find symbol V
}


// in function return type annotation
function testFunction1(): Foo<{ x: V }> { return null; } // error: could not find symbol V


// in paramter types
function testFunction2(p: Foo<{ x: V }>) { }// error: could not find symbol V


// in var type annotation
var f: Foo<{ x: V }>; // error: could not find symbol V


// in constraints
class testClass4<T extends { x: V }> { } // error: could not find symbol V

interface testClass5<T extends Foo<{ x: V }>> { } // error: could not find symbol V

class testClass6<T> {
    method<M extends { x: V }>(): void { } // error: could not find symbol V
}

interface testInterface1 {
    new <M extends { x: V }>(a: M); // error: could not find symbol V
}


// in extends clause
class testClass7 extends Foo<{ x: V }> { } // error: could not find symbol V


// in implements clause
class testClass8 implements IFoo<{ x: V }> { } // error: could not find symbol V


// in signatures
interface testInterface2 {
    new (a: Foo<{ x: V }>): Foo<{ x: V }>; //2x: error: could not find symbol V
    [x: string]: Foo<{ x: V }>; // error: could not find symbol V
    method(a: Foo<{ x: V }>): Foo<{ x: V }>; //2x: error: could not find symbol V
    property: Foo<{ x: V }>; // error: could not find symbol V
}



//// [errorsInGenericTypeReference.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
// in call type arguments
var testClass1 = /** @class */ (function () {
    function testClass1() {
    }
    testClass1.prototype.method = function () { };
    return testClass1;
}());
var tc1 = new testClass1();
tc1.method(); // error: could not find symbol V
// in constructor type arguments
var testClass2 = /** @class */ (function () {
    function testClass2() {
    }
    return testClass2;
}());
var tc2 = new testClass2(); // error: could not find symbol V
// in method return type annotation
var testClass3 = /** @class */ (function () {
    function testClass3() {
    }
    testClass3.prototype.testMethod1 = function () { return null; }; // error: could not find symbol V
    testClass3.testMethod2 = function () { return null; }; // error: could not find symbol V
    Object.defineProperty(testClass3.prototype, "a", {
        set: function (value) { } // error: could not find symbol V
        ,
        enumerable: false,
        configurable: true
    });
    return testClass3;
}());
// in function return type annotation
function testFunction1() { return null; } // error: could not find symbol V
// in paramter types
function testFunction2(p) { } // error: could not find symbol V
// in var type annotation
var f; // error: could not find symbol V
// in constraints
var testClass4 = /** @class */ (function () {
    function testClass4() {
    }
    return testClass4;
}()); // error: could not find symbol V
var testClass6 = /** @class */ (function () {
    function testClass6() {
    }
    testClass6.prototype.method = function () { }; // error: could not find symbol V
    return testClass6;
}());
// in extends clause
var testClass7 = /** @class */ (function (_super) {
    __extends(testClass7, _super);
    function testClass7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return testClass7;
}(Foo)); // error: could not find symbol V
// in implements clause
var testClass8 = /** @class */ (function () {
    function testClass8() {
    }
    return testClass8;
}()); // error: could not find symbol V
