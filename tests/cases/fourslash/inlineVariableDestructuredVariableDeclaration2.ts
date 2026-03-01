/// <reference path="fourslash.ts" />

////export function func(arr: any) {
////    const [foo] = /*a*/arr/*b*/;
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");
