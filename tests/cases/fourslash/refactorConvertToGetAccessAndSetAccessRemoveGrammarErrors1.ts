/// <reference path='fourslash.ts' />

//// const foo = {
////     /*a*/async a: 1/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `const foo = {
    /*RENAME*/_a: 1,
    get a() {
        return this._a;
    },
    set a(value) {
        this._a = value;
    },
}`,
});
