currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };

//// [/src/src/a.ts]
export class B { prop = "hello"; }

export interface A {
    b: B;
}


//// [/src/src/b.ts]
import { C } from "./c";

export interface B {
    b: C;
}


//// [/src/src/c.ts]
import { A } from "./a";

export interface C {
    a: A;
}


//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./lib",
    "composite": true,
    "strict": true,
    "esModuleInterop": true,
    "alwaysStrict": true,
    "rootDir": "src",
    "emitDeclarationOnly": true
  }
}



Output::
/lib/tsc --b /src --verbose
[[90m12:00:14 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:15 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90m12:00:16 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/lib/a.d.ts]
export declare class B {
    prop: string;
}
export interface A {
    b: B;
}
//# sourceMappingURL=a.d.ts.map

//// [/src/lib/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;IAAG,IAAI,SAAW;CAAE;AAElC,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}

//// [/src/lib/b.d.ts]
import { C } from "./c";
export interface B {
    b: C;
}
//# sourceMappingURL=b.d.ts.map

//// [/src/lib/b.d.ts.map]
{"version":3,"file":"b.d.ts","sourceRoot":"","sources":["../src/b.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}

//// [/src/lib/c.d.ts]
import { A } from "./a";
export interface C {
    a: A;
}
//# sourceMappingURL=c.d.ts.map

//// [/src/lib/c.d.ts.map]
{"version":3,"file":"c.d.ts","sourceRoot":"","sources":["../src/c.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}

//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./src/a.ts","./src/c.ts","./src/b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"12550013887-export class B { prop = \"hello\"; }\n\nexport interface A {\n    b: B;\n}\n","signature":"-15427030283-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n"},{"version":"3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n","signature":"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"},{"version":"-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n","signature":"2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"}],"root":[[2,4]],"options":{"alwaysStrict":true,"composite":true,"declaration":true,"declarationMap":true,"emitDeclarationOnly":true,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","sourceMap":true,"strict":true,"target":1},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,2,4,3],"latestChangedDtsFile":"./lib/b.d.ts"},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/c.ts",
      "./src/b.ts"
    ],
    "fileNamesList": [
      [
        "./src/c.ts"
      ],
      [
        "./src/a.ts"
      ]
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/a.ts": {
        "original": {
          "version": "12550013887-export class B { prop = \"hello\"; }\n\nexport interface A {\n    b: B;\n}\n",
          "signature": "-15427030283-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n"
        },
        "version": "12550013887-export class B { prop = \"hello\"; }\n\nexport interface A {\n    b: B;\n}\n",
        "signature": "-15427030283-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n"
      },
      "./src/c.ts": {
        "original": {
          "version": "3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n",
          "signature": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"
        },
        "version": "3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n",
        "signature": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"
      },
      "./src/b.ts": {
        "original": {
          "version": "-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n",
          "signature": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"
        },
        "version": "-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n",
        "signature": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "./src/a.ts",
          "./src/c.ts",
          "./src/b.ts"
        ]
      ]
    ],
    "options": {
      "alwaysStrict": true,
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "emitDeclarationOnly": true,
      "esModuleInterop": true,
      "module": 1,
      "outDir": "./lib",
      "rootDir": "./src",
      "sourceMap": true,
      "strict": true,
      "target": 1
    },
    "referencedMap": {
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts"
    ],
    "latestChangedDtsFile": "./lib/b.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1593
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/src/a.ts]
export class B { prop = "hello"; }

class C { }
export interface A {
    b: B;
}




Output::
/lib/tsc --b /src --verbose
[[90m12:00:28 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:29 AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/src/a.ts'

[[90m12:00:30 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/lib/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;IAAG,IAAI,SAAW;CAAE;AAGlC,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}

//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./src/a.ts","./src/c.ts","./src/b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"12921437274-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B;\n}\n","signature":"-15427030283-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n"},{"version":"3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n","signature":"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"},{"version":"-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n","signature":"2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"}],"root":[[2,4]],"options":{"alwaysStrict":true,"composite":true,"declaration":true,"declarationMap":true,"emitDeclarationOnly":true,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","sourceMap":true,"strict":true,"target":1},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,2,4,3],"latestChangedDtsFile":"./lib/b.d.ts"},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/c.ts",
      "./src/b.ts"
    ],
    "fileNamesList": [
      [
        "./src/c.ts"
      ],
      [
        "./src/a.ts"
      ]
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/a.ts": {
        "original": {
          "version": "12921437274-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B;\n}\n",
          "signature": "-15427030283-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n"
        },
        "version": "12921437274-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B;\n}\n",
        "signature": "-15427030283-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n"
      },
      "./src/c.ts": {
        "original": {
          "version": "3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n",
          "signature": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"
        },
        "version": "3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n",
        "signature": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"
      },
      "./src/b.ts": {
        "original": {
          "version": "-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n",
          "signature": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"
        },
        "version": "-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n",
        "signature": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "./src/a.ts",
          "./src/c.ts",
          "./src/b.ts"
        ]
      ]
    ],
    "options": {
      "alwaysStrict": true,
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "emitDeclarationOnly": true,
      "esModuleInterop": true,
      "module": 1,
      "outDir": "./lib",
      "rootDir": "./src",
      "sourceMap": true,
      "strict": true,
      "target": 1
    },
    "referencedMap": {
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts"
    ],
    "latestChangedDtsFile": "./lib/b.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1606
}



