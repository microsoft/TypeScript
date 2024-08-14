Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/packages/package-a/package.json]
{
  "name": "package-a",
  "version": "1.0.0",
  "type": "module",
  "main": "build/index.js",
  "exports": {
    ".": "./build/index.js",
    "./package.json": "./package.json",
    "./*": [
      "./build/*/index.js",
      "./build/*.js"
    ]
  }
}

//// [/home/src/projects/project/packages/package-a/tsconfig.json]
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "baseUrl": "./",
    "composite": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "lib": [
      "es2021"
    ],
    "module": "esnext",
    "moduleResolution": "bundler",
    "outDir": "build",
    "rootDir": "./src",
    "target": "ES2021",
    "traceResolution": true,
    "tsBuildInfoFile": "./build/tsconfig.tsbuildinfo"
  },
  "include": [
    "./src/**/*.ts"
  ]
}

//// [/home/src/projects/project/packages/package-a/src/index.ts]
export * from "./subfolder";

//// [/home/src/projects/project/packages/package-a/src/subfolder/index.ts]
export const FOO = "bar";

//// [/home/src/projects/project/packages/package-b/package.json]
{
  "name": "package-b",
  "version": "1.0.0",
  "type": "module",
  "main": "build/index.js",
  "exports": {
    ".": "./build/index.js",
    "./package.json": "./package.json",
    "./*": [
      "./build/*/index.js",
      "./build/*.js"
    ]
  }
}

//// [/home/src/projects/project/packages/package-b/tsconfig.json]
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "baseUrl": "./",
    "composite": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "lib": [
      "es2021"
    ],
    "module": "esnext",
    "moduleResolution": "bundler",
    "outDir": "build",
    "rootDir": "./src",
    "target": "ES2021",
    "traceResolution": true,
    "tsBuildInfoFile": "./build/tsconfig.tsbuildinfo"
  },
  "include": [
    "./src/**/*.ts"
  ],
  "references": [
    {
      "path": "../package-a"
    }
  ]
}

//// [/home/src/projects/project/packages/package-b/src/index.ts]
import { FOO } from "package-a";
console.log(FOO);


//// [/home/src/projects/project/node_modules/package-a] symlink(/home/src/projects/project/packages/package-a)

//// [/home/src/projects/project/node_modules/package-b] symlink(/home/src/projects/project/packages/package-b)

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

//// [/home/src/tslibs/TS/Lib/lib.es2021.d.ts] *Lib*

//// [/home/src/projects/project/packages/package-a/build/subfolder/index.js]
export const FOO = "bar";


//// [/home/src/projects/project/packages/package-a/build/subfolder/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../../src/subfolder/index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,GAAG,QAAQ,CAAC"}

//// [/home/src/projects/project/packages/package-a/build/subfolder/index.d.ts]
export declare const FOO = "bar";
//# sourceMappingURL=index.d.ts.map

//// [/home/src/projects/project/packages/package-a/build/index.js]
export * from "./subfolder";


//// [/home/src/projects/project/packages/package-a/build/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":"AAAA,cAAc,aAAa,CAAC"}

//// [/home/src/projects/project/packages/package-a/build/index.d.ts]
export * from "./subfolder";
//# sourceMappingURL=index.d.ts.map

