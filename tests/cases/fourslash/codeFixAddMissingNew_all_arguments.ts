/// <reference path='fourslash.ts' />

////class C<T = number> {
////    x?: T;
////    constructor(x: T) { this.x = x; }
////}
////let a = C(1, 2, 3);
////let b = C<string>("hello");
////let c = C<boolean>();

verify.codeFixAll({
    fixId: "addMissingNewOperator",
    fixAllDescription: "Add missing 'new' operator to all calls",
    newFileContent:
`class C<T = number> {
    x?: T;
    constructor(x: T) { this.x = x; }
}
let a = new C(1, 2, 3);
let b = new C<string>("hello");
let c = new C<boolean>();`
});
