/// <reference path='fourslash.ts'/>

/////*1*/new Error(`Failed to expand glob: ${projectSpec.filesGlob}
/////*2*/                at projectPath : ${projectFile}
/////*3*/                with error: ${ex.message}`)

format.document();
goTo.marker("1");
verify.currentLineContentIs("new Error(`Failed to expand glob: ${projectSpec.filesGlob}");
goTo.marker("2");
verify.currentLineContentIs("                at projectPath : ${projectFile}");
goTo.marker("3");
verify.currentLineContentIs("                with error: ${ex.message}`)");