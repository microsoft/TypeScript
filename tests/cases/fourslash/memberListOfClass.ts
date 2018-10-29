/// <reference path='fourslash.ts'/>

////class C1 {
////   public pubMeth() { }
////   private privMeth() { }
////   public pubProp = 0;
////   private privProp = 0;
////}
////var f = new C1();
////f./**/

verify.completions({
    marker: "",
    exact: [
        { name: "pubMeth", text: "(method) C1.pubMeth(): void" },
        { name: "pubProp", text: "(property) C1.pubProp: number" },
    ],
});
