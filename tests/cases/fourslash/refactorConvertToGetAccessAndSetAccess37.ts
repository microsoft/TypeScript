/// <reference path='fourslash.ts' />

// @strict: true

////class A {
////    /*a*/foo?: string;/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent:
`class A {
    private /*RENAME*/_foo?: string | undefined;
    public get foo(): string | undefined {
        return this._foo;
    }
    public set foo(value: string | undefined) {
        this._foo = value;
    }
}`
});
