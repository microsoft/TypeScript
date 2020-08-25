//// class B {
//// }
//// class D extends B {
////     c = 10;
////     constructor(public a: string, /*a*/b: string/*b*/) {
////         super();
////     }
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameter property to property declaration")
