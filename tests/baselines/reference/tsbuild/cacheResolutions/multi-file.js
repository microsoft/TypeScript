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
import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };


//// [/src/project/fileWithTypeRefs.ts]
/// <reference types="pkg2" resolution-mode="import"/>
/// <reference types="pkg3" resolution-mode="require"/>
interface LocalInterface extends ImportInterface2, RequireInterface3 {}
export {}


//// [/src/project/node_modules/@types/pkg4/index.d.ts]
export const x = 10;

//// [/src/project/node_modules/pkg0/import.d.ts]
export interface ImportInterface0 {}

//// [/src/project/node_modules/pkg0/package.json]
{"name":"pkg0","version":"0.0.1","exports":{"import":"./import.js","require":"./require.js"}}

//// [/src/project/node_modules/pkg0/require.d.ts]
export interface RequireInterface0 {}

//// [/src/project/node_modules/pkg1/import.d.ts]
export interface ImportInterface1 {}

//// [/src/project/node_modules/pkg1/package.json]
{"name":"pkg1","version":"0.0.1","exports":{"import":"./import.js","require":"./require.js"}}

//// [/src/project/node_modules/pkg2/import.d.ts]
export {};
declare global {
    interface ImportInterface2 {}
}


//// [/src/project/node_modules/pkg2/package.json]
{"name":"pkg2","version":"0.0.1","exports":{"import":"./import.js","require":"./require.js"}}

//// [/src/project/node_modules/pkg2/require.d.ts]
export {};
declare global {
    interface RequireInterface2 {}
}


//// [/src/project/node_modules/pkg3/import.d.ts]
export {};
declare global {
    interface ImportInterface3 {}
}


//// [/src/project/node_modules/pkg3/package.json]
{"name":"pkg3","version":"0.0.1","exports":{"import":"./import.js","require":"./require.js"}}

//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/randomFileForTypeRef.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"moduleResolution":"node16","composite":true,"cacheResolutions":true,"traceResolution":true},"include":["*.ts"],"exclude":["*.d.ts"]}



