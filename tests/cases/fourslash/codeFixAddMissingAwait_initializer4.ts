/// <reference path="fourslash.ts" />
////async function fn(a: string, b: Promise<string>) {
////  const x = b;
////  const y = b;
////  x + y;
////}

verify.codeFix({
  description: "Add 'await' to initializers",
  index: 0,
  newFileContent:
`async function fn(a: string, b: Promise<string>) {
  const x = await b;
  const y = await b;
  x + y;
}`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Fix_all_expressions_possibly_missing_await.message,
  fixId: "addMissingAwait",
  newFileContent:
`async function fn(a: string, b: Promise<string>) {
  const x = await b;
  const y = await b;
  x + y;
}`
});
