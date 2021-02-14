/// <reference path='fourslash.ts' />

////
//// interface I {
////     x: number;
////     y: number;
////     z: number & { __iBrand: any };
//// }
////
//// class C implements I {[|
////    |]constructor(public x: number) { }
////    y: number;
//// }

verify.codeFix({
  description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I"],
  index: 1,
  newFileContent:`
interface I {
    x: number;
    y: number;
    z: number & { __iBrand: any };
}

class C implements I {
   constructor(public x: number) { }
    z: number & { __iBrand: any; };
   y: number;
}`,
});

