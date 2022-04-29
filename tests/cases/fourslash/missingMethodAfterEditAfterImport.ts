/// <reference path='fourslash.ts' />

//// namespace foo {
////     export namespace bar { namespace baz { export class boo { } } }
//// }
//// 
//// import f = /*foo*/foo;
//// 
//// /*delete*/var x;

// Sanity check\
verify.quickInfoAt("foo", "namespace foo");

// Delete some code
goTo.marker('delete');
edit.deleteAtCaret('var x;'.length);

// Pull on the RHS of an import
verify.quickInfoAt("foo", "namespace foo");
