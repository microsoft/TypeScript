/// <reference path="fourslash.ts" />

////
/////*begin*/;    
////    
/////*end*/    
////    
////

format.setOption("trimTrailingWhitespace", false);

format.selection('begin', 'end');

verify.currentFileContentIs(`
;    
    
    
    
`);
