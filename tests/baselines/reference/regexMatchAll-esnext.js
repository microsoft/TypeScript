//// [regexMatchAll-esnext.ts]
const matches = /\w/g[Symbol.matchAll]("matchAll");
const array = [...matches];
const { index, input } = array[0];


//// [regexMatchAll-esnext.js]
const matches = /\w/g[Symbol.matchAll]("matchAll");
const array = [...matches];
const { index, input } = array[0];
