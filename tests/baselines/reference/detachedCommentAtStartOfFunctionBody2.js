//// [tests/cases/compiler/detachedCommentAtStartOfFunctionBody2.ts] ////

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
var TestFile = /** @class */ (function () {
    function TestFile() {
    }
    TestFile.prototype.foo = function (message) {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        /// <returns type="Function" />
        var _this = this;
        return function () { return message + _this.name; };
    };
    return TestFile;
}());
