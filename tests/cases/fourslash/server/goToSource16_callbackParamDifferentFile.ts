/// <reference path="../fourslash.ts" />

// @moduleResolution: node

// This is just modified repro to ensure we are resolving module specifier thats not already present in the file

// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/package.json
//// {
////     "name": "@types/yargs",
////     "version": "1.0.0",
////     "types": "./index.d.ts"
//// }

// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts
//// export declare class Yargs { positional(): Yargs; }

// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/index.d.ts
//// import { Yargs } from "./callback";
//// export declare function command(command: string, cb: (yargs: Yargs) => void): void;

// @Filename: /home/src/workspaces/project/node_modules/yargs/package.json
//// {
////     "name": "yargs",
////     "version": "1.0.0",
////     "main": "index.js"
//// }

// @Filename: /home/src/workspaces/project/node_modules/yargs/callback.js
//// export class Yargs { positional() { } }

// @Filename: /home/src/workspaces/project/node_modules/yargs/index.js
//// import { Yargs } from "./callback";
//// export function command(cmd, cb) { cb(Yargs) }

// @Filename: /home/src/workspaces/project/index.ts
//// import { command } from "yargs";
//// command("foo", yargs => {
////     yargs.[|/*start*/positional|]();
//// });

verify.baselineGoToSourceDefinition("start");
