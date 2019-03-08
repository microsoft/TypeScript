/// <reference path='fourslash.ts' />

////class A { 
////    constructor(/*a*/a: string, b: string/*b*/) { }
////}
////class B extends A { 
////    constructor(a: string, b: string, c: string) {
////        super(a, b);
////    }
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `class A { 
    constructor({ a, b }: { a: string; b: string; }) { }
}
class B extends A { 
    constructor(a: string, b: string, c: string) {
        super({ a: a, b: b });
    }
}`
});