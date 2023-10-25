//// [tests/cases/compiler/genericIndexTypeHasSensibleErrorMessage.ts] ////

//// [genericIndexTypeHasSensibleErrorMessage.ts]
type Wat<T extends string> = { [x: T]: string };

//// [genericIndexTypeHasSensibleErrorMessage.js]
