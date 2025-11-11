// @incremental: true
// @outDir: ./res
// @declaration: true
// @tsBuildInfoFile: /a.tsbuildinfo
// @filename: /a.tsbuildinfo
{
  "version": "TEST",
  "root": [ [ 8, 9 ] ],
  "fileNames": [
    "lib.d.ts",
    "lib.es5.d.ts",
    "lib.dom.d.ts",
    "lib.webworker.importscripts.d.ts",
    "lib.scripthost.d.ts",
    "lib.decorators.d.ts",
    "lib.decorators.legacy.d.ts",
    "./.src/file2.ts",
    "./.src/file1.ts"
  ],
  "fileInfos": [
    "8aa2344ef67b04dfd9aa23b0f29ffb31",
    {
      "version": "71cf8049ea8d435bcdf47408dac2525c",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "9cf691967d2e0b0210f5864fdf1ad87a",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "eb49c11101339d745cfc83e213607152",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "a4fa81fccf6300a830a36517b5beb51f",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "45c91c5f844a9ee1df11d1b71c484b0e",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "39e009135c77d60baa790854b51d2195",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    "ed441e10e1833cd4635f7c61645b7ee7",
    "553372ff8498789eb6e91ea68f08e47a"
  ],
  "fileIdsList": [ [ 8 ] ],
  "options": {
    "newLine": 1,
    "noErrorTruncation": true,
    "skipDefaultLibCheck": true,
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": [ [ 9, 1 ] ]
}
// @filename: file1.ts
// need an out of date but present buildinfo, chained export aliases,
// and enough files that the same checker is used for multiple files
// to trigger the race from typescript-go/#1470
import {b} from "./file2.js"

export type {b as c}
// @filename: file2.ts
const a = 1

export type {a as b}
// @filename: file0.ts
import {c} from "./file1.js"

export type {c as d}
// @filename: file3.ts
import {b} from "./file2.js"

export type {b as e}
// @filename: file4.ts
import {b} from "./file2.js"

export type {b as f}
// @filename: file5.ts
import {b} from "./file2.js"

export type {b as g}
// @filename: file6.ts
import {b} from "./file2.js"

export type {b as h}
// @filename: file7.ts
import {b} from "./file2.js"

export type {b as i}
// @filename: file8.ts
import {b} from "./file2.js"

export type {b as j}
// @filename: file9.ts
import {b} from "./file2.js"

export type {b as k}
// @filename: file10.ts
import {b} from "./file2.js"

export type {b as l}
// @filename: file11.ts
import {b} from "./file2.js"

export type {b as m}
// @filename: file12.ts
import {b} from "./file2.js"

export type {b as n}
// @filename: file13.ts
import {b} from "./file2.js"

export type {b as o}
// @filename: file14.ts
import {b} from "./file2.js"

export type {b as p}
// @filename: file15.ts
import {b} from "./file2.js"

export type {b as q}
// @filename: barrel.ts
export * from "./file0.js"
export * from "./file1.js"
export * from "./file2.js"
export * from "./file3.js"
export * from "./file4.js"
export * from "./file5.js"
export * from "./file6.js"
export * from "./file7.js"
export * from "./file8.js"
export * from "./file9.js"
export * from "./file10.js"
export * from "./file11.js"
export * from "./file12.js"
export * from "./file13.js"
export * from "./file14.js"
export * from "./file15.js"