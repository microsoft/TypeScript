currentDirectory:: /home/src/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/home/src/projects/myproject/packages/a/src/lib.js]
export const magicString = "12";

//// [/home/src/projects/myproject/packages/a/src/util.ts]
export const magicNumber = 12;

//// [/home/src/projects/myproject/packages/a/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "./dist",
    "declarationDir": "./dist/types"
  },
  "extends": "../../tsconfig.base.json",
  "include": [
    "./src"
  ]
}

//// [/home/src/projects/myproject/packages/a/package.json]
{
  "name": "@my-package/a",
  "version": "1.0.0",
  "main": "index.js"
}

//// [/home/src/projects/myproject/packages/b/src/index.ts]
import { magicString } from "@my-package/a/src/lib";
import { magicNumber } from "@my-package/a/src/util";
const a: number = magicNumber;
const b: string = magicString;
console.log({ a });
console.log({ b });


//// [/home/src/projects/myproject/packages/b/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "./dist",
    "declarationDir": "./dist/types"
  },
  "extends": "../../tsconfig.base.json",
  "include": [
    "./src"
  ],
  "references": [
    {
      "path": "../a/tsconfig.json"
    }
  ]
}

//// [/home/src/projects/myproject/tsconfig.base.json]
{
  "compilerOptions": {
    "composite": true,
    "allowJs": true,
    "emitDeclarationOnly": true,
    "traceResolution": true,
    "strict": true
  }
}

