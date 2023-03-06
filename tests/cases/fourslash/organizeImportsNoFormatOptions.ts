/// <reference path="fourslash.ts" />

// #38548

////import {
////  stat,
////  statSync,
////} from "fs";
////export function fakeFn() {
////  stat;
////  statSync;
////}

format.setFormatOptions({});

// Default newline is carriage return.
// See `getNewLineOrDefaultFromHost()` in services/utilities.ts.
verify.organizeImports(
`import {\r\nstat,\r\nstatSync,\r\n} from "fs";\r\nexport function fakeFn() {
  stat;
  statSync;
}`);
