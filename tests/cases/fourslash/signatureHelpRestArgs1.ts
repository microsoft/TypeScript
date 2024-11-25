/// <reference path="fourslash.ts" />

////function fn(a: number, b: number, c: number) {}
////const a = [1, 2] as const;
////const b = [1] as const;
////
////fn(...a, /*1*/);
////fn(/*2*/, ...a);
////
////fn(...b, /*3*/);
////fn(/*4*/, ...b, /*5*/);

verify.baselineSignatureHelp();
