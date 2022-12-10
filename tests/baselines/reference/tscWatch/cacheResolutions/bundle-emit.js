Input::
//// [/src/project/tsconfig.json]
{"compilerOptions":{"module":"amd","composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js"},"include":["*.ts"],"exclude":["*.d.ts"]}

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { RequireInterface1 } from "pkg1";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/pkg0.d.ts]
export interface ImportInterface0 {}

//// [/src/project/fileWithTypeRefs.ts]
/// <reference types="pkg2"/>
/// <reference types="pkg3"/>
interface LocalInterface extends ImportInterface2, RequireInterface3 {}
export {}


//// [/src/project/randomFileForTypeRef.ts]
export const x = 10;

//// [/src/project/node_modules/pkg2/index.d.ts]
export {};
declare global {
    interface ImportInterface2 {}
}


//// [/src/project/node_modules/@types/pkg4/index.d.ts]
export const x = 10;

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


/a/lib/tsc.js -w --explainFiles --extendedDiagnostics
Output::
[[90m12:00:37 AM[0m] Starting compilation in watch mode...

Current directory: /src/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' does not exist.
File '/src/pkg1.ts' does not exist.
File '/src/pkg1.tsx' does not exist.
File '/src/pkg1.d.ts' does not exist.
File '/pkg1.ts' does not exist.
File '/pkg1.tsx' does not exist.
File '/pkg1.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/pkg1.js' does not exist.
File '/src/project/pkg1.jsx' does not exist.
File '/src/pkg1.js' does not exist.
File '/src/pkg1.jsx' does not exist.
File '/pkg1.js' does not exist.
File '/pkg1.jsx' does not exist.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /src/project/pkg0.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /src/project/fileWithTypeRefs.ts 250 undefined Source file
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg2/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /src/project/randomFileForImport.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /src/project/randomFileForTypeRef.ts 250 undefined Source file
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
FileWatcher:: Added:: WatchInfo: /src/project/node_modules/@types/pkg4/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Triggered with /src/project/out.js :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/out.js :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/out.d.ts :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/out.d.ts :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/out.tsbuildinfo :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/out.tsbuildinfo :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:00:44 AM[0m] Found 3 errors. Watching for file changes.

DirectoryWatcher:: Triggered with /src/project/out.tsbuildinfo.readable.baseline.txt :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/out.tsbuildinfo.readable.baseline.txt :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/out.tsbuildinfo.baseline.txt :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/out.tsbuildinfo.baseline.txt :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Wild card directory


Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "failedLookupLocations": [
    "/src/project/pkg1.ts",
    "/src/project/pkg1.tsx",
    "/src/project/pkg1.d.ts",
    "/src/pkg1.ts",
    "/src/pkg1.tsx",
    "/src/pkg1.d.ts",
    "/pkg1.ts",
    "/pkg1.tsx",
    "/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/pkg1.js",
    "/src/project/pkg1.jsx",
    "/src/pkg1.js",
    "/src/pkg1.jsx",
    "/pkg1.js",
    "/pkg1.jsx"
  ]
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/package.json",
    "/src/project/node_modules/pkg3.d.ts",
    "/src/project/node_modules/pkg3/index.d.ts",
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3.d.ts",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/node_modules/pkg3/package.json",
    "/src/node_modules/pkg3.d.ts",
    "/src/node_modules/pkg3/index.d.ts",
    "/src/node_modules/@types/pkg3/package.json",
    "/src/node_modules/@types/pkg3.d.ts",
    "/src/node_modules/@types/pkg3/index.d.ts",
    "/node_modules/pkg3/package.json",
    "/node_modules/pkg3.d.ts",
    "/node_modules/pkg3/index.d.ts",
    "/node_modules/@types/pkg3/package.json",
    "/node_modules/@types/pkg3.d.ts",
    "/node_modules/@types/pkg3/index.d.ts"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js]
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});


//// [/src/project/out.d.ts]
declare module "fileWithImports" { }
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}


//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":842,"kind":"text"}],"hash":"7392736852-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":223,"kind":"text"}],"hash":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./pkg0.d.ts","./filewithimports.ts","./node_modules/pkg2/index.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","769951468-export interface ImportInterface0 {}","17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","-10726455937-export const x = 10;","-10726455937-export const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedTypeReferenceDirective":4,"notPrimary":true},{"resolvedTypeReferenceDirective":8}],"names":["pkg0","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[9,[1]]],"typeRefs":[[9,[2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./fileWithImports.ts",
      "./fileWithTypeRefs.ts",
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 842,
          "kind": "text"
        }
      ],
      "hash": "7392736852-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 223,
          "kind": "text"
        }
      ],
      "hash": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./pkg0.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/index.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "-10726455937-export const x = 10;",
      "./randomfilefortyperef.ts": "-10726455937-export const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 4,
            "notPrimary": true
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 8
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 2,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 2,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3276
}

