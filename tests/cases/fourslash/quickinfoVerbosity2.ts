/// <reference path='fourslash.ts'/>

//// type Str = string | {};
//// type FooType = Str | number;
//// type Sym = symbol | (() => void);
//// type BarType = Sym | boolean;
//// type BothType = FooType | BarType;
//// const both/*b*/: BothType = 1;


verify.baselineQuickInfo({ "b": [0, 1, 2, 3], });