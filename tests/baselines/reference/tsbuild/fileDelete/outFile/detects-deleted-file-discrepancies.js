0:: delete child2 file
Clean build will not have latestChangedDtsFile as there was no emit and outSignature as undefined for files
Incremental will store the past latestChangedDtsFile and outSignature
TsBuild info text without affectedFilesPendingEmit:: /src/childresult.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./child/child.ts": {
      "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./child/child.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./childResult.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./child/child.ts",
      [
        {
          "start": 23,
          "length": 17,
          "messageText": "Cannot find module '../child/child2'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?",
          "category": 1,
          "code": 2792
        }
      ]
    ]
  ],
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./child/child.ts": {
      "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./child/child.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./childResult.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./child/child.ts",
      [
        {
          "start": 23,
          "length": 17,
          "messageText": "Cannot find module '../child/child2'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?",
          "category": 1,
          "code": 2792
        }
      ]
    ]
  ],
  "outSignature": "2074776633-declare module \"child2\" {\n    export function child2(): void;\n}\ndeclare module \"child\" {\n    export function child(): void;\n}\n",
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}