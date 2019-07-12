/// <reference path="fourslash.ts" />
////declare class C { foo(): void }
////declare function getC(): { foo: { Class: C } }
////async function f() {
////  await "";
////  await 0;
////  (await "").toLowerCase();
////  (await 0).toFixed();
////  (await 3.2).toFixed();
////  (await new C).foo();
////  new (await getC()).foo.Class();
////}

verify.codeFix({
  description: ts.Diagnostics.Remove_unnecessary_await.message,
  index: 0,
  newFileContent:
`declare class C { foo(): void }
declare function getC(): { foo: { Class: C } }
async function f() {
  "";
  await 0;
  (await "").toLowerCase();
  (await 0).toFixed();
  (await 3.2).toFixed();
  (await new C).foo();
  new (await getC()).foo.Class();
}`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Remove_all_unnecessary_uses_of_await.message,
  fixId: "removeUnnecessaryAwait",
  newFileContent:
`declare class C { foo(): void }
declare function getC(): { foo: { Class: C } }
async function f() {
  "";
  0;
  "".toLowerCase();
  (0).toFixed();
  3.2.toFixed();
  (new C).foo();
  new (getC()).foo.Class();
}`
});
