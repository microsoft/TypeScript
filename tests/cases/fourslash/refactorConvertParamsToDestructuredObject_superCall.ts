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
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `class A { 
    constructor({ a, b }: { a: string; b: string; }) { }
}
class B extends A { 
    constructor(a: string, b: string, c: string) {
        super({ a, b });
    }
}`
});