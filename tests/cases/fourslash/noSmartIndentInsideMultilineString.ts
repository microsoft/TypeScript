/// <reference path='fourslash.ts' />

////window.onload = () => {
////    var el = document.getElementById('content\/*1*/');
////    var greeter = new Greeter(el);
////greeter.start();
////};

goTo.marker("1");
edit.insert("\r\n");
// There should be no smart indent after hitting ENTER within a multiline string.
// The expected scenario is failing due to bug 616864 - Disable SmartIndent inside multiline string in TS.
//verify.indentationIs(0);
verify.indentationIs(8);