//// [/home/src/projects/project/packages/package-a/build/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.es2021.d.ts","../src/subfolder/index.ts","../src/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11228512861-export const FOO = \"bar\";","signature":"-8746013027-export declare const FOO = \"bar\";\n"},{"version":"-16576232793-export * from \"./subfolder\";","signature":"-14439737455-export * from \"./subfolder\";\n"}],"root":[2,3],"options":{"allowSyntheticDefaultImports":true,"composite":true,"declarationMap":true,"esModuleInterop":true,"module":99,"outDir":"./","rootDir":"../src","target":8,"tsBuildInfoFile":"./tsconfig.tsbuildinfo"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/projects/project/packages/package-a/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.es2021.d.ts",
    "../src/subfolder/index.ts",
    "../src/index.ts"
  ],
  "fileIdsList": [
    [
      "../src/subfolder/index.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.es2021.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/subfolder/index.ts": {
      "original": {
        "version": "-11228512861-export const FOO = \"bar\";",
        "signature": "-8746013027-export declare const FOO = \"bar\";\n"
      },
      "version": "-11228512861-export const FOO = \"bar\";",
      "signature": "-8746013027-export declare const FOO = \"bar\";\n"
    },
    "../src/index.ts": {
      "original": {
        "version": "-16576232793-export * from \"./subfolder\";",
        "signature": "-14439737455-export * from \"./subfolder\";\n"
      },
      "version": "-16576232793-export * from \"./subfolder\";",
      "signature": "-14439737455-export * from \"./subfolder\";\n"
    }
  },
  "root": [
    [
      2,
      "../src/subfolder/index.ts"
    ],
    [
      3,
      "../src/index.ts"
    ]
  ],
  "options": {
    "allowSyntheticDefaultImports": true,
    "composite": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "module": 99,
    "outDir": "./",
    "rootDir": "../src",
    "target": 8,
    "tsBuildInfoFile": "./tsconfig.tsbuildinfo"
  },
  "referencedMap": {
    "../src/index.ts": [
      "../src/subfolder/index.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1168
}

//// [/home/src/projects/project/packages/package-b/build/index.js]
import { FOO } from "package-a";
console.log(FOO);


//// [/home/src/projects/project/packages/package-b/build/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":""}

//// [/home/src/projects/project/packages/package-b/build/index.d.ts]
export {};
//# sourceMappingURL=index.d.ts.map

//// [/home/src/projects/project/packages/package-b/build/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.es2021.d.ts","../../package-a/build/subfolder/index.d.ts","../../package-a/build/index.d.ts","../src/index.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8746013027-export declare const FOO = \"bar\";\n","-14439737455-export * from \"./subfolder\";\n",{"version":"-5331409584-import { FOO } from \"package-a\";\nconsole.log(FOO);\n","signature":"-3531856636-export {};\n"}],"root":[4],"options":{"allowSyntheticDefaultImports":true,"composite":true,"declarationMap":true,"esModuleInterop":true,"module":99,"outDir":"./","rootDir":"../src","target":8,"tsBuildInfoFile":"./tsconfig.tsbuildinfo"},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/projects/project/packages/package-b/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.es2021.d.ts",
    "../../package-a/build/subfolder/index.d.ts",
    "../../package-a/build/index.d.ts",
    "../src/index.ts"
  ],
  "fileIdsList": [
    [
      "../../package-a/build/subfolder/index.d.ts"
    ],
    [
      "../../package-a/build/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.es2021.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../package-a/build/subfolder/index.d.ts": {
      "version": "-8746013027-export declare const FOO = \"bar\";\n",
      "signature": "-8746013027-export declare const FOO = \"bar\";\n"
    },
    "../../package-a/build/index.d.ts": {
      "version": "-14439737455-export * from \"./subfolder\";\n",
      "signature": "-14439737455-export * from \"./subfolder\";\n"
    },
    "../src/index.ts": {
      "original": {
        "version": "-5331409584-import { FOO } from \"package-a\";\nconsole.log(FOO);\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-5331409584-import { FOO } from \"package-a\";\nconsole.log(FOO);\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      4,
      "../src/index.ts"
    ]
  ],
  "options": {
    "allowSyntheticDefaultImports": true,
    "composite": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "module": 99,
    "outDir": "./",
    "rootDir": "../src",
    "target": 8,
    "tsBuildInfoFile": "./tsconfig.tsbuildinfo"
  },
  "referencedMap": {
    "../../package-a/build/index.d.ts": [
      "../../package-a/build/subfolder/index.d.ts"
    ],
    "../src/index.ts": [
      "../../package-a/build/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1212
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/package-b/src/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/packages/package-b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/packages/package-b/tsconfig.json, currentDirectory: /home/src/projects/project/packages/package-b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/tsconfig.json 2000 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/packages/package-b/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/packages/package-b/src/index.ts"
 ],
 "options": {
  "allowSyntheticDefaultImports": true,
  "baseUrl": "/home/src/projects/project/packages/package-b",
  "composite": true,
  "declarationMap": true,
  "esModuleInterop": true,
  "lib": [
   "lib.es2021.d.ts"
  ],
  "module": 99,
  "moduleResolution": 100,
  "outDir": "/home/src/projects/project/packages/package-b/build",
  "rootDir": "/home/src/projects/project/packages/package-b/src",
  "target": 8,
  "traceResolution": true,
  "tsBuildInfoFile": "/home/src/projects/project/packages/package-b/build/tsconfig.tsbuildinfo",
  "configFilePath": "/home/src/projects/project/packages/package-b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/projects/project/packages/package-a",
   "originalPath": "../package-a"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/packages/package-b/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/packages/package-b/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/src 1 undefined Config: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/src 1 undefined Config: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/package-b/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/packages/package-a/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/packages/package-a/src/index.ts",
  "/home/src/projects/project/packages/package-a/src/subfolder/index.ts"
 ],
 "options": {
  "allowSyntheticDefaultImports": true,
  "baseUrl": "/home/src/projects/project/packages/package-a",
  "composite": true,
  "declarationMap": true,
  "esModuleInterop": true,
  "lib": [
   "lib.es2021.d.ts"
  ],
  "module": 99,
  "moduleResolution": 100,
  "outDir": "/home/src/projects/project/packages/package-a/build",
  "rootDir": "/home/src/projects/project/packages/package-a/src",
  "target": 8,
  "traceResolution": true,
  "tsBuildInfoFile": "/home/src/projects/project/packages/package-a/build/tsconfig.tsbuildinfo",
  "configFilePath": "/home/src/projects/project/packages/package-a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a/tsconfig.json 2000 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a/src 1 undefined Config: /home/src/projects/project/packages/package-a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a/src 1 undefined Config: /home/src/projects/project/packages/package-a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] ======== Resolving module 'package-a' from '/home/src/projects/project/packages/package-b/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'import', 'types'.
Info seq  [hh:mm:ss:mss] 'baseUrl' option is set to '/home/src/projects/project/packages/package-b', using this value to resolve non-relative module name 'package-a'.
Info seq  [hh:mm:ss:mss] Resolving module name 'package-a' relative to base url '/home/src/projects/project/packages/package-b' - '/home/src/projects/project/packages/package-b/package-a'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/packages/package-b/package-a', target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/package-a' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/projects/project/packages/package-b/package.json'.
Info seq  [hh:mm:ss:mss] Loading module 'package-a' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/projects/project/node_modules/package-a/package.json'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './build/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package-a/build/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-a/build/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-a/build/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-a/build/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/project/node_modules/package-a/build/index.d.ts', result '/home/src/projects/project/packages/package-a/build/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'package-a' was successfully resolved to '/home/src/projects/project/packages/package-a/build/index.d.ts' with Package ID 'package-a/build/index.d.ts@1.0.0'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module './subfolder' from '/home/src/projects/project/packages/package-a/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/projects/project/packages/package-a/tsconfig.json'.
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'import', 'types'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/packages/package-a/src/subfolder', target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.jsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder/index.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './subfolder' was successfully resolved to '/home/src/projects/project/packages/package-a/src/subfolder/index.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a/src/subfolder/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-es2021' from '/home/src/projects/project/packages/package-b/__lib_node_modules_lookup_lib.es2021.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-es2021' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es2021'
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es2021'
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es2021'
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es2021'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es2021'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es2021'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es2021'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-es2021' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-es2021' was not resolved. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/node_modules 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/node_modules 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2021.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/src 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/src 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b 0 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b 0 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/package.json 2000 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a/package.json 2000 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/package-b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package-b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es2021.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/package-a/src/subfolder/index.ts Text-1 "export const FOO = \"bar\";"
	/home/src/projects/project/packages/package-a/src/index.ts Text-1 "export * from \"./subfolder\";"
	/home/src/projects/project/packages/package-b/src/index.ts SVC-1-0 "import { FOO } from \"package-a\";\nconsole.log(FOO);\n"


	../../../../tslibs/TS/Lib/lib.es2021.d.ts
	  Library 'lib.es2021.d.ts' specified in compilerOptions
	../package-a/src/subfolder/index.ts
	  Imported via "./subfolder" from file '../package-a/src/index.ts'
	../package-a/src/index.ts
	  Imported via "package-a" from file 'src/index.ts' with packageId 'package-a/build/index.d.ts@1.0.0'
	src/index.ts
	  Matched by include pattern './src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/packages/package-b/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "31d6ef54b3d69660fe2a0a8a081a9ece9327825701681ae8fea02692e5414063",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 104,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "allowSyntheticDefaultImports": true,
            "baseUrl": "",
            "composite": true,
            "declarationMap": true,
            "esModuleInterop": true,
            "lib": [
              "es2021"
            ],
            "module": "esnext",
            "moduleResolution": "bundler",
            "outDir": "",
            "rootDir": "",
            "target": "es2021",
            "traceResolution": true,
            "tsBuildInfoFile": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": true,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/project/packages/package-b/src/index.ts",
        "configFile": "/home/src/projects/project/packages/package-b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/package-b/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package-b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/package-b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/package-b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/package-a: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/package-a/package.json: *new*
  {}
/home/src/projects/project/packages/package-a/src/index.ts: *new*
  {}
/home/src/projects/project/packages/package-a/src/subfolder/index.ts: *new*
  {}
/home/src/projects/project/packages/package-a/tsconfig.json: *new*
  {}
/home/src/projects/project/packages/package-b: *new*
  {}
/home/src/projects/project/packages/package-b/package.json: *new*
  {}
/home/src/projects/project/packages/package-b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2021.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules: *new*
  {}
/home/src/projects/project/node_modules/package-a: *new*
  {}
/home/src/projects/project/packages/package-a: *new*
  {}
/home/src/projects/project/packages/package-a/src: *new*
  {}
/home/src/projects/project/packages/package-b/src: *new*
  {}

Projects::
/home/src/projects/project/packages/package-b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/package-a/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json
/home/src/projects/project/packages/package-a/src/subfolder/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json
/home/src/projects/project/packages/package-b/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2021.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/packages/package-b/src/index.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
After request

Timeout callback:: count: 1
1: checkOne *new*

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
1: semanticCheck *new*

Before running Immedidate callback:: count: 1
1: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
2: suggestionCheck *new*

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 2,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/packages/package-b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/home/src/projects/project/packages/package-b/src/index.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 31
                },
                "end": {
                  "line": 1,
                  "offset": 31
                },
                "newText": "X"
              }
            ]
          }
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/project/packages/package-b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/package-a/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json
/home/src/projects/project/packages/package-a/src/subfolder/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json
/home/src/projects/project/packages/package-b/src/index.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2021.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/packages/package-b/src/index.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
After request

Timeout callback:: count: 1
2: checkOne *new*

Before running Timeout callback:: count: 1
2: checkOne

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/package-b/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'package-aX' from '/home/src/projects/project/packages/package-b/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'import', 'types'.
Info seq  [hh:mm:ss:mss] 'baseUrl' option is set to '/home/src/projects/project/packages/package-b', using this value to resolve non-relative module name 'package-aX'.
Info seq  [hh:mm:ss:mss] Resolving module name 'package-aX' relative to base url '/home/src/projects/project/packages/package-b' - '/home/src/projects/project/packages/package-b/package-aX'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/packages/package-b/package-aX', target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-aX.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-aX.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-aX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-aX.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-aX.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/package-aX' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'package-aX' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-aX.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-aX.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-aX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-aX.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-aX.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name 'package-aX' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es2021' from '/home/src/projects/project/packages/package-b/__lib_node_modules_lookup_lib.es2021.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/package-aX 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/package-aX 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package-b/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package-b/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package-a/package.json 2000 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/package-b/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package-b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.es2021.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/package-b/src/index.ts SVC-1-1 "import { FOO } from \"package-aX\";\nconsole.log(FOO);\n"


	../../../../tslibs/TS/Lib/lib.es2021.d.ts
	  Library 'lib.es2021.d.ts' specified in compilerOptions
	src/index.ts
	  Matched by include pattern './src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/package-aX: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/project/packages/package-b/package-a:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/package-a/src/index.ts:
  {}
/home/src/projects/project/packages/package-a/src/subfolder/index.ts:
  {}
/home/src/projects/project/packages/package-a/tsconfig.json:
  {}
/home/src/projects/project/packages/package-b:
  {}
/home/src/projects/project/packages/package-b/package.json:
  {}
/home/src/projects/project/packages/package-b/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2021.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/packages/package-a/package.json:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}
/home/src/projects/project/packages/package-a/src:
  {}
