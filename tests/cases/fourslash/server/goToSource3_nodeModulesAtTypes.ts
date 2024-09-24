/// <reference path="../fourslash.ts" />

// @moduleResolution: node

// @Filename: /home/src/workspaces/project/node_modules/foo/package.json
//// { "name": "foo", "version": "1.0.0", "main": "./lib/main.js" }

// @Filename: /home/src/workspaces/project/node_modules/foo/lib/main.js
//// export const /*end*/a = "a";

// @Filename: /home/src/workspaces/project/node_modules/@types/foo/package.json
//// { "name": "@types/foo", "version": "1.0.0", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/@types/foo/index.d.ts
//// export declare const a: string;

// @Filename: /home/src/workspaces/project/index.ts
//// import { a } from "foo";
//// [|a/*start*/|]

verify.baselineGoToSourceDefinition("start");
