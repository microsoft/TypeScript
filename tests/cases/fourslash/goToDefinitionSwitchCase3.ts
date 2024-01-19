/// <reference path="fourslash.ts" />

////switch (null) {
////  [|/*start1*/default|]: {
////    switch (null) {
////      [|/*start2*/default|]: break;
////    }
////  };
////}

verify.baselineGoToDefinition("start1", "start2");
