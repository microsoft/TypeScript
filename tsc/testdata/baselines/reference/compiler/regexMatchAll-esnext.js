//// [tests/cases/compiler/regexMatchAll-esnext.ts] ////

//// [regexMatchAll-esnext.ts]
const matches = /\w/g[Symbol.matchAll]("matchAll");
const array = [...matches];
const { index, input } = array[0];


//// [regexMatchAll-esnext.js]
"use strict";
const matches = /\w/g[Symbol.matchAll]("matchAll");
const array = [...matches];
const { index, input } = array[0];
