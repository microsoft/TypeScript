/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "mylib": "file:packages/mylib" } }

// @Filename: /home/src/workspaces/project/packages/mylib/package.json
//// { "name": "mylib", "version": "1.0.0" }

// @Filename: /home/src/workspaces/project/packages/mylib/index.ts
//// export * from "./mySubDir";

// @Filename: /home/src/workspaces/project/packages/mylib/mySubDir/index.ts
//// export * from "./myClass";
//// export * from "./myClass2";

// @Filename: /home/src/workspaces/project/packages/mylib/mySubDir/myClass.ts
//// export class MyClass {}

// @Filename: /home/src/workspaces/project/packages/mylib/mySubDir/myClass2.ts
//// export class MyClass2 {}

// @link: /home/src/workspaces/project/packages/mylib -> /home/src/workspaces/project/node_modules/mylib

// @Filename: /home/src/workspaces/project/src/index.ts
//// 
//// const a = new MyClass/*1*/();
//// const b = new MyClass2/*2*/();

goTo.marker("1");
format.setOption("newLineCharacter", "\n");

verify.completions({
  marker: "1",
  includes: [{
    name: "MyClass",
    source: "mylib",
    sourceDisplay: "mylib",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
    allowIncompleteCompletions: true,
  }
});

verify.applyCodeActionFromCompletion("1", {
  name: "MyClass",
  source: "mylib",
  description: `Add import from "mylib"`,
  data: {
    exportName: "MyClass",
    fileName: "/home/src/workspaces/project/packages/mylib/index.ts",
  },
  preferences: {
    includeCompletionsForModuleExports: true,
    includeCompletionsWithInsertText: true,
    allowIncompleteCompletions: true,
  },
  newFileContent: `import { MyClass } from "mylib";

const a = new MyClass();
const b = new MyClass2();`,
});
