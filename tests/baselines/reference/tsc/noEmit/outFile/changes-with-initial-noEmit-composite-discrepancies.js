2:: Fix error and no emit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./project/src/class.ts": {
        "version": "545032748-export class classC {\n    prop = 1;\n}",
        "impliedFormat": "commonjs"
      },
      "./project/src/indirectclass.ts": {
        "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "impliedFormat": "commonjs"
      },
      "./project/src/directuse.ts": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "impliedFormat": "commonjs"
      },
      "./project/src/indirectuse.ts": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "impliedFormat": "commonjs"
      },
      "./project/src/nochangefile.ts": {
        "version": "6714567633-export function writeLog(s: string) {\n}",
        "impliedFormat": "commonjs"
      },
      "./project/src/nochangefilewithemitspecificerror.ts": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        [
          2,
          7
        ],
        [
          "./project/src/class.ts",
          "./project/src/indirectclass.ts",
          "./project/src/directuse.ts",
          "./project/src/indirectuse.ts",
          "./project/src/nochangefile.ts",
          "./project/src/nochangefilewithemitspecificerror.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "semanticDiagnosticsPerFile": [
      [
        "./project/src/nochangefilewithemitspecificerror.ts",
        [
          {
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./project/src/class.ts": {
        "version": "545032748-export class classC {\n    prop = 1;\n}",
        "impliedFormat": "commonjs"
      },
      "./project/src/indirectclass.ts": {
        "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "impliedFormat": "commonjs"
      },
      "./project/src/directuse.ts": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "impliedFormat": "commonjs"
      },
      "./project/src/indirectuse.ts": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "impliedFormat": "commonjs"
      },
      "./project/src/nochangefile.ts": {
        "version": "6714567633-export function writeLog(s: string) {\n}",
        "impliedFormat": "commonjs"
      },
      "./project/src/nochangefilewithemitspecificerror.ts": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        [
          2,
          7
        ],
        [
          "./project/src/class.ts",
          "./project/src/indirectclass.ts",
          "./project/src/directuse.ts",
          "./project/src/indirectuse.ts",
          "./project/src/nochangefile.ts",
          "./project/src/nochangefilewithemitspecificerror.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "semanticDiagnosticsPerFile": [
      [
        "./project/src/nochangefilewithemitspecificerror.ts",
        [
          {
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
    "outSignature": "-1966987419-declare module \"src/class\" {\n    export class classC {\n        prop1: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}