//// [/src/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-842)
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-223)
declare module "fileWithImports" { }
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}

======================================================================


Change:: modify randomFileForImport by adding import

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /src/project/randomFileForImport.ts 1:: WatchInfo: /src/project/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /src/project/randomFileForImport.ts 1:: WatchInfo: /src/project/randomFileForImport.ts 250 undefined Source file
Synchronizing program
[[90m12:00:51 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:00:58 AM[0m] Found 3 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "failedLookupLocations": [
    "/src/project/pkg1.ts",
    "/src/project/pkg1.tsx",
    "/src/project/pkg1.d.ts",
    "/src/pkg1.ts",
    "/src/pkg1.tsx",
    "/src/pkg1.d.ts",
    "/pkg1.ts",
    "/pkg1.tsx",
    "/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/pkg1.js",
    "/src/project/pkg1.jsx",
    "/src/pkg1.js",
    "/src/pkg1.jsx",
    "/pkg1.js",
    "/pkg1.jsx"
  ]
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/package.json",
    "/src/project/node_modules/pkg3.d.ts",
    "/src/project/node_modules/pkg3/index.d.ts",
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3.d.ts",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/node_modules/pkg3/package.json",
    "/src/node_modules/pkg3.d.ts",
    "/src/node_modules/pkg3/index.d.ts",
    "/src/node_modules/@types/pkg3/package.json",
    "/src/node_modules/@types/pkg3.d.ts",
    "/src/node_modules/@types/pkg3/index.d.ts",
    "/node_modules/pkg3/package.json",
    "/node_modules/pkg3.d.ts",
    "/node_modules/pkg3/index.d.ts",
    "/node_modules/@types/pkg3/package.json",
    "/node_modules/@types/pkg3.d.ts",
    "/node_modules/@types/pkg3/index.d.ts"
  ]
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js] file written with same contents
//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":842,"kind":"text"}],"hash":"7392736852-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":223,"kind":"text"}],"hash":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./pkg0.d.ts","./filewithimports.ts","./node_modules/pkg2/index.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","769951468-export interface ImportInterface0 {}","17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-10726455937-export const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedTypeReferenceDirective":4,"notPrimary":true},{"resolvedTypeReferenceDirective":8}],"names":["pkg0","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[9,[1]]],"typeRefs":[[9,[2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./fileWithImports.ts",
      "./fileWithTypeRefs.ts",
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 842,
          "kind": "text"
        }
      ],
      "hash": "7392736852-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 223,
          "kind": "text"
        }
      ],
      "hash": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./pkg0.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/index.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./randomfilefortyperef.ts": "-10726455937-export const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 4,
            "notPrimary": true
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 8
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 2,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 2,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3324
}

//// [/src/project/out.tsbuildinfo.baseline.txt] file written with same contents

Change:: modify randomFileForTypeRef by adding typeRef

Input::
//// [/src/project/randomFileForTypeRef.ts]
/// <reference types="pkg2"/>
export const x = 10;


Output::
FileWatcher:: Triggered with /src/project/randomFileForTypeRef.ts 1:: WatchInfo: /src/project/randomFileForTypeRef.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /src/project/randomFileForTypeRef.ts 1:: WatchInfo: /src/project/randomFileForTypeRef.ts 250 undefined Source file
Synchronizing program
[[90m12:01:07 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts'. ========
Resolution for type reference directive 'pkg2' was found in cache from location '/src/project'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:01:14 AM[0m] Found 3 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "failedLookupLocations": [
    "/src/project/pkg1.ts",
    "/src/project/pkg1.tsx",
    "/src/project/pkg1.d.ts",
    "/src/pkg1.ts",
    "/src/pkg1.tsx",
    "/src/pkg1.d.ts",
    "/pkg1.ts",
    "/pkg1.tsx",
    "/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/pkg1.js",
    "/src/project/pkg1.jsx",
    "/src/pkg1.js",
    "/src/pkg1.jsx",
    "/pkg1.js",
    "/pkg1.jsx"
  ]
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/package.json",
    "/src/project/node_modules/pkg3.d.ts",
    "/src/project/node_modules/pkg3/index.d.ts",
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3.d.ts",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/node_modules/pkg3/package.json",
    "/src/node_modules/pkg3.d.ts",
    "/src/node_modules/pkg3/index.d.ts",
    "/src/node_modules/@types/pkg3/package.json",
    "/src/node_modules/@types/pkg3.d.ts",
    "/src/node_modules/@types/pkg3/index.d.ts",
    "/node_modules/pkg3/package.json",
    "/node_modules/pkg3.d.ts",
    "/node_modules/pkg3/index.d.ts",
    "/node_modules/@types/pkg3/package.json",
    "/node_modules/@types/pkg3.d.ts",
    "/node_modules/@types/pkg3/index.d.ts"
  ]
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js]
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});


