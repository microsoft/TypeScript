/// <reference path='fourslash.ts' />

// @Filename: goToImplementationDifferentFile_Implementation.ts
//// /*fooClassImplementation*/class FooImpl implements Foo {}
////
//// /*barClassImplementation*/class Bar {
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
//// /*thisImplementation*/class SomeClass {
////     someMethod() {
////         thi/*thisReference*/s.someMethod();
////     }
//// }

var markerList = [
    "fooClass",
    "barClass",
    "barHelloFunction",
    "this"
];

markerList.forEach((marker) => {
    goTo.marker(marker + 'Reference');
    goTo.implementation();
    verify.caretAtMarker(marker + 'Implementation');
});
