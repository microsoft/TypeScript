/// <reference path='fourslash.ts' />

// Preserve newlines correctly when semicolons aren't present

//// function fn() {
////     var q = /*a*/[0]/*b*/
////     q[0]++
//// }

goTo.select('a', 'b')
edit.applyRefactor('Extract Method', 'scope_0');
verify.currentFileContentIs(`function fn() {
    var q = newFunction()
    q[0]++

    function newFunction() {
        return [0];
    }
}`);
