/// <reference path='fourslash.ts' />

////
//// interface I {
////     x: {};
//// }
////
//// class C implements I {[|
////    |]constructor() { }
//// }

verify.codeFix({
  description: "Implement interface 'I'",
  newFileContent:`
interface I {
    x: {};
}

class C implements I {
   constructor() { }
    x: {};
}`,
});
