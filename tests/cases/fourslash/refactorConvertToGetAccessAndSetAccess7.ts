/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/_a: string;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    _a: string;
    get a(): string {
        return this._a;
    }
    set a(value: string) {
        this._a = value;
    }
}`,
});
