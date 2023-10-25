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

//// [/src/first/first_PART1.ts]
interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);


//// [/src/first/first_part2.ts]
console.log(f());


//// [/src/first/first_part3.ts]
function f() {
    return "JS does hoists";
}


//// [/src/first/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true, "module": "none",
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    
    "skipDefaultLibCheck": true
  },
  "files": [
    "first_PART1.ts",
    "first_part2.ts",
    "first_part3.ts"
  ],
  "references": []
}

//// [/src/second/second_part1.ts]
namespace N {
    // Comment text
}

namespace N {
    function f() {
        console.log('testing');
    }

    f();
}


//// [/src/second/second_part2.ts]
class C {
    doSomething() {
        console.log("something got done");
    }
}


//// [/src/second/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "target": "es5",
    "composite": true, "module": "none",
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    
    "skipDefaultLibCheck": true
  },
  "references": []
}

//// [/src/third/third_part1.ts]
var c = new C();
c.doSomething();


//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "target": "es5",
    "composite": true, "module": "none",
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    
    "skipDefaultLibCheck": true
  },
  "files": [
    "third_part1.ts"
  ],
  "references": [
    {
      "path": "../first",
      
    },
    {
      "path": "../second",
      
    }
  ]
}



Output::
/lib/tsc --b /src/third --verbose
[[90m12:00:26 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:27 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/tsconfig.tsbuildinfo' does not exist

[[90m12:00:28 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:00:44 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/second/tsconfig.tsbuildinfo' does not exist

[[90m12:00:45 AM[0m] Building project '/src/second/tsconfig.json'...

[[90m12:00:57 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/tsconfig.tsbuildinfo' does not exist

[[90m12:00:58 AM[0m] Building project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/first/first_PART1.d.ts]
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
//# sourceMappingURL=first_PART1.d.ts.map

//// [/src/first/first_PART1.d.ts.map]
{"version":3,"file":"first_PART1.d.ts","sourceRoot":"","sources":["first_PART1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb"}

//// [/src/first/first_PART1.js]
var s = "Hello, world";
console.log(s);
//# sourceMappingURL=first_PART1.js.map

//// [/src/first/first_PART1.js.map]
{"version":3,"file":"first_PART1.js","sourceRoot":"","sources":["first_PART1.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC"}

//// [/src/first/first_part2.d.ts]
//# sourceMappingURL=first_part2.d.ts.map

//// [/src/first/first_part2.d.ts.map]
{"version":3,"file":"first_part2.d.ts","sourceRoot":"","sources":["first_part2.ts"],"names":[],"mappings":""}

//// [/src/first/first_part2.js]
console.log(f());
//# sourceMappingURL=first_part2.js.map

//// [/src/first/first_part2.js.map]
{"version":3,"file":"first_part2.js","sourceRoot":"","sources":["first_part2.ts"],"names":[],"mappings":"AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC"}

//// [/src/first/first_part3.d.ts]
declare function f(): string;
//# sourceMappingURL=first_part3.d.ts.map

//// [/src/first/first_part3.d.ts.map]
{"version":3,"file":"first_part3.d.ts","sourceRoot":"","sources":["first_part3.ts"],"names":[],"mappings":"AAAA,iBAAS,CAAC,WAET"}

//// [/src/first/first_part3.js]
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first_part3.js.map

//// [/src/first/first_part3.js.map]
{"version":3,"file":"first_part3.js","sourceRoot":"","sources":["first_part3.ts"],"names":[],"mappings":"AAAA,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

//// [/src/first/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./first_part1.ts","./first_part2.ts","./first_part3.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-22071182994-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\n","signature":"-14851202444-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\n","affectsGlobalScope":true},{"version":"6007494133-console.log(f());\n","signature":"5381-","affectsGlobalScope":true},{"version":"4357625305-function f() {\n    return \"JS does hoists\";\n}\n","signature":"-6420944280-declare function f(): string;\n","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"module":0,"removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./first_part3.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./first_part1.ts",
      "./first_part2.ts",
      "./first_part3.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./first_part1.ts": {
        "original": {
          "version": "-22071182994-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\n",
          "signature": "-14851202444-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\n",
          "affectsGlobalScope": true
        },
        "version": "-22071182994-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\n",
        "signature": "-14851202444-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\n",
        "affectsGlobalScope": true
      },
      "./first_part2.ts": {
        "original": {
          "version": "6007494133-console.log(f());\n",
          "signature": "5381-",
          "affectsGlobalScope": true
        },
        "version": "6007494133-console.log(f());\n",
        "signature": "5381-",
        "affectsGlobalScope": true
      },
      "./first_part3.ts": {
        "original": {
          "version": "4357625305-function f() {\n    return \"JS does hoists\";\n}\n",
          "signature": "-6420944280-declare function f(): string;\n",
          "affectsGlobalScope": true
        },
        "version": "4357625305-function f() {\n    return \"JS does hoists\";\n}\n",
        "signature": "-6420944280-declare function f(): string;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "./first_part1.ts",
          "./first_part2.ts",
          "./first_part3.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "module": 0,
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./first_part1.ts",
      "./first_part2.ts",
      "./first_part3.ts"
    ],
    "latestChangedDtsFile": "./first_part3.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1481
}

//// [/src/second/second_part1.d.ts]
declare namespace N {
}
declare namespace N {
}
//# sourceMappingURL=second_part1.d.ts.map

//// [/src/second/second_part1.d.ts.map]
{"version":3,"file":"second_part1.d.ts","sourceRoot":"","sources":["second_part1.ts"],"names":[],"mappings":"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX"}

//// [/src/second/second_part1.js]
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
//# sourceMappingURL=second_part1.js.map

//// [/src/second/second_part1.js.map]
{"version":3,"file":"second_part1.js","sourceRoot":"","sources":["second_part1.ts"],"names":[],"mappings":"AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV"}

//// [/src/second/second_part2.d.ts]
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second_part2.d.ts.map

//// [/src/second/second_part2.d.ts.map]
{"version":3,"file":"second_part2.d.ts","sourceRoot":"","sources":["second_part2.ts"],"names":[],"mappings":"AAAA,cAAM,CAAC;IACH,WAAW;CAGd"}

//// [/src/second/second_part2.js]
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
//# sourceMappingURL=second_part2.js.map

//// [/src/second/second_part2.js.map]
{"version":3,"file":"second_part2.js","sourceRoot":"","sources":["second_part2.ts"],"names":[],"mappings":"AAAA;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

//// [/src/second/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./second_part1.ts","./second_part2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12195290447-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\n","signature":"-12385043917-declare namespace N {\n}\ndeclare namespace N {\n}\n","affectsGlobalScope":true},{"version":"3642692259-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n","signature":"-4226833059-declare class C {\n    doSomething(): void;\n}\n","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"module":0,"removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./second_part2.d.ts"},"version":"FakeTSVersion"}

//// [/src/second/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./second_part1.ts",
      "./second_part2.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./second_part1.ts": {
        "original": {
          "version": "-12195290447-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\n",
          "signature": "-12385043917-declare namespace N {\n}\ndeclare namespace N {\n}\n",
          "affectsGlobalScope": true
        },
        "version": "-12195290447-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\n",
        "signature": "-12385043917-declare namespace N {\n}\ndeclare namespace N {\n}\n",
        "affectsGlobalScope": true
      },
      "./second_part2.ts": {
        "original": {
          "version": "3642692259-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n",
          "signature": "-4226833059-declare class C {\n    doSomething(): void;\n}\n",
          "affectsGlobalScope": true
        },
        "version": "3642692259-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n",
        "signature": "-4226833059-declare class C {\n    doSomething(): void;\n}\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./second_part1.ts"
      ],
      [
        3,
        "./second_part2.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "module": 0,
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./second_part1.ts",
      "./second_part2.ts"
    ],
    "latestChangedDtsFile": "./second_part2.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1355
}

//// [/src/third/third_part1.d.ts]
declare var c: C;
//# sourceMappingURL=third_part1.d.ts.map

//// [/src/third/third_part1.d.ts.map]
{"version":3,"file":"third_part1.d.ts","sourceRoot":"","sources":["third_part1.ts"],"names":[],"mappings":"AAAA,QAAA,IAAI,CAAC,GAAU,CAAC"}

//// [/src/third/third_part1.js]
var c = new C();
c.doSomething();
//# sourceMappingURL=third_part1.js.map

//// [/src/third/third_part1.js.map]
{"version":3,"file":"third_part1.js","sourceRoot":"","sources":["third_part1.ts"],"names":[],"mappings":"AAAA,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

//// [/src/third/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../first/first_part1.d.ts","../first/first_part2.d.ts","../first/first_part3.d.ts","../second/second_part1.d.ts","../second/second_part2.d.ts","./third_part1.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14851202444-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\n","affectsGlobalScope":true},"-2054710634-//# sourceMappingURL=first_part2.d.ts.map",{"version":"-6420944280-declare function f(): string;\n","affectsGlobalScope":true},{"version":"-12385043917-declare namespace N {\n}\ndeclare namespace N {\n}\n","affectsGlobalScope":true},{"version":"-4226833059-declare class C {\n    doSomething(): void;\n}\n","affectsGlobalScope":true},{"version":"7305100057-var c = new C();\nc.doSomething();\n","signature":"1894672131-declare var c: C;\n","affectsGlobalScope":true}],"root":[7],"options":{"composite":true,"declaration":true,"declarationMap":true,"module":0,"removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"semanticDiagnosticsPerFile":[1,2,3,4,5,6,7],"latestChangedDtsFile":"./third_part1.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../first/first_part1.d.ts",
      "../first/first_part2.d.ts",
      "../first/first_part3.d.ts",
      "../second/second_part1.d.ts",
      "../second/second_part2.d.ts",
      "./third_part1.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../first/first_part1.d.ts": {
        "original": {
          "version": "-14851202444-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\n",
          "affectsGlobalScope": true
        },
        "version": "-14851202444-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\n",
        "signature": "-14851202444-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\n",
        "affectsGlobalScope": true
      },
      "../first/first_part2.d.ts": {
        "version": "-2054710634-//# sourceMappingURL=first_part2.d.ts.map",
        "signature": "-2054710634-//# sourceMappingURL=first_part2.d.ts.map"
      },
      "../first/first_part3.d.ts": {
        "original": {
          "version": "-6420944280-declare function f(): string;\n",
          "affectsGlobalScope": true
        },
        "version": "-6420944280-declare function f(): string;\n",
        "signature": "-6420944280-declare function f(): string;\n",
        "affectsGlobalScope": true
      },
      "../second/second_part1.d.ts": {
        "original": {
          "version": "-12385043917-declare namespace N {\n}\ndeclare namespace N {\n}\n",
          "affectsGlobalScope": true
        },
        "version": "-12385043917-declare namespace N {\n}\ndeclare namespace N {\n}\n",
        "signature": "-12385043917-declare namespace N {\n}\ndeclare namespace N {\n}\n",
        "affectsGlobalScope": true
      },
      "../second/second_part2.d.ts": {
        "original": {
          "version": "-4226833059-declare class C {\n    doSomething(): void;\n}\n",
          "affectsGlobalScope": true
        },
        "version": "-4226833059-declare class C {\n    doSomething(): void;\n}\n",
        "signature": "-4226833059-declare class C {\n    doSomething(): void;\n}\n",
        "affectsGlobalScope": true
      },
      "./third_part1.ts": {
        "original": {
          "version": "7305100057-var c = new C();\nc.doSomething();\n",
          "signature": "1894672131-declare var c: C;\n",
          "affectsGlobalScope": true
        },
        "version": "7305100057-var c = new C();\nc.doSomething();\n",
        "signature": "1894672131-declare var c: C;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        7,
        "./third_part1.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "module": 0,
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../first/first_part1.d.ts",
      "../first/first_part2.d.ts",
      "../first/first_part3.d.ts",
      "../second/second_part1.d.ts",
      "../second/second_part2.d.ts",
      "./third_part1.ts"
    ],
    "latestChangedDtsFile": "./third_part1.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1665
}

