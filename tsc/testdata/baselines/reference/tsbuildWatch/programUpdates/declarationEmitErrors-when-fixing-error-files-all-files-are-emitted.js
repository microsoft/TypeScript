currentDirectory::/user/username/projects/solution
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/solution/app/fileWithError.ts] *new* 
export var myClassWithError = class {
    tags() { }
    private p = 12
};
//// [/user/username/projects/solution/app/fileWithoutError.ts] *new* 
export class myClass { }
//// [/user/username/projects/solution/app/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    }
}

tsgo -b -w app
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m

  [96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - Add a type annotation to the variable myClassWithError.
    [7m1[0m export var myClassWithError = class {
    [7m [0m [96m           ~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
//// [/user/username/projects/solution/app/fileWithError.d.ts] *new* 
export declare var myClassWithError: {
    new (): {
        tags(): void;
        p: number;
    };
};

//// [/user/username/projects/solution/app/fileWithError.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myClassWithError = void 0;
var myClassWithError = class {
    tags() { }
    p = 12;
};
exports.myClassWithError = myClassWithError;

//// [/user/username/projects/solution/app/fileWithoutError.d.ts] *new* 
export declare class myClass {
}

//// [/user/username/projects/solution/app/fileWithoutError.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myClass = void 0;
class myClass {
}
exports.myClass = myClass;

//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./fileWithError.ts","./fileWithoutError.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"02dc54a766c51fbc368b69a386e90b57-export var myClassWithError = class {\n    tags() { }\n    private p = 12\n};","signature":"4763ea6446bf27424942ef44caadabed-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n\n(11,16): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(11,16): error9027: Add a type annotation to the variable myClassWithError.","impliedNodeFormat":1},{"version":"181818468a51a2348d25d30b10b6b1bb-export class myClass { }","signature":"00d3ac9a4cccbf94649ca3c19d44376a-export declare class myClass {\n}\n","impliedNodeFormat":1}],"options":{"composite":true},"emitDiagnosticsPerFile":[[2,[{"pos":11,"end":27,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":11,"end":27,"code":9027,"category":1,"message":"Add a type annotation to the variable myClassWithError."}]}]]],"latestChangedDtsFile":"./fileWithoutError.d.ts","emitSignatures":[[2,"b73b369b8f252d3d9d6dcbf326b8e0e8-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n"]]}
//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./fileWithError.ts",
        "./fileWithoutError.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./fileWithError.ts",
    "./fileWithoutError.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./fileWithError.ts",
      "version": "02dc54a766c51fbc368b69a386e90b57-export var myClassWithError = class {\n    tags() { }\n    private p = 12\n};",
      "signature": "4763ea6446bf27424942ef44caadabed-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n\n(11,16): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(11,16): error9027: Add a type annotation to the variable myClassWithError.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "02dc54a766c51fbc368b69a386e90b57-export var myClassWithError = class {\n    tags() { }\n    private p = 12\n};",
        "signature": "4763ea6446bf27424942ef44caadabed-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n\n(11,16): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(11,16): error9027: Add a type annotation to the variable myClassWithError.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./fileWithoutError.ts",
      "version": "181818468a51a2348d25d30b10b6b1bb-export class myClass { }",
      "signature": "00d3ac9a4cccbf94649ca3c19d44376a-export declare class myClass {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "181818468a51a2348d25d30b10b6b1bb-export class myClass { }",
        "signature": "00d3ac9a4cccbf94649ca3c19d44376a-export declare class myClass {\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./fileWithError.ts",
      [
        {
          "pos": 11,
          "end": 27,
          "code": 4094,
          "category": 1,
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 11,
              "end": 27,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable myClassWithError."
            }
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./fileWithoutError.d.ts",
  "emitSignatures": [
    {
      "file": "./fileWithError.ts",
      "signature": "b73b369b8f252d3d9d6dcbf326b8e0e8-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n",
      "original": [
        2,
        "b73b369b8f252d3d9d6dcbf326b8e0e8-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n"
      ]
    }
  ],
  "size": 2107
}

app/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/solution/app/fileWithError.ts
*refresh*    /user/username/projects/solution/app/fileWithoutError.ts
Signatures::
(stored at emit) /user/username/projects/solution/app/fileWithError.ts
(stored at emit) /user/username/projects/solution/app/fileWithoutError.ts


Edit [0]:: Fix error
//// [/user/username/projects/solution/app/fileWithError.ts] *modified* 
export var myClassWithError = class {
    tags() { }
    
};


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/solution/app/fileWithError.d.ts] *modified* 
export declare var myClassWithError: {
    new (): {
        tags(): void;
    };
};

//// [/user/username/projects/solution/app/fileWithError.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myClassWithError = void 0;
var myClassWithError = class {
    tags() { }
};
exports.myClassWithError = myClassWithError;

//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./fileWithError.ts","./fileWithoutError.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4f90afddb8044264e464dd4c18c7b59a-export var myClassWithError = class {\n    tags() { }\n    \n};","signature":"767d370715ef9e7e7e190b09dbf6cb11-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n","impliedNodeFormat":1},{"version":"181818468a51a2348d25d30b10b6b1bb-export class myClass { }","signature":"00d3ac9a4cccbf94649ca3c19d44376a-export declare class myClass {\n}\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./fileWithError.d.ts"}
//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./fileWithError.ts",
        "./fileWithoutError.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./fileWithError.ts",
    "./fileWithoutError.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./fileWithError.ts",
      "version": "4f90afddb8044264e464dd4c18c7b59a-export var myClassWithError = class {\n    tags() { }\n    \n};",
      "signature": "767d370715ef9e7e7e190b09dbf6cb11-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4f90afddb8044264e464dd4c18c7b59a-export var myClassWithError = class {\n    tags() { }\n    \n};",
        "signature": "767d370715ef9e7e7e190b09dbf6cb11-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./fileWithoutError.ts",
      "version": "181818468a51a2348d25d30b10b6b1bb-export class myClass { }",
      "signature": "00d3ac9a4cccbf94649ca3c19d44376a-export declare class myClass {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "181818468a51a2348d25d30b10b6b1bb-export class myClass { }",
        "signature": "00d3ac9a4cccbf94649ca3c19d44376a-export declare class myClass {\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./fileWithError.d.ts",
  "size": 1419
}

app/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/solution/app/fileWithError.ts
Signatures::
(computed .d.ts) /user/username/projects/solution/app/fileWithError.ts
