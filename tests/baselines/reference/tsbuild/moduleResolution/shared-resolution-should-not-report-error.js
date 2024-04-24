currentDirectory:: /src/projects/project useCaseSensitiveFileNames: false
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

//// [/lib/lib.esnext.full.d.ts]
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

//// [/src/projects/project/node_modules/a] symlink(/src/projects/project/packages/a)
//// [/src/projects/project/packages/a/index.js]
export const a = 'a';

//// [/src/projects/project/packages/a/package.json]
{
  "name": "a",
  "version": "0.0.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "default": "./index.js"
    }
  }
}

//// [/src/projects/project/packages/a/test/index.js]
import 'a';

//// [/src/projects/project/packages/a/tsconfig.json]
{
  "compilerOptions": {
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "module": "nodenext",
    "outDir": "types"
  }
}

//// [/src/projects/project/packages/b/index.js]
export { a } from 'a';

//// [/src/projects/project/packages/b/package.json]
{
  "name": "b",
  "version": "0.0.0",
  "type": "module"
}

//// [/src/projects/project/packages/b/tsconfig.json]
{
  "references": [
    {
      "path": "../a"
    }
  ],
  "compilerOptions": {
    "checkJs": true,
    "module": "nodenext",
    "noEmit": true,
    "noImplicitAny": true
  }
}



Output::
/lib/tsc -b packages/b --verbose --traceResolution --explainFiles
[[90m12:00:22 AM[0m] Projects in this build: 
    * packages/a/tsconfig.json
    * packages/b/tsconfig.json

[[90m12:00:23 AM[0m] Project 'packages/a/tsconfig.json' is out of date because output file 'packages/a/types/tsconfig.tsbuildinfo' does not exist

[[90m12:00:24 AM[0m] Building project '/src/projects/project/packages/a/tsconfig.json'...

Found 'package.json' at '/src/projects/project/packages/a/package.json'.
File '/src/projects/project/packages/a/test/package.json' does not exist.
File '/src/projects/project/packages/a/package.json' exists according to earlier cached lookups.
======== Resolving module 'a' from '/src/projects/project/packages/a/test/index.js'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/src/projects/project/packages/a/test/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/packages/a/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './types/index.d.ts'.
File name '/src/projects/project/packages/a/index.js' has a '.js' extension - stripping it.
File '/src/projects/project/packages/a/index.ts' does not exist.
File '/src/projects/project/packages/a/index.tsx' does not exist.
File '/src/projects/project/packages/a/index.d.ts' does not exist.
File '/src/projects/project/packages/a/index.js' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/src/projects/project/packages/a/index.js', result '/src/projects/project/packages/a/index.js'.
======== Module name 'a' was successfully resolved to '/src/projects/project/packages/a/index.js' with Package ID 'a/index.js@0.0.0'. ========
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
../../../lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
packages/a/index.js
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"
packages/a/test/index.js
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"
[[90m12:00:32 AM[0m] Project 'packages/b/tsconfig.json' is out of date because output 'packages/b/index.js' is older than input 'packages/a'

[[90m12:00:33 AM[0m] Building project '/src/projects/project/packages/b/tsconfig.json'...

Found 'package.json' at '/src/projects/project/packages/b/package.json'.
======== Resolving module 'a' from '/src/projects/project/packages/b/index.js'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/src/projects/project/packages/b/package.json' exists according to earlier cached lookups.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/src/projects/project/packages/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'a' was found in cache from location '/src/projects/project/packages'.
======== Module name 'a' was successfully resolved to '/src/projects/project/packages/a/index.js' with Package ID 'a/index.js@0.0.0'. ========
File '/src/projects/project/packages/a/types/package.json' does not exist.
File '/src/projects/project/packages/a/package.json' exists according to earlier cached lookups.
File '/lib/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
../../../lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
packages/a/types/index.d.ts
  Imported via 'a' from file 'packages/b/index.js' with packageId 'a/index.js@0.0.0'
  File is output of project reference source 'packages/a/index.js'
  File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"
packages/b/index.js
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'packages/b/package.json' has field "type" with value "module"
exitCode:: ExitStatus.Success


//// [/src/projects/project/packages/a/types/index.d.ts]
export const a: "a";


//// [/src/projects/project/packages/a/types/test/index.d.ts]
export {};


//// [/src/projects/project/packages/a/types/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../lib/lib.esnext.full.d.ts","../index.js","../test/index.js"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-15642581130-export const a = 'a';","signature":"-13259723213-export const a: \"a\";\n","impliedFormat":99},{"version":"-3920874422-import 'a';","signature":"-3531856636-export {};\n","impliedFormat":99}],"root":[2,3],"options":{"checkJs":true,"composite":true,"declaration":true,"emitDeclarationOnly":true,"module":199,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./test/index.d.ts"},"version":"FakeTSVersion"}

//// [/src/projects/project/packages/a/types/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../lib/lib.esnext.full.d.ts",
      "../index.js",
      "../test/index.js"
    ],
    "fileNamesList": [
      [
        "../index.js"
      ]
    ],
    "fileInfos": {
      "../../../../../../lib/lib.esnext.full.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../index.js": {
        "original": {
          "version": "-15642581130-export const a = 'a';",
          "signature": "-13259723213-export const a: \"a\";\n",
          "impliedFormat": 99
        },
        "version": "-15642581130-export const a = 'a';",
        "signature": "-13259723213-export const a: \"a\";\n",
        "impliedFormat": "esnext"
      },
      "../test/index.js": {
        "original": {
          "version": "-3920874422-import 'a';",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 99
        },
        "version": "-3920874422-import 'a';",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        2,
        "../index.js"
      ],
      [
        3,
        "../test/index.js"
      ]
    ],
    "options": {
      "checkJs": true,
      "composite": true,
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 199,
      "outDir": "./"
    },
    "referencedMap": {
      "../test/index.js": [
        "../index.js"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../lib/lib.esnext.full.d.ts",
      "../index.js",
      "../test/index.js"
    ],
    "latestChangedDtsFile": "./test/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1032
}

