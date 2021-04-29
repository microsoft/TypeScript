Input::


Output::
/lib/tsc --b /src/tests --verbose --force
[[90m12:16:00 AM[0m] Projects in this build: 
    * src/core/tsconfig.json
    * src/logic/tsconfig.json
    * src/tests/tsconfig.json

[[90m12:16:00 AM[0m] Project 'src/core/tsconfig.json' is being forcibly rebuilt

[[90m12:16:00 AM[0m] Building project '/src/core/tsconfig.json'...

[[90m12:16:00 AM[0m] Project 'src/logic/tsconfig.json' is being forcibly rebuilt

[[90m12:16:00 AM[0m] Building project '/src/logic/tsconfig.json'...

[[90m12:16:00 AM[0m] Project 'src/tests/tsconfig.json' is being forcibly rebuilt

[[90m12:16:00 AM[0m] Building project '/src/tests/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/core/anotherModule.d.ts] file written with same contents
//// [/src/core/anotherModule.d.ts.map] file written with same contents
//// [/src/core/anotherModule.js] file written with same contents
//// [/src/core/index.d.ts] file written with same contents
//// [/src/core/index.d.ts.map] file written with same contents
//// [/src/core/index.js] file written with same contents
//// [/src/core/tsconfig.tsbuildinfo] file written with same contents
//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-2676574883-export const World = \"hello\";\r\n"
      },
      "./index.ts": {
        "version": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",
        "signature": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1134
}

//// [/src/logic/index.d.ts] file written with same contents
//// [/src/logic/index.js] file written with same contents
//// [/src/logic/index.js.map] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "./index.ts"
    ],
    "fileNamesList": [
      [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map"
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map"
      },
      "./index.ts": {
        "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true
    },
    "referencedMap": {
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1370
}

//// [/src/tests/index.d.ts] file written with same contents
//// [/src/tests/index.js] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "../logic/index.d.ts",
      "./index.ts"
    ],
    "fileNamesList": [
      [
        "../core/anothermodule.d.ts"
      ],
      [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map"
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map"
      },
      "../logic/index.d.ts": {
        "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      },
      "./index.ts": {
        "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "../logic/index.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1578
}

