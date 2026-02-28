/// <reference path='fourslash.ts'/>

// @lib: es5

////interface AnalyserNode {
////}
////declare var AnalyserNode: {
////    prototype: AnalyserNode;
////    new(): AnalyserNode;
////};
/////**/

verify.completions({
    marker: "",
    includes: {
        name: "AnalyserNode",
        text:
`interface AnalyserNode
var AnalyserNode: {
    new (): AnalyserNode;
    prototype: AnalyserNode;
}`,
        kind: "var",
    },
});
