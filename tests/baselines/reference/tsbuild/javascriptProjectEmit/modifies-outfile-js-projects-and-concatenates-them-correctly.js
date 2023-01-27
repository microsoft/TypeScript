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
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}


//// [/src/common/nominal.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */


//// [/src/common/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
        "outFile": "common.js",
        
    },
    "include": ["nominal.js"]
}

//// [/src/sub-project/index.js]
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
const c = /** @type {*} */(null);


//// [/src/sub-project/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "ignoreDeprecations":"5.0",
        "composite": true,
        "outFile": "sub-project.js",
        
    },
    "references": [
        { "path": "../common", "prepend": true }
    ],
    "include": ["./index.js"]
}

//// [/src/sub-project-2/index.js]
const variable = {
    key: /** @type {MyNominal} */('value'),
};

/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}


//// [/src/sub-project-2/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "ignoreDeprecations":"5.0",
        "composite": true,
        "outFile": "sub-project-2.js",
        
    },
    "references": [
        { "path": "../sub-project", "prepend": true }
    ],
    "include": ["./index.js"]
}

//// [/src/tsconfig.base.json]
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "allowJs": true,
        "checkJs": true,
        "declaration": true
    }
}

//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "ignoreDeprecations":"5.0",
        "composite": true,
        "outFile": "src.js"
    },
    "references": [
        { "path": "./sub-project", "prepend": true },
        { "path": "./sub-project-2", "prepend": true }
    ],
    "include": []
}



Output::
/lib/tsc -b /src
exitCode:: ExitStatus.Success


//// [/src/common/common.d.ts]
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};


//// [/src/common/common.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */


//// [/src/common/common.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./nominal.js"],"js":{"sections":[{"pos":0,"end":80,"kind":"text"}],"hash":"-1932521178-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n"},"dts":{"sections":[{"pos":0,"end":61,"kind":"text"}],"hash":"-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./nominal.js"],"fileInfos":["-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","-1932521178-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n"],"root":[2],"options":{"composite":true,"declaration":true,"outFile":"./common.js","rootDir":"..","skipLibCheck":true},"outSignature":"-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n","latestChangedDtsFile":"./common.d.ts"},"version":"FakeTSVersion"}

//// [/src/common/common.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/common/common.js
----------------------------------------------------------------------
text: (0-80)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */

======================================================================
======================================================================
File:: /src/common/common.d.ts
----------------------------------------------------------------------
text: (0-61)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};

======================================================================

//// [/src/common/common.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "..",
    "sourceFiles": [
      "./nominal.js"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 80,
          "kind": "text"
        }
      ],
      "hash": "-1932521178-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 61,
          "kind": "text"
        }
      ],
      "hash": "-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./nominal.js"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "./nominal.js": "-1932521178-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n"
    },
    "root": [
      [
        2,
        "./nominal.js"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./common.js",
      "rootDir": "..",
      "skipLibCheck": true
    },
    "outSignature": "-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n",
    "latestChangedDtsFile": "./common.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1477
}

//// [/src/sub-project/sub-project.d.ts]
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = Nominal<string, 'MyNominal'>;


//// [/src/sub-project/sub-project.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (null);


//// [/src/sub-project/sub-project.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./index.js"],"js":{"sections":[{"pos":0,"end":80,"kind":"prepend","data":"../common/common.js","texts":[{"pos":0,"end":80,"kind":"text"}]},{"pos":80,"end":174,"kind":"text"}],"hash":"-7871970258-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nvar c = /** @type {*} */ (null);\n"},"dts":{"sections":[{"pos":0,"end":61,"kind":"prepend","data":"../common/common.d.ts","texts":[{"pos":0,"end":61,"kind":"text"}]},{"pos":61,"end":191,"kind":"text"}],"hash":"-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n"}},"program":{"fileNames":["../../lib/lib.d.ts","../common/common.d.ts","./index.js"],"fileInfos":["-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n","2691219051-/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nconst c = /** @type {*} */(null);\n"],"root":[3],"options":{"composite":true,"declaration":true,"outFile":"./sub-project.js","rootDir":"..","skipLibCheck":true},"outSignature":"-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n","latestChangedDtsFile":"./sub-project.d.ts"},"version":"FakeTSVersion"}

