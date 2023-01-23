0:: No Change run with noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
1:: No Change run with noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
2:: Introduce error but still noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
        "version": "1786859709-export class classC {\n    prop1 = 1;\n}"
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
      [
        "./src/directuse.ts",
        [
          {
            "file": "./src/directuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
      "./src/indirectclass.ts",
      [
        "./src/indirectuse.ts",
        [
          {
            "file": "./src/indirectuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
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
        "version": "1786859709-export class classC {\n    prop1 = 1;\n}"
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
      [
        "./src/directuse.ts",
        [
          {
            "file": "./src/directuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
      "./src/indirectclass.ts",
      [
        "./src/indirectuse.ts",
        [
          {
            "file": "./src/indirectuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
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
        "-9508063301-export declare class classC {\n    prop: number;\n}\n"
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
5:: No Change run with noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
6:: No Change run with noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
10:: No Change run with noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
        "version": "1786859709-export class classC {\n    prop1 = 1;\n}"
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
      [
        "./src/directuse.ts",
        [
          {
            "file": "./src/directuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
      "./src/indirectclass.ts",
      [
        "./src/indirectuse.ts",
        [
          {
            "file": "./src/indirectuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
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
        "version": "1786859709-export class classC {\n    prop1 = 1;\n}"
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
      [
        "./src/directuse.ts",
        [
          {
            "file": "./src/directuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
      "./src/indirectclass.ts",
      [
        "./src/indirectuse.ts",
        [
          {
            "file": "./src/indirectuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
11:: No Change run with noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
        "version": "1786859709-export class classC {\n    prop1 = 1;\n}"
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
      [
        "./src/directuse.ts",
        [
          {
            "file": "./src/directuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
      "./src/indirectclass.ts",
      [
        "./src/indirectuse.ts",
        [
          {
            "file": "./src/indirectuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
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
        "version": "1786859709-export class classC {\n    prop1 = 1;\n}"
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
      [
        "./src/directuse.ts",
        [
          {
            "file": "./src/directuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
      "./src/indirectclass.ts",
      [
        "./src/indirectuse.ts",
        [
          {
            "file": "./src/indirectuse.ts",
            "start": 76,
            "length": 4,
            "code": 2551,
            "category": 1,
            "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
            "relatedInformation": [
              {
                "file": "./src/class.ts",
                "start": 26,
                "length": 5,
                "messageText": "'prop1' is declared here.",
                "category": 3,
                "code": 2728
              }
            ]
          }
        ]
      ],
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
13:: Fix error and no emit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
15:: No Change run with noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
16:: No Change run with noEmit
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}