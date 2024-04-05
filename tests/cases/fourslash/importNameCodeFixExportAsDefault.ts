/// <reference path="fourslash.ts" />

// @Filename: /foo.ts
////const foo = 'foo'
////export { foo as default }

// @Filename: /index.ts
//// foo/**/

verify.applyCodeActionFromCompletion("", {
  name: "foo",
  source: "/foo",
  description: `Add import from "./foo"`,
  newFileContent: `import foo from "./foo";\n\nfoo`,
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