//// [/src/sub-project/sub-project.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/sub-project/sub-project.js
----------------------------------------------------------------------
prepend: (0-80):: ../common/common.js texts:: 1
>>--------------------------------------------------------------------
text: (0-80)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */

----------------------------------------------------------------------
text: (80-174)
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (null);

======================================================================
======================================================================
File:: /src/sub-project/sub-project.d.ts
----------------------------------------------------------------------
prepend: (0-61):: ../common/common.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-61)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};

----------------------------------------------------------------------
text: (61-191)
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = Nominal<string, 'MyNominal'>;

======================================================================

//// [/src/sub-project/sub-project.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "..",
    "sourceFiles": [
      "./index.js"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 80,
          "kind": "prepend",
          "data": "../common/common.js",
          "texts": [
            {
              "pos": 0,
              "end": 80,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 80,
          "end": 174,
          "kind": "text"
        }
      ],
      "hash": "-7871970258-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nvar c = /** @type {*} */ (null);\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 61,
          "kind": "prepend",
          "data": "../common/common.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 61,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 61,
          "end": 191,
          "kind": "text"
        }
      ],
      "hash": "-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../common/common.d.ts",
      "./index.js"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "../common/common.d.ts": "-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n",
      "./index.js": "2691219051-/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nconst c = /** @type {*} */(null);\n"
    },
    "root": [
      [
        3,
        "./index.js"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./sub-project.js",
      "rootDir": "..",
      "skipLibCheck": true
    },
    "outSignature": "-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n",
    "latestChangedDtsFile": "./sub-project.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2189
}

//// [/src/sub-project-2/sub-project-2.d.ts]
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = Nominal<string, 'MyNominal'>;
/**
 * @return {keyof typeof variable}
 */
declare function getVar(): keyof typeof variable;
declare namespace variable {
    const key: MyNominal;
}


//// [/src/sub-project-2/sub-project-2.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (null);
var variable = {
    key: /** @type {MyNominal} */ ('value'),
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}


//// [/src/sub-project-2/sub-project-2.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./index.js"],"js":{"sections":[{"pos":0,"end":174,"kind":"prepend","data":"../sub-project/sub-project.js","texts":[{"pos":0,"end":174,"kind":"text"}]},{"pos":174,"end":322,"kind":"text"}],"hash":"-4809651809-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nvar c = /** @type {*} */ (null);\nvar variable = {\n    key: /** @type {MyNominal} */ ('value'),\n};\n/**\n * @return {keyof typeof variable}\n */\nfunction getVar() {\n    return 'key';\n}\n"},"dts":{"sections":[{"pos":0,"end":191,"kind":"prepend","data":"../sub-project/sub-project.d.ts","texts":[{"pos":0,"end":191,"kind":"text"}]},{"pos":191,"end":341,"kind":"text"}],"hash":"4681612701-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @return {keyof typeof variable}\n */\ndeclare function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    const key: MyNominal;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","../sub-project/sub-project.d.ts","./index.js"],"fileInfos":["-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n","2078909278-const variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nfunction getVar() {\n    return 'key';\n}\n"],"root":[3],"options":{"composite":true,"declaration":true,"outFile":"./sub-project-2.js","rootDir":"..","skipLibCheck":true},"outSignature":"4681612701-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @return {keyof typeof variable}\n */\ndeclare function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    const key: MyNominal;\n}\n","latestChangedDtsFile":"./sub-project-2.d.ts"},"version":"FakeTSVersion"}

//// [/src/sub-project-2/sub-project-2.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/sub-project-2/sub-project-2.js
----------------------------------------------------------------------
prepend: (0-174):: ../sub-project/sub-project.js texts:: 1
>>--------------------------------------------------------------------
text: (0-174)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (null);

----------------------------------------------------------------------
text: (174-322)
var variable = {
    key: /** @type {MyNominal} */ ('value'),
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}

======================================================================
======================================================================
File:: /src/sub-project-2/sub-project-2.d.ts
----------------------------------------------------------------------
prepend: (0-191):: ../sub-project/sub-project.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-191)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = Nominal<string, 'MyNominal'>;

----------------------------------------------------------------------
text: (191-341)
/**
 * @return {keyof typeof variable}
 */
