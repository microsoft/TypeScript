///<reference path="fourslash.ts"/>

////[{}]

format.setOption("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets", true);
format.document();
verify.currentFileContentIs("[ {} ]");
