//// [duplicateLocalVariable2.js]
define(["require", "exports"], function(require, exports) {
    var TestCase = (function () {
        function TestCase(name, test, errorMessageRegEx) {
            this.name = name;
            this.test = test;
            this.errorMessageRegEx = errorMessageRegEx;
        }
        return TestCase;
    })();
    exports.TestCase = TestCase;
    var TestRunner = (function () {
        function TestRunner() {
        }
        TestRunner.arrayCompare = function (arg1, arg2) {
            return false;
        };

        TestRunner.prototype.addTest = function (test) {
        };
        return TestRunner;
    })();
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
