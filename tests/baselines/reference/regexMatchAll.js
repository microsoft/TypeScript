//// [tests/cases/compiler/regexMatchAll.ts] ////

//// [regexMatchAll.ts]
const matches = /\w/g[Symbol.matchAll]("matchAll");
const array = [...matches];
const { index, input } = array[0];


//// [regexMatchAll.js]
"use strict";
const matches = /\w/g[Symbol.matchAll]("matchAll");
const array = [...matches];
const { index, input } = array[0];
