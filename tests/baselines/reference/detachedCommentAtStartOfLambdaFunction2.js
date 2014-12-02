//// [detachedCommentAtStartOfLambdaFunction2.ts]
class TestFile {
    name: string;
    foo(message: string): () => string {
        return (...x: string[]) =>
            /// <summary>Test summary</summary>
            /// <param name="message" type="String" />
            /// <returns type="Function" />

            message + this.name;
    }
}

//// [detachedCommentAtStartOfLambdaFunction2.js]
var TestFile = (function () {
    function TestFile() {
    }
    TestFile.prototype.foo = function (message) {
        var _this = this;
        return function () {
            /// <summary>Test summary</summary>
            /// <param name="message" type="String" />
            /// <returns type="Function" />
            var x = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                x[_a - 0] = arguments[_a];
            }
            return message + _this.name;
        };
    };
    return TestFile;
})();
