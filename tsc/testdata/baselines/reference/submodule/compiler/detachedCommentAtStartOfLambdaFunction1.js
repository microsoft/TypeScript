//// [tests/cases/compiler/detachedCommentAtStartOfLambdaFunction1.ts] ////

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
class TestFile {
    name;
    foo(message) {
        return (...x) => message + this.name;
    }
}
