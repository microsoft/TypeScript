/// <reference path='fourslash.ts' />

////window.onload = () => {
////    var el = document.getElementById('content\
////sometext/*1*/');
////    var greeter = new Greeter(el);
////    greeter.start();
////};
////
////var x = "line1\
////line2\
////lin/*2*/e3\
////line4";
////
////function foo1() {
////    function foo2() {
////        function foo3() {
////            'line1\
////lin/*3*/e2';
////        }
////    }
////}

goTo.marker("1");
verify.indentationIs(0);

goTo.marker("2");
verify.indentationIs(0);

goTo.marker("3");
verify.indentationIs(0);