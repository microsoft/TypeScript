/// <reference path="fourslash.ts" />
////async function fn(a: Promise<number>, b: number) {
////  a | b;
////  b + a;
////  a + a;
////}

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 0,
  newFileContent:
`async function fn(a: Promise<number>, b: number) {
  await a | b;
  b + a;
  a + a;
}`
});

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 1,
  newFileContent:
`async function fn(a: Promise<number>, b: number) {
  a | b;
  b + await a;
  a + a;
}`
});

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 2,
  newFileContent:
`async function fn(a: Promise<number>, b: number) {
  a | b;
  b + a;
  await a + await a;
}`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Fix_all_expressions_possibly_missing_await.message,
  fixId: "addMissingAwait",
  newFileContent:
`async function fn(a: Promise<number>, b: number) {
  await a | b;
  b + await a;
  await a + await a;
}`
});
