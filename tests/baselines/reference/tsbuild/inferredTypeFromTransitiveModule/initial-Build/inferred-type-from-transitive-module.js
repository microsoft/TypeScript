//// [/src/obj/bar.d.ts]
declare const _default: (param: string) => void;
export default _default;


//// [/src/obj/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar(param) {
});


//// [/src/obj/bundling.d.ts]
export declare class LazyModule<TModule> {
    private importCallback;
    constructor(importCallback: () => Promise<TModule>);
}
export declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {
    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);
}


//// [/src/obj/bundling.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LazyModule = /** @class */ (function () {
    function LazyModule(importCallback) {
        this.importCallback = importCallback;
    }
    return LazyModule;
}());
exports.LazyModule = LazyModule;
var LazyAction = /** @class */ (function () {
    function LazyAction(_lazyModule, _getter) {
    }
    return LazyAction;
}());
exports.LazyAction = LazyAction;


//// [/src/obj/index.d.ts]
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<(param: string) => void, typeof import("./lazyIndex")>;


//// [/src/obj/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bundling_1 = require("./bundling");
var lazyModule = new bundling_1.LazyModule(function () {
    return Promise.resolve().then(function () { return require('./lazyIndex'); });
});
exports.lazyBar = new bundling_1.LazyAction(lazyModule, function (m) { return m.bar; });


//// [/src/obj/lazyIndex.d.ts]
export { default as bar } from './bar';


//// [/src/obj/lazyIndex.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bar_1 = require("./bar");
exports.bar = bar_1.default;


//// [/src/obj/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "/lib/lib.d.ts": {
        "version": "-15964756381",
        "signature": "-15964756381"
      },
      "/src/bar.ts": {
        "version": "5936740878",
        "signature": "11191036521"
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
        "signature": "18468008756"
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

