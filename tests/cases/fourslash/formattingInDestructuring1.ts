/// <reference path='fourslash.ts'/>

////interface let { }
/////*1*/var x: let         [];
////
////function foo() {
////    'use strict'
/////*2*/    let        [x] = [];
/////*3*/    const      [x] = [];
/////*4*/    for (let[x] = [];x < 1;) {
////    }
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("var x: let[];");
goTo.marker("2");
verify.currentLineContentIs("    let [x] = [];");
goTo.marker("3");
verify.currentLineContentIs("    const [x] = [];");
goTo.marker("4");
verify.currentLineContentIs("    for (let [x] = []; x < 1;) {");