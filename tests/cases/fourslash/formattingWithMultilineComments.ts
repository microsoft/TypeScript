/// <reference path="fourslash.ts"/>

////f(/*
/////*2*/         */() => { /*1*/ });

goTo.marker("1");
edit.insertLine("");
goTo.marker("2");
verify.currentLineContentIs("         */() => {");