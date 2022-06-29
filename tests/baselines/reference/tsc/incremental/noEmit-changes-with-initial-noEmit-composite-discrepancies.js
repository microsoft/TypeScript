2:: Fix error and no emit
Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Clean build will not have dtsChangeTime as there was no emit and emitSignatures as undefined for files
Incremental will store the past dtsChangeTime and emitSignatures
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/class.ts": {
        "version": "545032748-export class classC {\n    prop = 1;\n}"
      },
      "./src/indirectclass.ts": {
        "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}"
      },
      "./src/directuse.ts": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;"
      },
      "./src/indirectuse.ts": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;"
      },
      "./src/nochangefile.ts": {
        "version": "6714567633-export function writeLog(s: string) {\n}"
      },
      "./src/nochangefilewithemitspecificerror.ts": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./src/directuse.ts": [
        "./src/indirectclass.ts"
      ],
      "./src/indirectclass.ts": [
        "./src/class.ts"
      ],
      "./src/indirectuse.ts": [
        "./src/indirectclass.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/directuse.ts",
      "./src/indirectclass.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      [
        "./src/nochangefilewithemitspecificerror.ts",
        [
          {
            "file": "./src/nochangefilewithemitspecificerror.ts",
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
          }
        ]
      ]
    ],
    "emitSignatures": [
      "./src/class.ts",
      "./src/indirectclass.ts",
      "./src/directuse.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      "./src/nochangefilewithemitspecificerror.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/class.ts": {
        "version": "545032748-export class classC {\n    prop = 1;\n}"
      },
      "./src/indirectclass.ts": {
        "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}"
      },
      "./src/directuse.ts": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;"
      },
      "./src/indirectuse.ts": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;"
      },
      "./src/nochangefile.ts": {
        "version": "6714567633-export function writeLog(s: string) {\n}"
      },
      "./src/nochangefilewithemitspecificerror.ts": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./src/directuse.ts": [
        "./src/indirectclass.ts"
      ],
      "./src/indirectclass.ts": [
        "./src/class.ts"
      ],
      "./src/indirectuse.ts": [
        "./src/indirectclass.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/directuse.ts",
      "./src/indirectclass.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      [
        "./src/nochangefilewithemitspecificerror.ts",
        [
          {
            "file": "./src/nochangefilewithemitspecificerror.ts",
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
          }
        ]
      ]
    ],
    "emitSignatures": [
      [
        "./src/class.ts",
        "-3790894605-export declare class classC {\r\n    prop1: number;\r\n}\r\n"
      ],
      [
        "./src/directuse.ts",
        "-4882119183-export {};\r\n"
      ],
      [
        "./src/indirectuse.ts",
        "-4882119183-export {};\r\n"
      ]
    ],
    "dtsChangeTime": "FakeTime"
  },
  "version": "FakeTSVersion"
}
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./src/directuse.ts": [
    "./src/indirectclass.ts"
  ],
  "./src/indirectclass.ts": [
    "./src/class.ts"
  ],
  "./src/indirectuse.ts": [
    "./src/indirectclass.ts"
  ]
}
Clean: {
  "./src/indirectclass.ts": [
    "./src/class.ts"
  ]
}