declare function getVar(): keyof typeof variable;
declare namespace variable {
    const key: MyNominal;
}

======================================================================

//// [/src/sub-project-2/sub-project-2.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "..",
    "sourceFiles": [
      "./index.js"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 174,
          "kind": "prepend",
          "data": "../sub-project/sub-project.js",
          "texts": [
            {
              "pos": 0,
              "end": 174,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 174,
          "end": 322,
          "kind": "text"
        }
      ],
      "hash": "-4809651809-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nvar c = /** @type {*} */ (null);\nvar variable = {\n    key: /** @type {MyNominal} */ ('value'),\n};\n/**\n * @return {keyof typeof variable}\n */\nfunction getVar() {\n    return 'key';\n}\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 191,
          "kind": "prepend",
          "data": "../sub-project/sub-project.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 191,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 191,
          "end": 341,
          "kind": "text"
        }
      ],
      "hash": "4681612701-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @return {keyof typeof variable}\n */\ndeclare function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    const key: MyNominal;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../sub-project/sub-project.d.ts",
      "./index.js"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "../sub-project/sub-project.d.ts": "-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n",
      "./index.js": "2078909278-const variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nfunction getVar() {\n    return 'key';\n}\n"
    },
    "root": [
      [
        3,
        "./index.js"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./sub-project-2.js",
      "rootDir": "..",
      "skipLibCheck": true
    },
    "outSignature": "4681612701-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @return {keyof typeof variable}\n */\ndeclare function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    const key: MyNominal;\n}\n",
    "latestChangedDtsFile": "./sub-project-2.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2893
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/sub-project/index.js]
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
const c = /** @type {*} */(undefined);




Output::
/lib/tsc -b /src
exitCode:: ExitStatus.Success


//// [/src/sub-project/sub-project.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (undefined);


//// [/src/sub-project/sub-project.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./index.js"],"js":{"sections":[{"pos":0,"end":80,"kind":"prepend","data":"../common/common.js","texts":[{"pos":0,"end":80,"kind":"text"}]},{"pos":80,"end":179,"kind":"text"}],"hash":"-8079555643-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nvar c = /** @type {*} */ (undefined);\n"},"dts":{"sections":[{"pos":0,"end":61,"kind":"prepend","data":"../common/common.d.ts","texts":[{"pos":0,"end":61,"kind":"text"}]},{"pos":61,"end":191,"kind":"text"}],"hash":"-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n"}},"program":{"fileNames":["../../lib/lib.d.ts","../common/common.d.ts","./index.js"],"fileInfos":["-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n","7546612770-/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nconst c = /** @type {*} */(undefined);\n"],"root":[3],"options":{"composite":true,"declaration":true,"outFile":"./sub-project.js","rootDir":"..","skipLibCheck":true},"outSignature":"-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n","latestChangedDtsFile":"./sub-project.d.ts"},"version":"FakeTSVersion"}

//// [/src/sub-project/sub-project.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/sub-project/sub-project.js
----------------------------------------------------------------------
prepend: (0-80):: ../common/common.js texts:: 1
>>--------------------------------------------------------------------
text: (0-80)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */

----------------------------------------------------------------------
text: (80-179)
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (undefined);

======================================================================
======================================================================
File:: /src/sub-project/sub-project.d.ts
----------------------------------------------------------------------
prepend: (0-61):: ../common/common.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-61)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};

----------------------------------------------------------------------
text: (61-191)
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = Nominal<string, 'MyNominal'>;

======================================================================

//// [/src/sub-project/sub-project.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "..",
    "sourceFiles": [
      "./index.js"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 80,
          "kind": "prepend",
          "data": "../common/common.js",
          "texts": [
            {
              "pos": 0,
              "end": 80,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 80,
          "end": 179,
          "kind": "text"
        }
      ],
      "hash": "-8079555643-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nvar c = /** @type {*} */ (undefined);\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 61,
          "kind": "prepend",
          "data": "../common/common.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 61,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 61,
          "end": 191,
          "kind": "text"
        }
      ],
      "hash": "-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../common/common.d.ts",
      "./index.js"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "../common/common.d.ts": "-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n",
      "./index.js": "7546612770-/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nconst c = /** @type {*} */(undefined);\n"
    },
    "root": [
      [
        3,
        "./index.js"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./sub-project.js",
      "rootDir": "..",
      "skipLibCheck": true
    },
    "outSignature": "-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n",
    "latestChangedDtsFile": "./sub-project.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2199
}

