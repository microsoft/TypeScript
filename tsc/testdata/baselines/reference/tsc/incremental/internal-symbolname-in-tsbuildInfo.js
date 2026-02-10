currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts] *new* 
interface SymbolConstructor {
    readonly iterator: unique symbol;
}
interface IteratorYieldResult<TYield> {
    done?: false;
    value: TYield;
}
interface IteratorReturnResult<TReturn> {
    done: true;
    value: TReturn;
}
type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;
interface Iterator<T, TReturn = any, TNext = any> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...[value]: [] | [TNext]): IteratorResult<T, TReturn>;
    return?(value?: TReturn): IteratorResult<T, TReturn>;
    throw?(e?: any): IteratorResult<T, TReturn>;
}
interface Iterable<T, TReturn = any, TNext = any> {
    [Symbol.iterator](): Iterator<T, TReturn, TNext>;
}
interface IterableIterator<T, TReturn = any, TNext = any> extends Iterator<T, TReturn, TNext> {
    [Symbol.iterator](): IterableIterator<T, TReturn, TNext>;
}
interface IteratorObject<T, TReturn = unknown, TNext = unknown> extends Iterator<T, TReturn, TNext> {
    [Symbol.iterator](): IteratorObject<T, TReturn, TNext>;
}
type BuiltinIteratorReturn = intrinsic;
interface ArrayIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): ArrayIterator<T>;
}
interface Array<T> {
    [Symbol.iterator](): ArrayIterator<T>;
    entries(): ArrayIterator<[number, T]>;
    keys(): ArrayIterator<number>;
    values(): ArrayIterator<T>;
}
//// [/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts] *new* 
/// <reference lib="es2015.iterable"/>
interface File {
}
interface FileList {
    readonly length: number;
    item(index: number): File | null;
    [index: number]: File;
    [Symbol.iterator](): ArrayIterator<File>;
}/// <reference no-default-lib="true"/>
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/a.ts] *new* 
const createFileListFromFiles = (files: File[]): FileList => {
const fileList: FileList = {
    length: files.length,
    item: (index: number): File | null => files[index] || null,
    [Symbol.iterator]: function* (): IterableIterator<File> {
    for (const file of files) yield file;
    },
    ...files,
} as unknown as FileList;

return fileList;
};
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "target": "es2017",
        "strict": true,
        "esModuleInterop": true
    }
}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS2783: [0m'length' is specified more than once, so this usage will be overwritten.

[7m3[0m     length: files.length,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~[0m

  [96ma.ts[0m:[93m8[0m:[93m5[0m - This spread always overwrites this property.
    [7m8[0m     ...files,
    [7m [0m [96m    ~~~~~~~~[0m

[96ma.ts[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS2783: [0m'�@iterator@<symbolId>' is specified more than once, so this usage will be overwritten.

[7m5[0m     [Symbol.iterator]: function* (): IterableIterator<File> {
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m6[0m     for (const file of files) yield file;
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m7[0m     },
[7m [0m [91m~~~~~[0m

  [96ma.ts[0m:[93m8[0m:[93m5[0m - This spread always overwrites this property.
    [7m8[0m     ...files,
    [7m [0m [96m    ~~~~~~~~[0m


Found 2 errors in the same file, starting at: a.ts[90m:3[0m

//// [/home/src/workspaces/project/a.js] *new* 
"use strict";
const createFileListFromFiles = (files) => {
    const fileList = Object.assign({ length: files.length, item: (index) => files[index] || null, [Symbol.iterator]: function* () {
            for (const file of files)
                yield file;
        } }, files);
    return fileList;
};




Edit [0]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS2783: [0m'length' is specified more than once, so this usage will be overwritten.

[7m3[0m     length: files.length,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~[0m

  [96ma.ts[0m:[93m8[0m:[93m5[0m - This spread always overwrites this property.
    [7m8[0m     ...files,
    [7m [0m [96m    ~~~~~~~~[0m

[96ma.ts[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS2783: [0m'�@iterator@<symbolId>' is specified more than once, so this usage will be overwritten.

[7m5[0m     [Symbol.iterator]: function* (): IterableIterator<File> {
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m6[0m     for (const file of files) yield file;
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m7[0m     },
[7m [0m [91m~~~~~[0m

  [96ma.ts[0m:[93m8[0m:[93m5[0m - This spread always overwrites this property.
    [7m8[0m     ...files,
    [7m [0m [96m    ~~~~~~~~[0m


Found 2 errors in the same file, starting at: a.ts[90m:3[0m

//// [/home/src/workspaces/project/a.js] *rewrite with same content*



Edit [1]:: no change with incremental

tsgo --incremental
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS2783: [0m'length' is specified more than once, so this usage will be overwritten.

[7m3[0m     length: files.length,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~[0m

  [96ma.ts[0m:[93m8[0m:[93m5[0m - This spread always overwrites this property.
    [7m8[0m     ...files,
    [7m [0m [96m    ~~~~~~~~[0m

[96ma.ts[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS2783: [0m'�@iterator@<symbolId>' is specified more than once, so this usage will be overwritten.

[7m5[0m     [Symbol.iterator]: function* (): IterableIterator<File> {
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m6[0m     for (const file of files) yield file;
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m7[0m     },
[7m [0m [91m~~~~~[0m

  [96ma.ts[0m:[93m8[0m:[93m5[0m - This spread always overwrites this property.
    [7m8[0m     ...files,
    [7m [0m [96m    ~~~~~~~~[0m


Found 2 errors in the same file, starting at: a.ts[90m:3[0m

//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2015.iterable.d.ts","lib.es2017.full.d.ts","./a.ts"],"fileInfos":[{"version":"47799ad4d7599a69644aa267bcd5dc4c-interface SymbolConstructor {\n    readonly iterator: unique symbol;\n}\ninterface IteratorYieldResult<TYield> {\n    done?: false;\n    value: TYield;\n}\ninterface IteratorReturnResult<TReturn> {\n    done: true;\n    value: TReturn;\n}\ntype IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;\ninterface Iterator<T, TReturn = any, TNext = any> {\n    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.\n    next(...[value]: [] | [TNext]): IteratorResult<T, TReturn>;\n    return?(value?: TReturn): IteratorResult<T, TReturn>;\n    throw?(e?: any): IteratorResult<T, TReturn>;\n}\ninterface Iterable<T, TReturn = any, TNext = any> {\n    [Symbol.iterator](): Iterator<T, TReturn, TNext>;\n}\ninterface IterableIterator<T, TReturn = any, TNext = any> extends Iterator<T, TReturn, TNext> {\n    [Symbol.iterator](): IterableIterator<T, TReturn, TNext>;\n}\ninterface IteratorObject<T, TReturn = unknown, TNext = unknown> extends Iterator<T, TReturn, TNext> {\n    [Symbol.iterator](): IteratorObject<T, TReturn, TNext>;\n}\ntype BuiltinIteratorReturn = intrinsic;\ninterface ArrayIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {\n    [Symbol.iterator](): ArrayIterator<T>;\n}\ninterface Array<T> {\n    [Symbol.iterator](): ArrayIterator<T>;\n    entries(): ArrayIterator<[number, T]>;\n    keys(): ArrayIterator<number>;\n    values(): ArrayIterator<T>;\n}","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"90486e388c4cd8c8ad802ceeba94c3b2-/// <reference lib=\"es2015.iterable\"/>\ninterface File {\n}\ninterface FileList {\n    readonly length: number;\n    item(index: number): File | null;\n    [index: number]: File;\n    [Symbol.iterator](): ArrayIterator<File>;\n}/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0b263ea9c85854f9c9a16d8f45c58df4-const createFileListFromFiles = (files: File[]): FileList => {\nconst fileList: FileList = {\n    length: files.length,\n    item: (index: number): File | null => files[index] || null,\n    [Symbol.iterator]: function* (): IterableIterator<File> {\n    for (const file of files) yield file;\n    },\n    ...files,\n} as unknown as FileList;\n\nreturn fileList;\n};","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"esModuleInterop":true,"strict":true,"target":4},"semanticDiagnosticsPerFile":[[3,[{"pos":96,"end":116,"code":2783,"category":1,"messageKey":"_0_is_specified_more_than_once_so_this_usage_will_be_overwritten_2783","messageArgs":["length"],"relatedInformation":[{"pos":297,"end":305,"code":2785,"category":1,"messageKey":"This_spread_always_overwrites_this_property_2785"}]},{"pos":186,"end":291,"code":2783,"category":1,"messageKey":"_0_is_specified_more_than_once_so_this_usage_will_be_overwritten_2783","messageArgs":["�@iterator@<symbolId>"],"relatedInformation":[{"pos":297,"end":305,"code":2785,"category":1,"messageKey":"This_spread_always_overwrites_this_property_2785"}]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2015.iterable.d.ts",
    "lib.es2017.full.d.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2015.iterable.d.ts",
      "version": "47799ad4d7599a69644aa267bcd5dc4c-interface SymbolConstructor {\n    readonly iterator: unique symbol;\n}\ninterface IteratorYieldResult<TYield> {\n    done?: false;\n    value: TYield;\n}\ninterface IteratorReturnResult<TReturn> {\n    done: true;\n    value: TReturn;\n}\ntype IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;\ninterface Iterator<T, TReturn = any, TNext = any> {\n    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.\n    next(...[value]: [] | [TNext]): IteratorResult<T, TReturn>;\n    return?(value?: TReturn): IteratorResult<T, TReturn>;\n    throw?(e?: any): IteratorResult<T, TReturn>;\n}\ninterface Iterable<T, TReturn = any, TNext = any> {\n    [Symbol.iterator](): Iterator<T, TReturn, TNext>;\n}\ninterface IterableIterator<T, TReturn = any, TNext = any> extends Iterator<T, TReturn, TNext> {\n    [Symbol.iterator](): IterableIterator<T, TReturn, TNext>;\n}\ninterface IteratorObject<T, TReturn = unknown, TNext = unknown> extends Iterator<T, TReturn, TNext> {\n    [Symbol.iterator](): IteratorObject<T, TReturn, TNext>;\n}\ntype BuiltinIteratorReturn = intrinsic;\ninterface ArrayIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {\n    [Symbol.iterator](): ArrayIterator<T>;\n}\ninterface Array<T> {\n    [Symbol.iterator](): ArrayIterator<T>;\n    entries(): ArrayIterator<[number, T]>;\n    keys(): ArrayIterator<number>;\n    values(): ArrayIterator<T>;\n}",
      "signature": "47799ad4d7599a69644aa267bcd5dc4c-interface SymbolConstructor {\n    readonly iterator: unique symbol;\n}\ninterface IteratorYieldResult<TYield> {\n    done?: false;\n    value: TYield;\n}\ninterface IteratorReturnResult<TReturn> {\n    done: true;\n    value: TReturn;\n}\ntype IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;\ninterface Iterator<T, TReturn = any, TNext = any> {\n    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.\n    next(...[value]: [] | [TNext]): IteratorResult<T, TReturn>;\n    return?(value?: TReturn): IteratorResult<T, TReturn>;\n    throw?(e?: any): IteratorResult<T, TReturn>;\n}\ninterface Iterable<T, TReturn = any, TNext = any> {\n    [Symbol.iterator](): Iterator<T, TReturn, TNext>;\n}\ninterface IterableIterator<T, TReturn = any, TNext = any> extends Iterator<T, TReturn, TNext> {\n    [Symbol.iterator](): IterableIterator<T, TReturn, TNext>;\n}\ninterface IteratorObject<T, TReturn = unknown, TNext = unknown> extends Iterator<T, TReturn, TNext> {\n    [Symbol.iterator](): IteratorObject<T, TReturn, TNext>;\n}\ntype BuiltinIteratorReturn = intrinsic;\ninterface ArrayIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {\n    [Symbol.iterator](): ArrayIterator<T>;\n}\ninterface Array<T> {\n    [Symbol.iterator](): ArrayIterator<T>;\n    entries(): ArrayIterator<[number, T]>;\n    keys(): ArrayIterator<number>;\n    values(): ArrayIterator<T>;\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "47799ad4d7599a69644aa267bcd5dc4c-interface SymbolConstructor {\n    readonly iterator: unique symbol;\n}\ninterface IteratorYieldResult<TYield> {\n    done?: false;\n    value: TYield;\n}\ninterface IteratorReturnResult<TReturn> {\n    done: true;\n    value: TReturn;\n}\ntype IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;\ninterface Iterator<T, TReturn = any, TNext = any> {\n    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.\n    next(...[value]: [] | [TNext]): IteratorResult<T, TReturn>;\n    return?(value?: TReturn): IteratorResult<T, TReturn>;\n    throw?(e?: any): IteratorResult<T, TReturn>;\n}\ninterface Iterable<T, TReturn = any, TNext = any> {\n    [Symbol.iterator](): Iterator<T, TReturn, TNext>;\n}\ninterface IterableIterator<T, TReturn = any, TNext = any> extends Iterator<T, TReturn, TNext> {\n    [Symbol.iterator](): IterableIterator<T, TReturn, TNext>;\n}\ninterface IteratorObject<T, TReturn = unknown, TNext = unknown> extends Iterator<T, TReturn, TNext> {\n    [Symbol.iterator](): IteratorObject<T, TReturn, TNext>;\n}\ntype BuiltinIteratorReturn = intrinsic;\ninterface ArrayIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {\n    [Symbol.iterator](): ArrayIterator<T>;\n}\ninterface Array<T> {\n    [Symbol.iterator](): ArrayIterator<T>;\n    entries(): ArrayIterator<[number, T]>;\n    keys(): ArrayIterator<number>;\n    values(): ArrayIterator<T>;\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "lib.es2017.full.d.ts",
      "version": "90486e388c4cd8c8ad802ceeba94c3b2-/// <reference lib=\"es2015.iterable\"/>\ninterface File {\n}\ninterface FileList {\n    readonly length: number;\n    item(index: number): File | null;\n    [index: number]: File;\n    [Symbol.iterator](): ArrayIterator<File>;\n}/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "90486e388c4cd8c8ad802ceeba94c3b2-/// <reference lib=\"es2015.iterable\"/>\ninterface File {\n}\ninterface FileList {\n    readonly length: number;\n    item(index: number): File | null;\n    [index: number]: File;\n    [Symbol.iterator](): ArrayIterator<File>;\n}/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90486e388c4cd8c8ad802ceeba94c3b2-/// <reference lib=\"es2015.iterable\"/>\ninterface File {\n}\ninterface FileList {\n    readonly length: number;\n    item(index: number): File | null;\n    [index: number]: File;\n    [Symbol.iterator](): ArrayIterator<File>;\n}/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./a.ts",
      "version": "0b263ea9c85854f9c9a16d8f45c58df4-const createFileListFromFiles = (files: File[]): FileList => {\nconst fileList: FileList = {\n    length: files.length,\n    item: (index: number): File | null => files[index] || null,\n    [Symbol.iterator]: function* (): IterableIterator<File> {\n    for (const file of files) yield file;\n    },\n    ...files,\n} as unknown as FileList;\n\nreturn fileList;\n};",
      "signature": "0b263ea9c85854f9c9a16d8f45c58df4-const createFileListFromFiles = (files: File[]): FileList => {\nconst fileList: FileList = {\n    length: files.length,\n    item: (index: number): File | null => files[index] || null,\n    [Symbol.iterator]: function* (): IterableIterator<File> {\n    for (const file of files) yield file;\n    },\n    ...files,\n} as unknown as FileList;\n\nreturn fileList;\n};",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0b263ea9c85854f9c9a16d8f45c58df4-const createFileListFromFiles = (files: File[]): FileList => {\nconst fileList: FileList = {\n    length: files.length,\n    item: (index: number): File | null => files[index] || null,\n    [Symbol.iterator]: function* (): IterableIterator<File> {\n    for (const file of files) yield file;\n    },\n    ...files,\n} as unknown as FileList;\n\nreturn fileList;\n};",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "esModuleInterop": true,
    "strict": true,
    "target": 4
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "pos": 96,
          "end": 116,
          "code": 2783,
          "category": 1,
          "messageKey": "_0_is_specified_more_than_once_so_this_usage_will_be_overwritten_2783",
          "messageArgs": [
            "length"
          ],
          "relatedInformation": [
            {
              "pos": 297,
              "end": 305,
              "code": 2785,
              "category": 1,
              "messageKey": "This_spread_always_overwrites_this_property_2785"
            }
          ]
        },
        {
          "pos": 186,
          "end": 291,
          "code": 2783,
          "category": 1,
          "messageKey": "_0_is_specified_more_than_once_so_this_usage_will_be_overwritten_2783",
          "messageArgs": [
            "�@iterator@<symbolId>"
          ],
          "relatedInformation": [
            {
              "pos": 297,
              "end": 305,
              "code": 2785,
              "category": 1,
              "messageKey": "This_spread_always_overwrites_this_property_2785"
            }
          ]
        }
      ]
    ]
  ],
  "size": 3854
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [2]:: no change with incremental that reads buildInfo

tsgo --incremental
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS2783: [0m'length' is specified more than once, so this usage will be overwritten.

[7m3[0m     length: files.length,
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~[0m

  [96ma.ts[0m:[93m8[0m:[93m5[0m - This spread always overwrites this property.
    [7m8[0m     ...files,
    [7m [0m [96m    ~~~~~~~~[0m

[96ma.ts[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS2783: [0m'�@iterator@<symbolId>' is specified more than once, so this usage will be overwritten.

[7m5[0m     [Symbol.iterator]: function* (): IterableIterator<File> {
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m6[0m     for (const file of files) yield file;
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m7[0m     },
[7m [0m [91m~~~~~[0m

  [96ma.ts[0m:[93m8[0m:[93m5[0m - This spread always overwrites this property.
    [7m8[0m     ...files,
    [7m [0m [96m    ~~~~~~~~[0m


Found 2 errors in the same file, starting at: a.ts[90m:3[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