//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":876,"kind":"text"}],"hash":"-18578624915-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":223,"kind":"text"}],"hash":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./pkg0.d.ts","./filewithimports.ts","./node_modules/pkg2/index.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","769951468-export interface ImportInterface0 {}","17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedTypeReferenceDirective":4,"notPrimary":true},{"resolvedTypeReferenceDirective":8}],"names":["pkg0","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[9,[1]]],"typeRefs":[[9,[2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./fileWithImports.ts",
      "./fileWithTypeRefs.ts",
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 876,
          "kind": "text"
        }
      ],
      "hash": "-18578624915-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 223,
          "kind": "text"
        }
      ],
      "hash": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./pkg0.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/index.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 4,
            "notPrimary": true
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 8
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 2,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 2,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3395
}

//// [/src/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-876)
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-223)
declare module "fileWithImports" { }
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}

======================================================================


Change:: write file not resolved by import

Input::
//// [/src/project/pkg1.d.ts]
export interface RequireInterface1 {}


Output::
DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Wild card directory
Project: /src/project/tsconfig.json Detected excluded file: /src/project/pkg1.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Wild card directory
Scheduling update
Synchronizing program
[[90m12:01:24 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg1' was successfully resolved to '/src/project/pkg1.d.ts'. ========
FileWatcher:: Added:: WatchInfo: /src/project/pkg1.d.ts 250 undefined Source file
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Failed Lookup Locations
[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
pkg1.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:01:31 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/pkg1.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg1.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/package.json",
    "/src/project/node_modules/pkg3.d.ts",
    "/src/project/node_modules/pkg3/index.d.ts",
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3.d.ts",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/node_modules/pkg3/package.json",
    "/src/node_modules/pkg3.d.ts",
    "/src/node_modules/pkg3/index.d.ts",
    "/src/node_modules/@types/pkg3/package.json",
    "/src/node_modules/@types/pkg3.d.ts",
    "/src/node_modules/@types/pkg3/index.d.ts",
    "/node_modules/pkg3/package.json",
    "/node_modules/pkg3.d.ts",
    "/node_modules/pkg3/index.d.ts",
    "/node_modules/@types/pkg3/package.json",
    "/node_modules/@types/pkg3.d.ts",
    "/node_modules/@types/pkg3/index.d.ts"
  ]
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js] file written with same contents
//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":876,"kind":"text"}],"hash":"-18578624915-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":223,"kind":"text"}],"hash":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./pkg0.d.ts","./pkg1.d.ts","./filewithimports.ts","./node_modules/pkg2/index.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","769951468-export interface ImportInterface0 {}","-3547817137-export interface RequireInterface1 {}","17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedModule":3},{"resolvedTypeReferenceDirective":5,"notPrimary":true},{"resolvedTypeReferenceDirective":9}],"names":["pkg0","pkg1","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"modules":[[10,[1,2]]],"typeRefs":[[10,[3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./fileWithImports.ts",
      "./fileWithTypeRefs.ts",
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 876,
          "kind": "text"
        }
      ],
      "hash": "-18578624915-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 223,
          "kind": "text"
        }
      ],
      "hash": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./pkg0.d.ts",
      "./pkg1.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/index.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./pkg1.d.ts": "-3547817137-export interface RequireInterface1 {}",
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 3
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg1.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 5,
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 9
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg0",
        "pkg1",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg1.d.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./pkg1.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 3,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3499
}

//// [/src/project/out.tsbuildinfo.baseline.txt] file written with same contents

Change:: write file not resolved by typeRef