/home/src/projects/project/packages/package-b/src:
  {}

FsWatchesRecursive *deleted*::
/home/src/projects/project/node_modules/package-a:
  {}
/home/src/projects/project/packages/package-a:
  {}

Immedidate callback:: count: 1
3: semanticCheck *new*

Projects::
/home/src/projects/project/packages/package-b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/projects/project/packages/package-a/src/index.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/projects/project/packages/package-b/tsconfig.json *deleted*
/home/src/projects/project/packages/package-a/src/subfolder/index.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/projects/project/packages/package-b/tsconfig.json *deleted*
/home/src/projects/project/packages/package-b/src/index.ts (Open)
    version: SVC-1-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2021.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json

Before running Immedidate callback:: count: 1
3: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 21
            },
            "end": {
              "line": 1,
              "offset": 33
            },
            "text": "Cannot find module 'package-aX' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
4: suggestionCheck *new*

Before running Immedidate callback:: count: 1
4: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 4,
        "performanceData": {
          "updateGraphDurationMs": *,
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/packages/package-b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/home/src/projects/project/packages/package-b/src/index.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 31
                },
                "end": {
                  "line": 1,
                  "offset": 32
                },
                "newText": ""
              }
            ]
          }
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/project/packages/package-b/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/projects/project/packages/package-a/src/index.ts
    version: Text-1
    containingProjects: 0
