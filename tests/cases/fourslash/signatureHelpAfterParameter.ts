/// <reference path="fourslash.ts" />

////type Type = (a, b, c) => void
////const a: Type = (a/*1*/, b/*2*/) => {}
////const b: Type = function (a/*3*/, b/*4*/) {}
////const c: Type = ({ /*5*/a: { b/*6*/ }}/*7*/ = { }/*8*/, [b/*9*/]/*10*/, .../*11*/c/*12*/) => {}

verify.baselineSignatureHelp();
