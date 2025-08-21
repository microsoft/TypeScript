currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.d.ts] *new* 
declare const a = "hello";
//// [/home/src/workspaces/project/b.ts] *new* 
const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "declaration": true,
        "incremental": true,
        "lib": ["es6"],
    },
}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.es2015.d.ts] *Lib*
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
//// [/home/src/workspaces/project/b.d.ts] *new* 
declare const b = 10;

//// [/home/src/workspaces/project/b.js] *new* 
const b = 10;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2015.d.ts","./a.d.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"65e51aad504cdd4dce12c03a2dcc9410-declare const a = \"hello\";","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0b6737c5344041bf3b8940a4bf34d44f-const b = 10;","signature":"459f957b863aabe09fb52325f783682c-declare const b = 10;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"declaration":true}}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.d.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2015.d.ts",
    "./a.d.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2015.d.ts",
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
      "fileName": "./a.d.ts",
      "version": "65e51aad504cdd4dce12c03a2dcc9410-declare const a = \"hello\";",
      "signature": "65e51aad504cdd4dce12c03a2dcc9410-declare const a = \"hello\";",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "65e51aad504cdd4dce12c03a2dcc9410-declare const a = \"hello\";",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "0b6737c5344041bf3b8940a4bf34d44f-const b = 10;",
      "signature": "459f957b863aabe09fb52325f783682c-declare const b = 10;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0b6737c5344041bf3b8940a4bf34d44f-const b = 10;",
        "signature": "459f957b863aabe09fb52325f783682c-declare const b = 10;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "size": 1213
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2015.d.ts
*refresh*    /home/src/workspaces/project/a.d.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/b.ts


Edit [0]:: with --noLib

tsgo --noLib
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mtsconfig.json[0m:[93m5[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'lib' cannot be specified with option 'noLib'.

[7m5[0m         "lib": ["es6"],
[7m [0m [91m        ~~~~~[0m


Found 1 error in tsconfig.json[90m:5[0m

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[[1,2]],"fileNames":["./a.d.ts","./b.ts"],"fileInfos":[{"version":"65e51aad504cdd4dce12c03a2dcc9410-declare const a = \"hello\";","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0b6737c5344041bf3b8940a4bf34d44f-const b = 10;","signature":"459f957b863aabe09fb52325f783682c-declare const b = 10;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[1,2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./a.d.ts",
        "./b.ts"
      ],
      "original": [
        1,
        2
      ]
    }
  ],
  "fileNames": [
    "./a.d.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "./a.d.ts",
      "version": "65e51aad504cdd4dce12c03a2dcc9410-declare const a = \"hello\";",
      "signature": "65e51aad504cdd4dce12c03a2dcc9410-declare const a = \"hello\";",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "65e51aad504cdd4dce12c03a2dcc9410-declare const a = \"hello\";",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "0b6737c5344041bf3b8940a4bf34d44f-const b = 10;",
      "signature": "459f957b863aabe09fb52325f783682c-declare const b = 10;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0b6737c5344041bf3b8940a4bf34d44f-const b = 10;",
        "signature": "459f957b863aabe09fb52325f783682c-declare const b = 10;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    "./a.d.ts",
    "./b.ts"
  ],
  "size": 474
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/workspaces/project/a.d.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(used version)   /home/src/workspaces/project/a.d.ts
(computed .d.ts) /home/src/workspaces/project/b.ts
