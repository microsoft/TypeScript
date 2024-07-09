/// <reference path="fourslash.ts" />

////if (true) {     
////  //   
////   /*begin*/   
////     //    
////     ;    
////       
////      }/*end*/

format.selection('begin', 'end');

verify.currentFileContentIs("if (true) {     \n  //   \n\n    //    \n    ;\n\n}");