//// [/home/src/projects/myproject/node_modules/@my-package/a] symlink(/home/src/projects/myproject/packages/a)
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/a/lib/tsc.js --b packages/b -v --explainFiles
Output::
[[90m12:00:47 AM[0m] Projects in this build: 
    * packages/a/tsconfig.json
    * packages/b/tsconfig.json

[[90m12:00:48 AM[0m] Project 'packages/a/tsconfig.json' is out of date because output file 'packages/a/dist/tsconfig.tsbuildinfo' does not exist

[[90m12:00:49 AM[0m] Building project '/home/src/projects/myproject/packages/a/tsconfig.json'...

../../../../a/lib/lib.d.ts
  Default library for target 'es5'
packages/a/src/lib.js
  Matched by include pattern './src' in 'packages/a/tsconfig.json'
packages/a/src/util.ts
  Matched by include pattern './src' in 'packages/a/tsconfig.json'
[[90m12:01:06 AM[0m] Project 'packages/b/tsconfig.json' is out of date because output file 'packages/b/dist/tsconfig.tsbuildinfo' does not exist

[[90m12:01:07 AM[0m] Building project '/home/src/projects/myproject/packages/b/tsconfig.json'...

======== Resolving module '@my-package/a/src/lib' from '/home/src/projects/myproject/packages/b/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module '@my-package/a/src/lib' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/myproject/packages/b/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/lib'
Directory '/home/src/projects/myproject/packages/b/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/lib'
Directory '/home/src/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/lib'
Found 'package.json' at '/home/src/projects/myproject/node_modules/@my-package/a/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.ts' does not exist.
File '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.tsx' does not exist.
File '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/myproject/node_modules/@my-package/a/src/lib/index.js'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/node_modules/@my-package/a/src/lib/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/myproject/node_modules/@my-package/a/src/lib/index.js' has a '.js' extension - stripping it.
Directory '/home/src/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/lib'
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/lib'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/lib'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/lib'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/lib'
Loading module '@my-package/a/src/lib' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/myproject/packages/b/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/packages/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/myproject/node_modules/@my-package/a/package.json' exists according to earlier cached lookups.
File '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.js' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.js', result '/home/src/projects/myproject/packages/a/src/lib.js'.
======== Module name '@my-package/a/src/lib' was successfully resolved to '/home/src/projects/myproject/packages/a/src/lib.js' with Package ID '@my-package/a/src/lib.js@1.0.0'. ========
======== Resolving module '@my-package/a/src/util' from '/home/src/projects/myproject/packages/b/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module '@my-package/a/src/util' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/myproject/packages/b/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/util'
Directory '/home/src/projects/myproject/packages/b/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/util'
Directory '/home/src/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'my-package__a/src/util'
File '/home/src/projects/myproject/node_modules/@my-package/a/package.json' exists according to earlier cached lookups.
File '/home/src/projects/myproject/node_modules/@my-package/a/src/util.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/myproject/node_modules/@my-package/a/src/util.ts', result '/home/src/projects/myproject/packages/a/src/util.ts'.
======== Module name '@my-package/a/src/util' was successfully resolved to '/home/src/projects/myproject/packages/a/src/util.ts' with Package ID '@my-package/a/src/util.ts@1.0.0'. ========
../../../../a/lib/lib.d.ts
  Default library for target 'es5'
packages/a/dist/types/src/lib.d.ts
  Imported via "@my-package/a/src/lib" from file 'packages/b/src/index.ts' with packageId '@my-package/a/src/lib.js@1.0.0'
  File is output of project reference source 'packages/a/src/lib.js'
packages/a/dist/types/src/util.d.ts
  Imported via "@my-package/a/src/util" from file 'packages/b/src/index.ts' with packageId '@my-package/a/src/util.ts@1.0.0'
  File is output of project reference source 'packages/a/src/util.ts'
packages/b/src/index.ts
  Matched by include pattern './src' in 'packages/b/tsconfig.json'


Program root files: [
  "/home/src/projects/myproject/packages/a/src/lib.js",
  "/home/src/projects/myproject/packages/a/src/util.ts"
]
Program options: {
  "composite": true,
  "allowJs": true,
  "emitDeclarationOnly": true,
  "traceResolution": true,
  "strict": true,
  "outDir": "/home/src/projects/myproject/packages/a/dist",
  "declarationDir": "/home/src/projects/myproject/packages/a/dist/types",
  "explainFiles": true,
  "configFilePath": "/home/src/projects/myproject/packages/a/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/src/projects/myproject/packages/a/src/lib.js
/home/src/projects/myproject/packages/a/src/util.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/src/projects/myproject/packages/a/src/lib.js
/home/src/projects/myproject/packages/a/src/util.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/home/src/projects/myproject/packages/a/src/lib.js (computed .d.ts during emit)
/home/src/projects/myproject/packages/a/src/util.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/projects/myproject/packages/b/src/index.ts"
]
Program options: {
  "composite": true,
  "allowJs": true,
  "emitDeclarationOnly": true,
  "traceResolution": true,
  "strict": true,
  "outDir": "/home/src/projects/myproject/packages/b/dist",
  "declarationDir": "/home/src/projects/myproject/packages/b/dist/types",
  "explainFiles": true,
  "configFilePath": "/home/src/projects/myproject/packages/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/src/projects/myproject/packages/a/dist/types/src/lib.d.ts
/home/src/projects/myproject/packages/a/dist/types/src/util.d.ts
/home/src/projects/myproject/packages/b/src/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/src/projects/myproject/packages/a/dist/types/src/lib.d.ts
/home/src/projects/myproject/packages/a/dist/types/src/util.d.ts
/home/src/projects/myproject/packages/b/src/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/home/src/projects/myproject/packages/a/dist/types/src/lib.d.ts (used version)
/home/src/projects/myproject/packages/a/dist/types/src/util.d.ts (used version)
/home/src/projects/myproject/packages/b/src/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

//// [/home/src/projects/myproject/packages/a/dist/types/src/lib.d.ts]
export const magicString: "12";


//// [/home/src/projects/myproject/packages/a/dist/types/src/util.d.ts]
export declare const magicNumber = 12;


//// [/home/src/projects/myproject/packages/a/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.d.ts","../src/lib.js","../src/util.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8339786491-export const magicString = \"12\";","signature":"-7063618004-export const magicString: \"12\";\n"},{"version":"-13202486157-export const magicNumber = 12;","signature":"-7610027667-export declare const magicNumber = 12;\n"}],"root":[2,3],"options":{"allowJs":true,"composite":true,"declarationDir":"./types","emitDeclarationOnly":true,"outDir":"./","strict":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./types/src/util.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/myproject/packages/a/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.d.ts",
      "../src/lib.js",
      "../src/util.ts"
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../src/lib.js": {
        "original": {
          "version": "-8339786491-export const magicString = \"12\";",
          "signature": "-7063618004-export const magicString: \"12\";\n"
        },
        "version": "-8339786491-export const magicString = \"12\";",
        "signature": "-7063618004-export const magicString: \"12\";\n"
      },
      "../src/util.ts": {
        "original": {
          "version": "-13202486157-export const magicNumber = 12;",
          "signature": "-7610027667-export declare const magicNumber = 12;\n"
        },
        "version": "-13202486157-export const magicNumber = 12;",
        "signature": "-7610027667-export declare const magicNumber = 12;\n"
      }
    },
    "root": [
      [
        2,
        "../src/lib.js"
      ],
      [
        3,
        "../src/util.ts"
      ]
    ],
    "options": {
      "allowJs": true,
      "composite": true,
      "declarationDir": "./types",
      "emitDeclarationOnly": true,
      "outDir": "./",
      "strict": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.d.ts",
      "../src/lib.js",
      "../src/util.ts"
    ],
    "latestChangedDtsFile": "./types/src/util.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1131
}

//// [/home/src/projects/myproject/packages/b/dist/types/src/index.d.ts]
export {};


//// [/home/src/projects/myproject/packages/b/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.d.ts","../../a/dist/types/src/lib.d.ts","../../a/dist/types/src/util.d.ts","../src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-7063618004-export const magicString: \"12\";\n","-7610027667-export declare const magicNumber = 12;\n",{"version":"-5849137514-import { magicString } from \"@my-package/a/src/lib\";\nimport { magicNumber } from \"@my-package/a/src/util\";\nconst a: number = magicNumber;\nconst b: string = magicString;\nconsole.log({ a });\nconsole.log({ b });\n","signature":"-3531856636-export {};\n"}],"root":[4],"options":{"allowJs":true,"composite":true,"declarationDir":"./types","emitDeclarationOnly":true,"outDir":"./","strict":true},"fileIdsList":[[2,3]],"referencedMap":[[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./types/src/index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/myproject/packages/b/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.d.ts",
      "../../a/dist/types/src/lib.d.ts",
      "../../a/dist/types/src/util.d.ts",
      "../src/index.ts"
    ],
    "fileNamesList": [
      [
        "../../a/dist/types/src/lib.d.ts",
        "../../a/dist/types/src/util.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../a/dist/types/src/lib.d.ts": {
        "version": "-7063618004-export const magicString: \"12\";\n",
        "signature": "-7063618004-export const magicString: \"12\";\n"
      },
      "../../a/dist/types/src/util.d.ts": {
        "version": "-7610027667-export declare const magicNumber = 12;\n",
        "signature": "-7610027667-export declare const magicNumber = 12;\n"
      },
      "../src/index.ts": {
        "original": {
          "version": "-5849137514-import { magicString } from \"@my-package/a/src/lib\";\nimport { magicNumber } from \"@my-package/a/src/util\";\nconst a: number = magicNumber;\nconst b: string = magicString;\nconsole.log({ a });\nconsole.log({ b });\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-5849137514-import { magicString } from \"@my-package/a/src/lib\";\nimport { magicNumber } from \"@my-package/a/src/util\";\nconst a: number = magicNumber;\nconst b: string = magicString;\nconsole.log({ a });\nconsole.log({ b });\n",
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
      "allowJs": true,
      "composite": true,
      "declarationDir": "./types",
      "emitDeclarationOnly": true,
      "outDir": "./",
      "strict": true
    },
    "referencedMap": {
      "../src/index.ts": [
        "../../a/dist/types/src/lib.d.ts",
        "../../a/dist/types/src/util.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.d.ts",
      "../../a/dist/types/src/lib.d.ts",
      "../../a/dist/types/src/util.d.ts",
      "../src/index.ts"
    ],
    "latestChangedDtsFile": "./types/src/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1355
}

