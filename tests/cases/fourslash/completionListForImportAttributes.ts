///<reference path="fourslash.ts" />

// @module: esnext
// @target: esnext
// @filename: ./a.ts
////export default {};

// @filename: ./b.ts
////declare global {
////    interface ImportAttributes {
////        type: "json",
////        "resolution-mode": "import"
////    }
////}
////const str = "hello";
////
////import * as t1 from "./a" with { /*1*/ };
////import * as t2 from "./a" with { type: "/*2*/" };
////import * as t3 from "./a" with { type: "json", /*3*/ };
////import * as t4 from "./a" with { type: /*4*/ };

verify.baselineCompletions();
