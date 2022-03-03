/// <reference path='fourslash.ts'/>

//// interface Fo/*interface_definition*/o { hello(): void }
////
//// class [|SuperBar|] implements Foo {
////     hello () {}
//// }
////
//// abstract class [|AbstractBar|] implements Foo {
////     abstract hello (): void;
//// }
////
//// class [|Bar|] extends SuperBar {
//// }
////
//// class [|NotAbstractBar|] extends AbstractBar {
////     hello () {}
//// }
////
//// var x = new SuperBar();
//// var y: SuperBar = new SuperBar();
//// var z: AbstractBar = new NotAbstractBar();

verify.allRangesAppearInImplementationList("interface_definition");