Output::
/lib/tsc -b /src/project --explainFiles
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'node', 'import', 'types'.
File '/src/project/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/src/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg0/import.ts' does not exist.
File '/src/project/node_modules/pkg0/import.tsx' does not exist.
File '/src/project/node_modules/pkg0/import.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in CJS mode with conditions 'node', 'require', 'types'.
File '/src/project/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg1/require.ts' does not exist.
File '/src/project/node_modules/pkg1/require.tsx' does not exist.
File '/src/project/node_modules/pkg1/require.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg1/require.js' does not exist.
File '/src/project/node_modules/pkg1/require.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/src/project/node_modules/pkg2/import.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg2/import.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg3/require.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Directory '/src/project' has no containing package.json scope according to cache.
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/@types/package.json' does not exist.
File '/src/project/node_modules/package.json' does not exist.
Directory '/src/project' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };
[7m [0m [91m                                       ~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3" resolution-mode="require"/>
[7m [0m [91m                      ~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg0/package.json' does not have field "type"
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg2/package.json' does not have field "type"
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
  File is CommonJS module because 'package.json' was not found

Found 3 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/pkg0/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg0",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/fileWithImports.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}
pkg1: commonjs: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/pkg1/require.ts",
    "/src/project/node_modules/pkg1/require.tsx",
    "/src/project/node_modules/pkg1/require.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/pkg1/package.json",
    "/src/node_modules/pkg1.ts",
    "/src/node_modules/pkg1.tsx",
    "/src/node_modules/pkg1.d.ts",
    "/src/node_modules/pkg1/index.ts",
    "/src/node_modules/pkg1/index.tsx",
    "/src/node_modules/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/pkg1/package.json",
    "/node_modules/pkg1.ts",
    "/node_modules/pkg1.tsx",
    "/node_modules/pkg1.d.ts",
    "/node_modules/pkg1/index.ts",
    "/node_modules/pkg1/index.tsx",
    "/node_modules/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/node_modules/pkg1/require.js",
    "/src/project/node_modules/pkg1/require.jsx",
    "/src/node_modules/pkg1/package.json",
    "/src/node_modules/pkg1.js",
    "/src/node_modules/pkg1.jsx",
    "/src/node_modules/pkg1/index.js",
    "/src/node_modules/pkg1/index.jsx",
    "/node_modules/pkg1/package.json",
    "/node_modules/pkg1.js",
    "/node_modules/pkg1.jsx",
    "/node_modules/pkg1/index.js",
    "/node_modules/pkg1/index.jsx"
  ],
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json",
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/node_modules/pkg2/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg2",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/fileWithTypeRefs.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}
pkg3: commonjs: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/require.d.ts",
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
  ],
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/randomFileForImport.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/randomFileForTypeRef.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/@types/pkg4/index.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
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


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg2/package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2],[4]],"referencedMap":[[3,1],[5,2]],"exportedModulesMap":[[3,1],[5,2]],"semanticDiagnosticsPerFile":[1,[3,[{"file":"./filewithimports.ts","start":124,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[5,[{"file":"./filewithtyperefs.ts","start":162,"length":17,"messageText":"Cannot find name 'RequireInterface3'.","category":1,"code":2304}]],8,2,4,6,7],"affectedFilesPendingEmit":[3,5,6,7],"emitSignatures":[3,5,6,7],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[10]},{"resolvedTypeReferenceDirective":{"resolvedFileName":4,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[11],"notPrimary":true},{"resolvedTypeReferenceDirective":8}],"names":["pkg0","pkg2","pkg4"],"hash":[[10,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[11,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,99],[3,3]],"modules":[[9,[1]]],"typeRefs":[[9,[2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/import.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg2/package.json"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/import.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "original": {
          "version": "769951468-export interface ImportInterface0 {}",
          "impliedFormat": 1
        },
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
          "impliedFormat": 1
        },
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "signature": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "original": {
          "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "original": {
          "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
          "impliedFormat": 1
        },
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "signature": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "moduleResolution": 3
    },
    "referencedMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 124,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithtyperefs.ts",
        [
          {
            "file": "./filewithtyperefs.ts",
            "start": 162,
            "length": 17,
            "messageText": "Cannot find name 'RequireInterface3'.",
            "category": 1,
            "code": 2304
          }
        ]
      ],
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./filewithtyperefs.ts",
        "Js | Dts"
      ],
      [
        "./randomfileforimport.ts",
        "Js | Dts"
      ],
      [
        "./randomfilefortyperef.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              10
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/import.d.ts",
            "packageId": {
              "name": "pkg0",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg0/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 4,
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              11
            ],
            "notPrimary": true
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ],
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
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/import.d.ts",
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg0/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            2,
            2,
            99
          ],
          "resolutionEntryId": 2,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/import.d.ts",
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ],
            "notPrimary": true
          },
          "mode": "esnext"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/import.d.ts",
                  "packageId": {
                    "name": "pkg0",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg0/package.json"
                ]
              },
              "mode": "esnext"
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
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/import.d.ts",
                  "packageId": {
                    "name": "pkg2",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ],
                "notPrimary": true
              },
              "mode": "esnext"
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
  "size": 3132
}



Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/project --explainFiles
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in CJS mode with conditions 'node', 'require', 'types'.
File '/src/project/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg1/require.ts' does not exist.
File '/src/project/node_modules/pkg1/require.tsx' does not exist.
File '/src/project/node_modules/pkg1/require.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg1/require.js' does not exist.
File '/src/project/node_modules/pkg1/require.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg3/require.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Directory '/src/project' has no containing package.json scope according to cache.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/package.json' does not exist.
File '/src/project/node_modules/package.json' does not exist.
Directory '/src/project' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };
[7m [0m [91m                                       ~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3" resolution-mode="require"/>
[7m [0m [91m                      ~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg0/package.json' does not have field "type"
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg2/package.json' does not have field "type"
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
  File is CommonJS module because 'package.json' was not found

Found 3 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/pkg0/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg0",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/fileWithImports.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}
pkg1: commonjs: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/pkg1/require.ts",
    "/src/project/node_modules/pkg1/require.tsx",
    "/src/project/node_modules/pkg1/require.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/pkg1/package.json",
    "/src/node_modules/pkg1.ts",
    "/src/node_modules/pkg1.tsx",
    "/src/node_modules/pkg1.d.ts",
    "/src/node_modules/pkg1/index.ts",
    "/src/node_modules/pkg1/index.tsx",
    "/src/node_modules/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/pkg1/package.json",
    "/node_modules/pkg1.ts",
    "/node_modules/pkg1.tsx",
    "/node_modules/pkg1.d.ts",
    "/node_modules/pkg1/index.ts",
    "/node_modules/pkg1/index.tsx",
    "/node_modules/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/node_modules/pkg1/require.js",
    "/src/project/node_modules/pkg1/require.jsx",
    "/src/node_modules/pkg1/package.json",
    "/src/node_modules/pkg1.js",
    "/src/node_modules/pkg1.jsx",
    "/src/node_modules/pkg1/index.js",
    "/src/node_modules/pkg1/index.jsx",
    "/node_modules/pkg1/package.json",
    "/node_modules/pkg1.js",
    "/node_modules/pkg1.jsx",
    "/node_modules/pkg1/index.js",
    "/node_modules/pkg1/index.jsx"
  ],
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json",
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/node_modules/pkg2/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg2",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/fileWithTypeRefs.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}
pkg3: commonjs: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/require.d.ts",
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
  ],
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/randomFileForImport.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/randomFileForTypeRef.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/@types/pkg4/index.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true,
    "primary": true
  }
}




Change:: write file not resolved by import
Input::
//// [/src/project/node_modules/pkg1/require.d.ts]
export interface RequireInterface1 {}



Output::
/lib/tsc -b /src/project --explainFiles
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in CJS mode with conditions 'node', 'require', 'types'.
File '/src/project/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg1/require.ts' does not exist.
File '/src/project/node_modules/pkg1/require.tsx' does not exist.
File '/src/project/node_modules/pkg1/require.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg1/require.d.ts', result '/src/project/node_modules/pkg1/require.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'. ========
File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg3/require.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Directory '/src/project' has no containing package.json scope according to cache.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/package.json' does not exist.
File '/src/project/node_modules/package.json' does not exist.
Directory '/src/project' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
[96msrc/project/fileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

[96msrc/project/fileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3" resolution-mode="require"/>
[7m [0m [91m                      ~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg0/package.json' does not have field "type"
src/project/node_modules/pkg1/require.d.ts
  Imported via "pkg1" from file 'src/project/fileWithImports.ts' with packageId 'pkg1/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg1/package.json' does not have field "type"
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg2/package.json' does not have field "type"
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
  File is CommonJS module because 'package.json' was not found

Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/pkg0/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg0",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/node_modules/pkg1/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg1",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/fileWithImports.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}
pkg1: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg1/require.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "pkg1",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/node_modules/pkg2/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg2",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/fileWithTypeRefs.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}
pkg3: commonjs: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/require.d.ts",
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
  ],
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/randomFileForImport.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/randomFileForTypeRef.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/@types/pkg4/index.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true,
    "primary": true
  }
}


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./node_modules/pkg1/require.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg1/package.json","./node_modules/pkg2/package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"-3547817137-export interface RequireInterface1 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2,3],[5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[[6,2]],"semanticDiagnosticsPerFile":[1,4,[6,[{"file":"./filewithtyperefs.ts","start":162,"length":17,"messageText":"Cannot find name 'RequireInterface3'.","category":1,"code":2304}]],9,2,3,5,7,8],"affectedFilesPendingEmit":[4,6,7,8],"emitSignatures":[4,6,7,8],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[11]},{"resolvedModule":{"resolvedFileName":3,"packageId":{"name":"pkg1","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[12]},{"resolvedTypeReferenceDirective":{"resolvedFileName":5,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[13],"notPrimary":true},{"resolvedTypeReferenceDirective":9}],"names":["pkg0","pkg1","pkg2","pkg4"],"hash":[[11,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[12,"-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[13,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,1],[3,3,99],[4,4]],"modules":[[10,[1,2]]],"typeRefs":[[10,[3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/import.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg1/package.json",
      "./node_modules/pkg2/package.json"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "original": {
          "version": "769951468-export interface ImportInterface0 {}",
          "impliedFormat": 1
        },
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg1/require.d.ts": {
        "original": {
          "version": "-3547817137-export interface RequireInterface1 {}",
          "impliedFormat": 1
        },
        "version": "-3547817137-export interface RequireInterface1 {}",
        "signature": "-3547817137-export interface RequireInterface1 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "original": {
          "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "original": {
          "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
          "impliedFormat": 1
        },
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "signature": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "moduleResolution": 3
    },
    "referencedMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./filewithimports.ts",
      [
        "./filewithtyperefs.ts",
        [
          {
            "file": "./filewithtyperefs.ts",
            "start": 162,
            "length": 17,
            "messageText": "Cannot find name 'RequireInterface3'.",
            "category": 1,
            "code": 2304
          }
        ]
      ],
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./filewithtyperefs.ts",
        "Js | Dts"
      ],
      [
        "./randomfileforimport.ts",
        "Js | Dts"
      ],
      [
        "./randomfilefortyperef.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              11
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/import.d.ts",
            "packageId": {
              "name": "pkg0",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg0/package.json"
          ]
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 3,
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              12
            ]
          },
          "resolutionId": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/require.d.ts",
            "packageId": {
              "name": "pkg1",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg1/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 5,
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              13
            ],
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ],
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
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg1/package.json",
          "-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/import.d.ts",
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg0/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            2,
            2,
            1
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/require.d.ts",
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg1/package.json"
            ]
          },
          "mode": "commonjs"
        },
        {
          "original": [
            3,
            3,
            99
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/import.d.ts",
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ],
            "notPrimary": true
          },
          "mode": "esnext"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/import.d.ts",
                  "packageId": {
                    "name": "pkg0",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg0/package.json"
                ]
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/require.d.ts",
                  "packageId": {
                    "name": "pkg1",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg1/package.json"
                ]
              },
              "mode": "commonjs"
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
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/import.d.ts",
                  "packageId": {
                    "name": "pkg2",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ],
                "notPrimary": true
              },
              "mode": "esnext"
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
  "size": 3453
}



