//// [tests/cases/compiler/detachedCommentAtStartOfConstructor1.ts] ////

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
class TestFile {
    message;
    name;
    constructor(message) {
        var getMessage = () => message + this.name;
        this.message = getMessage();
    }
}
