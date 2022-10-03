/// <reference path="fourslash.ts" />

// @strictNullChecks: true
////async function fn(a: Promise<string[]>) {
////  if (a) {};
////  a ? fn.call() : fn.call();
////}

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 0,
  newFileContent:
`async function fn(a: Promise<string[]>) {
  if (await a) {};
  a ? fn.call() : fn.call();
}`
});

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 1,
  newFileContent:
`async function fn(a: Promise<string[]>) {
  if (a) {};
  await a ? fn.call() : fn.call();
}`
});