Change:: write file not resolved by typeRef
Input::
//// [/src/project/node_modules/pkg3/require.d.ts]
export {};
declare global {
    interface RequireInterface3 {}
}




Output::
/lib/tsc -b /src/project --explainFiles
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Resolving real path for '/src/project/node_modules/pkg1/require.d.ts', result '/src/project/node_modules/pkg1/require.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'.
File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/src/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg3/require.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg3/require.d.ts', result '/src/project/node_modules/pkg3/require.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1', primary: false. ========
File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Directory '/src/project' has no containing package.json scope according to cache.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/package.json' does not exist.
File '/src/project/node_modules/package.json' does not exist.
Directory '/src/project' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg0/package.json' does not have field "type"
src/project/node_modules/pkg1/require.d.ts
  Imported via "pkg1" from file 'src/project/fileWithImports.ts' with packageId 'pkg1/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg1/package.json' does not have field "type"
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg2/package.json' does not have field "type"
src/project/node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg3/package.json' does not have field "type"
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
  File is CommonJS module because 'package.json' was not found
exitCode:: ExitStatus.Success
File: /lib/lib.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/pkg0/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg0",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/node_modules/pkg1/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg1",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/fileWithImports.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}
pkg1: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg1/require.d.ts",
    "packageId": {
      "name": "pkg1",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/node_modules/pkg2/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg2",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/node_modules/pkg3/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg3",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/fileWithTypeRefs.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}
