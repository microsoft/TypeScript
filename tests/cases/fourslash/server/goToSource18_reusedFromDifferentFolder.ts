/// <reference path="../fourslash.ts" />

// @moduleResolution: node

// This is just made up repro where the js file will be added to auxillary project because its not already part of the project
// Where in js file doesnt already have import to the corresponding js file hence will be added to project at later on stage

// @Filename: /node_modules/@types/yargs/package.json
//// {
////     "name": "@types/yargs",
////     "version": "1.0.0",
////     "types": "./index.d.ts"
//// }

// @Filename: /node_modules/@types/yargs/callback.d.ts
//// export declare class Yargs { positional(): Yargs; }

// @Filename: /node_modules/@types/yargs/index.d.ts
//// import { Yargs } from "./callback";
//// export declare function command(command: string, cb: (yargs: Yargs) => void): void;

// @Filename: /node_modules/yargs/package.json
//// {
////     "name": "yargs",
////     "version": "1.0.0",
////     "main": "index.js"
//// }

// @Filename: /node_modules/yargs/callback.js
//// export class Yargs { positional() { } }

// @Filename: /node_modules/yargs/index.js
//// // Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage
//// export function command(cmd, cb) { cb(Yargs) }

// @Filename: /folder/random.ts
//// import { Yargs } from "yargs/callback";

// @Filename: /some/index.ts
//// import { random } from "../folder/random";
//// import { command } from "yargs";
//// command("foo", yargs => {
////     yargs.[|/*start*/positional|]();
//// });

verify.baselineGoToSourceDefinition("start");
