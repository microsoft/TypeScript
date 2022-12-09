/// <reference path='fourslash.ts' />

////enum E {
////    a,
////    b = 1,
////    c = "123"
////}
////enum A {
////    a = E.c    
////}
////enum B {
////    b = A.a
////}
////B.c

verify.codeFix({
    description: "Add missing enum member 'c'",
    newFileContent: `enum E {
    a,
    b = 1,
    c = "123"
}
enum A {
    a = E.c    
}
enum B {
    b = A.a,
    c = "c"
}
B.c`
});
