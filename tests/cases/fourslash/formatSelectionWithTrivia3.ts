/// <reference path="fourslash.ts" />

// Tests comment indentation with range ending before next token (end block)

////if (true) {
/////*begin*/// test comment
/////*end*/}

format.selection('begin', 'end');

verify.currentFileContentIs("if (true) {\n    // test comment\n}");
