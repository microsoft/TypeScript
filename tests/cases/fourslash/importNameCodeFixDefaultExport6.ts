/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export default Math.foo;

// @Filename: /index.ts
//// a/**/

verify.applyCodeActionFromCompletion("", {
  name: "a",
  source: "/a",
  description: `Add import from "./a"`,
  newFileContent: `import a from "./a";\n\na`,
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
