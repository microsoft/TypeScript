/// <reference path='fourslash.ts' />

//// class C1 {
////     f1() {}
//// }
////
//// class C2 extends C1 {
////
//// }
////
//// class C3 implements C2 {[| 
////     |]f2(){}
//// }

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "C2"],
    index: 1,
    newRangeContent:
`
    f1(): void {
        throw new Error("Method not implemented.");
    } 
    `
})
