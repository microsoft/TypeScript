/// <reference path="fourslash.ts" />
////async function fn(a: Promise<string[]>) {
////  [...a];
////  for (const c of a) { c; }
////  for await (const c of a) { c; }
////}

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 0,
  newFileContent:
`async function fn(a: Promise<string[]>) {
  [...await a];
  for (const c of a) { c; }
  for await (const c of a) { c; }
}`
});

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 1,
  newFileContent:
`async function fn(a: Promise<string[]>) {
  [...a];
  for (const c of await a) { c; }
  for await (const c of a) { c; }
}`
});

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 2,
  newFileContent:
`async function fn(a: Promise<string[]>) {
  [...a];
  for (const c of a) { c; }
  for await (const c of await a) { c; }
}`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Fix_all_expressions_possibly_missing_await.message,
  fixId: "addMissingAwait",
  newFileContent:
`async function fn(a: Promise<string[]>) {
  [...await a];
  for (const c of await a) { c; }
  for await (const c of await a) { c; }
}`
});
