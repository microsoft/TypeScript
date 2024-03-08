//// [tests/cases/compiler/typeParameterDoesntBlockParameterLookup.ts] ////

//// [typeParameterDoesntBlockParameterLookup.ts]
declare function f<Foo extends Bar, Bar>(Bar: any): void

//// [typeParameterDoesntBlockParameterLookup.js]
