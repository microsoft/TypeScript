/// <reference path="fourslash.ts" />
////async function fn(a: number, b: Promise<number>) {
////  const x = b;
////  const y = b;
////  fn(x, b);
////  fn(y, b);
////  x.toFixed();
////  y.then;
////
////  b + b;
////  x + b;
////  x + x.toFixed();
////}

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Fix_all_expressions_possibly_missing_await.message,
  fixId: "addMissingAwait",
  newFileContent:
`async function fn(a: number, b: Promise<number>) {
  const x = await b;
  const y = b;
  fn(x, b);
  fn(await y, b);
  x.toFixed();
  y.then;

  await b + await b;
  x + await b;
  x + x.toFixed();
}`
});
