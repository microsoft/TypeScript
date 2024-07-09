//// [tests/cases/compiler/declareModifierOnTypeAlias.ts] ////

//// [declareModifierOnTypeAlias.ts]
declare type Foo = string;
type Bar = number;
declare type Baz = Bar;

//// [declareModifierOnTypeAlias.js]