pkg3: commonjs: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg3/require.d.ts",
    "packageId": {
      "name": "pkg3",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/randomFileForImport.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/randomFileForTypeRef.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/@types/pkg4/index.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true,
    "primary": true
  }
}


//// [/src/project/fileWithImports.d.ts]
export {};


//// [/src/project/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/fileWithTypeRefs.d.ts]
export {};


//// [/src/project/fileWithTypeRefs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg2" resolution-mode="import"/>
/// <reference types="pkg3" resolution-mode="require"/>


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/randomFileForTypeRef.d.ts]
export declare const x = 10;


//// [/src/project/randomFileForTypeRef.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./node_modules/pkg1/require.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./node_modules/pkg3/require.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg1/package.json","./node_modules/pkg2/package.json","./node_modules/pkg3/package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"-3547817137-export interface RequireInterface1 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2,3],[5,6]],"referencedMap":[[4,1],[7,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,7,10,2,3,5,6,8,9],"latestChangedDtsFile":"./randomFileForTypeRef.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[12]},{"resolvedModule":{"resolvedFileName":3,"packageId":{"name":"pkg1","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[13]},{"resolvedTypeReferenceDirective":{"resolvedFileName":5,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[14],"notPrimary":true},{"resolvedTypeReferenceDirective":{"resolvedFileName":6,"packageId":{"name":"pkg3","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[15],"notPrimary":true},{"resolvedTypeReferenceDirective":10}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"hash":[[12,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[13,"-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[14,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[15,"1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,1],[3,3,99],[4,4,1],[5,5]],"modules":[[11,[1,2]]],"typeRefs":[[11,[3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg1/package.json",
      "./node_modules/pkg2/package.json",
      "./node_modules/pkg3/package.json"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "original": {
          "version": "769951468-export interface ImportInterface0 {}",
          "impliedFormat": 1
        },
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg1/require.d.ts": {
        "original": {
          "version": "-3547817137-export interface RequireInterface1 {}",
          "impliedFormat": 1
        },
        "version": "-3547817137-export interface RequireInterface1 {}",
        "signature": "-3547817137-export interface RequireInterface1 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "original": {
          "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "original": {
          "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "original": {
          "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "moduleResolution": 3
    },
    "referencedMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "latestChangedDtsFile": "./randomFileForTypeRef.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              12
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/import.d.ts",
            "packageId": {
              "name": "pkg0",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg0/package.json"
          ]
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 3,
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              13
            ]
          },
          "resolutionId": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/require.d.ts",
            "packageId": {
              "name": "pkg1",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg1/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 5,
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              14
            ],
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ],
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 6,
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              15
            ],
            "notPrimary": true
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ],
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
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg1/package.json",
          "-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/import.d.ts",
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg0/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            2,
            2,
            1
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/require.d.ts",
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg1/package.json"
            ]
          },
          "mode": "commonjs"
        },
        {
          "original": [
            3,
            3,
            99
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/import.d.ts",
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ],
            "notPrimary": true
          },
          "mode": "esnext"
        },
        {
          "original": [
            4,
            4,
            1
          ],
          "resolutionEntryId": 4,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ],
            "notPrimary": true
          },
          "mode": "commonjs"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/import.d.ts",
                  "packageId": {
                    "name": "pkg0",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg0/package.json"
                ]
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/require.d.ts",
                  "packageId": {
                    "name": "pkg1",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg1/package.json"
                ]
              },
              "mode": "commonjs"
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
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/import.d.ts",
                  "packageId": {
                    "name": "pkg2",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ],
                "notPrimary": true
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ],
                "notPrimary": true
              },
              "mode": "commonjs"
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
  "size": 3998
}



Change:: modify randomFileForImport by adding import
Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Resolving real path for '/src/project/node_modules/pkg1/require.d.ts', result '/src/project/node_modules/pkg1/require.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'.
File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Resolving real path for '/src/project/node_modules/pkg3/require.d.ts', result '/src/project/node_modules/pkg3/require.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Directory '/src/project' has no containing package.json scope according to cache.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/package.json' does not exist.
File '/src/project/node_modules/package.json' does not exist.
Directory '/src/project' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg0/package.json' does not have field "type"
src/project/node_modules/pkg1/require.d.ts
  Imported via "pkg1" from file 'src/project/fileWithImports.ts' with packageId 'pkg1/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg1/package.json' does not have field "type"
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg2/package.json' does not have field "type"
src/project/node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg3/package.json' does not have field "type"
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
  File is CommonJS module because 'package.json' was not found
exitCode:: ExitStatus.Success
File: /lib/lib.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/pkg0/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg0",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/node_modules/pkg1/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg1",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/fileWithImports.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}
pkg1: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg1/require.d.ts",
    "packageId": {
      "name": "pkg1",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/node_modules/pkg2/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg2",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/node_modules/pkg3/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg3",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/fileWithTypeRefs.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}
pkg3: commonjs: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg3/require.d.ts",
    "packageId": {
      "name": "pkg3",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/randomFileForImport.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/randomFileForTypeRef.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/@types/pkg4/index.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true,
    "primary": true
  }
}


