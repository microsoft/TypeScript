/a/lib/tsc.js -w -p /user/username/projects/myproject/tsconfig.json
//// [/user/username/projects/myproject/file1.ts]
export const c = 30;

//// [/user/username/projects/myproject/src/file2.ts]
import {c} from "file1"; export const d = 30;

//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    /* Overview of all Compiler Options: https://www.typescriptlang.org/docs/handbook/compiler-options.html */

    /* Basic Options */
    // "incremental": true,
    // "incremental": true,
    "target": "es5",
    "module": "amd",
    // "lib": [],
    // "allowJs": true,
    // "checkJs": true,
    // "jsx": "preserve",
    "declaration": true,
    // "declarationMap": true,
    // "sourceMap": true,
    // "outFile": "./",
    "outDir": "build",
    // "rootDir": "./",
    // "composite": true,
    // "tsBuildInfoFile": "./",
    // "removeComments": true,
    // "noEmit": true,
    // "importHelpers": true,
    // "downlevelIteration": true,
    // "isolatedModules": true,

    /* Strict Type-Checking Options */
    "strict": true,
    // "noImplicitAny": true,
    // "strictNullChecks": true,
    // "strictFunctionTypes": true,
    // "strictBindCallApply": true,
    // "strictPropertyInitialization": true,
    // "noImplicitThis": true,
    // "alwaysStrict": true,

    /* Additional Checks */
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noImplicitReturns": true,
    // "noFallthroughCasesInSwitch": true,

    /* Module Resolution Options */
    // "moduleResolution": "node",
    // "baseUrl": "./",
    // "paths": {},
    // "rootDirs": [],
    // "typeRoots": [],
    // "types": [],
    // "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    // "preserveSymlinks": true,
    // "allowUmdGlobalAccess": true,

    /* Source Map Options */
    // "sourceRoot": "",
    // "mapRoot": "",
    // "inlineSourceMap": true,
    // "inlineSources": true,

    /* Experimental Options */
    // "experimentalDecorators": true,
    // "emitDecoratorMetadata": true,

    /* Advanced Options */
    "declarationDir": "decls",
    "forceConsistentCasingInFileNames": true
  }
}


//// [/user/username/projects/myproject/build/file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    exports.c = 30;
});


//// [/user/username/projects/myproject/decls/file1.d.ts]
export declare const c = 30;


//// [/user/username/projects/myproject/build/src/file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.d = void 0;
    exports.d = 30;
});


//// [/user/username/projects/myproject/decls/src/file2.d.ts]
export declare const d = 30;



Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...


[[90m12:00:46 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/file1.ts","/user/username/projects/myproject/src/file2.ts"]
Program options: {"target":1,"module":2,"declaration":true,"outDir":"/user/username/projects/myproject/build","strict":true,"esModuleInterop":true,"declarationDir":"/user/username/projects/myproject/decls","forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/file1.ts
/user/username/projects/myproject/src/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/file1.ts
/user/username/projects/myproject/src/file2.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/file1.ts:
  {"fileName":"/user/username/projects/myproject/file1.ts","pollingInterval":250}
/user/username/projects/myproject/src/file2.ts:
  {"fileName":"/user/username/projects/myproject/src/file2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
