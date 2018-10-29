/// <reference path='fourslash.ts'/>

////class C1 {
////   public pubMeth() {this./**/} // test on 'this.'
////   private privMeth() {}
////   public pubProp = 0;
////   private privProp = 0;
////}

verify.completions({
    marker: "",
    exact: [
        { name: "pubMeth", text: "(method) C1.pubMeth(): void" },
        { name: "privMeth", text: "(method) C1.privMeth(): void" },
        { name: "pubProp", text: "(property) C1.pubProp: number" },
        { name: "privProp", text: "(property) C1.privProp: number" },
    ],
})
