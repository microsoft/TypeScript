/// <reference path='fourslash.ts'/>

////interface AnalyserNode {
////}
////declare var AnalyserNode: {
////    prototype: AnalyserNode;
////    new(): AnalyserNode;
////};
/////**/

goTo.marker();
verify.completionListContains("AnalyserNode", /*text*/ undefined, /*documentation*/ undefined, "var");
verify.completionEntryDetailIs("AnalyserNode", `interface AnalyserNode
var AnalyserNode: {
    new (): AnalyserNode;
    prototype: AnalyserNode;
}`, /*documentation*/ undefined, "var")