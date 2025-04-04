/// <reference path='fourslash.ts'/>

//// type Key = string | number;
//// interface Apple {
////     banana: number;
//// }
//// interface Foo {
////     [a/*a*/: Key]: Apple;
//// }
//// const f/*f*/: Foo = {};


verify.baselineQuickInfo({ "a": [0, 1], "f": [0, 1, 2] });