//// [detachedCommentAtStartOfFunctionBody2.ts]
class TestFile {
    foo(message: string): () => string {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        /// <returns type="Function" />

        return () => message + this.name;
    }
}

//// [detachedCommentAtStartOfFunctionBody2.js]
var TestFile = (function () {
    function TestFile() {
    }
    TestFile.prototype.foo = function (message) {
        var _this = this;
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        /// <returns type="Function" />
        return function () { return message + _this.name; };
    };
    return TestFile;
})();
