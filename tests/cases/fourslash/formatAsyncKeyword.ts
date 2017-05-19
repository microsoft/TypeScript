/// <reference path="fourslash.ts" />

/////*1*/let x = async         () => 1;
/////*2*/let y = async() => 1;
/////*3*/let z = async    function   () { return 1; };

format.document();
goTo.marker("1");
verify.currentLineContentIs("let x = async () => 1;");
goTo.marker("2");
verify.currentLineContentIs("let y = async () => 1;");
goTo.marker("3");
verify.currentLineContentIs("let z = async function() { return 1; };")