//// [/src/project/randomFileForImport.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./node_modules/pkg1/require.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./node_modules/pkg3/require.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg1/package.json","./node_modules/pkg2/package.json","./node_modules/pkg3/package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"-3547817137-export interface RequireInterface1 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2,3],[5,6],[2]],"referencedMap":[[4,1],[7,2],[8,3]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,7,10,2,3,5,6,8,9],"latestChangedDtsFile":"./randomFileForTypeRef.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[12]},{"resolvedModule":{"resolvedFileName":3,"packageId":{"name":"pkg1","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[13]},{"resolvedTypeReferenceDirective":{"resolvedFileName":5,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[14],"notPrimary":true},{"resolvedTypeReferenceDirective":{"resolvedFileName":6,"packageId":{"name":"pkg3","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[15],"notPrimary":true},{"resolvedTypeReferenceDirective":10}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"hash":[[12,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[13,"-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[14,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[15,"1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,1],[3,3,99],[4,4,1],[5,5]],"modules":[[11,[1,2]]],"typeRefs":[[11,[3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg1/package.json",
      "./node_modules/pkg2/package.json",
      "./node_modules/pkg3/package.json"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      [
        "./node_modules/pkg0/import.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "original": {
          "version": "769951468-export interface ImportInterface0 {}",
          "impliedFormat": 1
        },
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg1/require.d.ts": {
        "original": {
          "version": "-3547817137-export interface RequireInterface1 {}",
          "impliedFormat": 1
        },
        "version": "-3547817137-export interface RequireInterface1 {}",
        "signature": "-3547817137-export interface RequireInterface1 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "original": {
          "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "original": {
          "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "original": {
          "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "moduleResolution": 3
    },
    "referencedMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/import.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "latestChangedDtsFile": "./randomFileForTypeRef.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              12
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/import.d.ts",
            "packageId": {
              "name": "pkg0",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg0/package.json"
          ]
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 3,
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              13
            ]
          },
          "resolutionId": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/require.d.ts",
            "packageId": {
              "name": "pkg1",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg1/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 5,
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              14
            ],
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ],
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 6,
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              15
            ],
            "notPrimary": true
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ],
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
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg1/package.json",
          "-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/import.d.ts",
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg0/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            2,
            2,
            1
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/require.d.ts",
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg1/package.json"
            ]
          },
          "mode": "commonjs"
        },
        {
          "original": [
            3,
            3,
            99
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/import.d.ts",
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ],
            "notPrimary": true
          },
          "mode": "esnext"
        },
        {
          "original": [
            4,
            4,
            1
          ],
          "resolutionEntryId": 4,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ],
            "notPrimary": true
          },
          "mode": "commonjs"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/import.d.ts",
                  "packageId": {
                    "name": "pkg0",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg0/package.json"
                ]
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/require.d.ts",
                  "packageId": {
                    "name": "pkg1",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg1/package.json"
                ]
              },
              "mode": "commonjs"
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
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/import.d.ts",
                  "packageId": {
                    "name": "pkg2",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ],
                "notPrimary": true
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ],
                "notPrimary": true
              },
              "mode": "commonjs"
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
  "size": 4099
}



Change:: modify randomFileForTypeRef by adding typeRef
Input::
//// [/src/project/randomFileForTypeRef.ts]
/// <reference types="pkg2" resolution-mode="import"/>
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Resolving real path for '/src/project/node_modules/pkg1/require.d.ts', result '/src/project/node_modules/pkg1/require.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'.
File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Resolving real path for '/src/project/node_modules/pkg3/require.d.ts', result '/src/project/node_modules/pkg3/require.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Directory '/src/project' has no containing package.json scope according to cache.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/package.json' does not exist.
File '/src/project/node_modules/package.json' does not exist.
Directory '/src/project' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg0/package.json' does not have field "type"
src/project/node_modules/pkg1/require.d.ts
  Imported via "pkg1" from file 'src/project/fileWithImports.ts' with packageId 'pkg1/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg1/package.json' does not have field "type"
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg2/package.json' does not have field "type"
src/project/node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg3/package.json' does not have field "type"
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
  File is CommonJS module because 'package.json' was not found
exitCode:: ExitStatus.Success
File: /lib/lib.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/pkg0/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg0",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/node_modules/pkg1/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg1",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/fileWithImports.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}
pkg1: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg1/require.d.ts",
    "packageId": {
      "name": "pkg1",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/node_modules/pkg2/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg2",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/node_modules/pkg3/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg3",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/fileWithTypeRefs.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}
pkg3: commonjs: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg3/require.d.ts",
    "packageId": {
      "name": "pkg3",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/randomFileForImport.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/randomFileForTypeRef.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/node_modules/@types/pkg4/index.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true,
    "primary": true
  }
}


