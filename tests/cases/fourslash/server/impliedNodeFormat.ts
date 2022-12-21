/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "nodenext" } }

// @Filename: /package.json
//// { "name": "foo", "type": "module", "exports": { ".": "./main.js" } }

// @Filename: /main.ts
//// export {};

// @Filename: /index.ts
//// import {} from "foo";

goTo.file("/index.ts");
verify.noErrors();

edit.paste(`\n"${"a".repeat(256)}";`);

verify.noErrors();