Input::
//// [/src/project/node_modules/pkg3/index.d.ts]
export {};
declare global {
    interface RequireInterface3 {}
}



Output::
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:01:42 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg1.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3/package.json' does not exist.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/pkg3/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg3/index.d.ts', result '/src/project/node_modules/pkg3/index.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts', primary: false. ========
FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg3/index.d.ts 250 undefined Source file
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
../../a/lib/lib.d.ts
  Default library for target 'es5'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
pkg1.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
node_modules/pkg3/index.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:01:49 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/pkg1.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/node_modules/pkg3/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg1.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg3/index.d.ts",
    "isExternalLibraryImport": true
  }
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}
/src/project/pkg1.d.ts:
  {}
/src/project/node_modules/pkg3/index.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules/@types:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js] file written with same contents
//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":876,"kind":"text"}],"hash":"-18578624915-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":223,"kind":"text"}],"hash":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./pkg0.d.ts","./pkg1.d.ts","./filewithimports.ts","./node_modules/pkg2/index.d.ts","./node_modules/pkg3/index.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","769951468-export interface ImportInterface0 {}","-3547817137-export interface RequireInterface1 {}","17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedModule":3},{"resolvedTypeReferenceDirective":5,"notPrimary":true},{"resolvedTypeReferenceDirective":6,"notPrimary":true},{"resolvedTypeReferenceDirective":10}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[11,[1,2]]],"typeRefs":[[11,[3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./fileWithImports.ts",
      "./fileWithTypeRefs.ts",
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 876,
          "kind": "text"
        }
      ],
      "hash": "-18578624915-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 223,
          "kind": "text"
        }
      ],
      "hash": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./pkg0.d.ts",
      "./pkg1.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/index.d.ts",
      "./node_modules/pkg3/index.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./pkg1.d.ts": "-3547817137-export interface RequireInterface1 {}",
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./node_modules/pkg3/index.d.ts": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-19355952260-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 3
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg1.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 5,
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 6,
            "notPrimary": true
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 10
          },
          "resolutionId": 5,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg0",
        "pkg1",
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg1.d.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 5,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./pkg1.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 3,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 5,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3687
}

//// [/src/project/out.tsbuildinfo.baseline.txt] file written with same contents

Change:: delete file with imports

Input::
//// [/src/project/fileWithImports.ts] deleted

Output::
FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Wild card directory
Reloading new file names and options
Synchronizing program
[[90m12:01:57 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
FileWatcher:: Close:: WatchInfo: /src/project/pkg1.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /src/project/fileWithImports.ts 250 undefined Source file
../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
node_modules/pkg3/index.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
pkg0.d.ts
  Imported via "pkg0" from file 'randomFileForImport.ts'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:02:07 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/node_modules/pkg3/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/pkg0.d.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg3/index.d.ts",
    "isExternalLibraryImport": true
  }
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/pkg0.d.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}
/src/project/node_modules/pkg3/index.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules/@types:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js]
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});


//// [/src/project/out.d.ts]
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}


//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":707,"kind":"text"}],"hash":"34328935995-define(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":186,"kind":"text"}],"hash":"-27533230922-declare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg2/index.d.ts","./node_modules/pkg3/index.d.ts","./filewithtyperefs.ts","./pkg0.d.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","769951468-export interface ImportInterface0 {}","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-27533230922-declare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":5},{"resolvedTypeReferenceDirective":2,"notPrimary":true},{"resolvedTypeReferenceDirective":3,"notPrimary":true},{"resolvedTypeReferenceDirective":8}],"names":["pkg0","pkg2","pkg3","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"modules":[[9,[1]]],"typeRefs":[[9,[2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./fileWithTypeRefs.ts",
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 707,
          "kind": "text"
        }
      ],
      "hash": "34328935995-define(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 186,
          "kind": "text"
        }
      ],
      "hash": "-27533230922-declare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg2/index.d.ts",
      "./node_modules/pkg3/index.d.ts",
      "./filewithtyperefs.ts",
      "./pkg0.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./node_modules/pkg3/index.d.ts": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-27533230922-declare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 5
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 2,
            "notPrimary": true
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 3,
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 8
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 2,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 2,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3158
}

//// [/src/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-707)
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-186)
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}

======================================================================


Change:: delete file with typeRefs

Input::
//// [/src/project/fileWithTypeRefs.ts] deleted

