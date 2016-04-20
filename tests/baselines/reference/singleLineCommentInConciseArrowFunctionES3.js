//// [singleLineCommentInConciseArrowFunctionES3.ts]
function test() {
    return () =>
        // some comments here;
        123;
}

//// [singleLineCommentInConciseArrowFunctionES3.js]
function test() {
    return function () {
        // some comments here;
        return 123;
    };
}
