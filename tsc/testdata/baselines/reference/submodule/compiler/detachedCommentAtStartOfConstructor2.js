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
class TestFile {
    message;
    name;
    constructor(message) {
        var getMessage = () => message + this.name;
        this.message = getMessage();
    }
}
