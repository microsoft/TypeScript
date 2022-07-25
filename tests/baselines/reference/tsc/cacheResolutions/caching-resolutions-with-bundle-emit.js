Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { RequireInterface1 } from "pkg1";


//// [/src/project/fileWithTypeRefs.ts]
/// <reference types="pkg2"/>
/// <reference types="pkg3"/>
interface LocalInterface extends ImportInterface2, RequireInterface3 {}
export {}


//// [/src/project/node_modules/@types/pkg4/index.d.ts]
export const x = 10;

//// [/src/project/node_modules/pkg2/index.d.ts]
export {};
declare global {
    interface ImportInterface2 {}
}


//// [/src/project/pkg0.d.ts]
export interface ImportInterface0 {}

//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/randomFileForTypeRef.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"module":"amd","composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js"},"include":["*.ts"],"exclude":["*.d.ts"]}



Output::
/lib/tsc -p /src/project --explainFiles
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
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts'
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'

Found 3 errors in 2 files.

Errors  Files
     1  src/project/fileWithImports.ts[90m:2[0m
     2  src/project/fileWithTypeRefs.ts[90m:2[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/out.d.ts]
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


//// [/out.js]
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});


//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/fileWithImports.ts","./src/project/fileWithTypeRefs.ts","./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":720,"kind":"text"}],"hash":"-33929071846-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":233,"kind":"text"}],"hash":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/filewithimports.ts","./src/project/filewithtyperefs.ts","./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/pkg0.d.ts","./src/project/node_modules/pkg2/index.d.ts","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","-10726455937-export const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6}},{"resolvedTypeReferenceDirective":{"resolvedFileName":7,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":8,"isExternalLibraryImport":true}}],"names":["pkg0","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[5,[1]]],"typeRefs":[[5,[2,3]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-720)
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-233)
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

