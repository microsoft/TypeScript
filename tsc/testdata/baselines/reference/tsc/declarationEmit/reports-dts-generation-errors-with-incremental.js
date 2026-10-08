currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.ts] *new* 
import ky from 'ky';
export const api = ky.extend({});
//// [/home/src/workspaces/project/node_modules/ky/distribution/index.d.ts] *new* 
declare class KyInstance {
    private brand;
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;
//// [/home/src/workspaces/project/node_modules/ky/package.json] *new* 
{
    "name": "ky",
    "type": "module",
    "main": "./distribution/index.js"
}
//// [/home/src/workspaces/project/package.json] *new* 
{
    "type": "module"
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "composite": true,
        "incremental": true,
        "declaration": true,
        "skipLibCheck": true,
        "skipDefaultLibCheck": true,
    },
}

tsgo --explainFiles --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'brand' of exported anonymous class type may not be private or protected.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

  [96mindex.ts[0m:[93m2[0m:[93m14[0m - Add a type annotation to the variable api.
    [7m2[0m export const api = ky.extend({});
    [7m [0m [96m             ~~~[0m

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'api' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /home/src/workspaces/project/index.js
TSFILE: /home/src/workspaces/project/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.es2026.full.d.ts
   Default library for target 'ES2026'
node_modules/ky/distribution/index.d.ts
   Imported via 'ky' from file 'index.ts'
   File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 2 errors in the same file, starting at: index.ts[90m:2[0m

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/index.js] *new* 
import ky from 'ky';
export const api = ky.extend({});

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"packageJsons":["./node_modules/ky/package.json","./package.json"],"missingPackageJsons":["./node_modules/ky/distribution/package.json"],"fileNames":["lib.es2026.full.d.ts","./node_modules/ky/distribution/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"778e62a60976d425122b5f7908b0c56f-declare class KyInstance {\n    private brand;\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;","impliedNodeFormat":99},{"version":"0f5091e963c17913313e4969c59e6eb4-import ky from 'ky';\nexport const api = ky.extend({});","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"composite":true,"declaration":true,"module":199,"skipLibCheck":true,"skipDefaultLibCheck":true},"referencedMap":[[3,1]],"emitDiagnosticsPerFile":[[3,[{"pos":34,"end":37,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["brand"],"relatedInformation":[{"pos":34,"end":37,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["api"]}]},{"pos":34,"end":37,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["api"]}]]],"emitSignatures":[3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 3
    }
  ],
  "packageJsons": [
    "./node_modules/ky/package.json",
    "./package.json"
  ],
  "missingPackageJsons": [
    "./node_modules/ky/distribution/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./node_modules/ky/distribution/index.d.ts",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./node_modules/ky/distribution/index.d.ts",
      "version": "778e62a60976d425122b5f7908b0c56f-declare class KyInstance {\n    private brand;\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;",
      "signature": "778e62a60976d425122b5f7908b0c56f-declare class KyInstance {\n    private brand;\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "778e62a60976d425122b5f7908b0c56f-declare class KyInstance {\n    private brand;\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./index.ts",
      "version": "0f5091e963c17913313e4969c59e6eb4-import ky from 'ky';\nexport const api = ky.extend({});",
      "signature": "0f5091e963c17913313e4969c59e6eb4-import ky from 'ky';\nexport const api = ky.extend({});",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "0f5091e963c17913313e4969c59e6eb4-import ky from 'ky';\nexport const api = ky.extend({});",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./node_modules/ky/distribution/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 199,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "./index.ts": [
      "./node_modules/ky/distribution/index.d.ts"
    ]
  },
  "emitDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 34,
          "end": 37,
          "code": 4094,
          "category": 1,
          "messageKey": "Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094",
          "messageArgs": [
            "brand"
          ],
          "relatedInformation": [
            {
              "pos": 34,
              "end": 37,
              "code": 9027,
              "category": 1,
              "messageKey": "Add_a_type_annotation_to_the_variable_0_9027",
              "messageArgs": [
                "api"
              ]
            }
          ]
        },
        {
          "pos": 34,
          "end": 37,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "api"
          ]
        }
      ]
    ]
  ],
  "emitSignatures": [
    {
      "file": "./index.ts",
      "original": 3
    }
  ],
  "size": 2117
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/ky/distribution/index.d.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::


Edit [0]:: no change

tsgo --explainFiles --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'brand' of exported anonymous class type may not be private or protected.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

  [96mindex.ts[0m:[93m2[0m:[93m14[0m - Add a type annotation to the variable api.
    [7m2[0m export const api = ky.extend({});
    [7m [0m [96m             ~~~[0m

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'api' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

../../tslibs/TS/Lib/lib.es2026.full.d.ts
   Default library for target 'ES2026'
node_modules/ky/distribution/index.d.ts
   Imported via 'ky' from file 'index.ts'
   File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 2 errors in the same file, starting at: index.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: build -b

tsgo -b --explainFiles --listEmittedFiles --v
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'brand' of exported anonymous class type may not be private or protected.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

  [96mindex.ts[0m:[93m2[0m:[93m14[0m - Add a type annotation to the variable api.
    [7m2[0m export const api = ky.extend({});
    [7m [0m [96m             ~~~[0m

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'api' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

../../tslibs/TS/Lib/lib.es2026.full.d.ts
   Default library for target 'ES2026'
node_modules/ky/distribution/index.d.ts
   Imported via 'ky' from file 'index.ts'
   File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 2 errors in the same file, starting at: index.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
