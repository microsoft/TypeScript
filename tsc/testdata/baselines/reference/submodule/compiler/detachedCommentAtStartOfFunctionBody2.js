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
class TestFile {
    foo(message) {
        return () => message + this.name;
    }
}
