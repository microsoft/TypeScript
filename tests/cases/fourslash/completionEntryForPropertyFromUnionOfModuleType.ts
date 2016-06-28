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

goTo.marker('1');
verify.completionListContains('n', "(property) n: number");