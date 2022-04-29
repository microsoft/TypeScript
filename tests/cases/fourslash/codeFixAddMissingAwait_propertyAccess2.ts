/// <reference path="fourslash.ts" />
////async function fn(a: Promise<{ x: string }>) {
////  console.log(3)
////  a.x;
////}

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 0,
  newFileContent:
`async function fn(a: Promise<{ x: string }>) {
  console.log(3)
  ;(await a).x;
}`
});
