/// <reference path='fourslash.ts'/>

////namespace testModule {
////    export var foo = 1;
////}
////@
////testModule./**/

verify.completions({ marker: "", exact: { name: "foo", text: "var testModule.foo: number" } });
