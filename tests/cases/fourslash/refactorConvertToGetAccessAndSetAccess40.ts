/// <reference path='fourslash.ts' />

// @strict: true

////class A {
////    /*a*/foo?: any;/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent:
`class A {
    private /*RENAME*/_foo?: any;
    public get foo(): any {
        return this._foo;
    }
    public set foo(value: any) {
        this._foo = value;
    }
}`
});
