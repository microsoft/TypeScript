1:: fix error declarationMap
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 26,
          "kind": "text"
        }
      ],
      "hash": "-4980187384-var x = 10;\r\nvar y = 10;\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 46,
          "kind": "text"
        }
      ],
      "hash": "-10321164067-declare const x = 10;\r\ndeclare const y = 10;\r\n//# sourceMappingURL=outFile.d.ts.map",
      "mapHash": "12253058536-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,CAAC,KAAK,CAAC;ACAb,QAAA,MAAM,CAAC,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "5029505981-const x = 10;",
      "./project/b.ts": "2026006654-const y = 10;"
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "noEmitOnError": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-7944035420-declare const x = 10;\r\ndeclare const y = 10;\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 46,
          "kind": "text"
        }
      ],
      "hash": "-10321164067-declare const x = 10;\r\ndeclare const y = 10;\r\n//# sourceMappingURL=outFile.d.ts.map",
      "mapHash": "12253058536-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,CAAC,KAAK,CAAC;ACAb,QAAA,MAAM,CAAC,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "5029505981-const x = 10;",
      "./project/b.ts": "2026006654-const y = 10;"
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "noEmitOnError": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-7944035420-declare const x = 10;\r\ndeclare const y = 10;\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
File: /src/outfile.tsbuildinfo.baseline.txt
CleanBuild:
======================================================================
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-26)
var x = 10;
var y = 10;

======================================================================
======================================================================
File:: /src/outFile.d.ts
----------------------------------------------------------------------
text: (0-46)
declare const x = 10;
declare const y = 10;

======================================================================
IncrementalBuild:
======================================================================
File:: /src/outFile.js
======================================================================
======================================================================
File:: /src/outFile.d.ts
----------------------------------------------------------------------
text: (0-46)
declare const x = 10;
declare const y = 10;

======================================================================