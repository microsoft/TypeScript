//// [tests/cases/compiler/genericNumberIndex.ts] ////

//// [genericNumberIndex.ts]
type X<I extends number> = ['a'][I];


//// [genericNumberIndex.js]
