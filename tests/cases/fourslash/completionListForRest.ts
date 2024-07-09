/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    parent: Gen;
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest./*1*/x;

verify.completions({
    marker: "1",
    exact: [
        { name: "millenial", text: "(property) Gen.millenial: string" },
        { name: "parent", text: "(property) Gen.parent: Gen" },
    ],
});
