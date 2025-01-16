/// <reference path='fourslash.ts'/>

//// type FooType = string | number;
//// const foo/*a*/: FooType = 1;

//// type BarType = FooType | boolean;
//// const bar/*b*/: BarType = 1;


verify.baselineQuickInfo({ "a": [0, 1], "b": [0, 1, 2] });