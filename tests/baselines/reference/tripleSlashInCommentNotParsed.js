//// [tests/cases/compiler/tripleSlashInCommentNotParsed.ts] ////

//// [tripleSlashInCommentNotParsed.ts]
/*
/// <reference path="non-existing-file.d.ts" />
*/
void 0;

//// [tripleSlashInCommentNotParsed.js]
"use strict";
/*
/// <reference path="non-existing-file.d.ts" />
*/
void 0;
