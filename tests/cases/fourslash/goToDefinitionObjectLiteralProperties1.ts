/// <reference path='fourslash.ts' />

//// interface PropsBag {
////    /*first*/propx: number
//// }
//// function foo(arg: PropsBag) {}
//// foo({
////    [|pr/*p1*/opx|]: 10
//// })
//// function bar(firstarg: boolean, secondarg: PropsBag) {}
//// bar(true, {
////    [|pr/*p2*/opx|]: 10
//// })


verify.baselineGoToDefinition(
    "p1",
    "p2",
);
