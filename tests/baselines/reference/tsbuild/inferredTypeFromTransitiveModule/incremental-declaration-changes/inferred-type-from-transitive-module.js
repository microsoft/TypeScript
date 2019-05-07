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
      "/lib/lib.d.ts": {
        "version": "-15964756381",
        "signature": "-15964756381"
      },
      "/src/bar.ts": {
        "version": "747071916",
        "signature": "-9232740537"
      },
      "/src/bundling.ts": {
        "version": "-21659820217",
        "signature": "-40032907372"
      },
      "/src/global.d.ts": {
        "version": "-9780226215",
        "signature": "-9780226215"
      },
      "/src/lazyindex.ts": {
        "version": "-6956449754",
        "signature": "-6224542381"
      },
      "/src/index.ts": {
        "version": "-11602502901",
        "signature": "6256067474"
      }
    },
    "options": {
      "target": 1,
      "declaration": true,
      "outDir": "/src/obj",
      "incremental": true,
      "configFilePath": "/src/tsconfig.json"
    },
    "referencedMap": {
      "/src/index.ts": [
        "/src/bundling.ts",
        "/src/lazyindex.ts"
      ],
      "/src/lazyindex.ts": [
        "/src/bar.ts"
      ]
    },
    "exportedModulesMap": {
      "/src/index.ts": [
        "/src/bundling.ts",
        "/src/lazyindex.ts"
      ],
      "/src/lazyindex.ts": [
        "/src/bar.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "/lib/lib.d.ts",
      "/src/bar.ts",
      "/src/bundling.ts",
      "/src/global.d.ts",
      "/src/index.ts",
      "/src/lazyindex.ts"
    ]
  },
  "version": "FakeTSVersion"
}