//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/fileWithImports.ts",
      "./src/project/fileWithTypeRefs.ts",
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 720,
          "kind": "text"
        }
      ],
      "hash": "-33929071846-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 233,
          "kind": "text"
        }
      ],
      "hash": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/filewithimports.ts",
      "./src/project/filewithtyperefs.ts",
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/pkg0.d.ts",
      "./src/project/node_modules/pkg2/index.d.ts",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./src/project/filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./src/project/randomfileforimport.ts": "-10726455937-export const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg0.d.ts"
          }
        },
        {
          "id": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg0.d.ts"
            }
          }
        ],
        [
          "pkg2",
          {
            "id": 2,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg4",
          {
            "id": 3,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./src/project",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg0.d.ts"
                }
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg2",
              {
                "id": 2,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg4",
              {
                "id": 3,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2929
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
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
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts'
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'

Found 3 errors in 2 files.

Errors  Files
     1  src/project/fileWithImports.ts[90m:2[0m
     2  src/project/fileWithTypeRefs.ts[90m:2[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/out.js] file written with same contents
//// [/out.tsbuildinfo] file written with same contents
//// [/out.tsbuildinfo.baseline.txt] file written with same contents
//// [/out.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: modify randomFileForImport by adding import
Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
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
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts'
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'

Found 3 errors in 2 files.

Errors  Files
     1  src/project/fileWithImports.ts[90m:2[0m
     2  src/project/fileWithTypeRefs.ts[90m:2[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/out.js] file written with same contents
//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/fileWithImports.ts","./src/project/fileWithTypeRefs.ts","./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":720,"kind":"text"}],"hash":"-33929071846-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":233,"kind":"text"}],"hash":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/filewithimports.ts","./src/project/filewithtyperefs.ts","./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/pkg0.d.ts","./src/project/node_modules/pkg2/index.d.ts","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6}},{"resolvedTypeReferenceDirective":{"resolvedFileName":7,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":8,"isExternalLibraryImport":true}}],"names":["pkg0","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[5,[1]]],"typeRefs":[[5,[2,3]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt] file written with same contents
//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/fileWithImports.ts",
      "./src/project/fileWithTypeRefs.ts",
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 720,
          "kind": "text"
        }
      ],
      "hash": "-33929071846-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 233,
          "kind": "text"
        }
      ],
      "hash": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/filewithimports.ts",
      "./src/project/filewithtyperefs.ts",
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/pkg0.d.ts",
      "./src/project/node_modules/pkg2/index.d.ts",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./src/project/filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./src/project/randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg0.d.ts"
          }
        },
        {
          "id": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg0.d.ts"
            }
          }
        ],
        [
          "pkg2",
          {
            "id": 2,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg4",
          {
            "id": 3,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./src/project",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg0.d.ts"
                }
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg2",
              {
                "id": 2,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg4",
              {
                "id": 3,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2977
}



Change:: modify randomFileForTypeRef by adding typeRef
Input::
//// [/src/project/randomFileForTypeRef.ts]
/// <reference types="pkg2"/>
export const x = 10;



Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
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
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts'
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'

Found 3 errors in 2 files.

Errors  Files
     1  src/project/fileWithImports.ts[90m:2[0m
     2  src/project/fileWithTypeRefs.ts[90m:2[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/out.js]
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});


//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/fileWithImports.ts","./src/project/fileWithTypeRefs.ts","./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":755,"kind":"text"}],"hash":"-55698848480-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":233,"kind":"text"}],"hash":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/filewithimports.ts","./src/project/filewithtyperefs.ts","./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/pkg0.d.ts","./src/project/node_modules/pkg2/index.d.ts","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6}},{"resolvedTypeReferenceDirective":{"resolvedFileName":7,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":8,"isExternalLibraryImport":true}}],"names":["pkg0","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[5,[1]]],"typeRefs":[[5,[2,3]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-755)
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-233)
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

//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/fileWithImports.ts",
      "./src/project/fileWithTypeRefs.ts",
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 755,
          "kind": "text"
        }
      ],
      "hash": "-55698848480-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 233,
          "kind": "text"
        }
      ],
      "hash": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/filewithimports.ts",
      "./src/project/filewithtyperefs.ts",
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/pkg0.d.ts",
      "./src/project/node_modules/pkg2/index.d.ts",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./src/project/filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./src/project/randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg0.d.ts"
          }
        },
        {
          "id": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg0.d.ts"
            }
          }
        ],
        [
          "pkg2",
          {
            "id": 2,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg4",
          {
            "id": 3,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./src/project",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg0.d.ts"
                }
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg2",
              {
                "id": 2,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg4",
              {
                "id": 3,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3048
}



Change:: write file not resolved by import
Input::
//// [/src/project/pkg1.d.ts]
export interface RequireInterface1 {}



Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg1' was successfully resolved to '/src/project/pkg1.d.ts'. ========
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96msrc/project/fileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
src/project/pkg1.d.ts
  Imported via "pkg1" from file 'src/project/fileWithImports.ts'
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts'
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'

Found 2 errors in the same file, starting at: src/project/fileWithTypeRefs.ts[90m:2[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/out.js] file written with same contents
//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/fileWithImports.ts","./src/project/fileWithTypeRefs.ts","./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":755,"kind":"text"}],"hash":"-55698848480-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":233,"kind":"text"}],"hash":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/filewithimports.ts","./src/project/filewithtyperefs.ts","./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/pkg0.d.ts","./src/project/pkg1.d.ts","./src/project/node_modules/pkg2/index.d.ts","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6}},{"resolvedModule":{"resolvedFileName":7}},{"resolvedTypeReferenceDirective":{"resolvedFileName":8,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":9,"isExternalLibraryImport":true}}],"names":["pkg0","pkg1","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"modules":[[5,[1,2]]],"typeRefs":[[5,[3,4]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt] file written with same contents
//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/fileWithImports.ts",
      "./src/project/fileWithTypeRefs.ts",
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 755,
          "kind": "text"
        }
      ],
      "hash": "-55698848480-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 233,
          "kind": "text"
        }
      ],
      "hash": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/filewithimports.ts",
      "./src/project/filewithtyperefs.ts",
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/pkg0.d.ts",
      "./src/project/pkg1.d.ts",
      "./src/project/node_modules/pkg2/index.d.ts",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./src/project/filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./src/project/randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg0.d.ts"
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg1.d.ts"
          }
        },
        {
          "id": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 4,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg1",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg0.d.ts"
            }
          }
        ],
        [
          "pkg1",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg1.d.ts"
            }
          }
        ],
        [
          "pkg2",
          {
            "id": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg4",
          {
            "id": 4,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./src/project",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg0.d.ts"
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg1.d.ts"
                }
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg2",
              {
                "id": 3,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg4",
              {
                "id": 4,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3131
}



Change:: write file not resolved by typeRef
Input::
//// [/src/project/node_modules/pkg3/index.d.ts]
export {};
declare global {
    interface RequireInterface3 {}
}




Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg1.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3/package.json' does not exist.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/pkg3/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg3/index.d.ts', result '/src/project/node_modules/pkg3/index.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts', primary: false. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
src/project/pkg1.d.ts
  Imported via "pkg1" from file 'src/project/fileWithImports.ts'
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts'
src/project/node_modules/pkg3/index.d.ts
  Type library referenced via 'pkg3' from file 'src/project/fileWithTypeRefs.ts'
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
exitCode:: ExitStatus.Success


//// [/out.js] file written with same contents
//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/fileWithImports.ts","./src/project/fileWithTypeRefs.ts","./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":755,"kind":"text"}],"hash":"-55698848480-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":233,"kind":"text"}],"hash":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/filewithimports.ts","./src/project/filewithtyperefs.ts","./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/pkg0.d.ts","./src/project/pkg1.d.ts","./src/project/node_modules/pkg2/index.d.ts","./src/project/node_modules/pkg3/index.d.ts","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6}},{"resolvedModule":{"resolvedFileName":7}},{"resolvedTypeReferenceDirective":{"resolvedFileName":8,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"resolvedFileName":9,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":10,"isExternalLibraryImport":true}}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[5,[1,2]]],"typeRefs":[[5,[3,4,5]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt] file written with same contents
//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/fileWithImports.ts",
      "./src/project/fileWithTypeRefs.ts",
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 755,
          "kind": "text"
        }
      ],
      "hash": "-55698848480-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n});\r\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 233,
          "kind": "text"
        }
      ],
      "hash": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/filewithimports.ts",
      "./src/project/filewithtyperefs.ts",
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/pkg0.d.ts",
      "./src/project/pkg1.d.ts",
      "./src/project/node_modules/pkg2/index.d.ts",
      "./src/project/node_modules/pkg3/index.d.ts",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./src/project/filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./src/project/randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "407350366-declare module \"fileWithImports\" { }\r\ndeclare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg0.d.ts"
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg1.d.ts"
          }
        },
        {
          "id": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 4,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg3/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 5,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
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
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg0.d.ts"
            }
          }
        ],
        [
          "pkg1",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg1.d.ts"
            }
          }
        ],
        [
          "pkg2",
          {
            "id": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg3",
          {
            "id": 4,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg3/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg4",
          {
            "id": 5,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./src/project",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg0.d.ts"
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg1.d.ts"
                }
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg2",
              {
                "id": 3,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg3",
              {
                "id": 4,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg3/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg4",
              {
                "id": 5,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3281
}



Change:: delete file with imports
Input::
//// [/src/project/fileWithImports.ts] unlink


Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts'
src/project/node_modules/pkg3/index.d.ts
  Type library referenced via 'pkg3' from file 'src/project/fileWithTypeRefs.ts'
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
exitCode:: ExitStatus.Success


//// [/out.d.ts]
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}


//// [/out.js]
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});


//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/fileWithTypeRefs.ts","./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":618,"kind":"text"}],"hash":"34658062304-define(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":195,"kind":"text"}],"hash":"-4475206613-declare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/filewithtyperefs.ts","./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/pkg0.d.ts","./src/project/node_modules/pkg2/index.d.ts","./src/project/node_modules/pkg3/index.d.ts","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-4475206613-declare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":5}},{"resolvedTypeReferenceDirective":{"resolvedFileName":6,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"resolvedFileName":7,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":8,"isExternalLibraryImport":true}}],"names":["pkg0","pkg2","pkg3","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"modules":[[4,[1]]],"typeRefs":[[4,[2,3,4]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-618)
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-195)
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

//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/fileWithTypeRefs.ts",
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 618,
          "kind": "text"
        }
      ],
      "hash": "34658062304-define(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    /// <reference types=\"pkg2\"/>\r\n    /// <reference types=\"pkg3\"/>\r\n});\r\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 195,
          "kind": "text"
        }
      ],
      "hash": "-4475206613-declare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/filewithtyperefs.ts",
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/pkg0.d.ts",
      "./src/project/node_modules/pkg2/index.d.ts",
      "./src/project/node_modules/pkg3/index.d.ts",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./src/project/randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-4475206613-declare module \"fileWithTypeRefs\" {\r\n    export {};\r\n}\r\ndeclare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg0.d.ts"
          }
        },
        {
          "id": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg3/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 4,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg0.d.ts"
            }
          }
        ],
        [
          "pkg2",
          {
            "id": 2,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg3",
          {
            "id": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg3/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg4",
          {
            "id": 4,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./src/project",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg0.d.ts"
                }
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg2",
              {
                "id": 2,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg3",
              {
                "id": 3,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg3/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg4",
              {
                "id": 4,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2779
}



Change:: delete file with typeRefs
Input::
//// [/src/project/fileWithTypeRefs.ts] unlink


Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/randomFileForTypeRef.ts'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
exitCode:: ExitStatus.Success


//// [/out.d.ts]
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}


//// [/out.js]
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});


//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":410,"kind":"text"}],"hash":"-1805293105-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":139,"kind":"text"}],"hash":"-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/pkg0.d.ts","./src/project/node_modules/pkg2/index.d.ts","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":4}},{"resolvedTypeReferenceDirective":{"resolvedFileName":5,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":6,"isExternalLibraryImport":true}}],"names":["pkg0","pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[3,[1]]],"typeRefs":[[3,[2,3]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-410)
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-139)
declare module "randomFileForImport" {
    export const x = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}

======================================================================

//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 410,
          "kind": "text"
        }
      ],
      "hash": "-1805293105-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 139,
          "kind": "text"
        }
      ],
      "hash": "-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/pkg0.d.ts",
      "./src/project/node_modules/pkg2/index.d.ts",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./src/project/pkg0.d.ts"
          }
        },
        {
          "id": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./src/project/pkg0.d.ts"
            }
          }
        ],
        [
          "pkg2",
          {
            "id": 2,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg4",
          {
            "id": 3,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./src/project",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./src/project/pkg0.d.ts"
                }
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg2",
              {
                "id": 2,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg4",
              {
                "id": 3,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2033
}



Change:: delete resolved import file
Input::
//// [/src/project/pkg0.d.ts] unlink


Output::
/lib/tsc -p /src/project --explainFiles
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
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96msrc/project/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg0'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m1[0m import type { ImportInterface0 } from "pkg0";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'src/project/randomFileForTypeRef.ts'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'

Found 1 error in src/project/randomFileForImport.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/out.js] file written with same contents
//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":410,"kind":"text"}],"hash":"-1805293105-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":139,"kind":"text"}],"hash":"-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/node_modules/pkg2/index.d.ts","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedTypeReferenceDirective":{"resolvedFileName":4,"isExternalLibraryImport":true}},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":5,"isExternalLibraryImport":true}}],"names":["pkg2","pkg4"],"resolutionEntries":[[1,1],[2,2]],"typeRefs":[[3,[1,2]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt] file written with same contents
//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 410,
          "kind": "text"
        }
      ],
      "hash": "-1805293105-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 139,
          "kind": "text"
        }
      ],
      "hash": "-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/node_modules/pkg2/index.d.ts",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg2",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg2",
          {
            "id": 1,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg4",
          {
            "id": 2,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg2",
              {
                "id": 1,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./src/project/node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg4",
              {
                "id": 2,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1932
}



Change:: delete resolved typeRef file
Input::
//// [/src/project/node_modules/pkg2/index.d.ts] unlink


Output::
/lib/tsc -p /src/project --explainFiles
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
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96msrc/project/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg0'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m1[0m import type { ImportInterface0 } from "pkg0";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/randomFileForTypeRef.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg2'.

[7m1[0m /// <reference types="pkg2"/>
[7m [0m [91m                      ~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'

Found 2 errors in 2 files.

Errors  Files
     1  src/project/randomFileForImport.ts[90m:1[0m
     1  src/project/randomFileForTypeRef.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/out.js] file written with same contents
//// [/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src/project","sourceFiles":["./src/project/randomFileForImport.ts","./src/project/randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":410,"kind":"text"}],"hash":"-1805293105-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":139,"kind":"text"}],"hash":"-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"}},"program":{"fileNames":["./src/project/randomfileforimport.ts","./src/project/randomfilefortyperef.ts","./src/project","./src/project/node_modules/@types/pkg4/index.d.ts"],"fileInfos":["10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":4,"isExternalLibraryImport":true}}],"names":["pkg4"],"resolutionEntries":[[1,1]],"typeRefs":[[3,[1]]]}},"version":"FakeTSVersion"}

//// [/out.tsbuildinfo.baseline.txt] file written with same contents
//// [/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src/project",
    "sourceFiles": [
      "./src/project/randomFileForImport.ts",
      "./src/project/randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 410,
          "kind": "text"
        }
      ],
      "hash": "-1805293105-define(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.x = void 0;\r\n    /// <reference types=\"pkg2\"/>\r\n    exports.x = 10;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 139,
          "kind": "text"
        }
      ],
      "hash": "-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "./src/project/randomfileforimport.ts",
      "./src/project/randomfilefortyperef.ts",
      "./src/project",
      "./src/project/node_modules/@types/pkg4/index.d.ts"
    ],
    "fileInfos": {
      "./src/project/randomfileforimport.ts": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
      "./src/project/randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-2424074543-declare module \"randomFileForImport\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"randomFileForTypeRef\" {\r\n    export const x = 10;\r\n}\r\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg4",
          {
            "id": 1,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "typeRefs": [
        [
          "./src/project",
          [
            [
              "pkg4",
              {
                "id": 1,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./src/project/node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1783
}

