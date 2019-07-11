/// <reference path="fourslash.ts" />
////async function f() {
////  await "";
////  await 0;
////  (await "").toLowerCase();
////  (await 0).toFixed();
////  (await 3.2).toFixed();
////}

verify.codeFix({
  description: ts.Diagnostics.Remove_unnecessary_await.message,
  index: 0,
  newFileContent:
`async function f() {
  "";
  await 0;
  (await "").toLowerCase();
  (await 0).toFixed();
  (await 3.2).toFixed();
}`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Remove_all_unnecessary_uses_of_await.message,
  fixId: "removeUnnecessaryAwait",
  newFileContent:
`async function f() {
  "";
  0;
  "".toLowerCase();
  (0).toFixed();
  3.2.toFixed();
}`
});