/home/src/projects/project/packages/package-a/src/subfolder/index.ts
    version: Text-1
    containingProjects: 0
/home/src/projects/project/packages/package-b/src/index.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2021.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/packages/package-b/src/index.ts"
        ]
      },
      "seq": 6,
      "type": "request"
    }
After request

Timeout callback:: count: 1
3: checkOne *new*

Before running Timeout callback:: count: 1
3: checkOne

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/package-b/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'package-a' from '/home/src/projects/project/packages/package-b/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'import', 'types'.
Info seq  [hh:mm:ss:mss] 'baseUrl' option is set to '/home/src/projects/project/packages/package-b', using this value to resolve non-relative module name 'package-a'.
Info seq  [hh:mm:ss:mss] Resolving module name 'package-a' relative to base url '/home/src/projects/project/packages/package-b' - '/home/src/projects/project/packages/package-b/package-a'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/packages/package-b/package-a', target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package-a.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/package-a' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-b/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'package-a' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package-b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-a/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './build/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package-a/build/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-a/build/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-a/build/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package-a/build/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/project/node_modules/package-a/build/index.d.ts', result '/home/src/projects/project/packages/package-a/build/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'package-a' was successfully resolved to '/home/src/projects/project/packages/package-a/build/index.d.ts' with Package ID 'package-a/build/index.d.ts@1.0.0'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './subfolder' from '/home/src/projects/project/packages/package-a/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/projects/project/packages/package-a/tsconfig.json'.
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'import', 'types'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/packages/package-a/src/subfolder', target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder.jsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/packages/package-a/src/subfolder/index.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './subfolder' was successfully resolved to '/home/src/projects/project/packages/package-a/src/subfolder/index.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es2021' from '/home/src/projects/project/packages/package-b/__lib_node_modules_lookup_lib.es2021.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-b/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package-a 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package-a/package.json 2000 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package-b/package-aX 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package-b/package-aX 1 undefined Project: /home/src/projects/project/packages/package-b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/package-b/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package-b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es2021.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/package-a/src/subfolder/index.ts Text-1 "export const FOO = \"bar\";"
	/home/src/projects/project/packages/package-a/src/index.ts Text-1 "export * from \"./subfolder\";"
	/home/src/projects/project/packages/package-b/src/index.ts SVC-1-2 "import { FOO } from \"package-a\";\nconsole.log(FOO);\n"


	../../../../tslibs/TS/Lib/lib.es2021.d.ts
	  Library 'lib.es2021.d.ts' specified in compilerOptions
	../package-a/src/subfolder/index.ts
	  Imported via "./subfolder" from file '../package-a/src/index.ts'
	../package-a/src/index.ts
	  Imported via "package-a" from file 'src/index.ts' with packageId 'package-a/build/index.d.ts@1.0.0'
	src/index.ts
	  Matched by include pattern './src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package-b/package-a: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/project/packages/package-b/package-aX:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/package-a/package.json: *new*
  {}
