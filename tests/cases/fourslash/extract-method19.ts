/// <reference path='fourslash.ts' />

// New function names should be totally new to the file

//// function fn() {
////     /*a*/console.log("hi");/*b*/
//// }
//// 
//// function newFunction() { }

goTo.select('a', 'b')
verify.refactorAvailable('Extract Method');
edit.applyRefactor('Extract Method', "scope_0");
verify.currentFileContentIs(`function fn() {
    newFunction_1();

    function newFunction_1() {
        console.log("hi");
    }
}

function newFunction() { }`);