//// [/src/project/randomFileForTypeRef.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/// <reference types="pkg2" resolution-mode="import"/>
exports.x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./node_modules/pkg1/require.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./node_modules/pkg3/require.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg1/package.json","./node_modules/pkg2/package.json","./node_modules/pkg3/package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"-3547817137-export interface RequireInterface1 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2,3],[5,6],[2],[5]],"referencedMap":[[4,1],[7,2],[8,3],[9,4]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,7,10,2,3,5,6,8,9],"latestChangedDtsFile":"./randomFileForTypeRef.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[12]},{"resolvedModule":{"resolvedFileName":3,"packageId":{"name":"pkg1","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[13]},{"resolvedTypeReferenceDirective":{"resolvedFileName":5,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[14],"notPrimary":true},{"resolvedTypeReferenceDirective":{"resolvedFileName":6,"packageId":{"name":"pkg3","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[15],"notPrimary":true},{"resolvedTypeReferenceDirective":10}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"hash":[[12,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[13,"-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[14,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[15,"1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,1],[3,3,99],[4,4,1],[5,5]],"modules":[[11,[1,2]]],"typeRefs":[[11,[3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg1/package.json",
      "./node_modules/pkg2/package.json",
      "./node_modules/pkg3/package.json"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      [
        "./node_modules/pkg0/import.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "original": {
          "version": "769951468-export interface ImportInterface0 {}",
          "impliedFormat": 1
        },
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg1/require.d.ts": {
        "original": {
          "version": "-3547817137-export interface RequireInterface1 {}",
          "impliedFormat": 1
        },
        "version": "-3547817137-export interface RequireInterface1 {}",
        "signature": "-3547817137-export interface RequireInterface1 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "original": {
          "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "original": {
          "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "original": {
          "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "original": {
          "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "moduleResolution": 3
    },
    "referencedMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./randomfilefortyperef.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "latestChangedDtsFile": "./randomFileForTypeRef.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              12
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/import.d.ts",
            "packageId": {
              "name": "pkg0",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg0/package.json"
          ]
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 3,
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              13
            ]
          },
          "resolutionId": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/require.d.ts",
            "packageId": {
              "name": "pkg1",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg1/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 5,
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              14
            ],
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ],
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 6,
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              15
            ],
            "notPrimary": true
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ],
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
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg1/package.json",
          "-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/import.d.ts",
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg0/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            2,
            2,
            1
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/require.d.ts",
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg1/package.json"
            ]
          },
          "mode": "commonjs"
        },
        {
          "original": [
            3,
            3,
            99
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/import.d.ts",
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ],
            "notPrimary": true
          },
          "mode": "esnext"
        },
        {
          "original": [
            4,
            4,
            1
          ],
          "resolutionEntryId": 4,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ],
            "notPrimary": true
          },
          "mode": "commonjs"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/import.d.ts",
                  "packageId": {
                    "name": "pkg0",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg0/package.json"
                ]
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/require.d.ts",
                  "packageId": {
                    "name": "pkg1",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg1/package.json"
                ]
              },
              "mode": "commonjs"
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
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/import.d.ts",
                  "packageId": {
                    "name": "pkg2",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ],
                "notPrimary": true
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ],
                "notPrimary": true
              },
              "mode": "commonjs"
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
  "size": 4168
}



Change:: modify package.json and that should re-resolve and random edit
Input::
//// [/src/project/node_modules/pkg1/package.json]
{"name":"pkg1","version":"0.0.1","exports":{"import":"./import.js","require":"./require1.js"}}

//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
export const x = 10;export const y = 10;



