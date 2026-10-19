currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.decorators.d.ts] *new* 
/// <reference no-default-lib="true"/>
export {};
//// [/home/src/tslibs/TS/Lib/lib.es2020.d.ts] *new* 
/// <reference no-default-lib="true"/>
/// <reference lib="es5"/>
//// [/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts] *new* 
/// <reference no-default-lib="true"/>
/// <reference lib="es5"/>
//// [/home/src/tslibs/TS/Lib/lib.es2026.array.d.ts] *new* 
/// <reference no-default-lib="true"/>
interface Array<T> {
    toSorted(): T[];
}
//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *new* 
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
//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *new* 
/// <reference no-default-lib="true"/>
/// <reference lib="es5"/>
/// <reference lib="esnext.array"/>
/// <reference lib="decorators"/>
//// [/home/src/workspaces/project/a.ts] *new* 
export const values = [3, 1, 2].toSorted();
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions":{"incremental":true,"noEmit":true,"types":[],"target":"esnext"},"files":["a.ts"]}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.es5.d.ts","lib.es2026.array.d.ts","lib.decorators.d.ts","lib.esnext.full.d.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}","affectsGlobalScope":true,"impliedNodeFormat":1},"7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};","5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>","b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();"],"options":{"target":99},"affectedFilesPendingEmit":[5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "lib.es2026.array.d.ts",
    "lib.decorators.d.ts",
    "lib.esnext.full.d.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.es2026.array.d.ts",
      "version": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
      "signature": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "lib.decorators.d.ts",
      "version": "7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};",
      "signature": "7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "lib.esnext.full.d.ts",
      "version": "5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>",
      "signature": "5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./a.ts",
      "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
      "signature": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "target": 99
  },
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      5
    ]
  ],
  "size": 1516
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.array.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.decorators.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [0]:: narrow lib
//// [/home/src/workspaces/project/tsconfig.json] *modified* 
{"compilerOptions":{"incremental":true,"noEmit":true,"types":[],"target":"esnext","lib":["es2020"]},"files":["a.ts"]}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m33[0m - [91merror[0m[90m TS2550: [0mProperty 'toSorted' does not exist on type 'number[]'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2023' or later.

[7m1[0m export const values = [3, 1, 2].toSorted();
[7m [0m [91m                                ~~~~~~~~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es5.d.ts","lib.es2020.d.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"39b6b52e4bfc36fd6d892df73c38abe0-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>",{"version":"b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();","signature":"c31aa5c2cd609f2993edf6ca8656963f-export declare const values: any;\n","impliedNodeFormat":1}],"options":{"target":99},"semanticDiagnosticsPerFile":[[3,[{"pos":32,"end":40,"code":2550,"category":1,"messageKey":"Property_0_does_not_exist_on_type_1_Do_you_need_to_change_your_target_library_Try_changing_the_lib_c_2550","messageArgs":["toSorted","number[]","es2023"]}]]],"affectedFilesPendingEmit":[3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "lib.es2020.d.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.es2020.d.ts",
      "version": "39b6b52e4bfc36fd6d892df73c38abe0-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>",
      "signature": "39b6b52e4bfc36fd6d892df73c38abe0-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./a.ts",
      "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
      "signature": "c31aa5c2cd609f2993edf6ca8656963f-export declare const values: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
        "signature": "c31aa5c2cd609f2993edf6ca8656963f-export declare const values: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "target": 99
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "pos": 32,
          "end": 40,
          "code": 2550,
          "category": 1,
          "messageKey": "Property_0_does_not_exist_on_type_1_Do_you_need_to_change_your_target_library_Try_changing_the_lib_c_2550",
          "messageArgs": [
            "toSorted",
            "number[]",
            "es2023"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      3
    ]
  ],
  "size": 1485
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.es2020.d.ts
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [1]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m33[0m - [91merror[0m[90m TS2550: [0mProperty 'toSorted' does not exist on type 'number[]'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2023' or later.

[7m1[0m export const values = [3, 1, 2].toSorted();
[7m [0m [91m                                ~~~~~~~~[0m


Found 1 error in a.ts[90m:1[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: restore lib
//// [/home/src/workspaces/project/tsconfig.json] *modified* 
{"compilerOptions":{"incremental":true,"noEmit":true,"types":[],"target":"esnext"},"files":["a.ts"]}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.es5.d.ts","lib.es2026.array.d.ts","lib.decorators.d.ts","lib.esnext.full.d.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}","affectsGlobalScope":true,"impliedNodeFormat":1},"7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};","5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>",{"version":"b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();","signature":"38b21ab127214358ce1b4ec5bf7acbed-export declare const values: number[];\n","impliedNodeFormat":1}],"options":{"target":99},"affectedFilesPendingEmit":[5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "lib.es2026.array.d.ts",
    "lib.decorators.d.ts",
    "lib.esnext.full.d.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.es2026.array.d.ts",
      "version": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
      "signature": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "lib.decorators.d.ts",
      "version": "7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};",
      "signature": "7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "lib.esnext.full.d.ts",
      "version": "5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>",
      "signature": "5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./a.ts",
      "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
      "signature": "38b21ab127214358ce1b4ec5bf7acbed-export declare const values: number[];\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
        "signature": "38b21ab127214358ce1b4ec5bf7acbed-export declare const values: number[];\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "target": 99
  },
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      5
    ]
  ],
  "size": 1638
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.array.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.decorators.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.es2026.array.d.ts
(used version)   /home/src/tslibs/TS/Lib/lib.decorators.d.ts
(used version)   /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [3]:: narrow target
//// [/home/src/workspaces/project/tsconfig.json] *modified* 
{"compilerOptions":{"incremental":true,"noEmit":true,"types":[],"target":"es2020"},"files":["a.ts"]}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m33[0m - [91merror[0m[90m TS2550: [0mProperty 'toSorted' does not exist on type 'number[]'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2023' or later.

[7m1[0m export const values = [3, 1, 2].toSorted();
[7m [0m [91m                                ~~~~~~~~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es5.d.ts","lib.es2020.full.d.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"39b6b52e4bfc36fd6d892df73c38abe0-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>",{"version":"b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();","signature":"c31aa5c2cd609f2993edf6ca8656963f-export declare const values: any;\n","impliedNodeFormat":1}],"options":{"target":7},"semanticDiagnosticsPerFile":[[3,[{"pos":32,"end":40,"code":2550,"category":1,"messageKey":"Property_0_does_not_exist_on_type_1_Do_you_need_to_change_your_target_library_Try_changing_the_lib_c_2550","messageArgs":["toSorted","number[]","es2023"]}]]],"affectedFilesPendingEmit":[3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "lib.es2020.full.d.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.es2020.full.d.ts",
      "version": "39b6b52e4bfc36fd6d892df73c38abe0-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>",
      "signature": "39b6b52e4bfc36fd6d892df73c38abe0-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./a.ts",
      "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
      "signature": "c31aa5c2cd609f2993edf6ca8656963f-export declare const values: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
        "signature": "c31aa5c2cd609f2993edf6ca8656963f-export declare const values: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "target": 7
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "pos": 32,
          "end": 40,
          "code": 2550,
          "category": 1,
          "messageKey": "Property_0_does_not_exist_on_type_1_Do_you_need_to_change_your_target_library_Try_changing_the_lib_c_2550",
          "messageArgs": [
            "toSorted",
            "number[]",
            "es2023"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      3
    ]
  ],
  "size": 1489
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.es2020.full.d.ts
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [4]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m33[0m - [91merror[0m[90m TS2550: [0mProperty 'toSorted' does not exist on type 'number[]'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2023' or later.

[7m1[0m export const values = [3, 1, 2].toSorted();
[7m [0m [91m                                ~~~~~~~~[0m


Found 1 error in a.ts[90m:1[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [5]:: restore target
//// [/home/src/workspaces/project/tsconfig.json] *modified* 
{"compilerOptions":{"incremental":true,"noEmit":true,"types":[],"target":"esnext"},"files":["a.ts"]}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.es5.d.ts","lib.es2026.array.d.ts","lib.decorators.d.ts","lib.esnext.full.d.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}","affectsGlobalScope":true,"impliedNodeFormat":1},"7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};","5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>",{"version":"b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();","signature":"38b21ab127214358ce1b4ec5bf7acbed-export declare const values: number[];\n","impliedNodeFormat":1}],"options":{"target":99},"affectedFilesPendingEmit":[5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "lib.es2026.array.d.ts",
    "lib.decorators.d.ts",
    "lib.esnext.full.d.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.es2026.array.d.ts",
      "version": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
      "signature": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e91cd068d41015559cda423626d75b7a-/// <reference no-default-lib=\"true\"/>\ninterface Array<T> {\n    toSorted(): T[];\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "lib.decorators.d.ts",
      "version": "7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};",
      "signature": "7391cbbbaadf784b1dca43ffe8f0eaee-/// <reference no-default-lib=\"true\"/>\nexport {};",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "lib.esnext.full.d.ts",
      "version": "5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>",
      "signature": "5ecdc3e6174a78a8b8d9150f692c3942-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es5\"/>\n/// <reference lib=\"esnext.array\"/>\n/// <reference lib=\"decorators\"/>",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./a.ts",
      "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
      "signature": "38b21ab127214358ce1b4ec5bf7acbed-export declare const values: number[];\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b31fbc1eb463bbe84b7bbcf331cb31f2-export const values = [3, 1, 2].toSorted();",
        "signature": "38b21ab127214358ce1b4ec5bf7acbed-export declare const values: number[];\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "target": 99
  },
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      5
    ]
  ],
  "size": 1638
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.array.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.decorators.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.es2026.array.d.ts
(used version)   /home/src/tslibs/TS/Lib/lib.decorators.d.ts
(used version)   /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [6]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::
