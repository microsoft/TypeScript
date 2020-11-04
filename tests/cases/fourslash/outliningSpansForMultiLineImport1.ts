/// <reference path="fourslash.ts" />

//// import [|{
////     a,
////     b
//// } from 'any-module'|]

verify.outliningSpansInCurrentFile(test.ranges(), "imports");
