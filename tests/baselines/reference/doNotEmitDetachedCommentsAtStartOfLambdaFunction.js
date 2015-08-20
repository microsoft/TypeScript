//// [doNotEmitDetachedCommentsAtStartOfLambdaFunction.ts]
() => {
    // Single line comment

    return 0;
}

() => {
    /*
        multi-line comment
    */

    return 0;
}

() => {
    // Single line comment with more than one blank line


    return 0;
}

() => {
    /*
        multi-line comment with more than one blank line
    */


    return 0;
}


//// [doNotEmitDetachedCommentsAtStartOfLambdaFunction.js]
(function () {
    return 0;
});
(function () {
    return 0;
});
(function () {
    return 0;
});
(function () {
    return 0;
});
