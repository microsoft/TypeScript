//// [doNotEmitDetachedCommentsAtStartOfFunctionBody.ts]
function foo1() {
    // Single line comment

    return 42;
}

function foo2() {
    /*

        multi line
        comment
    */

    return 42;
}

function foo3() {
    // Single line comment with more than one blank line


    return 42;
}

function foo4() {
    /*

        multi line comment with more than one blank line
    */

    return 42;
}



//// [doNotEmitDetachedCommentsAtStartOfFunctionBody.js]
function foo1() {
    return 42;
}
function foo2() {
    return 42;
}
function foo3() {
    return 42;
}
function foo4() {
    return 42;
}
