/// <reference path="fourslash.ts" />

// Tests comment indentation with range ending before next token (end of file)

/////*begin*/    // test comment
/////*end*/

format.selection('begin', 'end');

verify.currentFileContentIs("// test comment\n");
