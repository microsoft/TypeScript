/// <reference path='fourslash.ts'/>

////[1].forEach(fu/*1*/nction() {});
////[1].map(x =/*2*/> x + 1);

verify.quickInfoAt("1", "(local function)(): void");
verify.quickInfoAt("2", "function(x: number): number");
