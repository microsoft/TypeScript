/// <reference path="fourslash.ts" />
////async function fn(a: Promise<() => void>, b: Promise<() => void> | (() => void), C: Promise<{ new(): any }>) {
////  a();
////  b();
////  new C();
////}

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 0,
  newFileContent:
`async function fn(a: Promise<() => void>, b: Promise<() => void> | (() => void), C: Promise<{ new(): any }>) {
  (await a)();
  b();
  new C();
}`
});

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 1,
  newFileContent:
`async function fn(a: Promise<() => void>, b: Promise<() => void> | (() => void), C: Promise<{ new(): any }>) {
  a();
  (await b)();
  new C();
}`
});

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 2,
  newFileContent:
`async function fn(a: Promise<() => void>, b: Promise<() => void> | (() => void), C: Promise<{ new(): any }>) {
  a();
  b();
  new (await C)();
}`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Fix_all_expressions_possibly_missing_await.message,
  fixId: "addMissingAwait",
  newFileContent:
`async function fn(a: Promise<() => void>, b: Promise<() => void> | (() => void), C: Promise<{ new(): any }>) {
  (await a)();
  (await b)();
  new (await C)();
}`
});
