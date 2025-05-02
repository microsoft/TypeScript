/// <reference path="../fourslash.ts" />

// @moduleResolution: node

// Actual yargs doesn't work like this because the implementation package's
// main entry exports a small function wrapper function whose return value
// is derived from something imported from another file where all the
// important code lives, and it's not quite clear on what grounds we can
// make the jump from the main entry to that other file. But this test
// demonstrates the need to do some filename-based jumping: regular go-to-def
// on `yargs` goes to the type definition `Yargs`, but a JS-only go-to-def
// simply stops on the callback parameter. So we have to start at the type
// definition and say "well, maybe I can find a JS counterpart to this .d.ts
// and just look for declarations called 'positional' in there."

// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/package.json
//// {
////     "name": "@types/yargs",
////     "version": "1.0.0",
////     "types": "./index.d.ts"
//// }

// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/index.d.ts
//// export interface Yargs { positional(): Yargs; }
//// export declare function command(command: string, cb: (yargs: Yargs) => void): void;

// @Filename: /home/src/workspaces/project/node_modules/yargs/package.json
//// {
////     "name": "yargs",
////     "version": "1.0.0",
////     "main": "index.js"
//// }

// @Filename: /home/src/workspaces/project/node_modules/yargs/index.js
//// export function command(cmd, cb) { cb({ /*end*/positional: "This is obviously not even close to realistic" }); }

// @Filename: /home/src/workspaces/project/index.ts
//// import { command } from "yargs";
//// command("foo", yargs => {
////     yargs.[|/*start*/positional|]();
//// });

verify.baselineGoToSourceDefinition("start");
