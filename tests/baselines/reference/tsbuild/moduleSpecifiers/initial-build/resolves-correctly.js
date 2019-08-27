//// [/lib/src/common/nominal.d.ts]
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};


//// [/lib/src/common/nominal.js]
"use strict";
exports.__esModule = true;


//// [/lib/src/common/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../.ts/lib.es5.d.ts": {
        "version": "406734842058",
        "signature": "406734842058"
      },
      "../../../.ts/lib.es2015.d.ts": {
        "version": "57263133672",
        "signature": "57263133672"
      },
      "../../../.ts/lib.dom.d.ts": {
        "version": "-1041975536091",
        "signature": "-1041975536091"
      },
      "../../../.ts/lib.es2015.core.d.ts": {
        "version": "370321249768",
        "signature": "370321249768"
      },
      "../../../.ts/lib.es2015.collection.d.ts": {
        "version": "-95997535017",
        "signature": "-95997535017"
      },
      "../../../.ts/lib.es2015.generator.d.ts": {
        "version": "10837180865",
        "signature": "10837180865"
      },
      "../../../.ts/lib.es2015.iterable.d.ts": {
        "version": "232404497324",
        "signature": "232404497324"
      },
      "../../../.ts/lib.es2015.promise.d.ts": {
        "version": "235321148269",
        "signature": "235321148269"
      },
      "../../../.ts/lib.es2015.proxy.d.ts": {
        "version": "55479865087",
        "signature": "55479865087"
      },
      "../../../.ts/lib.es2015.reflect.d.ts": {
        "version": "30748787093",
        "signature": "30748787093"
      },
      "../../../.ts/lib.es2015.symbol.d.ts": {
        "version": "9409688441",
        "signature": "9409688441"
      },
      "../../../.ts/lib.es2015.symbol.wellknown.d.ts": {
        "version": "-67261006573",
        "signature": "-67261006573"
      },
      "../../../src/common/nominal.ts": {
        "version": "-24498031910",
        "signature": "-24498031910"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "lib": [
        "lib.dom.d.ts",
        "lib.es2015.d.ts",
        "lib.es2015.symbol.wellknown.d.ts"
      ],
      "composite": true,
      "configFilePath": "../../../src/common/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../.ts/lib.dom.d.ts",
      "../../../.ts/lib.es2015.collection.d.ts",
      "../../../.ts/lib.es2015.core.d.ts",
      "../../../.ts/lib.es2015.d.ts",
      "../../../.ts/lib.es2015.generator.d.ts",
      "../../../.ts/lib.es2015.iterable.d.ts",
      "../../../.ts/lib.es2015.promise.d.ts",
      "../../../.ts/lib.es2015.proxy.d.ts",
      "../../../.ts/lib.es2015.reflect.d.ts",
      "../../../.ts/lib.es2015.symbol.d.ts",
      "../../../.ts/lib.es2015.symbol.wellknown.d.ts",
      "../../../.ts/lib.es5.d.ts",
      "../../../src/common/nominal.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/lib/src/sub-project/index.d.ts]
import { Nominal } from '../common/nominal';
export declare type MyNominal = Nominal<string, 'MyNominal'>;


//// [/lib/src/sub-project/index.js]
"use strict";
exports.__esModule = true;


//// [/lib/src/sub-project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../.ts/lib.es5.d.ts": {
        "version": "406734842058",
        "signature": "406734842058"
      },
      "../../../.ts/lib.es2015.d.ts": {
        "version": "57263133672",
        "signature": "57263133672"
      },
      "../../../.ts/lib.dom.d.ts": {
        "version": "-1041975536091",
        "signature": "-1041975536091"
      },
      "../../../.ts/lib.es2015.core.d.ts": {
        "version": "370321249768",
        "signature": "370321249768"
      },
      "../../../.ts/lib.es2015.collection.d.ts": {
        "version": "-95997535017",
        "signature": "-95997535017"
      },
      "../../../.ts/lib.es2015.generator.d.ts": {
        "version": "10837180865",
        "signature": "10837180865"
      },
      "../../../.ts/lib.es2015.iterable.d.ts": {
        "version": "232404497324",
        "signature": "232404497324"
      },
      "../../../.ts/lib.es2015.promise.d.ts": {
        "version": "235321148269",
        "signature": "235321148269"
      },
      "../../../.ts/lib.es2015.proxy.d.ts": {
        "version": "55479865087",
        "signature": "55479865087"
      },
      "../../../.ts/lib.es2015.reflect.d.ts": {
        "version": "30748787093",
        "signature": "30748787093"
      },
      "../../../.ts/lib.es2015.symbol.d.ts": {
        "version": "9409688441",
        "signature": "9409688441"
      },
      "../../../.ts/lib.es2015.symbol.wellknown.d.ts": {
        "version": "-67261006573",
        "signature": "-67261006573"
      },
      "../../../src/common/nominal.ts": {
        "version": "-24498031910",
        "signature": "-24498031910"
      },
      "../../../src/sub-project/index.ts": {
        "version": "-22894055505",
        "signature": "-18559108619"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "lib": [
        "lib.dom.d.ts",
        "lib.es2015.d.ts",
        "lib.es2015.symbol.wellknown.d.ts"
      ],
      "composite": true,
      "configFilePath": "../../../src/sub-project/tsconfig.json"
    },
    "referencedMap": {
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../.ts/lib.dom.d.ts",
      "../../../.ts/lib.es2015.collection.d.ts",
      "../../../.ts/lib.es2015.core.d.ts",
      "../../../.ts/lib.es2015.d.ts",
      "../../../.ts/lib.es2015.generator.d.ts",
      "../../../.ts/lib.es2015.iterable.d.ts",
      "../../../.ts/lib.es2015.promise.d.ts",
      "../../../.ts/lib.es2015.proxy.d.ts",
      "../../../.ts/lib.es2015.reflect.d.ts",
      "../../../.ts/lib.es2015.symbol.d.ts",
      "../../../.ts/lib.es2015.symbol.wellknown.d.ts",
      "../../../.ts/lib.es5.d.ts",
      "../../../src/common/nominal.ts",
      "../../../src/sub-project/index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/lib/src/sub-project-2/index.d.ts]
declare const variable: {
    key: import("../common/nominal").Nominal<string, "MyNominal">;
};
export declare function getVar(): keyof typeof variable;
export {};


//// [/lib/src/sub-project-2/index.js]
"use strict";
exports.__esModule = true;
var variable = {
    key: 'value'
};
function getVar() {
    return 'key';
}
exports.getVar = getVar;


//// [/lib/src/sub-project-2/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../.ts/lib.es5.d.ts": {
        "version": "406734842058",
        "signature": "406734842058"
      },
      "../../../.ts/lib.es2015.d.ts": {
        "version": "57263133672",
        "signature": "57263133672"
      },
      "../../../.ts/lib.dom.d.ts": {
        "version": "-1041975536091",
        "signature": "-1041975536091"
      },
      "../../../.ts/lib.es2015.core.d.ts": {
        "version": "370321249768",
        "signature": "370321249768"
      },
      "../../../.ts/lib.es2015.collection.d.ts": {
        "version": "-95997535017",
        "signature": "-95997535017"
      },
      "../../../.ts/lib.es2015.generator.d.ts": {
        "version": "10837180865",
        "signature": "10837180865"
      },
      "../../../.ts/lib.es2015.iterable.d.ts": {
        "version": "232404497324",
        "signature": "232404497324"
      },
      "../../../.ts/lib.es2015.promise.d.ts": {
        "version": "235321148269",
        "signature": "235321148269"
      },
      "../../../.ts/lib.es2015.proxy.d.ts": {
        "version": "55479865087",
        "signature": "55479865087"
      },
      "../../../.ts/lib.es2015.reflect.d.ts": {
        "version": "30748787093",
        "signature": "30748787093"
      },
      "../../../.ts/lib.es2015.symbol.d.ts": {
        "version": "9409688441",
        "signature": "9409688441"
      },
      "../../../.ts/lib.es2015.symbol.wellknown.d.ts": {
        "version": "-67261006573",
        "signature": "-67261006573"
      },
      "../../../src/common/nominal.ts": {
        "version": "-24498031910",
        "signature": "-24498031910"
      },
      "../../../src/sub-project/index.ts": {
        "version": "-18559108619",
        "signature": "-18559108619"
      },
      "../../../src/sub-project-2/index.ts": {
        "version": "-13939373533",
        "signature": "-33844181688"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "lib": [
        "lib.dom.d.ts",
        "lib.es2015.d.ts",
        "lib.es2015.symbol.wellknown.d.ts"
      ],
      "composite": true,
      "configFilePath": "../../../src/sub-project-2/tsconfig.json"
    },
    "referencedMap": {
      "../../../src/sub-project-2/index.ts": [
        "../sub-project/index.d.ts"
      ],
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../src/sub-project-2/index.ts": [
        "../common/nominal.d.ts"
      ],
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../.ts/lib.dom.d.ts",
      "../../../.ts/lib.es2015.collection.d.ts",
      "../../../.ts/lib.es2015.core.d.ts",
      "../../../.ts/lib.es2015.d.ts",
      "../../../.ts/lib.es2015.generator.d.ts",
      "../../../.ts/lib.es2015.iterable.d.ts",
      "../../../.ts/lib.es2015.promise.d.ts",
      "../../../.ts/lib.es2015.proxy.d.ts",
      "../../../.ts/lib.es2015.reflect.d.ts",
      "../../../.ts/lib.es2015.symbol.d.ts",
      "../../../.ts/lib.es2015.symbol.wellknown.d.ts",
      "../../../.ts/lib.es5.d.ts",
      "../../../src/common/nominal.ts",
      "../../../src/sub-project-2/index.ts",
      "../../../src/sub-project/index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

