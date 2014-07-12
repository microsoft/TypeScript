//// [errorsInGenericTypeReference.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

// in call type arguments
var testClass1 = (function () {
    function testClass1() {
    }
    testClass1.prototype.method = function () {
    };
    return testClass1;
})();
var tc1 = new testClass1();
tc1.method(); // error: could not find symbol V

// in constructor type arguments
var testClass2 = (function () {
    function testClass2() {
    }
    return testClass2;
})();
var tc2 = new testClass2();

// in method return type annotation
var testClass3 = (function () {
    function testClass3() {
    }
    testClass3.prototype.testMethod1 = function () {
        return null;
    };
    testClass3.testMethod2 = function () {
        return null;
    };
    Object.defineProperty(testClass3.prototype, "a", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return testClass3;
})();

// in function return type annotation
function testFunction1() {
    return null;
}

// in paramter types
function testFunction2(p) {
}

// in var type annotation
var f;

// in constraints
var testClass4 = (function () {
    function testClass4() {
    }
    return testClass4;
})();

var testClass6 = (function () {
    function testClass6() {
    }
    testClass6.prototype.method = function () {
    };
    return testClass6;
})();

// in extends clause
var testClass7 = (function (_super) {
    __extends(testClass7, _super);
    function testClass7() {
        _super.apply(this, arguments);
    }
    return testClass7;
})(Foo);

// in implements clause
var testClass8 = (function () {
    function testClass8() {
    }
    return testClass8;
})();

