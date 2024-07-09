/// <reference path='fourslash.ts'/>

//// declare function f(): '[|foo|]' | 'bar'
//// class Foo {
////     f = f()
//// }
//// const d: 'foo' = 'foo'
//// declare const ff: Foo
//// ff.f = '[|foo|]'

verify.baselineRenameAtRangesWithText("foo");
