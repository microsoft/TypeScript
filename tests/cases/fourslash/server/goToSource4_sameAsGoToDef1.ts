/// <reference path="../fourslash.ts" />

// @Filename: /index.ts
//// import { a/*end*/ } from "./a";
//// [|a/*start*/|]

verify.goToDefinition("start", "end");
verify.goToSourceDefinition("start", "end");
