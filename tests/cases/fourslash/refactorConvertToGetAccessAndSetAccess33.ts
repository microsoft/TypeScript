/// <reference path='fourslash.ts' />

//// class A {
////     public readonly /*a*/a/*b*/: number;
////     public b: number;
////     constructor () {
////         this.a = 1; // convert
////         this.a++; // convert
////         ++this.a; // convert
////         if (Math.random()) {
////             this.a = 2; // convert
////         }
////         console.log(this.a); // preserve
////         this.b = this.a; // preserve
////     }
////     foo () { this.a = 2; }
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private /*RENAME*/_a: number;
    public get a(): number {
        return this._a;
    }
    public b: number;
    constructor () {
        this._a = 1; // convert
        this._a++; // convert
        ++this._a; // convert
        if (Math.random()) {
            this._a = 2; // convert
        }
        console.log(this.a); // preserve
        this.b = this.a; // preserve
    }
    foo () { this.a = 2; }
}`,
});
