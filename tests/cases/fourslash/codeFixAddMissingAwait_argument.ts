/// <reference path="fourslash.ts" />
////async function fn(a: Promise<string>, b: string) {
////  fn(a, a);
////}

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 0,
  newFileContent:
`async function fn(a: Promise<string>, b: string) {
  fn(a, await a);
}`
});
