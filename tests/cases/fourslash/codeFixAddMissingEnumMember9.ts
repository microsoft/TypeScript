/// <reference path='fourslash.ts' />

////enum E {
////    a,
////    b = 1,
////    c = "123"
////}
////enum A {
////    a = E.a    
////}
////A.b

verify.codeFix({
    description: "Add missing enum member 'b'",
    newFileContent: `enum E {
    a,
    b = 1,
    c = "123"
}
enum A {
    a = E.a,    
    b
}
A.b`
});
