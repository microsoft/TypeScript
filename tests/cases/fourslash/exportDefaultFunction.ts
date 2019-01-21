/// <reference path='./fourslash.ts'/>

////export default function func() {
////    /*1*/
////}
//// /*2*/

verify.completions({
    marker: test.markers(),
    includes: { name: "func", text: "function func(): void", kind: "function", kindModifiers: "export" },
});
