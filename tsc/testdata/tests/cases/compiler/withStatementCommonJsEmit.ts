// @module: commonjs
// @filename: withStatementCommonJsEmit.cts
declare const obj: object;

with (obj) export let a;
with (obj) export let d = 1;
with (obj) var local = 2;
with (obj) {
    export let e;
}
