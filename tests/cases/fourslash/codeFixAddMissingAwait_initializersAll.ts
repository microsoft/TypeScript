/// <reference path="fourslash.ts" />
////async function fn(a: string, b: Promise<string>) {
////  const x = b;
////  const y = b;
////  fn(x, b);
////  fn(y, b);
////  x.toLowerCase();
////  y.then;
////}

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Fix_all_expressions_possibly_missing_await.message,
  fixId: "addMissingAwait",
  newFileContent:
`async function fn(a: string, b: Promise<string>) {
  const x = await b;
  const y = b;
  fn(x, b);
  fn(await y, b);
  x.toLowerCase();
  y.then;
}`
});
