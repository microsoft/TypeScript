//// [tests/cases/compiler/withStatementInternalComments.ts] ////

//// [withStatementInternalComments.ts]
// @ts-ignore
/*1*/ with /*2*/ ( /*3*/ false /*4*/ ) /*5*/ {}

//// [withStatementInternalComments.js]
"use strict";
// @ts-ignore
/*1*/ with /*2*/ ( /*3*/false /*4*/) /*5*/ { }
