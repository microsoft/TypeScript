/// <reference path='fourslash.ts' />

////abstract class C1 { }
////abstract class C2 {
////    abstract fＡ<T extends number>();
////}
////interface I1 extends C1, C2 { }
////class C3 implements I1 {[| |]}

verify.codeFix({
    description: "Implement interface 'I1'",
    // TODO: GH#18445
    newFileContent:
`abstract class C1 { }
abstract class C2 {
    abstract fＡ<T extends number>();
}
interface I1 extends C1, C2 { }
class C3 implements I1 {\r
    fＡ<T extends number>() {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});
