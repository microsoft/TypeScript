/// <reference path='fourslash.ts' />

//// class A {
////     a: string;
////     /*a*/b: number;/*b*/    
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    a: string;
    _b: number;
    get b(): number {
        return this._b;
    }
    set b(value: number) {
        this._b = value;
    }
}`,
});
