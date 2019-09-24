//// [/src/sub-project-2/index.js]
const variable = {
    key: /** @type {MyNominal} */('val'),
};

/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}


//// [/src/sub-project-2/sub-project-2.d.ts] file written with same contents
//// [/src/sub-project-2/sub-project-2.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
var variable = {
    key: /** @type {MyNominal} */ ('val')
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
          "end": 302,
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
text: (148-302)
var variable = {
    key: /** @type {MyNominal} */ ('val')
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

