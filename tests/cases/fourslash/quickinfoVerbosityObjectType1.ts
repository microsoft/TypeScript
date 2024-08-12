/// <reference path='fourslash.ts'/>


//// type Str = string | {};
//// type FooType = Str | number;
//// type Sym = symbol | (() => void);
//// type BarType = Sym | boolean;
//// type Obj = { foo: FooType, bar: BarType, str: Str };
//// const obj/*o*/: Obj = { foo: 1, bar: true, str: "3"};


verify.baselineQuickInfo({ "o": [0, 1, 2, 3] });