currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/a.ts]
import { B } from "./b";

export interface A {
    b: B;
}


//// [/home/src/workspaces/project/src/b.ts]
import { C } from "./c";

export interface B {
    b: C;
}


//// [/home/src/workspaces/project/src/c.ts]
import { A } from "./a";

export interface C {
    a: A;
}


//// [/home/src/workspaces/project/src/index.ts]
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";


//// [/home/src/workspaces/project/tsconfig.json]
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

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/lib/c.d.ts.map]
{"version":3,"file":"c.d.ts","sourceRoot":"","sources":["../src/c.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}

//// [/home/src/workspaces/project/lib/c.d.ts]
import { A } from "./a";
export interface C {
    a: A;
}
//# sourceMappingURL=c.d.ts.map

//// [/home/src/workspaces/project/lib/b.d.ts.map]
{"version":3,"file":"b.d.ts","sourceRoot":"","sources":["../src/b.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}

//// [/home/src/workspaces/project/lib/b.d.ts]
import { C } from "./c";
export interface B {
    b: C;
}
//# sourceMappingURL=b.d.ts.map

//// [/home/src/workspaces/project/lib/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}

//// [/home/src/workspaces/project/lib/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
}
//# sourceMappingURL=a.d.ts.map

//// [/home/src/workspaces/project/lib/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AACxB,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AACxB,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC"}

//// [/home/src/workspaces/project/lib/index.d.ts]
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";
//# sourceMappingURL=index.d.ts.map

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/c.ts","./src/b.ts","./src/a.ts","./src/index.ts"],"fileIdsList":[[3],[2],[4],[2,3,4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n","signature":"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"},{"version":"-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n","signature":"2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"},{"version":"-10415053661-import { B } from \"./b\";\n\nexport interface A {\n    b: B;\n}\n","signature":"-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n"},"1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n"],"root":[[2,5]],"options":{"alwaysStrict":true,"composite":true,"declaration":true,"declarationMap":true,"emitDeclarationOnly":true,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","sourceMap":true,"strict":true,"target":1},"referencedMap":[[4,1],[3,2],[2,3],[5,4]],"latestChangedDtsFile":"./lib/index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/c.ts",
    "./src/b.ts",
    "./src/a.ts",
    "./src/index.ts"
  ],
  "fileIdsList": [
    [
      "./src/b.ts"
    ],
    [
      "./src/c.ts"
    ],
    [
      "./src/a.ts"
    ],
    [
      "./src/c.ts",
      "./src/b.ts",
      "./src/a.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
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
    },
    "./src/a.ts": {
      "original": {
        "version": "-10415053661-import { B } from \"./b\";\n\nexport interface A {\n    b: B;\n}\n",
        "signature": "-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n"
      },
      "version": "-10415053661-import { B } from \"./b\";\n\nexport interface A {\n    b: B;\n}\n",
      "signature": "-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n"
    },
    "./src/index.ts": {
      "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
      "signature": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/c.ts",
        "./src/b.ts",
        "./src/a.ts",
        "./src/index.ts"
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
    "./src/a.ts": [
      "./src/b.ts"
    ],
    "./src/b.ts": [
      "./src/c.ts"
    ],
    "./src/c.ts": [
      "./src/a.ts"
    ],
    "./src/index.ts": [
      "./src/c.ts",
      "./src/b.ts",
      "./src/a.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/index.d.ts",
  "version": "FakeTSVersion",
  "size": 1633
}


exitCode:: ExitStatus.Success

Change:: incremental-declaration-changes

Input::
//// [/home/src/workspaces/project/src/a.ts]
import { B } from "./b";

export interface A {
    b: B; foo: any;
}



/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/lib/c.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/lib/b.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/lib/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;IAAC,GAAG,EAAE,GAAG,CAAC;CAClB"}

//// [/home/src/workspaces/project/lib/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}
//# sourceMappingURL=a.d.ts.map

//// [/home/src/workspaces/project/lib/index.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/c.ts","./src/b.ts","./src/a.ts","./src/index.ts"],"fileIdsList":[[3],[2],[4],[2,3,4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"3086446657-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}\n","signature":"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"},{"version":"-5791025721-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}\n","signature":"2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"},{"version":"-4477156252-import { B } from \"./b\";\n\nexport interface A {\n    b: B; foo: any;\n}\n","signature":"-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n"},"1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n"],"root":[[2,5]],"options":{"alwaysStrict":true,"composite":true,"declaration":true,"declarationMap":true,"emitDeclarationOnly":true,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","sourceMap":true,"strict":true,"target":1},"referencedMap":[[4,1],[3,2],[2,3],[5,4]],"latestChangedDtsFile":"./lib/a.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/c.ts",
    "./src/b.ts",
    "./src/a.ts",
    "./src/index.ts"
  ],
  "fileIdsList": [
    [
      "./src/b.ts"
    ],
    [
      "./src/c.ts"
    ],
    [
      "./src/a.ts"
    ],
    [
      "./src/c.ts",
      "./src/b.ts",
      "./src/a.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
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
    },
    "./src/a.ts": {
      "original": {
        "version": "-4477156252-import { B } from \"./b\";\n\nexport interface A {\n    b: B; foo: any;\n}\n",
        "signature": "-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n"
      },
      "version": "-4477156252-import { B } from \"./b\";\n\nexport interface A {\n    b: B; foo: any;\n}\n",
      "signature": "-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n"
    },
    "./src/index.ts": {
      "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
      "signature": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/c.ts",
        "./src/b.ts",
        "./src/a.ts",
        "./src/index.ts"
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
    "./src/a.ts": [
      "./src/b.ts"
    ],
    "./src/b.ts": [
      "./src/c.ts"
    ],
    "./src/c.ts": [
      "./src/a.ts"
    ],
    "./src/index.ts": [
      "./src/c.ts",
      "./src/b.ts",
      "./src/a.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/a.d.ts",
  "version": "FakeTSVersion",
  "size": 1653
}


exitCode:: ExitStatus.Success
