/// <reference path='fourslash.ts' />

////function /*1*/foo() {
////    function /*2*/bar2() {
////    }
////    var y = function /*3*/bar3() {
////    }
////}
////var x = function /*4*/bar4() {
////}

goTo.marker("1");
verify.quickInfoIs('(function) foo(): void');
goTo.marker("2");
debugger;
verify.quickInfoIs('(local function) bar2(): void');
goTo.marker("3");
verify.quickInfoIs('(local function) bar3(): void');
goTo.marker("4");
verify.quickInfoIs('(local function) bar4(): void');
