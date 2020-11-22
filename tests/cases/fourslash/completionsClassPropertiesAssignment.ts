/// <reference path='fourslash.ts'/>

////class Class1 {
////   public a = this./*0*/
////   protected b = /*1*/
////   private c = /*2*/
////   public d = /*3*/
////}
////
////class Class2 {
////   a = /*4*/
////}
////class Class3 {
////   a = /*5*/
////}
////
////const prop = 'prop';
////class Class4 {
////   [prop] = /*6*/
////}

const exact = completion.globalsPlus(["Class1", "Class2", "Class3", "prop", "Class4"]);
const markers = ["1", "2", "3", "4", "5", "6"];

verify.completions({ marker: "0", exact: ['a', 'b', 'c', 'd'], isGlobalCompletion: false });
verify.completions({ marker: markers, exact });

for (let marker of markers) {
    goTo.marker(marker);
    edit.insert("c");
    verify.completions({ exact });
}
