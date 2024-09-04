currentDirectory:: /home/src/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/configs/first/tsconfig.json]
{
  "extends": "../second/tsconfig.json",
  "include": [
    "${configDir}/src"
  ],
  "compilerOptions": {
    "typeRoots": [
      "root1",
      "${configDir}/root2",
      "root3"
    ],
    "types": []
  }
}

//// [/home/src/projects/configs/second/tsconfig.json]
{
  "files": [
    "${configDir}/main.ts"
  ],
  "compilerOptions": {
    "declarationDir": "${configDir}/decls",
    "paths": {
      "@myscope/*": [
        "${configDir}/types/*"
      ],
      "other/*": [
        "other/*"
      ]
    },
    "baseUrl": "${configDir}"
  },
  "watchOptions": {
    "excludeFiles": [
      "${configDir}/main.ts"
    ]
  }
}

//// [/home/src/projects/myproject/tsconfig.json]
{
  "extends": "../configs/first/tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "outDir",
    "traceResolution": true
  }
}

//// [/home/src/projects/myproject/main.ts]
// some comment
export const y = 10;
import { x } from "@myscope/sometype";


//// [/home/src/projects/myproject/src/secondary.ts]
// some comment
export const z = 10;
import { k } from "other/sometype2";


//// [/home/src/projects/myproject/types/sometype.ts]
export const x = 10;


//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts]
export const k = 10;


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js --explainFiles
Output::
======== Resolving module '@myscope/sometype' from '/home/src/projects/myproject/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name '@myscope/sometype'.
'paths' option is specified, looking for a pattern to match module name '@myscope/sometype'.
Module name '@myscope/sometype', matched pattern '@myscope/*'.
Trying substitution '/home/src/projects/myproject/types/*', candidate module location: '/home/src/projects/myproject/types/sometype'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/types/sometype', target file types: TypeScript, Declaration.
File '/home/src/projects/myproject/types/sometype.ts' exists - use it as a name resolution result.
======== Module name '@myscope/sometype' was successfully resolved to '/home/src/projects/myproject/types/sometype.ts'. ========
======== Resolving module 'other/sometype2' from '/home/src/projects/myproject/src/secondary.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name 'other/sometype2'.
'paths' option is specified, looking for a pattern to match module name 'other/sometype2'.
Module name 'other/sometype2', matched pattern 'other/*'.
Trying substitution 'other/*', candidate module location: 'other/sometype2'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/other/sometype2', target file types: TypeScript, Declaration.
Loading module 'other/sometype2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/configs/first/root1' does not exist, skipping all lookups in it.
File '/home/src/projects/myproject/root2/other/sometype2.d.ts' does not exist.
File '/home/src/projects/myproject/root2/other/sometype2/package.json' does not exist.
File '/home/src/projects/myproject/root2/other/sometype2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/myproject/root2/other/sometype2/index.d.ts', result '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'.
======== Module name 'other/sometype2' was successfully resolved to '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
types/sometype.ts
  Imported via "@myscope/sometype" from file 'main.ts'
main.ts
  Part of 'files' list in tsconfig.json
root2/other/sometype2/index.d.ts
  Imported via "other/sometype2" from file 'src/secondary.ts'
src/secondary.ts
  Matched by include pattern '${configDir}/src' in 'tsconfig.json'


//// [/home/src/projects/myproject/outDir/types/sometype.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/projects/myproject/decls/types/sometype.d.ts]
export declare const x = 10;


//// [/home/src/projects/myproject/outDir/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
// some comment
exports.y = 10;


//// [/home/src/projects/myproject/decls/main.d.ts]
export declare const y = 10;


//// [/home/src/projects/myproject/outDir/src/secondary.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
// some comment
exports.z = 10;


//// [/home/src/projects/myproject/decls/src/secondary.d.ts]
export declare const z = 10;



exitCode:: ExitStatus.Success
