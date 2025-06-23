/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "nodenext" } }

// @Filename: /home/src/workspaces/project/package.json
//// { "name": "foo", "type": "module", "exports": { ".": "./main.js" } }

// @Filename: /home/src/workspaces/project/main.ts
//// export {};

// @Filename: /home/src/workspaces/project/index.ts
//// import {} from "foo";

goTo.file("/home/src/workspaces/project/index.ts");
verify.noErrors();

edit.paste(`\n"${"a".repeat(256)}";`);

verify.noErrors();
