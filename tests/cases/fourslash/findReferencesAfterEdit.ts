/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////interface A {
////    /*1*/foo: string;
////}

// @Filename: b.ts
///////<reference path='a.ts'/>
/////**/
////function foo(x: A) {
////    x./*2*/foo
////}

verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ['1', '2'] },
    {
        type: "customWork",
        work: () => {
            goTo.marker("");
            edit.insert("\n");
            return "edits";
        }
    },
    { type: "findAllReferences", markerOrRange: ['1', '2'] },
);