/// <reference path="fourslash.ts" />

/////*end1*/switch (null) {
////  [|/*start1*/default|]: {
////    /*end2*/switch (null) {
////      [|/*start2*/default|]: break;
////    }
////  };
////}

verify.goToDefinition("start1", "end1");
verify.goToDefinition("start2", "end2");