Output::
FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Wild card directory
Reloading new file names and options
Synchronizing program
[[90m12:02:16 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
FileWatcher:: Close:: WatchInfo: /src/project/node_modules/pkg3/index.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /src/project/fileWithTypeRefs.ts 250 undefined Source file
../../a/lib/lib.d.ts
  Default library for target 'es5'
pkg0.d.ts
  Imported via "pkg0" from file 'randomFileForImport.ts'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:02:26 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/randomFileForImport.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/pkg0.d.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}

FsWatchesRecursive::
/src/project/node_modules/@types:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js]
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});


//// [/src/project/out.d.ts]
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}


//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":469,"kind":"text"}],"hash":"-34049342926-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":133,"kind":"text"}],"hash":"-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./pkg0.d.ts","./randomfileforimport.ts","./node_modules/pkg2/index.d.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","769951468-export interface ImportInterface0 {}","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedTypeReferenceDirective":4,"notPrimary":true},{"resolvedTypeReferenceDirective":6}],"names":["pkg0","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[7,[1]]],"typeRefs":[[7,[2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 469,
          "kind": "text"
        }
      ],
      "hash": "-34049342926-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 133,
          "kind": "text"
        }
      ],
      "hash": "-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./pkg0.d.ts",
      "./randomfileforimport.ts",
      "./node_modules/pkg2/index.d.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 4,
            "notPrimary": true
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 6
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 2,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 2,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2383
}

//// [/src/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-469)
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-133)
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}

======================================================================


Change:: delete resolved import file

Input::
//// [/src/project/pkg0.d.ts] deleted

Output::
FileWatcher:: Triggered with /src/project/pkg0.d.ts 2:: WatchInfo: /src/project/pkg0.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /src/project/pkg0.d.ts 2:: WatchInfo: /src/project/pkg0.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /src/project/pkg0.d.ts :: WatchInfo: /src/project 0 undefined Wild card directory
Project: /src/project/tsconfig.json Detected excluded file: /src/project/pkg0.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg0.d.ts :: WatchInfo: /src/project 0 undefined Wild card directory
Synchronizing program
[[90m12:02:34 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
FileWatcher:: Close:: WatchInfo: /src/project/pkg0.d.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' does not exist.
File '/src/pkg0.ts' does not exist.
File '/src/pkg0.tsx' does not exist.
File '/src/pkg0.d.ts' does not exist.
File '/pkg0.ts' does not exist.
File '/pkg0.tsx' does not exist.
File '/pkg0.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg0.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/pkg0.js' does not exist.
File '/src/project/pkg0.jsx' does not exist.
File '/src/pkg0.js' does not exist.
File '/src/pkg0.jsx' does not exist.
File '/pkg0.js' does not exist.
File '/pkg0.jsx' does not exist.
======== Module name 'pkg0' was not resolved. ========
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Failed Lookup Locations
[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg0'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m1[0m import type { ImportInterface0 } from "pkg0";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:02:41 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/randomFileForImport.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "failedLookupLocations": [
    "/src/project/pkg0.ts",
    "/src/project/pkg0.tsx",
    "/src/project/pkg0.d.ts",
    "/src/pkg0.ts",
    "/src/pkg0.tsx",
    "/src/pkg0.d.ts",
    "/pkg0.ts",
    "/pkg0.tsx",
    "/pkg0.d.ts",
    "/src/project/node_modules/@types/pkg0/package.json",
    "/src/project/node_modules/@types/pkg0.d.ts",
    "/src/project/node_modules/@types/pkg0/index.d.ts",
    "/src/node_modules/@types/pkg0/package.json",
    "/src/node_modules/@types/pkg0.d.ts",
    "/src/node_modules/@types/pkg0/index.d.ts",
    "/node_modules/@types/pkg0/package.json",
    "/node_modules/@types/pkg0.d.ts",
    "/node_modules/@types/pkg0/index.d.ts",
    "/src/project/pkg0.js",
    "/src/project/pkg0.jsx",
    "/src/pkg0.js",
    "/src/pkg0.jsx",
    "/pkg0.js",
    "/pkg0.jsx"
  ]
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}

FsWatchesRecursive::
/src/project/node_modules/@types:
  {}
/src/project/node_modules:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js] file written with same contents
//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":469,"kind":"text"}],"hash":"-34049342926-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":133,"kind":"text"}],"hash":"-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./randomfileforimport.ts","./node_modules/pkg2/index.d.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedTypeReferenceDirective":3,"notPrimary":true},{"resolvedTypeReferenceDirective":5}],"names":["pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2]],"typeRefs":[[6,[1,2]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 469,
          "kind": "text"
        }
      ],
      "hash": "-34049342926-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 133,
          "kind": "text"
        }
      ],
      "hash": "-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./randomfileforimport.ts",
      "./node_modules/pkg2/index.d.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedTypeReferenceDirective": 3,
            "notPrimary": true
          },
          "resolutionId": 1,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 5
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 1,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 1,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 2,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2266
}

