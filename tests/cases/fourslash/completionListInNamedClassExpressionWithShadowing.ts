///<reference path="fourslash.ts" />

//// class myClass { /*0*/ }
//// /*1*/
//// var x = class myClass {
////    getClassName (){
////        m/*2*/
////    }
////    /*3*/
//// }
//// var y = class {
////    getSomeName() {
////        /*4*/
////    }
////    /*5*/
//// }

verify.completions(
    { marker: "0", excludes: "myClass", isNewIdentifierLocation: true },
    { marker: ["1", "4"], includes: { name: "myClass", text: "class myClass", kind: "class" } },
    { marker: "2", includes: { name: "myClass", text: "(local class) myClass", kind: "local class" } },
    { marker: ["3", "5"], excludes: "myClass", isNewIdentifierLocation: true },
);
