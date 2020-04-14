/// <reference path="fourslash.ts" />
////async function fn(a: Promise<string>) {
////  const x = a;
////  x.toLowerCase();
////}

verify.codeFix({
  description: "Add 'await' to initializer for 'x'",
  index: 0,
  newFileContent:
`async function fn(a: Promise<string>) {
  const x = await a;
  x.toLowerCase();
}`
});
