//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
/lib/tsc -b /src
exitCode:: ExitStatus.Success


//// [/src/sub-project/index.js]
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
const c = /** @type {*} */(undefined);


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
          "end": 220,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

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
text: (64-220)
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = string & {
    [Symbol.species]: "MyNominal";
};

======================================================================

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
          "end": 220,
          "kind": "prepend",
          "data": "../sub-project/sub-project.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 220,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 220,
          "end": 377,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

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
prepend: (0-220):: ../sub-project/sub-project.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-220)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
declare const c: any;
type MyNominal = string & {
    [Symbol.species]: "MyNominal";
};

----------------------------------------------------------------------
text: (220-377)
/**
 * @return {keyof typeof variable}
 */
declare function getVar(): keyof typeof variable;
declare namespace variable {
    const key: MyNominal;
}

======================================================================

