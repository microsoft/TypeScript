/// <reference path='fourslash.ts' />

// You cannot extract an exported function declaration

//// namespace ns {
////     /*a*/export function fn() {
////
////     }
////     fn();
////     /*b*/
//// }

goTo.select('a', 'b');
verify.not.refactorAvailable("Extract Symbol");
edit.deleteAtCaret('export'.length);
goTo.select('a', 'b');
verify.refactorAvailable("Extract Symbol", 'function_scope_0');
