/// <reference path='fourslash.ts'/>

// Should handle shorthand property assignments of class constructors

//// interface Foo {
////     someFunction(): void;
//// }
////
//// interface FooConstructor {
////     new (): Foo
//// }
////
//// interface Bar {
////     Foo: FooConstructor;
//// }
////
//// var x = /*classExpression*/class Foo {
////     createBarInClassExpression(): Bar {
////         return {
////             Fo/*classExpressionRef*/o
////         };
////     }
////
////     someFunction() {}
//// }
////
//// /*declaredClass*/class Foo {
////
//// }
////
//// function createBarUsingClassDeclaration(): Bar {
////     return {
////         Fo/*declaredClassRef*/o
////     };
//// }

goTo.marker("classExpressionRef");
goTo.implementation();
verify.caretAtMarker("classExpression");

goTo.marker("declaredClassRef");
goTo.implementation();
verify.caretAtMarker("declaredClass");