//// [/src/project/out.tsbuildinfo.baseline.txt] file written with same contents

Change:: delete resolved typeRef file

Input::
//// [/src/project/node_modules/pkg2/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts 2:: WatchInfo: /src/project/node_modules/pkg2/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts 2:: WatchInfo: /src/project/node_modules/pkg2/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Synchronizing program
[[90m12:02:49 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
  options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
FileWatcher:: Close:: WatchInfo: /src/project/node_modules/pkg2/index.d.ts 250 undefined Source file
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg2.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg2' was not resolved. ========
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg0'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m1[0m import type { ImportInterface0 } from "pkg0";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForTypeRef.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg2'.

[7m1[0m /// <reference types="pkg2"/>
[7m [0m [91m                      ~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:02:56 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "failedLookupLocations": [
    "/src/project/pkg0.ts",
    "/src/project/pkg0.tsx",
    "/src/project/pkg0.d.ts",
    "/src/pkg0.ts",
    "/src/pkg0.tsx",
    "/src/pkg0.d.ts",
    "/pkg0.ts",
    "/pkg0.tsx",
    "/pkg0.d.ts",
    "/src/project/node_modules/@types/pkg0/package.json",
    "/src/project/node_modules/@types/pkg0.d.ts",
    "/src/project/node_modules/@types/pkg0/index.d.ts",
    "/src/node_modules/@types/pkg0/package.json",
    "/src/node_modules/@types/pkg0.d.ts",
    "/src/node_modules/@types/pkg0/index.d.ts",
    "/node_modules/@types/pkg0/package.json",
    "/node_modules/@types/pkg0.d.ts",
    "/node_modules/@types/pkg0/index.d.ts",
    "/src/project/pkg0.js",
    "/src/project/pkg0.jsx",
    "/src/pkg0.js",
    "/src/pkg0.jsx",
    "/pkg0.js",
    "/pkg0.jsx"
  ]
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg2/package.json",
    "/src/project/node_modules/@types/pkg2/index.d.ts",
    "/src/project/node_modules/pkg2/package.json",
    "/src/project/node_modules/pkg2.d.ts",
    "/src/project/node_modules/pkg2/index.d.ts",
    "/src/project/node_modules/@types/pkg2/package.json",
    "/src/project/node_modules/@types/pkg2.d.ts",
    "/src/project/node_modules/@types/pkg2/index.d.ts",
    "/src/node_modules/pkg2/package.json",
    "/src/node_modules/pkg2.d.ts",
    "/src/node_modules/pkg2/index.d.ts",
    "/src/node_modules/@types/pkg2/package.json",
    "/src/node_modules/@types/pkg2.d.ts",
    "/src/node_modules/@types/pkg2/index.d.ts",
    "/node_modules/pkg2/package.json",
    "/node_modules/pkg2.d.ts",
    "/node_modules/pkg2/index.d.ts",
    "/node_modules/@types/pkg2/package.json",
    "/node_modules/@types/pkg2.d.ts",
    "/node_modules/@types/pkg2/index.d.ts"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/node_modules/@types/pkg4/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project:
  {}

FsWatchesRecursive::
/src/project/node_modules/@types:
  {}
/src/project/node_modules:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/out.js] file written with same contents
//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":469,"kind":"text"}],"hash":"-34049342926-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":133,"kind":"text"}],"hash":"-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedTypeReferenceDirective":4}],"names":["pkg4"],"resolutionEntries":[[1,1]],"typeRefs":[[5,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 469,
          "kind": "text"
        }
      ],
      "hash": "-34049342926-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 133,
          "kind": "text"
        }
      ],
      "hash": "-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-5552028765-declare module \"randomFileForImport\" {\n    export const x = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedTypeReferenceDirective": 4
          },
          "resolutionId": 1,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
        }
      ],
      "names": [
        "pkg4"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 1,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 1,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2081
}

//// [/src/project/out.tsbuildinfo.baseline.txt] file written with same contents
