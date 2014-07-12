/// <reference path='fourslash.ts' />

//// module foo {
////     export module bar { module baz { export class boo { } } }
//// }
//// 
//// import f = /*foo*/foo;
//// 
//// /*delete*/var x;

// Sanity check
goTo.marker('foo');
verify.quickInfoSymbolNameIs('foo');

// Delete some code
goTo.marker('delete');
edit.deleteAtCaret('var x;'.length);

// Pull on the RHS of an import
goTo.marker('foo');
verify.quickInfoSymbolNameIs('foo');
