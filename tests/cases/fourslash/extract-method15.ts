/// <reference path='fourslash.ts' />

// Extracting an increment expression (not statement) should do the right thing,
// including not generating extra destructuring unless needed

//// function foo() {
////     var i = 10;
////     /*a*/i++/*b*/;
//// }

goTo.select('a', 'b');
edit.applyRefactor('Extract Method', 'scope_1');

verify.currentFileContentIs(`function foo() {
    var i = 10;
    i = newFunction(i);
}
function newFunction(i: number) {
    i++;
    return i;
}
`);
