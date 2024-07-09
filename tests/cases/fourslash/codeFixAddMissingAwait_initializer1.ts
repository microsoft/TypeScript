/// <reference path="fourslash.ts" />
////async function fn(a: string, b: Promise<string>) {
////  const x = b;
////  fn(x, b);
////  fn(b, b);
////}

verify.codeFix({
  description: "Add 'await' to initializer for 'x'",
  index: 0,
  newFileContent:
`async function fn(a: string, b: Promise<string>) {
  const x = await b;
  fn(x, b);
  fn(b, b);
}`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Fix_all_expressions_possibly_missing_await.message,
  fixId: "addMissingAwait",
  newFileContent:
`async function fn(a: string, b: Promise<string>) {
  const x = await b;
  fn(x, b);
  fn(await b, b);
}`
});
