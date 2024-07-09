/// <reference path='fourslash.ts' />

// @strict: true

////type Foo = undefined | null;
////class A {
////    /*a*/foo?: string | Foo;/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent:
`type Foo = undefined | null;
class A {
    private /*RENAME*/_foo?: string | Foo;
    public get foo(): string | Foo {
        return this._foo;
    }
    public set foo(value: string | Foo) {
        this._foo = value;
    }
}`
});
