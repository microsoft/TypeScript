/// <reference path='fourslash.ts'/>

////class Class1 {
////   protected a = /*1*/
////   private b = /*2*/
////   public c = /*3*/
////   public d = this./*4*/
////}
////
////class Class2 {
////   a = /*5*/
////}
////class Class3 {
////   a = /*6*/
////}
////
////const prop = 'prop';
////class Class4 {
////   [prop] = /*7*/
////}

const exact = completion.globalsPlus(["Class1", "Class2", "Class3", "prop", "Class4"]);
verify.completions({ marker: ["1"], exact });
verify.completions({ marker: ["2"], exact });
verify.completions({ marker: ["3"], exact });
verify.completions({ marker: ["4"], exact: ['a', 'b', 'c', 'd'], isGlobalCompletion: false });
verify.completions({ marker: ["5"], exact });
verify.completions({ marker: ["6"], exact });
verify.completions({ marker: ["7"], exact });
