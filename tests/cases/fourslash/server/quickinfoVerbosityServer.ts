/// <reference path="../fourslash.ts"/>

// @lib: es5

//// type FooType = string | number
//// const foo/*a*/: FooType = 1

verify.baselineQuickInfo({ "a": [0, 1] });