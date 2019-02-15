/// <reference path='fourslash.ts' />

/////export default class {
////    constructor(/*a*/a: number, b = { x: 1 }/*b*/) {}
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Convert to named parameters");
