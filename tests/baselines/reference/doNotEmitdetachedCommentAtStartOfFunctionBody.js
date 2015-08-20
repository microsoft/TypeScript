//// [doNotEmitdetachedCommentAtStartOfFunctionBody.ts]
function foo() {
    /*

        multi line
        comment
    */

    return 42;
}

//// [doNotEmitdetachedCommentAtStartOfFunctionBody.js]
function foo() {
    return 42;
}
