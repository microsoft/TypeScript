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
[96msrc/sub-project/tsconfig.json[0m:[93m10[0m:[93m9[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m10[0m         { "path": "../common", "prepend": true }
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./nominal.js"],"js":{"sections":[{"pos":0,"end":80,"kind":"text"}],"hash":"-1932521178-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n"},"dts":{"sections":[{"pos":0,"end":61,"kind":"text"}],"hash":"-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./nominal.js"],"fileInfos":["-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","-1932521178-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\n"],"root":[2],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"outFile":"./common.js","rootDir":"..","skipLibCheck":true},"outSignature":"-12106547178-type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n","latestChangedDtsFile":"./common.d.ts"},"version":"FakeTSVersion"}

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
      "allowJs": true,
      "checkJs": true,
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
  "size": 1507
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
[96msrc/sub-project/tsconfig.json[0m:[93m10[0m:[93m9[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m10[0m         { "path": "../common", "prepend": true }
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


