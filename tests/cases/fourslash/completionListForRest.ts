/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    parent: Gen;
////    millennial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest./*1*/x;

verify.completions({
    marker: "1",
    exact: [
        { name: "millennial", text: "(property) Gen.millennial: string" },
        { name: "parent", text: "(property) Gen.parent: Gen" },
    ],
});
