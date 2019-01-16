/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true
// @Filename: test.js

////const foo = x => x.y + 1;

verify.codeFix({
  description: "Infer parameter types from usage",
  index: 0,
  newFileContent:
`/**
 * @param {{ y: number; }} x
 */
const foo = x => x.y + 1;`,
});