/// <reference path="fourslash.ts" />

// Tests comment indentation with range ending before next token (statement)

////if (true) {
/////*begin*/// test comment
/////*end*/console.log();
////}

format.selection('begin', 'end');

verify.currentFileContentIs("if (true) {\n    // test comment\nconsole.log();\n}");
