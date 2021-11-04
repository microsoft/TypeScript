/// <reference path="fourslash.ts" />

//// interface Foo {
////     bar: string
//// }

//// declare const foo: Foo;
//// foo./*a*/

const a = test.markerByName('a');
verify.getInlineCompletions([], a.position, ts.InlineCompletionTriggerKind.Automatic, undefined);
