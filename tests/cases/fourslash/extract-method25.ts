/// <reference path='fourslash.ts' />

// Preserve newlines correctly when semicolons aren't present

//// function fn() {
////     var q = /*a*/[0]/*b*/
////     q[0]++
//// }

goTo.select('a', 'b')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to inner function in function 'fn'",
    newContent:
`function fn() {
    var q = /*RENAME*/newFunction()
    q[0]++

    function newFunction() {
        return [0]
    }
}`
});
