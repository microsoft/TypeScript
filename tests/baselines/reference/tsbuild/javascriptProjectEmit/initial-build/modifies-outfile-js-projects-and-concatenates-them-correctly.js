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
{
  "bundle": {
    "commonSourceDirectory": "../..",
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
  "version": "FakeTSVersion"
}

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

//// [/src/sub-project/sub-project.d.ts]
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
type MyNominal = string & {
    [Symbol.species]: "MyNominal";
};


//// [/src/sub-project/sub-project.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */


//// [/src/sub-project/sub-project.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "../..",
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
          "end": 148,
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
          "end": 133,
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
text: (84-148)
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */

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
text: (64-133)
type MyNominal = string & {
    [Symbol.species]: "MyNominal";
};

======================================================================

//// [/src/sub-project-2/sub-project-2.d.ts]
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
type MyNominal = string & {
    [Symbol.species]: "MyNominal";
};
/**
 * @return {keyof typeof variable}
 */
declare function getVar(): "key";
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
    "commonSourceDirectory": "../..",
    "sourceFiles": [
      "./index.js"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 148,
          "kind": "prepend",
          "data": "../sub-project/sub-project.js",
          "texts": [
            {
              "pos": 0,
              "end": 148,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 148,
          "end": 304,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 133,
          "kind": "prepend",
          "data": "../sub-project/sub-project.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 133,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 133,
          "end": 274,
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
prepend: (0-148):: ../sub-project/sub-project.js texts:: 1
>>--------------------------------------------------------------------
text: (0-148)
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */

----------------------------------------------------------------------
text: (148-304)
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
prepend: (0-133):: ../sub-project/sub-project.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-133)
type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
type MyNominal = string & {
    [Symbol.species]: "MyNominal";
};

----------------------------------------------------------------------
text: (133-274)
/**
 * @return {keyof typeof variable}
 */
declare function getVar(): "key";
declare namespace variable {
    const key: MyNominal;
}

======================================================================

