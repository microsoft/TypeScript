//// [/src/bar.ts]
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(): void {
});

//// [/src/obj/bar.d.ts]
declare const _default: () => void;
export default _default;


//// [/src/obj/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar() {
});


//// [/src/obj/index.d.ts]
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<() => void, typeof import("./lazyIndex")>;


//// [/src/obj/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397",
        "signature": "3858781397"
      },
      "../bar.ts": {
        "version": "747071916",
        "signature": "-9232740537"
      },
      "../bundling.ts": {
        "version": "-21659820217",
        "signature": "-40032907372"
      },
      "../global.d.ts": {
        "version": "-9780226215",
        "signature": "-9780226215"
      },
      "../lazyindex.ts": {
        "version": "-6956449754",
        "signature": "-6224542381"
      },
      "../index.ts": {
        "version": "-11602502901",
        "signature": "6256067474"
      }
    },
    "options": {
      "target": 1,
      "declaration": true,
      "outDir": "./",
      "incremental": true,
      "configFilePath": "../tsconfig.json"
    },
    "referencedMap": {
      "../index.ts": [
        "../bundling.ts",
        "../lazyindex.ts"
      ],
      "../lazyindex.ts": [
        "../bar.ts"
      ]
    },
    "exportedModulesMap": {
      "../index.ts": [
        "../bundling.ts",
        "../lazyindex.ts"
      ],
      "../lazyindex.ts": [
        "../bar.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../bar.ts",
      "../bundling.ts",
      "../global.d.ts",
      "../index.ts",
      "../lazyindex.ts"
    ]
  },
  "version": "FakeTSVersion"
}

