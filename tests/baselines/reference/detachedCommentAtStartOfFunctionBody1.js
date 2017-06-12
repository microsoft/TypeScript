//// [detachedCommentAtStartOfFunctionBody1.ts]
class TestFile {
    foo(message: string): () => string {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        /// <returns type="Function" />
        return () => message + this.name;
    }
}

//// [detachedCommentAtStartOfFunctionBody1.js]
var TestFile = (function () {
    function TestFile() {
    }
    var proto_1 = TestFile.prototype;
    proto_1.foo = function (message) {
        var _this = this;
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        /// <returns type="Function" />
        return function () { return message + _this.name; };
    };
    return TestFile;
}());
