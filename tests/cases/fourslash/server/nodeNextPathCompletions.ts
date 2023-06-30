/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/dependency/package.json
//// {
////     "type": "module",
////     "name": "dependency",
////     "version": "1.0.0",
////     "exports": {
////         ".": {
////             "types": "./lib/index.d.ts"
////         },
////         "./lol": {
////             "types": "./lib/lol.d.ts"
////         },
////        "./dir/*": "./lib/*"
////     }
//// }

// @Filename: /node_modules/dependency/lib/index.d.ts
//// export function fooFromIndex(): void;

// @Filename: /node_modules/dependency/lib/lol.d.ts
//// export function fooFromLol(): void;

// @Filename: /package.json
//// {
////     "type": "module",
////     "dependencies": {
////         "dependency": "^1.0.0"
////     }
//// }

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "nodenext" }, "files": ["./src/foo.ts"] }

// @Filename: /src/foo.ts
//// import { fooFromIndex } from "/**/";

verify.baselineCompletions();
edit.insert("dependency/");
verify.completions({ exact: ["lol", "dir"], isNewIdentifierLocation: true });
edit.insert("l");
verify.completions({ exact: ["lol"], isNewIdentifierLocation: true });
