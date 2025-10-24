//// [tests/cases/compiler/duplicateLocalVariable2.ts] ////

//// [duplicateLocalVariable2.ts]
export class TestCase {
    constructor (public name: string, public test: ()=>boolean, public errorMessageRegEx?: string) {
    }
}
export class TestRunner { 
    static arrayCompare(arg1: any[], arg2: any[]): boolean {
        return false;
    }

    public addTest(test: TestCase) {
    }
}

export var tests: TestRunner = (function () {
    var testRunner = new TestRunner();

    testRunner.addTest(new TestCase("Check UTF8 encoding",
        function () {
            var fb: any;
            fb.writeUtf8Bom();
            var chars = [0x0054];
            for (var i in chars) {
                fb.writeUtf8CodePoint(chars[i]);
            }
            fb.index = 0;
            var bytes = [];
            for (var i = 0; i < 14; i++) {
                bytes.push(fb.readByte());
            }
            var expected = [0xEF];
            return TestRunner.arrayCompare(bytes, expected);
        }));

    return testRunner;
})();

//// [duplicateLocalVariable2.js]
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tests = exports.TestRunner = exports.TestCase = void 0;
    class TestCase {
        constructor(name, test, errorMessageRegEx) {
            this.name = name;
            this.test = test;
            this.errorMessageRegEx = errorMessageRegEx;
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tests = exports.TestRunner = exports.TestCase = void 0;
    var TestCase = /** @class */ (function () {
        function TestCase(name, test, errorMessageRegEx) {
            this.name = name;
            this.test = test;
            this.errorMessageRegEx = errorMessageRegEx;
=======
var TestCase = /** @class */ (function () {
    function TestCase(name, test, errorMessageRegEx) {
        this.name = name;
        this.test = test;
        this.errorMessageRegEx = errorMessageRegEx;
    }
    return TestCase;
}());
export { TestCase };
var TestRunner = /** @class */ (function () {
    function TestRunner() {
    }
    TestRunner.arrayCompare = function (arg1, arg2) {
        return false;
    };
    TestRunner.prototype.addTest = function (test) {
    };
    return TestRunner;
}());
export { TestRunner };
export var tests = (function () {
    var testRunner = new TestRunner();
    testRunner.addTest(new TestCase("Check UTF8 encoding", function () {
        var fb;
        fb.writeUtf8Bom();
        var chars = [0x0054];
        for (var i in chars) {
            fb.writeUtf8CodePoint(chars[i]);
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
        }
<<<<<<< HEAD
    }
    exports.TestCase = TestCase;
    class TestRunner {
        static arrayCompare(arg1, arg2) {
            return false;
        }
        addTest(test) {
        }
    }
    exports.TestRunner = TestRunner;
    exports.tests = (function () {
        var testRunner = new TestRunner();
        testRunner.addTest(new TestCase("Check UTF8 encoding", function () {
            var fb;
            fb.writeUtf8Bom();
            var chars = [0x0054];
            for (var i in chars) {
                fb.writeUtf8CodePoint(chars[i]);
            }
            fb.index = 0;
            var bytes = [];
            for (var i = 0; i < 14; i++) {
                bytes.push(fb.readByte());
            }
            var expected = [0xEF];
            return TestRunner.arrayCompare(bytes, expected);
        }));
        return testRunner;
    })();
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
        return TestCase;
    }());
    exports.TestCase = TestCase;
    var TestRunner = /** @class */ (function () {
        function TestRunner() {
        }
        TestRunner.arrayCompare = function (arg1, arg2) {
            return false;
        };
        TestRunner.prototype.addTest = function (test) {
        };
        return TestRunner;
    }());
    exports.TestRunner = TestRunner;
    exports.tests = (function () {
        var testRunner = new TestRunner();
        testRunner.addTest(new TestCase("Check UTF8 encoding", function () {
            var fb;
            fb.writeUtf8Bom();
            var chars = [0x0054];
            for (var i in chars) {
                fb.writeUtf8CodePoint(chars[i]);
            }
            fb.index = 0;
            var bytes = [];
            for (var i = 0; i < 14; i++) {
                bytes.push(fb.readByte());
            }
            var expected = [0xEF];
            return TestRunner.arrayCompare(bytes, expected);
        }));
        return testRunner;
    })();
});
=======
        fb.index = 0;
        var bytes = [];
        for (var i = 0; i < 14; i++) {
            bytes.push(fb.readByte());
        }
        var expected = [0xEF];
        return TestRunner.arrayCompare(bytes, expected);
    }));
    return testRunner;
})();
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