Change:: incremental-declaration-changes
Input::
//// [/src/src/a.ts]
export class B { prop = "hello"; }

class C { }
export interface A {
    b: B; foo: any;
}




Output::
/lib/tsc --b /src --verbose
[[90m12:00:36 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:37 AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/src/a.ts'

[[90m12:00:38 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/lib/a.d.ts]
export declare class B {
    prop: string;
}
export interface A {
    b: B;
    foo: any;
}
//# sourceMappingURL=a.d.ts.map

//// [/src/lib/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;IAAG,IAAI,SAAW;CAAE;AAGlC,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;IAAC,GAAG,EAAE,GAAG,CAAC;CAClB"}

//// [/src/lib/b.d.ts.map] file written with same contents
//// [/src/lib/c.d.ts.map] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./src/a.ts","./src/c.ts","./src/b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"17511804123-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B; foo: any;\n}\n","signature":"-21227085920-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n    foo: any;\n}\n"},{"version":"3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n","signature":"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"},{"version":"-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n","signature":"2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"}],"root":[[2,4]],"options":{"alwaysStrict":true,"composite":true,"declaration":true,"declarationMap":true,"emitDeclarationOnly":true,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","sourceMap":true,"strict":true,"target":1},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,2,4,3],"latestChangedDtsFile":"./lib/a.d.ts"},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/c.ts",
      "./src/b.ts"
    ],
    "fileNamesList": [
      [
        "./src/c.ts"
      ],
      [
        "./src/a.ts"
      ]
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/a.ts": {
        "original": {
          "version": "17511804123-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B; foo: any;\n}\n",
          "signature": "-21227085920-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n    foo: any;\n}\n"
        },
        "version": "17511804123-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B; foo: any;\n}\n",
        "signature": "-21227085920-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n    foo: any;\n}\n"
      },
      "./src/c.ts": {
        "original": {
          "version": "3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n",
          "signature": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"
        },
        "version": "3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n",
        "signature": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"
      },
      "./src/b.ts": {
        "original": {
          "version": "-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n",
          "signature": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"
        },
        "version": "-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n",
        "signature": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "./src/a.ts",
          "./src/c.ts",
          "./src/b.ts"
        ]
      ]
    ],
    "options": {
      "alwaysStrict": true,
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "emitDeclarationOnly": true,
      "esModuleInterop": true,
      "module": 1,
      "outDir": "./lib",
      "rootDir": "./src",
      "sourceMap": true,
      "strict": true,
      "target": 1
    },
    "referencedMap": {
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts"
    ],
    "latestChangedDtsFile": "./lib/a.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1631
}

