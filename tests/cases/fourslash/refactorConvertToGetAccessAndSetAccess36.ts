/// <reference path='fourslash.ts' />

////class Foo {
////    /**
////     * Property description
////     */
////    /*a*/_prop!: string; // comment/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent:
`class Foo {
    /**
     * Property description
     */
    private _prop!: string; // comment
    public get /*RENAME*/prop(): string {
        return this._prop;
    }
    public set prop(value: string) {
        this._prop = value;
    }
}`
});
