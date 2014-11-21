///<reference path="fourslash.ts" />

////module E {
////    export var n = 1;
////}
////module F {
////    export var n = 1;
////}
////var q: typeof E | typeof F;
////var j = q./*1*/

goTo.marker('1');
verify.completionListContains('n', "(property) n: number");