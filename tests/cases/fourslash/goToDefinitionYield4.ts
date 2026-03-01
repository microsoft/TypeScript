/// <reference path="fourslash.ts" />

//// function* gen() {
////     class C { [/*start*/yield 10]() {} }
//// }

verify.baselineGoToDefinition("start");
