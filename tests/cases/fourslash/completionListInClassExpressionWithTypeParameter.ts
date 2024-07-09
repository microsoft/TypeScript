///<reference path="fourslash.ts" />

//// var x = class myClass <TypeParam> {
////    getClassName (){
////        /*0*/
////        var tmp: /*0Type*/;
////    }
////    prop: Ty/*1*/
//// }

verify.completions(
    { marker: "0", excludes: "TypeParam" },
    { marker: ["0Type", "1"], includes: { name: "TypeParam", text: "(type parameter) TypeParam in myClass<TypeParam>", kind: "type parameter" } },
);
