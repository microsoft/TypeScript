currentDirectory::/home/src/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/configs/first/tsconfig.json] *new* 
{
    "extends": "../second/tsconfig.json",
    "include": ["${configDir}/src"],
    "compilerOptions": {
        "typeRoots": ["root1", "${configDir}/root2", "root3"],
        "types": [],
    }
}
//// [/home/src/projects/configs/second/tsconfig.json] *new* 
{
    "files": ["${configDir}/main.ts"],
    "compilerOptions": {
        "declarationDir": "${configDir}/decls",
        "paths": {
            "@myscope/*": ["${configDir}/types/*"],
            "other/*": ["other/*"],
        },
        "baseUrl": "${configDir}",
    },
    "watchOptions": {
        "excludeFiles": ["${configDir}/main.ts"],
    },
}
//// [/home/src/projects/myproject/main.ts] *new* 
// some comment
export const y = 10;
import { x } from "@myscope/sometype";
//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts] *new* 
export const k = 10;
//// [/home/src/projects/myproject/src/secondary.ts] *new* 
// some comment
export const z = 10;
import { k } from "other/sometype2";
//// [/home/src/projects/myproject/tsconfig.json] *new* 
{
    "extends": "../configs/first/tsconfig.json",
    "compilerOptions": {
        "declaration": true,
        "outDir": "outDir",
        "traceResolution": true,
    },
}
//// [/home/src/projects/myproject/types/sometype.ts] *new* 
// some comment
export const x = 10;

tsgo --explainFiles --outDir ${configDir}/outDir
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
======== Resolving module '@myscope/sometype' from '/home/src/projects/myproject/main.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
'paths' option is specified, looking for a pattern to match module name '@myscope/sometype'.
Module name '@myscope/sometype', matched pattern '@myscope/*'.
Trying substitution '/home/src/projects/myproject/types/*', candidate module location: '/home/src/projects/myproject/types/sometype'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/types/sometype', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/projects/myproject/types/sometype.ts' exists - use it as a name resolution result.
======== Module name '@myscope/sometype' was successfully resolved to '/home/src/projects/myproject/types/sometype.ts'. ========
======== Resolving module 'other/sometype2' from '/home/src/projects/myproject/src/secondary.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
'paths' option is specified, looking for a pattern to match module name 'other/sometype2'.
Module name 'other/sometype2', matched pattern 'other/*'.
Trying substitution 'other/*', candidate module location: 'other/sometype2'.
Loading module as file / folder, candidate module location '/home/src/projects/configs/second/other/sometype2', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/projects/myproject/src/package.json' does not exist.
File '/home/src/projects/myproject/package.json' does not exist.
File '/home/src/projects/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
Loading module 'other/sometype2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Directory '/home/src/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'other/sometype2' was not resolved. ========
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5090: [0mNon-relative paths are not allowed. Did you forget a leading './'?

[7m3[0m     "compilerOptions": {
[7m [0m [91m    ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'baseUrl' has been removed. Please remove it from your configuration.
  Use '"paths": {"*": ["./*"]}' instead.

[7m3[0m     "compilerOptions": {
[7m [0m [91m    ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
types/sometype.ts
   Imported via @myscope/sometype from file 'main.ts'
main.ts
   Part of 'files' list in tsconfig.json
src/secondary.ts
   Matched by include pattern '${configDir}/src' in 'tsconfig.json'

Found 2 errors in the same file, starting at: tsconfig.json[90m:3[0m

//// [/home/src/projects/myproject/${configDir}/outDir/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
// some comment
exports.y = 10;

//// [/home/src/projects/myproject/${configDir}/outDir/src/secondary.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
// some comment
exports.z = 10;

//// [/home/src/projects/myproject/${configDir}/outDir/types/sometype.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// some comment
exports.x = 10;

//// [/home/src/projects/myproject/decls/main.d.ts] *new* 
// some comment
export declare const y = 10;

//// [/home/src/projects/myproject/decls/src/secondary.d.ts] *new* 
// some comment
export declare const z = 10;

//// [/home/src/projects/myproject/decls/types/sometype.d.ts] *new* 
// some comment
export declare const x = 10;

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };

