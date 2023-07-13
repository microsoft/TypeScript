//// [tests/cases/compiler/detachedCommentAtStartOfConstructor2.ts] ////

//// [detachedCommentAtStartOfConstructor2.ts]
class TestFile {
    public message: string;
    public name: string;
    constructor(message: string) {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />

        var getMessage = () => message + this.name;
        this.message = getMessage();
    }
}

//// [detachedCommentAtStartOfConstructor2.js]
var TestFile = /** @class */ (function () {
    function TestFile(message) {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        var _this = this;
        var getMessage = function () { return message + _this.name; };
        this.message = getMessage();
    }
    return TestFile;
}());
