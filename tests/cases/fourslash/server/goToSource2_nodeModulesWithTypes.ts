/// <reference path="../fourslash.ts" />

// @moduleResolution: node

// @Filename: /home/src/workspaces/project/node_modules/foo/package.json
//// { "name": "foo", "version": "1.0.0", "main": "./lib/main.js", "types": "./types/main.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/foo/lib/main.js
//// export const /*end*/a = "a";

// @Filename: /home/src/workspaces/project/node_modules/foo/types/main.d.ts
//// export declare const a: string;

// @Filename: /home/src/workspaces/project/index.ts
//// import { a } from "foo";
//// [|a/*start*/|]

verify.baselineGoToSourceDefinition("start");
