//// [/lib/initial-buildOutput.txt]
/lib/tsc --incremental -p src
src/src/main.ts(4,1): error TS1005: ',' expected.
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/dev-build/shared/types/db.js]
"use strict";
exports.__esModule = true;


//// [/src/dev-build/src/other.js]
console.log("hi");


//// [/src/dev-build/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "../shared/types/db.ts": {
        "version": "-9621097780-export interface A {\r\n    name: string;\r\n}",
        "signature": "-6245214333-export interface A {\r\n    name: string;\r\n}\r\n"
      },
      "../src/main.ts": {
        "version": "2626879346-import { A } from \"../shared/types/db\";\r\nconst a = {\r\n    lastName: 'sdsd'\r\n;",
        "signature": "-4882119183-export {};\r\n"
      },
      "../src/other.ts": {
        "version": "7719445449-console.log(\"hi\");",
        "signature": "5381-"
      }
    },
    "options": {
      "outDir": "./",
      "noEmitOnError": true,
      "incremental": true,
      "project": "..",
      "configFilePath": "../tsconfig.json"
    },
    "referencedMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": []
  },
  "version": "FakeTSVersion"
}

