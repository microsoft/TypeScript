/// <reference path='fourslash.ts'/>

////interface IFoo {
////    bar(): IFoo;
////}
////interface IFoo2 extends IFoo {
////    bar2(): IFoo2;
////}
////var f: IFoo;
////var f2: IFoo2;
////f./*1*/; // completion here shows bar with return type is any
////f2./*2*/ // here bar has return type any, but bar2 is Foo2

verify.completions(
    { marker: "1", exact: [{ name: "bar", text: "(method) IFoo.bar(): IFoo" }] },
    {
        marker: "2",
        exact: [{ name: "bar2", text: "(method) IFoo2.bar2(): IFoo2" }, { name: "bar", text: "(method) IFoo.bar(): IFoo" }]
    },
);
