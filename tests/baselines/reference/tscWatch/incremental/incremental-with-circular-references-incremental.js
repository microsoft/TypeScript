Input::
//// [/a/lib/lib.d.ts]
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

//// [/users/username/projects/project/a.ts]
import { B } from "./b";
export interface A {
    b: B;
}


//// [/users/username/projects/project/b.ts]
import { C } from "./c";
export interface B {
    b: C;
}


//// [/users/username/projects/project/c.ts]
import { A } from "./a";
export interface C {
    a: A;
}


//// [/users/username/projects/project/index.ts]
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";


//// [/users/username/projects/project/tsconfig.json]
{"compilerOptions":{"incremental":true,"target":"es5","module":"commonjs","declaration":true,"emitDeclarationOnly":true}}


/a/lib/tsc.js -i
Output::


Program root files: ["/users/username/projects/project/a.ts","/users/username/projects/project/b.ts","/users/username/projects/project/c.ts","/users/username/projects/project/index.ts"]
Program options: {"incremental":true,"target":1,"module":1,"declaration":true,"emitDeclarationOnly":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/c.ts
/users/username/projects/project/b.ts
/users/username/projects/project/a.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/c.ts
/users/username/projects/project/b.ts
/users/username/projects/project/a.ts
/users/username/projects/project/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/c.ts (computed .d.ts during emit)
/users/username/projects/project/b.ts (computed .d.ts during emit)
/users/username/projects/project/a.ts (computed .d.ts during emit)
/users/username/projects/project/index.ts (computed .d.ts during emit)

PolledWatches::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

//// [/users/username/projects/project/c.d.ts]
import { A } from "./a";
export interface C {
    a: A;
}


//// [/users/username/projects/project/b.d.ts]
import { C } from "./c";
export interface B {
    b: C;
}


//// [/users/username/projects/project/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
}


//// [/users/username/projects/project/index.d.ts]
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./c.ts","./b.ts","./a.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","signature":"-2697851509-import { A } from \"./a\";\r\nexport interface C {\r\n    a: A;\r\n}\r\n"},{"version":"2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","signature":"20298635505-import { C } from \"./c\";\r\nexport interface B {\r\n    b: C;\r\n}\r\n"},{"version":"-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n","signature":"-4206296467-import { B } from \"./b\";\r\nexport interface A {\r\n    b: B;\r\n}\r\n"},{"version":"1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n","signature":"-6009477228-export { A } from \"./a\";\r\nexport { B } from \"./b\";\r\nexport { C } from \"./c\";\r\n"}],"options":{"declaration":true,"emitDeclarationOnly":true,"module":1,"target":1},"fileIdsList":[[3],[2],[4],[2,3,4]],"referencedMap":[[4,1],[3,2],[2,3],[5,4]],"exportedModulesMap":[[4,1],[3,2],[2,3],[5,4]],"semanticDiagnosticsPerFile":[1,4,3,2,5]},"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./c.ts",
      "./b.ts",
      "./a.ts",
      "./index.ts"
    ],
    "fileNamesList": [
      [
        "./b.ts"
      ],
      [
        "./c.ts"
      ],
      [
        "./a.ts"
      ],
      [
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./c.ts": {
        "original": {
          "version": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
          "signature": "-2697851509-import { A } from \"./a\";\r\nexport interface C {\r\n    a: A;\r\n}\r\n"
        },
        "version": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
        "signature": "-2697851509-import { A } from \"./a\";\r\nexport interface C {\r\n    a: A;\r\n}\r\n"
      },
      "./b.ts": {
        "original": {
          "version": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
          "signature": "20298635505-import { C } from \"./c\";\r\nexport interface B {\r\n    b: C;\r\n}\r\n"
        },
        "version": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
        "signature": "20298635505-import { C } from \"./c\";\r\nexport interface B {\r\n    b: C;\r\n}\r\n"
      },
      "./a.ts": {
        "original": {
          "version": "-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n",
          "signature": "-4206296467-import { B } from \"./b\";\r\nexport interface A {\r\n    b: B;\r\n}\r\n"
        },
        "version": "-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n",
        "signature": "-4206296467-import { B } from \"./b\";\r\nexport interface A {\r\n    b: B;\r\n}\r\n"
      },
      "./index.ts": {
        "original": {
          "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
          "signature": "-6009477228-export { A } from \"./a\";\r\nexport { B } from \"./b\";\r\nexport { C } from \"./c\";\r\n"
        },
        "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
        "signature": "-6009477228-export { A } from \"./a\";\r\nexport { B } from \"./b\";\r\nexport { C } from \"./c\";\r\n"
      }
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 1,
      "target": 1
    },
    "referencedMap": {
      "./a.ts": [
        "./b.ts"
      ],
      "./b.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./a.ts"
      ],
      "./index.ts": [
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    },
    "exportedModulesMap": {
      "./a.ts": [
        "./b.ts"
      ],
      "./b.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./a.ts"
      ],
      "./index.ts": [
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1577
}


