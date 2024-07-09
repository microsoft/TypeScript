/// <reference path='fourslash.ts' />

////module M {
////    export interface /*1*/__proto__ {}
////}
////var /*2*/__proto__: M.__proto__;
/////*3*/
////var /*4*/fun: (__proto__: any) => boolean;

verify.quickInfos({
    1: "interface M.__proto__",
    2: "var __proto__: M.__proto__"
});

verify.completions({ marker: "3", includes: { name: "__proto__", text: "var __proto__: M.__proto__" } });
edit.insert("__proto__");
verify.baselineGetDefinitionAtPosition(edit.caretPosition());

verify.quickInfoAt("4", "var fun: (__proto__: any) => boolean");
