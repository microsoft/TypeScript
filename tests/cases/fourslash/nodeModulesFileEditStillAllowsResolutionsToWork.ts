/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "nodenext", "strict": true } }

// @Filename: /package.json
//// { "type": "module", "imports": { "#foo": "./foo.cjs" } }

// @Filename: /foo.cts
//// export const x = 1;

// @Filename: /index.ts
//// import * as mod from "#foo";
//// /**/

goTo.marker("");
edit.insert("mod.x");
verify.noErrors();
verify.getSuggestionDiagnostics([]);