Change::

Input::
//// [/users/username/projects/project/a.ts]
import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}



Output::


Program root files: ["/users/username/projects/project/a.ts","/users/username/projects/project/b.ts","/users/username/projects/project/c.ts","/users/username/projects/project/index.ts"]
Program options: {"incremental":true,"target":1,"module":1,"declaration":true,"emitDeclarationOnly":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/c.ts
/users/username/projects/project/b.ts
/users/username/projects/project/a.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/c.ts
/users/username/projects/project/b.ts
/users/username/projects/project/a.ts
/users/username/projects/project/index.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/a.ts (computed .d.ts)
/users/username/projects/project/index.ts (computed .d.ts)
/users/username/projects/project/c.ts (computed .d.ts)
/users/username/projects/project/b.ts (computed .d.ts during emit)

PolledWatches::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

//// [/users/username/projects/project/c.d.ts] file written with same contents
//// [/users/username/projects/project/b.d.ts] file written with same contents
//// [/users/username/projects/project/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}


//// [/users/username/projects/project/index.d.ts] file written with same contents
//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./c.ts","./b.ts","./a.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","signature":"-2697851509-import { A } from \"./a\";\r\nexport interface C {\r\n    a: A;\r\n}\r\n"},{"version":"2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","signature":"20298635505-import { C } from \"./c\";\r\nexport interface B {\r\n    b: C;\r\n}\r\n"},{"version":"-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n","signature":"-7639584379-import { B } from \"./b\";\r\nexport interface A {\r\n    b: B;\r\n    foo: any;\r\n}\r\n"},{"version":"1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n","signature":"-6009477228-export { A } from \"./a\";\r\nexport { B } from \"./b\";\r\nexport { C } from \"./c\";\r\n"}],"options":{"declaration":true,"emitDeclarationOnly":true,"module":1,"target":1},"fileIdsList":[[3],[2],[4],[2,3,4]],"referencedMap":[[4,1],[3,2],[2,3],[5,4]],"exportedModulesMap":[[4,1],[3,2],[2,3],[5,4]],"semanticDiagnosticsPerFile":[1,4,3,2,5]},"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./c.ts",
      "./b.ts",
      "./a.ts",
      "./index.ts"
    ],
    "fileNamesList": [
      [
        "./b.ts"
      ],
      [
        "./c.ts"
      ],
      [
        "./a.ts"
      ],
      [
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./c.ts": {
        "original": {
          "version": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
          "signature": "-2697851509-import { A } from \"./a\";\r\nexport interface C {\r\n    a: A;\r\n}\r\n"
        },
        "version": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
        "signature": "-2697851509-import { A } from \"./a\";\r\nexport interface C {\r\n    a: A;\r\n}\r\n"
      },
      "./b.ts": {
        "original": {
          "version": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
          "signature": "20298635505-import { C } from \"./c\";\r\nexport interface B {\r\n    b: C;\r\n}\r\n"
        },
        "version": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
        "signature": "20298635505-import { C } from \"./c\";\r\nexport interface B {\r\n    b: C;\r\n}\r\n"
      },
      "./a.ts": {
        "original": {
          "version": "-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n",
          "signature": "-7639584379-import { B } from \"./b\";\r\nexport interface A {\r\n    b: B;\r\n    foo: any;\r\n}\r\n"
        },
        "version": "-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n",
        "signature": "-7639584379-import { B } from \"./b\";\r\nexport interface A {\r\n    b: B;\r\n    foo: any;\r\n}\r\n"
      },
      "./index.ts": {
        "original": {
          "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
          "signature": "-6009477228-export { A } from \"./a\";\r\nexport { B } from \"./b\";\r\nexport { C } from \"./c\";\r\n"
        },
        "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
        "signature": "-6009477228-export { A } from \"./a\";\r\nexport { B } from \"./b\";\r\nexport { C } from \"./c\";\r\n"
      }
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 1,
      "target": 1
    },
    "referencedMap": {
      "./a.ts": [
        "./b.ts"
      ],
      "./b.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./a.ts"
      ],
      "./index.ts": [
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    },
    "exportedModulesMap": {
      "./a.ts": [
        "./b.ts"
      ],
      "./b.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./a.ts"
      ],
      "./index.ts": [
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1609
}

