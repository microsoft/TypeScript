/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "noLib": true } }

// @Filename: /home/src/workspaces/project/someModule.ts
//// export const someModule = 0;
//// export default 1;

// @Filename: /home/src/workspaces/project/index.ts
//// someMo/**/

verify.completions({
  marker: "",
  includes: [
    {
      name: "someModule",
      source: "/home/src/workspaces/project/someModule",
      sourceDisplay: "./someModule",
      text: "(property) default: 1",
      kind: "property",
      kindModifiers: "export",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
      tags: []
    },
    {
      name: "someModule",
      source: "/home/src/workspaces/project/someModule",
      sourceDisplay: "./someModule",
      text: "const someModule: 0",
      kind: "const",
      kindModifiers: "export",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
      tags: []
    },
  ],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});

verify.applyCodeActionFromCompletion("", {
  name: "someModule",
  source: "/home/src/workspaces/project/someModule",
  data: { exportName: "default", fileName: "/home/src/workspaces/project/someModule.ts" },
  description: `Add import from "./someModule"`,
  newFileContent: `import someModule from "./someModule";\r\n\r\nsomeMo`
});
