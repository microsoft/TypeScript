//// [tests/cases/compiler/tripleSlashInCommentNotParsed.ts] ////

//// [tripleSlashInCommentNotParsed.ts]
/*
/// <reference path="non-existing-file.d.ts" />
*/
void 0;

//// [tripleSlashInCommentNotParsed.js]
/*
/// <reference path="non-existing-file.d.ts" />
*/
void 0;
