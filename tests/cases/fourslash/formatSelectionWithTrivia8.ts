/// <reference path="fourslash.ts" />

// Same as formatSelectionWithTrivia2, but range is immediately proceeded by a token

/////*begin*/;
////    
/////*end*/console.log();

format.selection('begin', 'end');

verify.currentFileContentIs(";\n\nconsole.log();");
