/// <reference path="../fourslash.ts" />

// @moduleResolution: node

// @Filename: /node_modules/foo/package.json
//// { "name": "foo", "version": "1.0.0", "main": "./lib/main.js" }

// @Filename: /node_modules/foo/lib/main.js
//// export const /*end*/a = "a";

// @Filename: /node_modules/@types/foo/package.json
//// { "name": "@types/foo", "version": "1.0.0", "types": "./index.d.ts" }

// @Filename: /node_modules/@types/foo/index.d.ts
//// export declare const a: string;

// @Filename: /index.ts
//// import { a } from "foo";
//// [|a/*start*/|]

verify.goToSourceDefinition("start", "end");
