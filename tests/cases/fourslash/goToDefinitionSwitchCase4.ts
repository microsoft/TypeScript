/// <reference path="fourslash.ts" />

////      switch (null) {
////          case null: break;
////      }
////
////      switch (null) {
////         [|/*start*/case|] null: break;
////      }

verify.baselineGoToDefinition("start");
