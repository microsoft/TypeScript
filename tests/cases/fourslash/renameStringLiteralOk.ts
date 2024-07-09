/// <reference path='fourslash.ts'/>

//// interface Foo {
////     f: '[|foo|]' | 'bar'
//// }
//// const d: 'foo' = 'foo'
//// declare const f: Foo
//// f.f = '[|foo|]'
//// f.f = `[|foo|]`

verify.baselineRenameAtRangesWithText("foo");
