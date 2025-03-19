//// [tests/cases/compiler/detachedCommentAtStartOfFunctionBody1.ts] ////

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
class TestFile {
    foo(message) {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        /// <returns type="Function" />
        return () => message + this.name;
    }
}
