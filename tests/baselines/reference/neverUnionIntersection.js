//// [tests/cases/conformance/types/never/neverUnionIntersection.ts] ////

//// [neverUnionIntersection.ts]
type T01 = string | never;
type T02 = string & never;
type T03 = string | number | never;
type T04 = string & number & never;
type T05 = any | never;
type T06 = any & never;
type T07 = undefined | never;
type T08 = undefined & never;
type T09 = null | never;
type T10 = null & never;
type T11 = { a: string } | never;
type T12 = { a: string } & never;


//// [neverUnionIntersection.js]
"use strict";
