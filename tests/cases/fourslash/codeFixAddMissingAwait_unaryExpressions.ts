/// <reference path="fourslash.ts" />
////async function fn(x: Promise<number>) {
////  x++;
////  --x;
////}

verify.codeFix({
  description: "Add 'await'",
  index: 0,
  newFileContent:
`async function fn(x: Promise<number>) {
  (await x)++;
  --x;
}`
});

verify.codeFix({
  description: "Add 'await'",
  index: 0,
  newFileContent:
`async function fn(x: Promise<number>) {
  (await x)++;
  --(await x);
}`
});
