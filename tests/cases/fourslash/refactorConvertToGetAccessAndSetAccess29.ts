/// <reference path='fourslash.ts' />

//// const A = {
////     /*a*/a/*b*/: 1
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `const A = {
    _a: 1,
    get a(): number {
        return this._a;
    },
    set a(value: number) {
        this._a = value;
    },
};`,
});