/home/src/projects/project/packages/package-a/src/index.ts:
  {}
/home/src/projects/project/packages/package-a/src/subfolder/index.ts:
  {}
/home/src/projects/project/packages/package-a/tsconfig.json:
  {}
/home/src/projects/project/packages/package-b:
  {}
/home/src/projects/project/packages/package-b/package.json:
  {}
/home/src/projects/project/packages/package-b/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2021.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}
/home/src/projects/project/node_modules/package-a: *new*
  {}
/home/src/projects/project/packages/package-a: *new*
  {}
/home/src/projects/project/packages/package-a/src:
  {}
/home/src/projects/project/packages/package-b/src:
  {}

Immedidate callback:: count: 1
5: semanticCheck *new*

Projects::
/home/src/projects/project/packages/package-b/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/projects/project/packages/package-a/src/index.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/projects/project/packages/package-b/tsconfig.json *new*
/home/src/projects/project/packages/package-a/src/subfolder/index.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/projects/project/packages/package-b/tsconfig.json *new*
/home/src/projects/project/packages/package-b/src/index.ts (Open)
    version: SVC-1-2
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2021.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package-b/tsconfig.json

Before running Immedidate callback:: count: 1
5: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
6: suggestionCheck *new*

Before running Immedidate callback:: count: 1
6: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package-b/src/index.ts",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 6,
        "performanceData": {
          "updateGraphDurationMs": *,
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/packages/package-b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
