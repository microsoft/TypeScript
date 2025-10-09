currentDirectory:: /home/src/workspace/packageC useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspace/packageA/index.d.ts]
export declare class Foo {
    private f: any;
}


//// [/home/src/workspace/packageB/package.json]
{
  "private": true,
  "dependencies": {
    "package-a": "file:../packageA"
  }
}

//// [/home/src/workspace/packageB/index.d.ts]
import { Foo } from "package-a";
export declare function invoke(): Foo;


//// [/home/src/workspace/packageC/package.json]
{
  "private": true,
  "dependencies": {
    "package-b": "file:../packageB",
    "package-a": "file:../packageA"
  }
}

//// [/home/src/workspace/packageC/index.ts]
import * as pkg from "package-b";

export const a = pkg.invoke();


//// [/home/src/workspace/packageC/node_modules/package-a] symlink(/home/src/workspace/packageA)

//// [/home/src/workspace/packageB/node_modules/package-a] symlink(/home/src/workspace/packageA)

//// [/home/src/workspace/packageC/node_modules/package-b] symlink(/home/src/workspace/packageB)

//// [/home/src/workspace/packageC/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --traceResolution --explainFiles --watch
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

======== Resolving module 'package-b' from '/home/src/workspace/packageC/index.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Found 'package.json' at '/home/src/workspace/packageC/package.json'.
Loading module 'package-b' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/workspace/packageC/node_modules/package-b/package.json'.
File '/home/src/workspace/packageC/node_modules/package-b.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
File '/home/src/workspace/packageC/node_modules/package-b/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-b/index.d.ts', result '/home/src/workspace/packageB/index.d.ts'.
======== Module name 'package-b' was successfully resolved to '/home/src/workspace/packageB/index.d.ts'. ========
======== Resolving module 'package-a' from '/home/src/workspace/packageB/index.d.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Found 'package.json' at '/home/src/workspace/packageB/package.json'.
Loading module 'package-a' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageB/node_modules/package-a/package.json' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a.ts' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a.tsx' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a.d.ts' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a/index.ts' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a/index.tsx' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageB/node_modules/package-a/index.d.ts', result '/home/src/workspace/packageA/index.d.ts'.
======== Module name 'package-a' was successfully resolved to '/home/src/workspace/packageA/index.d.ts'. ========
======== Resolving module 'package-b' from '/home/src/workspace/packageC/package.json'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/workspace/packageC/package.json' exists according to earlier cached lookups.
Loading module 'package-b' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageC/node_modules/package-b/package.json' exists according to earlier cached lookups.
File '/home/src/workspace/packageC/node_modules/package-b.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
File '/home/src/workspace/packageC/node_modules/package-b/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-b/index.d.ts', result '/home/src/workspace/packageB/index.d.ts'.
======== Module name 'package-b' was successfully resolved to '/home/src/workspace/packageB/index.d.ts'. ========
======== Resolving module 'package-a' from '/home/src/workspace/packageC/package.json'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/workspace/packageC/package.json' exists according to earlier cached lookups.
Loading module 'package-a' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageC/node_modules/package-a/package.json' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.d.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-a/index.d.ts', result '/home/src/workspace/packageA/index.d.ts'.
======== Module name 'package-a' was successfully resolved to '/home/src/workspace/packageA/index.d.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
../packageA/index.d.ts
  Imported via "package-a" from file '../packageB/index.d.ts'
../packageB/index.d.ts
  Imported via "package-b" from file 'index.ts'
index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/packageC/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var pkg = __importStar(require("package-b"));
exports.a = pkg.invoke();


//// [/home/src/workspace/packageC/index.d.ts]
export declare const a: import("package-a").Foo;



PolledWatches::
/home/src/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspace/packageC/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspace/packageA/index.d.ts: *new*
  {}
/home/src/workspace/packageB/index.d.ts: *new*
  {}
/home/src/workspace/packageB/package.json: *new*
  {}
/home/src/workspace/packageC/index.ts: *new*
  {}
/home/src/workspace/packageC/package.json: *new*
  {}
/home/src/workspace/packageC/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspace/packageB/node_modules: *new*
  {}
/home/src/workspace/packageB/node_modules/package-a: *new*
  {}
/home/src/workspace/packageC: *new*
  {}
/home/src/workspace/packageC/node_modules: *new*
  {}
/home/src/workspace/packageC/node_modules/package-b: *new*
  {}

Program root files: [
  "/home/src/workspace/packageC/index.ts"
]
Program options: {
  "declaration": true,
  "traceResolution": true,
  "explainFiles": true,
  "watch": true,
  "configFilePath": "/home/src/workspace/packageC/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspace/packageA/index.d.ts
/home/src/workspace/packageB/index.d.ts
/home/src/workspace/packageC/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspace/packageA/index.d.ts
/home/src/workspace/packageB/index.d.ts
/home/src/workspace/packageC/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspace/packagea/index.d.ts (used version)
/home/src/workspace/packageb/index.d.ts (used version)
/home/src/workspace/packagec/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: change index.ts

Input::
//// [/home/src/workspace/packageC/index.ts]
import * as pkg from "package-b";

export const aa = pkg.invoke();


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'package-b' from '/home/src/workspace/packageC/index.ts' of old program, it was successfully resolved to '/home/src/workspace/packageB/index.d.ts'.
======== Resolving module 'package-b' from '/home/src/workspace/packageC/package.json'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/workspace/packageC/package.json' exists according to earlier cached lookups.
Loading module 'package-b' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageC/node_modules/package-b/package.json' exists according to earlier cached lookups.
File '/home/src/workspace/packageC/node_modules/package-b.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
File '/home/src/workspace/packageC/node_modules/package-b/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-b/index.d.ts', result '/home/src/workspace/packageB/index.d.ts'.
======== Module name 'package-b' was successfully resolved to '/home/src/workspace/packageB/index.d.ts'. ========
======== Resolving module 'package-a' from '/home/src/workspace/packageC/package.json'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/workspace/packageC/package.json' exists according to earlier cached lookups.
Loading module 'package-a' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageC/node_modules/package-a/package.json' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.d.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-a/index.d.ts', result '/home/src/workspace/packageA/index.d.ts'.
======== Module name 'package-a' was successfully resolved to '/home/src/workspace/packageA/index.d.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
../packageA/index.d.ts
  Imported via "package-a" from file '../packageB/index.d.ts'
../packageB/index.d.ts
  Imported via "package-b" from file 'index.ts'
index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/packageC/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.aa = void 0;
var pkg = __importStar(require("package-b"));
exports.aa = pkg.invoke();


//// [/home/src/workspace/packageC/index.d.ts]
export declare const aa: import("package-a").Foo;




Program root files: [
  "/home/src/workspace/packageC/index.ts"
]
Program options: {
  "declaration": true,
  "traceResolution": true,
  "explainFiles": true,
  "watch": true,
  "configFilePath": "/home/src/workspace/packageC/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspace/packageA/index.d.ts
/home/src/workspace/packageB/index.d.ts
/home/src/workspace/packageC/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspace/packageC/index.ts

Shape signatures in builder refreshed for::
/home/src/workspace/packagec/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
