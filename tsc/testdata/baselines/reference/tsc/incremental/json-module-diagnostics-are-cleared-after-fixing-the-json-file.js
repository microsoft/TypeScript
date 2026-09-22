currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/check.ts] *new* 
import type data from "./data.json";

type Shape = { title: string };
type Covers<T extends Shape> = T;

export type Check = Covers<typeof data>;
//// [/home/src/workspaces/project/data.json] *new* 
{ "title": "hello" }
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "noEmit": true,
        "incremental": true,
        "resolveJsonModule": true,
        "esModuleInterop": true
    }
}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2025.full.d.ts","./data.json","./check.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c770d6bc113c67c24136745dc262fd43-{ \"title\": \"hello\" }"},"87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;"],"fileIdsList":[[2]],"options":{"strict":true,"esModuleInterop":true},"referencedMap":[[3,1]],"affectedFilesPendingEmit":[3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./check.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./data.json",
    "./check.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "./data.json",
      "version": "c770d6bc113c67c24136745dc262fd43-{ \"title\": \"hello\" }",
      "signature": "c770d6bc113c67c24136745dc262fd43-{ \"title\": \"hello\" }",
      "impliedNodeFormat": "None",
      "original": {
        "version": "c770d6bc113c67c24136745dc262fd43-{ \"title\": \"hello\" }"
      }
    },
    {
      "fileName": "./check.ts",
      "version": "87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;",
      "signature": "87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./data.json"
    ]
  ],
  "options": {
    "strict": true,
    "esModuleInterop": true
  },
  "referencedMap": {
    "./check.ts": [
      "./data.json"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./check.ts",
      "Js",
      3
    ]
  ],
  "size": 1270
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/data.json
*refresh*    /home/src/workspaces/project/check.ts
Signatures::


Edit [0]:: remove required property
//// [/home/src/workspaces/project/data.json] *modified* 
{}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mcheck.ts[0m:[93m6[0m:[93m28[0m - [91merror[0m[90m TS2741: [0mProperty 'title' is missing in type '{}' but required in type 'Shape'.

[7m6[0m export type Check = Covers<typeof data>;
[7m [0m [91m                           ~~~~~~~~~~~[0m

  [96mcheck.ts[0m:[93m3[0m:[93m16[0m - 'title' is declared here.
    [7m3[0m type Shape = { title: string };
    [7m [0m [96m               ~~~~~[0m


Found 1 error in check.ts[90m:6[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2025.full.d.ts","./data.json","./check.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"dc7048f8f8747f561349cde127705c16-{}"},{"version":"87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;","signature":"f171e5fef0d977f93110bee26e539dc9-import type data from \"./data.json\";\ntype Shape = {\n    title: string;\n};\ntype Covers<T extends Shape> = T;\nexport type Check = Covers<typeof data>;\nexport {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"strict":true,"esModuleInterop":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":132,"end":143,"code":2741,"category":1,"messageKey":"Property_0_is_missing_in_type_1_but_required_in_type_2_2741","messageArgs":["title","{}","Shape"],"relatedInformation":[{"pos":53,"end":58,"code":2728,"category":3,"messageKey":"_0_is_declared_here_2728","messageArgs":["title"]}]}]]],"affectedFilesPendingEmit":[3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./check.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./data.json",
    "./check.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "./data.json",
      "version": "dc7048f8f8747f561349cde127705c16-{}",
      "signature": "dc7048f8f8747f561349cde127705c16-{}",
      "impliedNodeFormat": "None",
      "original": {
        "version": "dc7048f8f8747f561349cde127705c16-{}"
      }
    },
    {
      "fileName": "./check.ts",
      "version": "87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;",
      "signature": "f171e5fef0d977f93110bee26e539dc9-import type data from \"./data.json\";\ntype Shape = {\n    title: string;\n};\ntype Covers<T extends Shape> = T;\nexport type Check = Covers<typeof data>;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;",
        "signature": "f171e5fef0d977f93110bee26e539dc9-import type data from \"./data.json\";\ntype Shape = {\n    title: string;\n};\ntype Covers<T extends Shape> = T;\nexport type Check = Covers<typeof data>;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./data.json"
    ]
  ],
  "options": {
    "strict": true,
    "esModuleInterop": true
  },
  "referencedMap": {
    "./check.ts": [
      "./data.json"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./check.ts",
      [
        {
          "pos": 132,
          "end": 143,
          "code": 2741,
          "category": 1,
          "messageKey": "Property_0_is_missing_in_type_1_but_required_in_type_2_2741",
          "messageArgs": [
            "title",
            "{}",
            "Shape"
          ],
          "relatedInformation": [
            {
              "pos": 53,
              "end": 58,
              "code": 2728,
              "category": 3,
              "messageKey": "_0_is_declared_here_2728",
              "messageArgs": [
                "title"
              ]
            }
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./check.ts",
      "Js",
      3
    ]
  ],
  "size": 1827
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/data.json
*refresh*    /home/src/workspaces/project/check.ts
Signatures::
(used version)   /home/src/workspaces/project/data.json
(computed .d.ts) /home/src/workspaces/project/check.ts


Edit [1]:: restore required property
//// [/home/src/workspaces/project/data.json] *modified* 
{ "title": "fixed" }

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2025.full.d.ts","./data.json","./check.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f985880635a046d0ccc31aa189849b95-{ \"title\": \"fixed\" }"},{"version":"87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;","signature":"f171e5fef0d977f93110bee26e539dc9-import type data from \"./data.json\";\ntype Shape = {\n    title: string;\n};\ntype Covers<T extends Shape> = T;\nexport type Check = Covers<typeof data>;\nexport {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"strict":true,"esModuleInterop":true},"referencedMap":[[3,1]],"affectedFilesPendingEmit":[3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./check.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./data.json",
    "./check.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "./data.json",
      "version": "f985880635a046d0ccc31aa189849b95-{ \"title\": \"fixed\" }",
      "signature": "f985880635a046d0ccc31aa189849b95-{ \"title\": \"fixed\" }",
      "impliedNodeFormat": "None",
      "original": {
        "version": "f985880635a046d0ccc31aa189849b95-{ \"title\": \"fixed\" }"
      }
    },
    {
      "fileName": "./check.ts",
      "version": "87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;",
      "signature": "f171e5fef0d977f93110bee26e539dc9-import type data from \"./data.json\";\ntype Shape = {\n    title: string;\n};\ntype Covers<T extends Shape> = T;\nexport type Check = Covers<typeof data>;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "87d7b1214f92d2704171976612b58fb3-import type data from \"./data.json\";\n\ntype Shape = { title: string };\ntype Covers<T extends Shape> = T;\n\nexport type Check = Covers<typeof data>;",
        "signature": "f171e5fef0d977f93110bee26e539dc9-import type data from \"./data.json\";\ntype Shape = {\n    title: string;\n};\ntype Covers<T extends Shape> = T;\nexport type Check = Covers<typeof data>;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./data.json"
    ]
  ],
  "options": {
    "strict": true,
    "esModuleInterop": true
  },
  "referencedMap": {
    "./check.ts": [
      "./data.json"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./check.ts",
      "Js",
      3
    ]
  ],
  "size": 1521
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/data.json
*refresh*    /home/src/workspaces/project/check.ts
Signatures::
(used version)   /home/src/workspaces/project/data.json
(computed .d.ts) /home/src/workspaces/project/check.ts
