/// <reference path='fourslash.ts' />

//// const A = {
////     /*a*/a/*b*/: 1,
//// };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `const A = {
    /*RENAME*/_a: 1,
    get a() {
        return this._a;
    },
    set a(value) {
        this._a = value;
    },
};`,
});