//// [/src/sub-project-2/sub-project-2.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (undefined);
var variable = {
    key: /** @type {MyNominal} */ ('value'),
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}


//// [/src/sub-project-2/sub-project-2.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./index.js"],"js":{"sections":[{"pos":0,"end":179,"kind":"prepend","data":"../sub-project/sub-project.js","texts":[{"pos":0,"end":179,"kind":"text"}]},{"pos":179,"end":327,"kind":"text"}],"hash":"-26783073610-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nvar c = /** @type {*} */ (undefined);\nvar variable = {\n    key: /** @type {MyNominal} */ ('value'),\n};\n/**\n * @return {keyof typeof variable}\n */\nfunction getVar() {\n    return 'key';\n}\n"},"dts":{"sections":[{"pos":0,"end":191,"kind":"prepend","data":"../sub-project/sub-project.d.ts","texts":[{"pos":0,"end":191,"kind":"text"}]},{"pos":191,"end":341,"kind":"text"}],"hash":"4681612701-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @return {keyof typeof variable}\n */\ndeclare function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    const key: MyNominal;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","../sub-project/sub-project.d.ts","./index.js"],"fileInfos":["-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n","2078909278-const variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nfunction getVar() {\n    return 'key';\n}\n"],"root":[3],"options":{"composite":true,"declaration":true,"outFile":"./sub-project-2.js","rootDir":"..","skipLibCheck":true},"outSignature":"4681612701-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @return {keyof typeof variable}\n */\ndeclare function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    const key: MyNominal;\n}\n","latestChangedDtsFile":"./sub-project-2.d.ts"},"version":"FakeTSVersion"}

//// [/src/sub-project-2/sub-project-2.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/sub-project-2/sub-project-2.js
----------------------------------------------------------------------
prepend: (0-179):: ../sub-project/sub-project.js texts:: 1
>>--------------------------------------------------------------------
text: (0-179)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (undefined);

----------------------------------------------------------------------
text: (179-327)
var variable = {
    key: /** @type {MyNominal} */ ('value'),
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}

======================================================================
======================================================================
File:: /src/sub-project-2/sub-project-2.d.ts
----------------------------------------------------------------------
prepend: (0-191):: ../sub-project/sub-project.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-191)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = Nominal<string, 'MyNominal'>;

----------------------------------------------------------------------
text: (191-341)
/**
 * @return {keyof typeof variable}
 */
declare function getVar(): keyof typeof variable;
declare namespace variable {
    const key: MyNominal;
}

======================================================================

//// [/src/sub-project-2/sub-project-2.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "..",
    "sourceFiles": [
      "./index.js"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 179,
          "kind": "prepend",
          "data": "../sub-project/sub-project.js",
          "texts": [
            {
              "pos": 0,
              "end": 179,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 179,
          "end": 327,
          "kind": "text"
        }
      ],
      "hash": "-26783073610-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\nvar c = /** @type {*} */ (undefined);\nvar variable = {\n    key: /** @type {MyNominal} */ ('value'),\n};\n/**\n * @return {keyof typeof variable}\n */\nfunction getVar() {\n    return 'key';\n}\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 191,
          "kind": "prepend",
          "data": "../sub-project/sub-project.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 191,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 191,
          "end": 341,
          "kind": "text"
        }
      ],
      "hash": "4681612701-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @return {keyof typeof variable}\n */\ndeclare function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    const key: MyNominal;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../sub-project/sub-project.d.ts",
      "./index.js"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "../sub-project/sub-project.d.ts": "-9550245654-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n",
      "./index.js": "2078909278-const variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nfunction getVar() {\n    return 'key';\n}\n"
    },
    "root": [
      [
        3,
        "./index.js"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./sub-project-2.js",
      "rootDir": "..",
      "skipLibCheck": true
    },
    "outSignature": "4681612701-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\ndeclare const c: any;\ntype MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @return {keyof typeof variable}\n */\ndeclare function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    const key: MyNominal;\n}\n",
    "latestChangedDtsFile": "./sub-project-2.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2899
}

