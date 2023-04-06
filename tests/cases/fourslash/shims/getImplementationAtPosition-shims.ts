/// <reference path='../fourslash.ts' />

// @Filename: goToImplementationDifferentFile_Implementation.ts
//// class /*fooClassImplementation*/FooImpl implements Foo {}
////
//// class /*barClassImplementation*/Bar {
////     /*barHelloFunctionImplementation*/hello() {}
//// }
////

// @Filename: goToImplementationDifferentFile_Consumption.ts
//// interface Fo/*fooClassReference*/o {}
////
//// var x = new B/*barClassReference*/ar();
////
//// x.hel/*barHelloFunctionReference*/lo();
////
//// class /*thisImplementation*/SomeClass {
////     someMethod() {
////         thi/*thisReference*/s.someMethod();
////     }
//// }

verify.baselineGoToImplementation("fooClassReference", "barClassReference", "barHelloFunctionReference", "thisReference");
