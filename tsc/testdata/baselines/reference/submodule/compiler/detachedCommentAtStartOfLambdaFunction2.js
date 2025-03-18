//// [tests/cases/compiler/detachedCommentAtStartOfLambdaFunction2.ts] ////

//// [detachedCommentAtStartOfLambdaFunction2.ts]
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

//// [detachedCommentAtStartOfLambdaFunction2.js]
class TestFile {
    name;
    foo(message) {
        return (...x) => message + this.name;
    }
}
