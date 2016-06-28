/// <reference path='fourslash.ts' />

//// namespace foo {
////     export namespace bar { namespace baz { export class boo { } } }
//// }
//// 
//// import f = /*foo*/foo;
//// 
//// /*delete*/var x;

// Sanity check
goTo.marker('foo');
verify.quickInfoIs('namespace foo');

// Delete some code
goTo.marker('delete');
edit.deleteAtCaret('var x;'.length);

// Pull on the RHS of an import
goTo.marker('foo');
verify.quickInfoIs('namespace foo');
