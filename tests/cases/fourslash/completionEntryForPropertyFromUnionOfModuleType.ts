///<reference path="fourslash.ts" />

////module E {
////    export var n = 1;
////    export var x = 0;
////}
////module F {
////    export var n = 1;
////    export var y = 0;
////}
////var q: typeof E | typeof F;
////var j = q./*1*/

verify.completions({ marker: "1", exact: [{ name: "n", text: "(property) n: number" }] });
