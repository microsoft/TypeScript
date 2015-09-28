/// <reference path="fourslash.ts" />

////if (true) {
////    let foo = `
/////*    
////`/*1*/}

goTo.marker('1');
edit.insert(";");

verify.currentFileContentIs("if (true) {\n    let foo = `\n/*    \n`;}");