Output::
/lib/tsc -b /src/project --explainFiles
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in CJS mode with conditions 'node', 'require', 'types'.
File '/src/project/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require1.js'.
File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg1/require1.ts' does not exist.
File '/src/project/node_modules/pkg1/require1.tsx' does not exist.
File '/src/project/node_modules/pkg1/require1.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require1.js'.
File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg1/require1.js' does not exist.
File '/src/project/node_modules/pkg1/require1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Resolving real path for '/src/project/node_modules/pkg3/require.d.ts', result '/src/project/node_modules/pkg3/require.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Directory '/src/project' has no containing package.json scope according to cache.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/package.json' does not exist.
File '/src/project/node_modules/package.json' does not exist.
Directory '/src/project' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };
[7m [0m [91m                                       ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg0/package.json' does not have field "type"
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg2/package.json' does not have field "type"
src/project/node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg3/package.json' does not have field "type"
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
  File is CommonJS module because 'package.json' was not found

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/pkg0/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg0",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/fileWithImports.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}
pkg1: commonjs: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/pkg1/require1.ts",
    "/src/project/node_modules/pkg1/require1.tsx",
    "/src/project/node_modules/pkg1/require1.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/pkg1/package.json",
    "/src/node_modules/pkg1.ts",
    "/src/node_modules/pkg1.tsx",
    "/src/node_modules/pkg1.d.ts",
    "/src/node_modules/pkg1/index.ts",
    "/src/node_modules/pkg1/index.tsx",
    "/src/node_modules/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/pkg1/package.json",
    "/node_modules/pkg1.ts",
    "/node_modules/pkg1.tsx",
    "/node_modules/pkg1.d.ts",
    "/node_modules/pkg1/index.ts",
    "/node_modules/pkg1/index.tsx",
    "/node_modules/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/node_modules/pkg1/require1.js",
    "/src/project/node_modules/pkg1/require1.jsx",
    "/src/node_modules/pkg1/package.json",
    "/src/node_modules/pkg1.js",
    "/src/node_modules/pkg1.jsx",
    "/src/node_modules/pkg1/index.js",
    "/src/node_modules/pkg1/index.jsx",
    "/node_modules/pkg1/package.json",
    "/node_modules/pkg1.js",
    "/node_modules/pkg1.jsx",
    "/node_modules/pkg1/index.js",
    "/node_modules/pkg1/index.jsx"
  ],
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json",
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/node_modules/pkg2/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg2",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/node_modules/pkg3/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg3",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/fileWithTypeRefs.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}
pkg3: commonjs: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg3/require.d.ts",
    "packageId": {
      "name": "pkg3",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/randomFileForImport.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/randomFileForTypeRef.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/node_modules/@types/pkg4/index.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true,
    "primary": true
  }
}


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./node_modules/pkg3/require.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg2/package.json","./node_modules/pkg3/package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"-11409094169-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;export const y = 10;","signature":"-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n","impliedFormat":1},{"version":"-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2],[4,5],[4]],"referencedMap":[[3,1],[6,2],[7,1],[8,3]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[3,[{"file":"./filewithimports.ts","start":124,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],6,9,2,4,5,7,8],"affectedFilesPendingEmit":[3,7],"emitSignatures":[[7,"-6057683066-export declare const x = 10;\r\n"]],"latestChangedDtsFile":"./randomFileForTypeRef.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[11]},{"resolvedTypeReferenceDirective":{"resolvedFileName":4,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[12],"notPrimary":true},{"resolvedTypeReferenceDirective":{"resolvedFileName":5,"packageId":{"name":"pkg3","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[13],"notPrimary":true},{"resolvedTypeReferenceDirective":9}],"names":["pkg0","pkg2","pkg3","pkg4"],"hash":[[11,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[12,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[13,"1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,99],[3,3,1],[4,4]],"modules":[[10,[1]]],"typeRefs":[[10,[2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg2/package.json",
      "./node_modules/pkg3/package.json"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/import.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "original": {
          "version": "769951468-export interface ImportInterface0 {}",
          "impliedFormat": 1
        },
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "original": {
          "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "original": {
          "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "original": {
          "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-11409094169-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;export const y = 10;",
          "signature": "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-11409094169-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;export const y = 10;",
        "signature": "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "original": {
          "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "moduleResolution": 3
    },
    "referencedMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./randomfilefortyperef.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 124,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./randomfileforimport.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      [
        "./randomfileforimport.ts",
        "-6057683066-export declare const x = 10;\r\n"
      ]
    ],
    "latestChangedDtsFile": "./randomFileForTypeRef.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              11
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/import.d.ts",
            "packageId": {
              "name": "pkg0",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg0/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 4,
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              12
            ],
            "notPrimary": true
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ],
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 5,
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              13
            ],
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ],
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
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/import.d.ts",
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg0/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            2,
            2,
            99
          ],
          "resolutionEntryId": 2,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/import.d.ts",
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ],
            "notPrimary": true
          },
          "mode": "esnext"
        },
        {
          "original": [
            3,
            3,
            1
          ],
          "resolutionEntryId": 3,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ],
            "notPrimary": true
          },
          "mode": "commonjs"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/import.d.ts",
                  "packageId": {
                    "name": "pkg0",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg0/package.json"
                ]
              },
              "mode": "esnext"
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
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/import.d.ts",
                  "packageId": {
                    "name": "pkg2",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ],
                "notPrimary": true
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 3,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ],
                "notPrimary": true
              },
              "mode": "commonjs"
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
  "size": 4034
}



Change:: write file not resolved by import and random edit
Input::
//// [/src/project/node_modules/pkg1/require1.d.ts]
export interface RequireInterface1 {}

//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
export const x = 10;export const y = 10;export const z = 10;



Output::
/lib/tsc -b /src/project --explainFiles
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in CJS mode with conditions 'node', 'require', 'types'.
File '/src/project/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require1.js'.
File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
File '/src/project/node_modules/pkg1/require1.ts' does not exist.
File '/src/project/node_modules/pkg1/require1.tsx' does not exist.
File '/src/project/node_modules/pkg1/require1.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg1/require1.d.ts', result '/src/project/node_modules/pkg1/require1.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/require1.d.ts' with Package ID 'pkg1/require1.d.ts@0.0.1'. ========
File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Resolving real path for '/src/project/node_modules/pkg3/require.d.ts', result '/src/project/node_modules/pkg3/require.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Directory '/src/project' has no containing package.json scope according to cache.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Directory '/src/project' has no containing package.json scope according to cache.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/package.json' does not exist.
File '/src/project/node_modules/package.json' does not exist.
Directory '/src/project' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg0/package.json' does not have field "type"
src/project/node_modules/pkg1/require1.d.ts
  Imported via "pkg1" from file 'src/project/fileWithImports.ts' with packageId 'pkg1/require1.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg1/package.json' does not have field "type"
src/project/fileWithImports.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg2/package.json' does not have field "type"
src/project/node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'src/project/fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
  File is CommonJS module because 'src/project/node_modules/pkg3/package.json' does not have field "type"
src/project/fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForImport.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'src/project/tsconfig.json'
  File is CommonJS module because 'package.json' was not found
src/project/node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
  File is CommonJS module because 'package.json' was not found
exitCode:: ExitStatus.Success
File: /lib/lib.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

File: /src/project/node_modules/pkg0/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg0",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/node_modules/pkg1/require1.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require1.js\"}}",
    "packageJsonContent": {
      "name": "pkg1",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require1.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/fileWithImports.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}
pkg1: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg1/require1.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "pkg1",
      "subModuleName": "require1.d.ts",
      "version": "0.0.1"
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg1/package.json"
  ]
}

