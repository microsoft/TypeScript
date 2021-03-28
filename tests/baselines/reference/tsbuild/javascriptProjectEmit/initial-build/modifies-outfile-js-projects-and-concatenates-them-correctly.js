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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./nominal.js"],"js":{"sections":[{"pos":0,"end":84,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":64,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/common/common.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/common/common.js
----------------------------------------------------------------------
text: (0-84)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */

======================================================================
======================================================================
File:: /src/common/common.d.ts
----------------------------------------------------------------------
text: (0-64)
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
          "end": 84,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 64,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 205
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./index.js"],"js":{"sections":[{"pos":0,"end":84,"kind":"prepend","data":"../common/common.js","texts":[{"pos":0,"end":84,"kind":"text"}]},{"pos":84,"end":182,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":64,"kind":"prepend","data":"../common/common.d.ts","texts":[{"pos":0,"end":64,"kind":"text"}]},{"pos":64,"end":199,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/sub-project/sub-project.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/sub-project/sub-project.js
----------------------------------------------------------------------
prepend: (0-84):: ../common/common.js texts:: 1
>>--------------------------------------------------------------------
text: (0-84)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */

----------------------------------------------------------------------
text: (84-182)
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (null);

======================================================================
======================================================================
File:: /src/sub-project/sub-project.d.ts
----------------------------------------------------------------------
prepend: (0-64):: ../common/common.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-64)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};

----------------------------------------------------------------------
text: (64-199)
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
          "end": 84,
          "kind": "prepend",
          "data": "../common/common.js",
          "texts": [
            {
              "pos": 0,
              "end": 84,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 84,
          "end": 182,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 64,
          "kind": "prepend",
          "data": "../common/common.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 64,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 64,
          "end": 199,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 425
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
    key: /** @type {MyNominal} */ ('value')
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}


//// [/src/sub-project-2/sub-project-2.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./index.js"],"js":{"sections":[{"pos":0,"end":182,"kind":"prepend","data":"../sub-project/sub-project.js","texts":[{"pos":0,"end":182,"kind":"text"}]},{"pos":182,"end":338,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":199,"kind":"prepend","data":"../sub-project/sub-project.d.ts","texts":[{"pos":0,"end":199,"kind":"text"}]},{"pos":199,"end":356,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/sub-project-2/sub-project-2.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/sub-project-2/sub-project-2.js
----------------------------------------------------------------------
prepend: (0-182):: ../sub-project/sub-project.js texts:: 1
>>--------------------------------------------------------------------
text: (0-182)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (null);

----------------------------------------------------------------------
text: (182-338)
var variable = {
    key: /** @type {MyNominal} */ ('value')
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
prepend: (0-199):: ../sub-project/sub-project.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-199)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = Nominal<string, 'MyNominal'>;

----------------------------------------------------------------------
text: (199-356)
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
          "end": 182,
          "kind": "prepend",
          "data": "../sub-project/sub-project.js",
          "texts": [
            {
              "pos": 0,
              "end": 182,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 182,
          "end": 338,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 199,
          "kind": "prepend",
          "data": "../sub-project/sub-project.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 199,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 199,
          "end": 356,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 451
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


//// [/src/sub-project/sub-project.d.ts] file written with same contents
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./index.js"],"js":{"sections":[{"pos":0,"end":84,"kind":"prepend","data":"../common/common.js","texts":[{"pos":0,"end":84,"kind":"text"}]},{"pos":84,"end":187,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":64,"kind":"prepend","data":"../common/common.d.ts","texts":[{"pos":0,"end":64,"kind":"text"}]},{"pos":64,"end":199,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/sub-project/sub-project.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/sub-project/sub-project.js
----------------------------------------------------------------------
prepend: (0-84):: ../common/common.js texts:: 1
>>--------------------------------------------------------------------
text: (0-84)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */

----------------------------------------------------------------------
text: (84-187)
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (undefined);

======================================================================
======================================================================
File:: /src/sub-project/sub-project.d.ts
----------------------------------------------------------------------
prepend: (0-64):: ../common/common.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-64)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};

----------------------------------------------------------------------
text: (64-199)
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
          "end": 84,
          "kind": "prepend",
          "data": "../common/common.js",
          "texts": [
            {
              "pos": 0,
              "end": 84,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 84,
          "end": 187,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 64,
          "kind": "prepend",
          "data": "../common/common.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 64,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 64,
          "end": 199,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 425
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
    key: /** @type {MyNominal} */ ('value')
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}


//// [/src/sub-project-2/sub-project-2.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["./index.js"],"js":{"sections":[{"pos":0,"end":187,"kind":"prepend","data":"../sub-project/sub-project.js","texts":[{"pos":0,"end":187,"kind":"text"}]},{"pos":187,"end":343,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":199,"kind":"prepend","data":"../sub-project/sub-project.d.ts","texts":[{"pos":0,"end":199,"kind":"text"}]},{"pos":199,"end":356,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/sub-project-2/sub-project-2.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/sub-project-2/sub-project-2.js
----------------------------------------------------------------------
prepend: (0-187):: ../sub-project/sub-project.js texts:: 1
>>--------------------------------------------------------------------
text: (0-187)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var c = /** @type {*} */ (undefined);

----------------------------------------------------------------------
text: (187-343)
var variable = {
    key: /** @type {MyNominal} */ ('value')
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
prepend: (0-199):: ../sub-project/sub-project.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-199)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = Nominal<string, 'MyNominal'>;

----------------------------------------------------------------------
text: (199-356)
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
          "end": 187,
          "kind": "prepend",
          "data": "../sub-project/sub-project.js",
          "texts": [
            {
              "pos": 0,
              "end": 187,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 187,
          "end": 343,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 199,
          "kind": "prepend",
          "data": "../sub-project/sub-project.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 199,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 199,
          "end": 356,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 451
}

