/// <reference path="fourslash.ts" />

////      switch (null) {
////          case null: break;
////      }
////
////      /*end*/switch (null) {
////         [|/*start*/case|] null: break;
////      }

verify.goToDefinition("start", "end");
