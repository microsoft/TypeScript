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
var TestFile = (function () {
    function TestFile() {
    }
    TestFile.prototype.foo = function (message) {
        var _this = this;
        return function () { return message + _this.name; };
    };
    return TestFile;
})();
