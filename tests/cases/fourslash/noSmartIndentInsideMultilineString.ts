/// <reference path='fourslash.ts' />

////window.onload = () => {
////    var el = document.getElementById('content\/*1*/');
////    var greeter = new Greeter(el);
////greeter.start();
////};

goTo.marker("1");
edit.insert("\r\n");
// Won't-fixed: Disable SmartIndent inside multiline string in TS. Should be 0
verify.indentationIs(8);