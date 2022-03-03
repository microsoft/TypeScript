/// <reference path="fourslash.ts" />

// @target: esnext

// @Filename: /a.ts
//// export class A {}
//// export class B {}

// @Filename: /b.ts
//// import type { A } from './a';
//// const b: B/**/

goTo.file('/b.ts');
verify.applyCodeActionFromCompletion('', {
  name: 'B',
  source: '/a',
  description: `Update import from "./a"`,
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true
  },
  newFileContent: `import type { A, B } from './a';
const b: B`
});
