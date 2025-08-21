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
    },
}
//// [/home/src/projects/configs/second/tsconfig.json] *new* 
{
    "files": ["${configDir}/main.ts"],
    "compilerOptions": {
        "declarationDir": "${configDir}/decls",
        "paths": {
            "@myscope/*": ["${configDir}/types/*"],
        },
    },
    "watchOptions": {
        "excludeFiles": ["${configDir}/main.ts"],
    },
}
//// [/home/src/projects/myproject/main.ts] *new* 
// some comment
export const y = 10;
import { x } from "@myscope/sometype";
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
export const x = 10;

tsgo --b --explainFiles --v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'outDir/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

======== Resolving module '@myscope/sometype' from '/home/src/projects/myproject/main.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
'paths' option is specified, looking for a pattern to match module name '@myscope/sometype'.
Module name '@myscope/sometype', matched pattern '@myscope/*'.
Trying substitution '/home/src/projects/myproject/types/*', candidate module location: '/home/src/projects/myproject/types/sometype'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/types/sometype', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/projects/myproject/types/sometype.ts' exists - use it as a name resolution result.
======== Module name '@myscope/sometype' was successfully resolved to '/home/src/projects/myproject/types/sometype.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
types/sometype.ts
   Imported via "@myscope/sometype" from file 'main.ts'
main.ts
   Part of 'files' list in tsconfig.json
//// [/home/src/projects/myproject/decls/main.d.ts] *new* 
// some comment
export declare const y = 10;

//// [/home/src/projects/myproject/decls/types/sometype.d.ts] *new* 
export declare const x = 10;

//// [/home/src/projects/myproject/outDir/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
// some comment
exports.y = 10;

//// [/home/src/projects/myproject/outDir/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["../main.ts"]}
//// [/home/src/projects/myproject/outDir/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../main.ts"
      ],
      "original": "../main.ts"
    }
  ],
  "size": 49
}
//// [/home/src/projects/myproject/outDir/types/sometype.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;

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

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/projects/myproject/types/sometype.ts
*refresh*    /home/src/projects/myproject/main.ts
Signatures::
(stored at emit) /home/src/projects/myproject/types/sometype.ts
(stored at emit) /home/src/projects/myproject/main.ts
