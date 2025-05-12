2:: Fix error and no emit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
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
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./src/class.ts",
        "./src/indirectclass.ts",
        "./src/directuse.ts",
        "./src/indirectuse.ts",
        "./src/nochangefile.ts",
        "./src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
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
  "emitSignatures": [
    "./src/class.ts",
    "./src/indirectclass.ts",
    "./src/directuse.ts",
    "./src/indirectuse.ts",
    "./src/nochangefile.ts",
    "./src/nochangefilewithemitspecificerror.ts"
  ],
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
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
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./src/class.ts",
        "./src/indirectclass.ts",
        "./src/directuse.ts",
        "./src/indirectuse.ts",
        "./src/nochangefile.ts",
        "./src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
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
  "emitSignatures": [
    [
      "./src/class.ts",
      "-12157283604-export declare class classC {\n    prop1: number;\n}\n"
    ],
    [
      "./src/directuse.ts",
      "-3531856636-export {};\n"
    ],
    [
      "./src/indirectuse.ts",
      "-3531856636-export {};\n"
    ]
  ],
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}