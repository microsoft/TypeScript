currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/first/first_PART1.ts]
interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);


//// [/home/src/workspaces/solution/first/first_part2.ts]
console.log(f());


//// [/home/src/workspaces/solution/first/first_part3.ts]
function f() {
    return "JS does hoists";
}


//// [/home/src/workspaces/solution/first/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "outFile": "./bin/first-output.js",
    "skipDefaultLibCheck": true
  },
  "files": [
    "first_PART1.ts",
    "first_part2.ts",
    "first_part3.ts"
  ],
  "references": []
}

//// [/home/src/workspaces/solution/second/second_part1.ts]
namespace N {
    // Comment text
}

namespace N {
    function f() {
        console.log('testing');
    }

    f();
}


//// [/home/src/workspaces/solution/second/second_part2.ts]
class C {
    doSomething() {
        console.log("something got done");
    }
}


//// [/home/src/workspaces/solution/second/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "outFile": "../2/second-output.js",
    "skipDefaultLibCheck": true
  },
  "references": []
}

//// [/home/src/workspaces/solution/third/third_part1.ts]
var c = new C();
c.doSomething();


//// [/home/src/workspaces/solution/third/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "outFile": "./thirdjs/output/third-output.js",
    "skipDefaultLibCheck": true
  },
  "files": [
    "third_part1.ts"
  ],
  "references": [
    {
      "path": "../first"
    },
    {
      "path": "../second"
    }
  ]
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

//// [/home/src/workspaces/solution/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

//// [/home/src/workspaces/solution/first/bin/first-output.js]
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/home/src/workspaces/solution/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET"}

//// [/home/src/workspaces/solution/first/bin/first-output.d.ts]
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map

//// [/home/src/workspaces/solution/first/bin/first-output.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-22071182994-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\n","6007494133-console.log(f());\n","4357625305-function f() {\n    return \"JS does hoists\";\n}\n"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n","latestChangedDtsFile":"./first-output.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/first/bin/first-output.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../first_part1.ts",
    "../first_part2.ts",
    "../first_part3.ts"
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../first_part1.ts": "-22071182994-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\n",
    "../first_part2.ts": "6007494133-console.log(f());\n",
    "../first_part3.ts": "4357625305-function f() {\n    return \"JS does hoists\";\n}\n"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "../first_part1.ts",
        "../first_part2.ts",
        "../first_part3.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "declarationMap": true,
    "outFile": "./first-output.js",
    "removeComments": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true,
    "strict": false,
    "target": 1
  },
  "outSignature": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
  "latestChangedDtsFile": "./first-output.d.ts",
  "version": "FakeTSVersion",
  "size": 1273
}

//// [/home/src/workspaces/solution/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

//// [/home/src/workspaces/solution/2/second-output.js]
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
//# sourceMappingURL=second-output.js.map

//// [/home/src/workspaces/solution/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd"}

//// [/home/src/workspaces/solution/2/second-output.d.ts]
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map

//// [/home/src/workspaces/solution/2/second-output.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../second/second_part1.ts","../second/second_part2.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-12195290447-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\n","3642692259-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./second-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n","latestChangedDtsFile":"./second-output.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/2/second-output.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../second/second_part1.ts",
    "../second/second_part2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../second/second_part1.ts": "-12195290447-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\n",
    "../second/second_part2.ts": "3642692259-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n"
  },
  "root": [
    [
      2,
      "../second/second_part1.ts"
    ],
    [
      3,
      "../second/second_part2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outFile": "./second-output.js",
    "removeComments": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true,
    "strict": false,
    "target": 1
  },
  "outSignature": "-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n",
  "latestChangedDtsFile": "./second-output.d.ts",
  "version": "FakeTSVersion",
  "size": 1217
}

//// [/home/src/workspaces/solution/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../third_part1.ts"],"names":[],"mappings":"AAAA,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

//// [/home/src/workspaces/solution/third/thirdjs/output/third-output.js]
var c = new C();
c.doSomething();
//# sourceMappingURL=third-output.js.map

//// [/home/src/workspaces/solution/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../third_part1.ts"],"names":[],"mappings":"AAAA,QAAA,IAAI,CAAC,GAAU,CAAC"}

//// [/home/src/workspaces/solution/third/thirdjs/output/third-output.d.ts]
declare var c: C;
//# sourceMappingURL=third-output.d.ts.map

//// [/home/src/workspaces/solution/third/thirdjs/output/third-output.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n","-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n","7305100057-var c = new C();\nc.doSomething();\n"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"1894672131-declare var c: C;\n","latestChangedDtsFile":"./third-output.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/third/thirdjs/output/third-output.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "../../../first/bin/first-output.d.ts",
    "../../../2/second-output.d.ts",
    "../../third_part1.ts"
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../../../first/bin/first-output.d.ts": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
    "../../../2/second-output.d.ts": "-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n",
    "../../third_part1.ts": "7305100057-var c = new C();\nc.doSomething();\n"
  },
  "root": [
    [
      4,
      "../../third_part1.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outFile": "./third-output.js",
    "removeComments": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true,
    "strict": false,
    "target": 1
  },
  "outSignature": "1894672131-declare var c: C;\n",
  "latestChangedDtsFile": "./third-output.d.ts",
  "version": "FakeTSVersion",
  "size": 1266
}


/home/src/tslibs/TS/Lib/tsc.js --build --clean second/tsconfig.json
//// [/home/src/workspaces/solution/2/second-output.js.map] deleted
//// [/home/src/workspaces/solution/2/second-output.js] deleted
//// [/home/src/workspaces/solution/2/second-output.d.ts.map] deleted
//// [/home/src/workspaces/solution/2/second-output.d.ts] deleted
//// [/home/src/workspaces/solution/2/second-output.tsbuildinfo] deleted

exitCode:: ExitStatus.Success
