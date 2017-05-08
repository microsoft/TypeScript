/// <reference path='fourslash.ts'/>

////function /*1*/test() { }
////async function /*2*/test2async() { }
////async function /*3*/test3Async() { }
////async function /*4*/test4() { }

verify.not.applicableRefactorAvailableAtMarker('1');
verify.not.applicableRefactorAvailableAtMarker('2');
verify.not.applicableRefactorAvailableAtMarker('3');
verify.applicableRefactorAvailableAtMarker('4');
verify.fileAfterApplyingRefactorAtMarker('4',
    `function test() { }
async function test2async() { }
async function test3Async() { }
async function test4Async() { }`, "Add Async suffix");