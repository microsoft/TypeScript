//// [tests/cases/compiler/detachedCommentAtStartOfLambdaFunction1.ts] ////

//// [detachedCommentAtStartOfLambdaFunction1.ts]
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

//// [detachedCommentAtStartOfLambdaFunction1.js]
var TestFile = /** @class */ (function () {
    function TestFile() {
    }
    TestFile.prototype.foo = function (message) {
        var _this = this;
        return function () {
            var x = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                x[_i] = arguments[_i];
            }
            /// <summary>Test summary</summary>
            /// <param name="message" type="String" />
            /// <returns type="Function" />
            return message + _this.name;
        };
    };
    return TestFile;
}());