File: /src/project/node_modules/pkg2/import.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg2",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/node_modules/pkg3/require.d.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}",
    "packageJsonContent": {
      "name": "pkg3",
      "version": "0.0.1",
      "exports": {
        "import": "./import.js",
        "require": "./require.js"
      }
    }
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/fileWithTypeRefs.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}
pkg3: commonjs: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg3/require.d.ts",
    "packageId": {
      "name": "pkg3",
      "subModuleName": "require.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg3/package.json"
  ]
}

File: /src/project/randomFileForImport.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
pkg0: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/import.d.ts",
    "packageId": {
      "name": "pkg0",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg0/package.json"
  ]
}

File: /src/project/randomFileForTypeRef.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}
resolvedTypeReferenceDirectiveNames:
pkg2: esnext: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/pkg2/import.d.ts",
    "packageId": {
      "name": "pkg2",
      "subModuleName": "import.d.ts",
      "version": "0.0.1"
    },
    "isExternalLibraryImport": true,
    "primary": false
  },
  "affectingLocations": [
    "/src/project/node_modules/pkg2/package.json"
  ]
}

File: /src/project/node_modules/@types/pkg4/index.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/project/package.json",
    "/src/package.json",
    "/package.json",
    "/src/project/node_modules/@types/pkg4/package.json",
    "/src/project/node_modules/@types/package.json",
    "/src/project/node_modules/package.json",
    "/lib/package.json"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true,
    "primary": true
  }
}


//// [/src/project/fileWithImports.js] file written with same contents
//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;
export declare const y = 10;
export declare const z = 10;


//// [/src/project/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.y = exports.x = void 0;
exports.x = 10;
exports.y = 10;
exports.z = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./node_modules/pkg1/require1.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./node_modules/pkg3/require.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg1/package.json","./node_modules/pkg2/package.json","./node_modules/pkg3/package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"-3547817137-export interface RequireInterface1 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"2513033443-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;export const y = 10;export const z = 10;","signature":"-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n","impliedFormat":1},{"version":"-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2,3],[5,6],[2],[5]],"referencedMap":[[4,1],[7,2],[8,3],[9,4]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,7,10,2,3,5,6,8,9],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[12]},{"resolvedModule":{"resolvedFileName":3,"packageId":{"name":"pkg1","subModuleName":"require1.d.ts","version":"0.0.1"}},"affectingLocations":[13]},{"resolvedTypeReferenceDirective":{"resolvedFileName":5,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[14],"notPrimary":true},{"resolvedTypeReferenceDirective":{"resolvedFileName":6,"packageId":{"name":"pkg3","subModuleName":"require.d.ts","version":"0.0.1"}},"affectingLocations":[15],"notPrimary":true},{"resolvedTypeReferenceDirective":10}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"hash":[[12,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[13,"-10723730036-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require1.js\"}}"],[14,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[15,"1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,1],[3,3,99],[4,4,1],[5,5]],"modules":[[11,[1,2]]],"typeRefs":[[11,[3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require1.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg1/package.json",
      "./node_modules/pkg2/package.json",
      "./node_modules/pkg3/package.json"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require1.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      [
        "./node_modules/pkg0/import.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "original": {
          "version": "769951468-export interface ImportInterface0 {}",
          "impliedFormat": 1
        },
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg1/require1.d.ts": {
        "original": {
          "version": "-3547817137-export interface RequireInterface1 {}",
          "impliedFormat": 1
        },
        "version": "-3547817137-export interface RequireInterface1 {}",
        "signature": "-3547817137-export interface RequireInterface1 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "original": {
          "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "original": {
          "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "original": {
          "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "2513033443-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;export const y = 10;export const z = 10;",
          "signature": "-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "2513033443-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;export const y = 10;export const z = 10;",
        "signature": "-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "original": {
          "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "moduleResolution": 3
    },
    "referencedMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require1.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./randomfilefortyperef.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require1.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              12
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/import.d.ts",
            "packageId": {
              "name": "pkg0",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg0/package.json"
          ]
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 3,
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require1.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              13
            ]
          },
          "resolutionId": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/require1.d.ts",
            "packageId": {
              "name": "pkg1",
              "subModuleName": "require1.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg1/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 5,
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              14
            ],
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ],
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 6,
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              15
            ],
            "notPrimary": true
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ],
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
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg1/package.json",
          "-10723730036-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require1.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/import.d.ts",
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg0/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            2,
            2,
            1
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/require1.d.ts",
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require1.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg1/package.json"
            ]
          },
          "mode": "commonjs"
        },
        {
          "original": [
            3,
            3,
            99
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/import.d.ts",
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ],
            "notPrimary": true
          },
          "mode": "esnext"
        },
        {
          "original": [
            4,
            4,
            1
          ],
          "resolutionEntryId": 4,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ],
            "notPrimary": true
          },
          "mode": "commonjs"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/import.d.ts",
                  "packageId": {
                    "name": "pkg0",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg0/package.json"
                ]
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/require1.d.ts",
                  "packageId": {
                    "name": "pkg1",
                    "subModuleName": "require1.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg1/package.json"
                ]
              },
              "mode": "commonjs"
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
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/import.d.ts",
                  "packageId": {
                    "name": "pkg2",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ],
                "notPrimary": true
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ],
                "notPrimary": true
              },
              "mode": "commonjs"
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
  "size": 4274
}

