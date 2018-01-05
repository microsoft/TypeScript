//// [detachedCommentAtStartOfConstructor1.ts]
class TestFile {
    public message: string;
    public name;
    constructor(message: string) {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        var getMessage = () => message + this.name;
        this.message = getMessage();
    }
}

//// [detachedCommentAtStartOfConstructor1.js]
var TestFile = /** @class */ (function () {
    function TestFile(message) {
        var _this = this;
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        var getMessage = function () { return message + _this.name; };
        this.message = getMessage();
    }
    return TestFile;
}());
