Info 0    [00:02:03.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:02:04.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["fileWithImports.ts","randomFileForImport.ts","a/fileWithImports.ts","b/ba/fileWithImports.ts","b/randomFileForImport.ts","c/ca/fileWithImports.ts","c/ca/caa/randomFileForImport.ts","c/ca/caa/caaa/fileWithImports.ts","c/cb/fileWithImports.ts","d/da/daa/daaa/x/y/z/randomFileForImport.ts","d/da/daa/daaa/fileWithImports.ts","d/da/daa/fileWithImports.ts","d/da/fileWithImports.ts","e/ea/fileWithImports.ts","e/ea/eaa/fileWithImports.ts","e/ea/eaa/eaaa/fileWithImports.ts","e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","f/fa/faa/x/y/z/randomFileForImport.ts","f/fa/faa/faaa/fileWithImports.ts"]}

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/a/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/b/ba/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/b/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/c/ca/caa/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/caa/caaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/c/cb/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/src/project/d/da/daa/daaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/d/da/daa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/d/da/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/e/ea/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/e/ea/eaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/src/project/f/fa/faa/faaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/f/fa/faa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/src/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/a/lib/lib.d.ts]
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

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"affectedFilesPendingEmit":[5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,4],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"cacheResolutions":{"resolutions":[{"resolvedModule":2}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[1]],[27,[1]],[28,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./f/fa/faa/x/y/z/randomfileforimport.ts",
      "./f/fa/faa/faaa/filewithimports.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./f/fa/faa/faaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./f/fa/faa/faaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./b/randomfileforimport.ts",
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./f/fa/faa/faaa/filewithimports.ts",
        [
          {
            "file": "./f/fa/faa/faaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./f/fa/faa/x/y/z/randomfileforimport.ts",
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./b/randomfileforimport.ts",
        "Js | Dts"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Js | Dts"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Js | Dts"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./d/da/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Js | Dts"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./f/fa/faa/faaa/filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./f/fa/faa/x/y/z/randomfileforimport.ts",
        "Js | Dts"
      ],
      [
        "./filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./randomfileforimport.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./f/fa/faa/x/y/z/randomfileforimport.ts",
      "./f/fa/faa/faaa/filewithimports.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./a",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            }
          ]
        },
        {
          "dir": "./b/ba",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            }
          ]
        },
        {
          "dir": "./c/ca/caa/caaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            }
          ]
        },
        {
          "dir": "./c/cb",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            }
          ]
        },
        {
          "dir": "./d/da/daa/daaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            }
          ]
        },
        {
          "dir": "./e/ea/eaa/eaaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            }
          ]
        },
        {
          "dir": "./f/fa/faa/faaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5912
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:02:05.000] Search path: /src/project
Info 3    [00:02:06.000] For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:02:07.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:02:08.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:02:09.000] Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/fileWithImports.ts",
  "/src/project/randomFileForImport.ts",
  "/src/project/a/fileWithImports.ts",
  "/src/project/b/ba/fileWithImports.ts",
  "/src/project/b/randomFileForImport.ts",
  "/src/project/c/ca/fileWithImports.ts",
  "/src/project/c/ca/caa/randomFileForImport.ts",
  "/src/project/c/ca/caa/caaa/fileWithImports.ts",
  "/src/project/c/cb/fileWithImports.ts",
  "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/src/project/d/da/daa/daaa/fileWithImports.ts",
  "/src/project/d/da/daa/fileWithImports.ts",
  "/src/project/d/da/fileWithImports.ts",
  "/src/project/e/ea/fileWithImports.ts",
  "/src/project/e/ea/eaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/src/project/f/fa/faa/faaa/fileWithImports.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.json"
 }
}
Info 7    [00:02:10.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 8    [00:02:11.000] FileWatcher:: Added:: WatchInfo: /src/project/a/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 9    [00:02:12.000] FileWatcher:: Added:: WatchInfo: /src/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 10   [00:02:13.000] FileWatcher:: Added:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 11   [00:02:14.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 12   [00:02:15.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 13   [00:02:16.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/caaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 14   [00:02:17.000] FileWatcher:: Added:: WatchInfo: /src/project/c/cb/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 15   [00:02:18.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 16   [00:02:19.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 17   [00:02:20.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 18   [00:02:21.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 19   [00:02:22.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 20   [00:02:23.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 21   [00:02:24.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 22   [00:02:25.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 23   [00:02:26.000] FileWatcher:: Added:: WatchInfo: /src/project/f/fa/faa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 24   [00:02:27.000] FileWatcher:: Added:: WatchInfo: /src/project/f/fa/faa/faaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 25   [00:02:28.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 26   [00:02:29.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 27   [00:02:30.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 28   [00:02:31.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 29   [00:02:32.000] Module resolution kind is not specified, using 'NodeJs'.
Info 30   [00:02:33.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 31   [00:02:34.000] File '/src/project/node_modules/pkg1.ts' does not exist.
Info 32   [00:02:35.000] File '/src/project/node_modules/pkg1.tsx' does not exist.
Info 33   [00:02:36.000] File '/src/project/node_modules/pkg1.d.ts' does not exist.
Info 34   [00:02:37.000] Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Info 35   [00:02:38.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 36   [00:02:39.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 37   [00:02:40.000] Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
Info 38   [00:02:41.000] File '/src/project/node_modules/pkg1.js' does not exist.
Info 39   [00:02:42.000] File '/src/project/node_modules/pkg1.jsx' does not exist.
Info 40   [00:02:43.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 41   [00:02:44.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 42   [00:02:45.000] ======== Module name 'pkg1' was not resolved. ========
Info 43   [00:02:46.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 44   [00:02:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 45   [00:02:48.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 46   [00:02:49.000] ======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Info 47   [00:02:50.000] Module resolution kind is not specified, using 'NodeJs'.
Info 48   [00:02:51.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 49   [00:02:52.000] Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Info 50   [00:02:53.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 51   [00:02:54.000] ======== Module name 'pkg1' was not resolved. ========
Info 52   [00:02:55.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 53   [00:02:56.000] ======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Info 54   [00:02:57.000] Module resolution kind is not specified, using 'NodeJs'.
Info 55   [00:02:58.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 56   [00:02:59.000] Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info 57   [00:03:00.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 58   [00:03:01.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 59   [00:03:02.000] ======== Module name 'pkg1' was not resolved. ========
Info 60   [00:03:03.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 61   [00:03:04.000] ======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Info 62   [00:03:05.000] Module resolution kind is not specified, using 'NodeJs'.
Info 63   [00:03:06.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 64   [00:03:07.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 65   [00:03:08.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 66   [00:03:09.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 67   [00:03:10.000] ======== Module name 'pkg1' was not resolved. ========
Info 68   [00:03:11.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 69   [00:03:12.000] ======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info 70   [00:03:13.000] Module resolution kind is not specified, using 'NodeJs'.
Info 71   [00:03:14.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 72   [00:03:15.000] Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info 73   [00:03:16.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 74   [00:03:17.000] Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
Info 75   [00:03:18.000] ======== Module name 'pkg1' was not resolved. ========
Info 76   [00:03:19.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 77   [00:03:20.000] ======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Info 78   [00:03:21.000] Module resolution kind is not specified, using 'NodeJs'.
Info 79   [00:03:22.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 80   [00:03:23.000] Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info 81   [00:03:24.000] Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
Info 82   [00:03:25.000] ======== Module name 'pkg1' was not resolved. ========
Info 83   [00:03:26.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 84   [00:03:27.000] ======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info 85   [00:03:28.000] Module resolution kind is not specified, using 'NodeJs'.
Info 86   [00:03:29.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 87   [00:03:30.000] Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info 88   [00:03:31.000] Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info 89   [00:03:32.000] Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info 90   [00:03:33.000] Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Info 91   [00:03:34.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 92   [00:03:35.000] ======== Module name 'pkg1' was not resolved. ========
Info 93   [00:03:36.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 94   [00:03:37.000] ======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Info 95   [00:03:38.000] Module resolution kind is not specified, using 'NodeJs'.
Info 96   [00:03:39.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 97   [00:03:40.000] Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
Info 98   [00:03:41.000] ======== Module name 'pkg1' was not resolved. ========
Info 99   [00:03:42.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 100  [00:03:43.000] ======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Info 101  [00:03:44.000] Module resolution kind is not specified, using 'NodeJs'.
Info 102  [00:03:45.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 103  [00:03:46.000] Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
Info 104  [00:03:47.000] ======== Module name 'pkg1' was not resolved. ========
Info 105  [00:03:48.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 106  [00:03:49.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Info 107  [00:03:50.000] Module resolution kind is not specified, using 'NodeJs'.
Info 108  [00:03:51.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 109  [00:03:52.000] Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info 110  [00:03:53.000] Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Info 111  [00:03:54.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 112  [00:03:55.000] ======== Module name 'pkg1' was not resolved. ========
Info 113  [00:03:56.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 114  [00:03:57.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Info 115  [00:03:58.000] Module resolution kind is not specified, using 'NodeJs'.
Info 116  [00:03:59.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 117  [00:04:00.000] Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info 118  [00:04:01.000] Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
Info 119  [00:04:02.000] ======== Module name 'pkg1' was not resolved. ========
Info 120  [00:04:03.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 121  [00:04:04.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info 122  [00:04:05.000] Module resolution kind is not specified, using 'NodeJs'.
Info 123  [00:04:06.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 124  [00:04:07.000] Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info 125  [00:04:08.000] Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
Info 126  [00:04:09.000] ======== Module name 'pkg1' was not resolved. ========
Info 127  [00:04:10.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' found in cache from location '/src/project/f/fa/faa/faaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 128  [00:04:11.000] ======== Resolving module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Info 129  [00:04:12.000] Module resolution kind is not specified, using 'NodeJs'.
Info 130  [00:04:13.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 131  [00:04:14.000] Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Info 132  [00:04:15.000] Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Info 133  [00:04:16.000] Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Info 134  [00:04:17.000] Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Info 135  [00:04:18.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 136  [00:04:19.000] ======== Module name 'pkg1' was not resolved. ========
Info 137  [00:04:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 138  [00:04:21.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 139  [00:04:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 140  [00:04:23.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 141  [00:04:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 142  [00:04:25.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 143  [00:04:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 144  [00:04:27.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 145  [00:04:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 146  [00:04:29.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 147  [00:04:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 148  [00:04:31.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 149  [00:04:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 150  [00:04:33.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 151  [00:04:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 152  [00:04:35.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 153  [00:04:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 154  [00:04:37.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 155  [00:04:38.000] Project '/src/project/tsconfig.json' (Configured)
Info 156  [00:04:39.000] 	Files (21)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/fileWithImports.ts
	/src/project/randomFileForImport.ts
	/src/project/a/fileWithImports.ts
	/src/project/b/ba/fileWithImports.ts
	/src/project/b/randomFileForImport.ts
	/src/project/c/ca/fileWithImports.ts
	/src/project/c/ca/caa/randomFileForImport.ts
	/src/project/c/ca/caa/caaa/fileWithImports.ts
	/src/project/c/cb/fileWithImports.ts
	/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
	/src/project/d/da/daa/daaa/fileWithImports.ts
	/src/project/d/da/daa/fileWithImports.ts
	/src/project/d/da/fileWithImports.ts
	/src/project/e/ea/fileWithImports.ts
	/src/project/e/ea/eaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	/src/project/f/fa/faa/x/y/z/randomFileForImport.ts
	/src/project/f/fa/faa/faaa/fileWithImports.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'a/fileWithImports.ts'
	  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
	fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	a/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/ba/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/caaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/cb/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	f/fa/faa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	f/fa/faa/faaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json

Info 157  [00:04:40.000] -----------------------------------------------
Info 158  [00:04:41.000] Search path: /src/project
Info 159  [00:04:42.000] For info: /src/project/tsconfig.json :: No config files found.
Info 160  [00:04:43.000] Project '/src/project/tsconfig.json' (Configured)
Info 160  [00:04:44.000] 	Files (21)

Info 160  [00:04:45.000] -----------------------------------------------
Info 160  [00:04:46.000] Open files: 
Info 160  [00:04:47.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 160  [00:04:48.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/b/randomfileforimport.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 160  [00:04:49.000] response:
    {
      "responseRequired": false
    }
Info 161  [00:04:50.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/b/randomfileforimport.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 162  [00:04:51.000] FileWatcher:: Close:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 163  [00:04:52.000] Search path: /src/project/b
Info 164  [00:04:53.000] For info: /src/project/b/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 165  [00:04:54.000] Search path: /src/project
Info 166  [00:04:55.000] For info: /src/project/tsconfig.json :: No config files found.
Info 167  [00:04:56.000] Project '/src/project/tsconfig.json' (Configured)
Info 167  [00:04:57.000] 	Files (21)

Info 167  [00:04:58.000] -----------------------------------------------
Info 167  [00:04:59.000] Open files: 
Info 167  [00:05:00.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 167  [00:05:01.000] 		Projects: /src/project/tsconfig.json
Info 167  [00:05:02.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 167  [00:05:03.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 167  [00:05:04.000] response:
    {
      "responseRequired": false
    }
Info 168  [00:05:05.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 169  [00:05:06.000] FileWatcher:: Close:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 170  [00:05:07.000] Search path: /src/project/c/ca/caa
Info 171  [00:05:08.000] For info: /src/project/c/ca/caa/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 172  [00:05:09.000] Search path: /src/project
Info 173  [00:05:10.000] For info: /src/project/tsconfig.json :: No config files found.
Info 174  [00:05:11.000] Project '/src/project/tsconfig.json' (Configured)
Info 174  [00:05:12.000] 	Files (21)

Info 174  [00:05:13.000] -----------------------------------------------
Info 174  [00:05:14.000] Open files: 
Info 174  [00:05:15.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 174  [00:05:16.000] 		Projects: /src/project/tsconfig.json
Info 174  [00:05:17.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 174  [00:05:18.000] 		Projects: /src/project/tsconfig.json
Info 174  [00:05:19.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 174  [00:05:20.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 174  [00:05:21.000] response:
    {
      "responseRequired": false
    }
Info 175  [00:05:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 176  [00:05:23.000] FileWatcher:: Close:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 177  [00:05:24.000] Search path: /src/project/d/da/daa/daaa/x/y/z
Info 178  [00:05:25.000] For info: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 179  [00:05:26.000] Search path: /src/project
Info 180  [00:05:27.000] For info: /src/project/tsconfig.json :: No config files found.
Info 181  [00:05:28.000] Project '/src/project/tsconfig.json' (Configured)
Info 181  [00:05:29.000] 	Files (21)

Info 181  [00:05:30.000] -----------------------------------------------
Info 181  [00:05:31.000] Open files: 
Info 181  [00:05:32.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 181  [00:05:33.000] 		Projects: /src/project/tsconfig.json
Info 181  [00:05:34.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 181  [00:05:35.000] 		Projects: /src/project/tsconfig.json
Info 181  [00:05:36.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 181  [00:05:37.000] 		Projects: /src/project/tsconfig.json
Info 181  [00:05:38.000] 	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 181  [00:05:39.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 181  [00:05:40.000] response:
    {
      "responseRequired": false
    }
Info 182  [00:05:41.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 183  [00:05:42.000] FileWatcher:: Close:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 184  [00:05:43.000] Search path: /src/project/e/ea/eaa/eaaa/x/y/z
Info 185  [00:05:44.000] For info: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 186  [00:05:45.000] Search path: /src/project
Info 187  [00:05:46.000] For info: /src/project/tsconfig.json :: No config files found.
Info 188  [00:05:47.000] Project '/src/project/tsconfig.json' (Configured)
Info 188  [00:05:48.000] 	Files (21)

Info 188  [00:05:49.000] -----------------------------------------------
Info 188  [00:05:50.000] Open files: 
Info 188  [00:05:51.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 188  [00:05:52.000] 		Projects: /src/project/tsconfig.json
Info 188  [00:05:53.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 188  [00:05:54.000] 		Projects: /src/project/tsconfig.json
Info 188  [00:05:55.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 188  [00:05:56.000] 		Projects: /src/project/tsconfig.json
Info 188  [00:05:57.000] 	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 188  [00:05:58.000] 		Projects: /src/project/tsconfig.json
Info 188  [00:05:59.000] 	FileName: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 188  [00:06:00.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 188  [00:06:01.000] response:
    {
      "responseRequired": false
    }
Info 189  [00:06:02.000] modify randomFileForImport by adding import
Info 190  [00:06:03.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 6,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 191  [00:06:04.000] response:
    {
      "responseRequired": false
    }
Info 192  [00:06:05.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 193  [00:06:06.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 194  [00:06:07.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 195  [00:06:08.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 196  [00:06:09.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 197  [00:06:10.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 198  [00:06:11.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 199  [00:06:12.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 200  [00:06:13.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 201  [00:06:14.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 202  [00:06:15.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 203  [00:06:16.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 204  [00:06:17.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 205  [00:06:18.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 206  [00:06:19.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 207  [00:06:20.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 208  [00:06:21.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 209  [00:06:22.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 210  [00:06:23.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 211  [00:06:24.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 212  [00:06:25.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 213  [00:06:26.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 214  [00:06:27.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 215  [00:06:28.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 216  [00:06:29.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 217  [00:06:30.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 218  [00:06:31.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 219  [00:06:32.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 220  [00:06:33.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 221  [00:06:34.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 222  [00:06:35.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 223  [00:06:36.000] Different program with same set of files
Info 224  [00:06:37.000] modify b/randomFileForImport by adding import
Info 225  [00:06:38.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 7,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 226  [00:06:39.000] response:
    {
      "responseRequired": false
    }
Info 227  [00:06:40.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 228  [00:06:41.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 229  [00:06:42.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 230  [00:06:43.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 231  [00:06:44.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 232  [00:06:45.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 233  [00:06:46.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 234  [00:06:47.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 235  [00:06:48.000] ======== Resolving module 'pkg0' from '/src/project/b/randomFileForImport.ts'. ========
Info 236  [00:06:49.000] Resolution for module 'pkg0' was found in cache from location '/src/project/b'.
Info 237  [00:06:50.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 238  [00:06:51.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 239  [00:06:52.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 240  [00:06:53.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 241  [00:06:54.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 242  [00:06:55.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 243  [00:06:56.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 244  [00:06:57.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 245  [00:06:58.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 246  [00:06:59.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 247  [00:07:00.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 248  [00:07:01.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 249  [00:07:02.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 250  [00:07:03.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 251  [00:07:04.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 252  [00:07:05.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 253  [00:07:06.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 254  [00:07:07.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 255  [00:07:08.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 256  [00:07:09.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 257  [00:07:10.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 258  [00:07:11.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 259  [00:07:12.000] Different program with same set of files
Info 260  [00:07:13.000] modify c/ca/caa/randomFileForImport by adding import
Info 261  [00:07:14.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 8,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 262  [00:07:15.000] response:
    {
      "responseRequired": false
    }
Info 263  [00:07:16.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 264  [00:07:17.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 265  [00:07:18.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 266  [00:07:19.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 267  [00:07:20.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 268  [00:07:21.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 269  [00:07:22.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 270  [00:07:23.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 271  [00:07:24.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 272  [00:07:25.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 273  [00:07:26.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 274  [00:07:27.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Info 275  [00:07:28.000] Resolution for module 'pkg0' was found in cache from location '/src/project/c/ca/caa'.
Info 276  [00:07:29.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 277  [00:07:30.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 278  [00:07:31.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 279  [00:07:32.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 280  [00:07:33.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 281  [00:07:34.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 282  [00:07:35.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 283  [00:07:36.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 284  [00:07:37.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 285  [00:07:38.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 286  [00:07:39.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 287  [00:07:40.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 288  [00:07:41.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 289  [00:07:42.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 290  [00:07:43.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 291  [00:07:44.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 292  [00:07:45.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 293  [00:07:46.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 294  [00:07:47.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 295  [00:07:48.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 296  [00:07:49.000] Different program with same set of files
Info 297  [00:07:50.000] modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import
Info 298  [00:07:51.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 9,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 299  [00:07:52.000] response:
    {
      "responseRequired": false
    }
Info 300  [00:07:53.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 301  [00:07:54.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 302  [00:07:55.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 303  [00:07:56.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 304  [00:07:57.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 305  [00:07:58.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 306  [00:07:59.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 307  [00:08:00.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 308  [00:08:01.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 309  [00:08:02.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 310  [00:08:03.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 311  [00:08:04.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 312  [00:08:05.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 313  [00:08:06.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 314  [00:08:07.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 315  [00:08:08.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 316  [00:08:09.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info 317  [00:08:10.000] Module resolution kind is not specified, using 'NodeJs'.
Info 318  [00:08:11.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 319  [00:08:12.000] Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 320  [00:08:13.000] Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 321  [00:08:14.000] Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info 322  [00:08:15.000] Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa/daaa'.
Info 323  [00:08:16.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 324  [00:08:17.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 325  [00:08:18.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 326  [00:08:19.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 327  [00:08:20.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 328  [00:08:21.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 329  [00:08:22.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 330  [00:08:23.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 331  [00:08:24.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 332  [00:08:25.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 333  [00:08:26.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 334  [00:08:27.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 335  [00:08:28.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 336  [00:08:29.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 337  [00:08:30.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 338  [00:08:31.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 339  [00:08:32.000] Different program with same set of files
Info 340  [00:08:33.000] modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import
Info 341  [00:08:34.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 10,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 342  [00:08:35.000] response:
    {
      "responseRequired": false
    }
Info 343  [00:08:36.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 344  [00:08:37.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 345  [00:08:38.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 346  [00:08:39.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 347  [00:08:40.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 348  [00:08:41.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 349  [00:08:42.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 350  [00:08:43.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 351  [00:08:44.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 352  [00:08:45.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 353  [00:08:46.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 354  [00:08:47.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 355  [00:08:48.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 356  [00:08:49.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 357  [00:08:50.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 358  [00:08:51.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 359  [00:08:52.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 360  [00:08:53.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 361  [00:08:54.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 362  [00:08:55.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 363  [00:08:56.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 364  [00:08:57.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 365  [00:08:58.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 366  [00:08:59.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 367  [00:09:00.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 368  [00:09:01.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 369  [00:09:02.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 370  [00:09:03.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 371  [00:09:04.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 372  [00:09:05.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Info 373  [00:09:06.000] Module resolution kind is not specified, using 'NodeJs'.
Info 374  [00:09:07.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 375  [00:09:08.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 376  [00:09:09.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 377  [00:09:10.000] Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Info 378  [00:09:11.000] Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea/eaa/eaaa'.
Info 379  [00:09:12.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 380  [00:09:13.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 381  [00:09:14.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 382  [00:09:15.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 383  [00:09:16.000] Different program with same set of files
Info 384  [00:09:17.000] modify randomFileForImport by adding unresolved import
Info 385  [00:09:18.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface1 } from \"pkg1\";\n"
      },
      "seq": 11,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 386  [00:09:19.000] response:
    {
      "responseRequired": false
    }
Info 387  [00:09:20.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 388  [00:09:21.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 389  [00:09:22.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 390  [00:09:23.000] ======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Info 391  [00:09:24.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 392  [00:09:25.000] ======== Module name 'pkg1' was not resolved. ========
Info 393  [00:09:26.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 394  [00:09:27.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 395  [00:09:28.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 396  [00:09:29.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 397  [00:09:30.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 398  [00:09:31.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 399  [00:09:32.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 400  [00:09:33.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 401  [00:09:34.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 402  [00:09:35.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 403  [00:09:36.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 404  [00:09:37.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 405  [00:09:38.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 406  [00:09:39.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 407  [00:09:40.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 408  [00:09:41.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 409  [00:09:42.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 410  [00:09:43.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 411  [00:09:44.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 412  [00:09:45.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 413  [00:09:46.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 414  [00:09:47.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 415  [00:09:48.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 416  [00:09:49.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 417  [00:09:50.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 418  [00:09:51.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 419  [00:09:52.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 420  [00:09:53.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 421  [00:09:54.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 422  [00:09:55.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 423  [00:09:56.000] Different program with same set of files
Info 424  [00:09:57.000] modify b/randomFileForImport by adding unresolved import
Info 425  [00:09:58.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface1 } from \"pkg1\";\n"
      },
      "seq": 12,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 426  [00:09:59.000] response:
    {
      "responseRequired": false
    }
Info 427  [00:10:00.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 428  [00:10:01.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 429  [00:10:02.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 430  [00:10:03.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 431  [00:10:04.000] Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 432  [00:10:05.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 433  [00:10:06.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 434  [00:10:07.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 435  [00:10:08.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 436  [00:10:09.000] ======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Info 437  [00:10:10.000] Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
Info 438  [00:10:11.000] ======== Module name 'pkg1' was not resolved. ========
Info 439  [00:10:12.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 440  [00:10:13.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 441  [00:10:14.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 442  [00:10:15.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 443  [00:10:16.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 444  [00:10:17.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 445  [00:10:18.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 446  [00:10:19.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 447  [00:10:20.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 448  [00:10:21.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 449  [00:10:22.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 450  [00:10:23.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 451  [00:10:24.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 452  [00:10:25.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 453  [00:10:26.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 454  [00:10:27.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 455  [00:10:28.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 456  [00:10:29.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 457  [00:10:30.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 458  [00:10:31.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 459  [00:10:32.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 460  [00:10:33.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 461  [00:10:34.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 462  [00:10:35.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 463  [00:10:36.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 8 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 464  [00:10:37.000] Different program with same set of files
Info 465  [00:10:38.000] modify c/ca/caa/randomFileForImport by adding unresolved import
Info 466  [00:10:39.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface1 } from \"pkg1\";\n"
      },
      "seq": 13,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 467  [00:10:40.000] response:
    {
      "responseRequired": false
    }
Info 468  [00:10:41.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 469  [00:10:42.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 470  [00:10:43.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 471  [00:10:44.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 472  [00:10:45.000] Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 473  [00:10:46.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 474  [00:10:47.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 475  [00:10:48.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 476  [00:10:49.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 477  [00:10:50.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 478  [00:10:51.000] Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info 479  [00:10:52.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 480  [00:10:53.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 481  [00:10:54.000] ======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Info 482  [00:10:55.000] Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca/caa'.
Info 483  [00:10:56.000] ======== Module name 'pkg1' was not resolved. ========
Info 484  [00:10:57.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 485  [00:10:58.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 486  [00:10:59.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 487  [00:11:00.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 488  [00:11:01.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 489  [00:11:02.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 490  [00:11:03.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 491  [00:11:04.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 492  [00:11:05.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 493  [00:11:06.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 494  [00:11:07.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 495  [00:11:08.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 496  [00:11:09.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 497  [00:11:10.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 498  [00:11:11.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 499  [00:11:12.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 500  [00:11:13.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 501  [00:11:14.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 502  [00:11:15.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 503  [00:11:16.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 504  [00:11:17.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 505  [00:11:18.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 9 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 506  [00:11:19.000] Different program with same set of files
Info 507  [00:11:20.000] modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import
Info 508  [00:11:21.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface1 } from \"pkg1\";\n"
      },
      "seq": 14,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 509  [00:11:22.000] response:
    {
      "responseRequired": false
    }
Info 510  [00:11:23.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 511  [00:11:24.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 512  [00:11:25.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 513  [00:11:26.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 514  [00:11:27.000] Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 515  [00:11:28.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 516  [00:11:29.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 517  [00:11:30.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 518  [00:11:31.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 519  [00:11:32.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 520  [00:11:33.000] Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info 521  [00:11:34.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 522  [00:11:35.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 523  [00:11:36.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 524  [00:11:37.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Info 525  [00:11:38.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 526  [00:11:39.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 527  [00:11:40.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 528  [00:11:41.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 529  [00:11:42.000] ======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info 530  [00:11:43.000] Module resolution kind is not specified, using 'NodeJs'.
Info 531  [00:11:44.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 532  [00:11:45.000] Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 533  [00:11:46.000] Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 534  [00:11:47.000] Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info 535  [00:11:48.000] Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa/daaa'.
Info 536  [00:11:49.000] ======== Module name 'pkg1' was not resolved. ========
Info 537  [00:11:50.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 538  [00:11:51.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 539  [00:11:52.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 540  [00:11:53.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 541  [00:11:54.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 542  [00:11:55.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 543  [00:11:56.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 544  [00:11:57.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 545  [00:11:58.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 546  [00:11:59.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 547  [00:12:00.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 548  [00:12:01.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 549  [00:12:02.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 550  [00:12:03.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 551  [00:12:04.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 552  [00:12:05.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 553  [00:12:06.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 10 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 554  [00:12:07.000] Different program with same set of files
Info 555  [00:12:08.000] modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import
Info 556  [00:12:09.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface1 } from \"pkg1\";\n"
      },
      "seq": 15,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 557  [00:12:10.000] response:
    {
      "responseRequired": false
    }
Info 558  [00:12:11.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 559  [00:12:12.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 560  [00:12:13.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 561  [00:12:14.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 562  [00:12:15.000] Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 563  [00:12:16.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 564  [00:12:17.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 565  [00:12:18.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 566  [00:12:19.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 567  [00:12:20.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 568  [00:12:21.000] Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info 569  [00:12:22.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 570  [00:12:23.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 571  [00:12:24.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 572  [00:12:25.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Info 573  [00:12:26.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 574  [00:12:27.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 575  [00:12:28.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 576  [00:12:29.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 577  [00:12:30.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 578  [00:12:31.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info 579  [00:12:32.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 580  [00:12:33.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 581  [00:12:34.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 582  [00:12:35.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 583  [00:12:36.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 584  [00:12:37.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 585  [00:12:38.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 586  [00:12:39.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 587  [00:12:40.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 588  [00:12:41.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 589  [00:12:42.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 590  [00:12:43.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 591  [00:12:44.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Info 592  [00:12:45.000] Module resolution kind is not specified, using 'NodeJs'.
Info 593  [00:12:46.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 594  [00:12:47.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 595  [00:12:48.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 596  [00:12:49.000] Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Info 597  [00:12:50.000] Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa/eaaa'.
Info 598  [00:12:51.000] ======== Module name 'pkg1' was not resolved. ========
Info 599  [00:12:52.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 600  [00:12:53.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 601  [00:12:54.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 602  [00:12:55.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 11 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 603  [00:12:56.000] Different program with same set of files
Info 604  [00:12:57.000] modify f/fa/faa/x/y/z/randomFileForImport by adding import
Info 605  [00:12:58.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 16,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 606  [00:12:59.000] response:
    {
      "responseRequired": false
    }
Info 607  [00:13:00.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 608  [00:13:01.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 609  [00:13:02.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 610  [00:13:03.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 611  [00:13:04.000] Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 612  [00:13:05.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 613  [00:13:06.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 614  [00:13:07.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 615  [00:13:08.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 616  [00:13:09.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 617  [00:13:10.000] Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info 618  [00:13:11.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 619  [00:13:12.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 620  [00:13:13.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 621  [00:13:14.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Info 622  [00:13:15.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 623  [00:13:16.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 624  [00:13:17.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 625  [00:13:18.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 626  [00:13:19.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 627  [00:13:20.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info 628  [00:13:21.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 629  [00:13:22.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 630  [00:13:23.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 631  [00:13:24.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 632  [00:13:25.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 633  [00:13:26.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 634  [00:13:27.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 635  [00:13:28.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 636  [00:13:29.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 637  [00:13:30.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 638  [00:13:31.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 639  [00:13:32.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 640  [00:13:33.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 641  [00:13:34.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info 642  [00:13:35.000] ======== Resolving module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Info 643  [00:13:36.000] Module resolution kind is not specified, using 'NodeJs'.
Info 644  [00:13:37.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 645  [00:13:38.000] Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 646  [00:13:39.000] Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 647  [00:13:40.000] Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Info 648  [00:13:41.000] Resolution for module 'pkg0' was found in cache from location '/src/project/f/fa/faa'.
Info 649  [00:13:42.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 650  [00:13:43.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 651  [00:13:44.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 652  [00:13:45.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 12 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 653  [00:13:46.000] Different program with same set of files
Info 654  [00:13:47.000] modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import
Info 655  [00:13:48.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface1 } from \"pkg1\";\n"
      },
      "seq": 17,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 656  [00:13:49.000] response:
    {
      "responseRequired": false
    }
Info 657  [00:13:50.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 658  [00:13:51.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 659  [00:13:52.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 660  [00:13:53.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 661  [00:13:54.000] Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 662  [00:13:55.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 663  [00:13:56.000] Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Info 664  [00:13:57.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 665  [00:13:58.000] Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info 666  [00:13:59.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 667  [00:14:00.000] Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info 668  [00:14:01.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 669  [00:14:02.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info 670  [00:14:03.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 671  [00:14:04.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Info 672  [00:14:05.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 673  [00:14:06.000] Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info 674  [00:14:07.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 675  [00:14:08.000] Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info 676  [00:14:09.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 677  [00:14:10.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info 678  [00:14:11.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 679  [00:14:12.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info 680  [00:14:13.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 681  [00:14:14.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info 682  [00:14:15.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 683  [00:14:16.000] Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info 684  [00:14:17.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 685  [00:14:18.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info 686  [00:14:19.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 687  [00:14:20.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info 688  [00:14:21.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 689  [00:14:22.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info 690  [00:14:23.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 691  [00:14:24.000] Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info 692  [00:14:25.000] ======== Resolving module 'pkg1' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Info 693  [00:14:26.000] Module resolution kind is not specified, using 'NodeJs'.
Info 694  [00:14:27.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 695  [00:14:28.000] Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 696  [00:14:29.000] Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 697  [00:14:30.000] Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Info 698  [00:14:31.000] Resolution for module 'pkg1' was found in cache from location '/src/project/f/fa/faa'.
Info 699  [00:14:32.000] ======== Module name 'pkg1' was not resolved. ========
Info 700  [00:14:33.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 701  [00:14:34.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 702  [00:14:35.000] Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info 703  [00:14:36.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 13 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 704  [00:14:37.000] Different program with same set of files
Info 705  [00:14:38.000] add file for unresolved import and random edit
Info 706  [00:14:42.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 707  [00:14:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 708  [00:14:44.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 709  [00:14:45.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 710  [00:14:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 711  [00:14:48.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 712  [00:14:49.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 713  [00:14:50.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 714  [00:14:51.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 715  [00:14:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/src/project/randomFileForImport.ts]
export const x = 10;export const y = 10;

//// [/src/project/node_modules/pkg1/index.d.ts]
export interface ImportInterface1 {}


PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 716  [00:14:55.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 717  [00:14:56.000] Scheduled: /src/project/tsconfig.json
Info 718  [00:14:57.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Before running timeout callbacks

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}
/src/project/f:
  {}

Info 719  [00:14:58.000] Running: /src/project/tsconfig.json
Info 720  [00:14:59.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 721  [00:15:00.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 722  [00:15:01.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 723  [00:15:02.000] Module resolution kind is not specified, using 'NodeJs'.
Info 724  [00:15:03.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 725  [00:15:04.000] File '/src/project/node_modules/pkg1/package.json' does not exist.
Info 726  [00:15:05.000] File '/src/project/node_modules/pkg1.ts' does not exist.
Info 727  [00:15:06.000] File '/src/project/node_modules/pkg1.tsx' does not exist.
Info 728  [00:15:07.000] File '/src/project/node_modules/pkg1.d.ts' does not exist.
Info 729  [00:15:08.000] File '/src/project/node_modules/pkg1/index.ts' does not exist.
Info 730  [00:15:09.000] File '/src/project/node_modules/pkg1/index.tsx' does not exist.
Info 731  [00:15:10.000] File '/src/project/node_modules/pkg1/index.d.ts' exist - use it as a name resolution result.
Info 732  [00:15:11.000] Resolving real path for '/src/project/node_modules/pkg1/index.d.ts', result '/src/project/node_modules/pkg1/index.d.ts'.
Info 733  [00:15:12.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 734  [00:15:13.000] ======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Info 735  [00:15:14.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 736  [00:15:15.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 737  [00:15:16.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 738  [00:15:17.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 739  [00:15:18.000] ======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Info 740  [00:15:19.000] Module resolution kind is not specified, using 'NodeJs'.
Info 741  [00:15:20.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 742  [00:15:21.000] Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Info 743  [00:15:22.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 744  [00:15:23.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 745  [00:15:24.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 746  [00:15:25.000] ======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Info 747  [00:15:26.000] Module resolution kind is not specified, using 'NodeJs'.
Info 748  [00:15:27.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 749  [00:15:28.000] Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info 750  [00:15:29.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 751  [00:15:30.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 752  [00:15:31.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 753  [00:15:32.000] ======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Info 754  [00:15:33.000] Module resolution kind is not specified, using 'NodeJs'.
Info 755  [00:15:34.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 756  [00:15:35.000] Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
Info 757  [00:15:36.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 758  [00:15:37.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 759  [00:15:38.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 760  [00:15:39.000] ======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Info 761  [00:15:40.000] Module resolution kind is not specified, using 'NodeJs'.
Info 762  [00:15:41.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 763  [00:15:42.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 764  [00:15:43.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 765  [00:15:44.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 766  [00:15:45.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 767  [00:15:46.000] ======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Info 768  [00:15:47.000] Module resolution kind is not specified, using 'NodeJs'.
Info 769  [00:15:48.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 770  [00:15:49.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 771  [00:15:50.000] Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
Info 772  [00:15:51.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 773  [00:15:52.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 774  [00:15:53.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 775  [00:15:54.000] ======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info 776  [00:15:55.000] Module resolution kind is not specified, using 'NodeJs'.
Info 777  [00:15:56.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 778  [00:15:57.000] Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info 779  [00:15:58.000] Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca/caa'.
Info 780  [00:15:59.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 781  [00:16:00.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 782  [00:16:01.000] ======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Info 783  [00:16:02.000] Module resolution kind is not specified, using 'NodeJs'.
Info 784  [00:16:03.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 785  [00:16:04.000] Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info 786  [00:16:05.000] Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
Info 787  [00:16:06.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 788  [00:16:07.000] ======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info 789  [00:16:08.000] Module resolution kind is not specified, using 'NodeJs'.
Info 790  [00:16:09.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 791  [00:16:10.000] Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 792  [00:16:11.000] Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 793  [00:16:12.000] Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info 794  [00:16:13.000] Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info 795  [00:16:14.000] Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info 796  [00:16:15.000] Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info 797  [00:16:16.000] Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Info 798  [00:16:17.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 799  [00:16:18.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 800  [00:16:19.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 801  [00:16:20.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 802  [00:16:21.000] ======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info 803  [00:16:22.000] Module resolution kind is not specified, using 'NodeJs'.
Info 804  [00:16:23.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 805  [00:16:24.000] Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa/daaa'.
Info 806  [00:16:25.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 807  [00:16:26.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 808  [00:16:27.000] ======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Info 809  [00:16:28.000] Module resolution kind is not specified, using 'NodeJs'.
Info 810  [00:16:29.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 811  [00:16:30.000] Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
Info 812  [00:16:31.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 813  [00:16:32.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 814  [00:16:33.000] ======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Info 815  [00:16:34.000] Module resolution kind is not specified, using 'NodeJs'.
Info 816  [00:16:35.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 817  [00:16:36.000] Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
Info 818  [00:16:37.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 819  [00:16:38.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 820  [00:16:39.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Info 821  [00:16:40.000] Module resolution kind is not specified, using 'NodeJs'.
Info 822  [00:16:41.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 823  [00:16:42.000] Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info 824  [00:16:43.000] Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Info 825  [00:16:44.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 826  [00:16:45.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 827  [00:16:46.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 828  [00:16:47.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Info 829  [00:16:48.000] Module resolution kind is not specified, using 'NodeJs'.
Info 830  [00:16:49.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 831  [00:16:50.000] Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info 832  [00:16:51.000] Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
Info 833  [00:16:52.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 834  [00:16:53.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 835  [00:16:54.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info 836  [00:16:55.000] Module resolution kind is not specified, using 'NodeJs'.
Info 837  [00:16:56.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 838  [00:16:57.000] Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info 839  [00:16:58.000] Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
Info 840  [00:16:59.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 841  [00:17:00.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Info 842  [00:17:01.000] Module resolution kind is not specified, using 'NodeJs'.
Info 843  [00:17:02.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 844  [00:17:03.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 845  [00:17:04.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 846  [00:17:05.000] Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Info 847  [00:17:06.000] Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa/eaaa'.
Info 848  [00:17:07.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 849  [00:17:08.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 850  [00:17:09.000] ======== Resolving module 'pkg1' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Info 851  [00:17:10.000] Module resolution kind is not specified, using 'NodeJs'.
Info 852  [00:17:11.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 853  [00:17:12.000] Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 854  [00:17:13.000] Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 855  [00:17:14.000] Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Info 856  [00:17:15.000] Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Info 857  [00:17:16.000] Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Info 858  [00:17:17.000] Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Info 859  [00:17:18.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 860  [00:17:19.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 861  [00:17:20.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 862  [00:17:21.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 863  [00:17:22.000] ======== Resolving module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Info 864  [00:17:23.000] Module resolution kind is not specified, using 'NodeJs'.
Info 865  [00:17:24.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 866  [00:17:25.000] Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Info 867  [00:17:26.000] Resolution for module 'pkg1' was found in cache from location '/src/project/f/fa/faa'.
Info 868  [00:17:27.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Info 869  [00:17:28.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 870  [00:17:29.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 871  [00:17:30.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 872  [00:17:31.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 873  [00:17:32.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 874  [00:17:33.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 875  [00:17:34.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 876  [00:17:35.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 877  [00:17:36.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 878  [00:17:37.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 879  [00:17:38.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 880  [00:17:39.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 881  [00:17:40.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 882  [00:17:41.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 883  [00:17:42.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 14 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 884  [00:17:43.000] Project '/src/project/tsconfig.json' (Configured)
Info 885  [00:17:44.000] 	Files (22)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/node_modules/pkg1/index.d.ts
	/src/project/fileWithImports.ts
	/src/project/randomFileForImport.ts
	/src/project/a/fileWithImports.ts
	/src/project/b/ba/fileWithImports.ts
	/src/project/b/randomFileForImport.ts
	/src/project/c/ca/fileWithImports.ts
	/src/project/c/ca/caa/randomFileForImport.ts
	/src/project/c/ca/caa/caaa/fileWithImports.ts
	/src/project/c/cb/fileWithImports.ts
	/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
	/src/project/d/da/daa/daaa/fileWithImports.ts
	/src/project/d/da/daa/fileWithImports.ts
	/src/project/d/da/fileWithImports.ts
	/src/project/e/ea/fileWithImports.ts
	/src/project/e/ea/eaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	/src/project/f/fa/faa/x/y/z/randomFileForImport.ts
	/src/project/f/fa/faa/faaa/fileWithImports.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	  Imported via "pkg0" from file 'a/fileWithImports.ts'
	  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
	  Imported via "pkg0" from file 'b/randomFileForImport.ts'
	  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/caa/randomFileForImport.ts'
	  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg0" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
	node_modules/pkg1/index.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts'
	  Imported via "pkg1" from file 'randomFileForImport.ts'
	  Imported via "pkg1" from file 'a/fileWithImports.ts'
	  Imported via "pkg1" from file 'b/ba/fileWithImports.ts'
	  Imported via "pkg1" from file 'b/randomFileForImport.ts'
	  Imported via "pkg1" from file 'c/ca/fileWithImports.ts'
	  Imported via "pkg1" from file 'c/ca/caa/randomFileForImport.ts'
	  Imported via "pkg1" from file 'c/ca/caa/caaa/fileWithImports.ts'
	  Imported via "pkg1" from file 'c/cb/fileWithImports.ts'
	  Imported via "pkg1" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg1" from file 'd/da/daa/daaa/fileWithImports.ts'
	  Imported via "pkg1" from file 'd/da/daa/fileWithImports.ts'
	  Imported via "pkg1" from file 'd/da/fileWithImports.ts'
	  Imported via "pkg1" from file 'e/ea/fileWithImports.ts'
	  Imported via "pkg1" from file 'e/ea/eaa/fileWithImports.ts'
	  Imported via "pkg1" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
	  Imported via "pkg1" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg1" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg1" from file 'f/fa/faa/faaa/fileWithImports.ts'
	fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	a/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/ba/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/caaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/cb/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	f/fa/faa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	f/fa/faa/faaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json

Info 886  [00:17:45.000] -----------------------------------------------
Info 887  [00:17:46.000] Running: *ensureProjectForOpenFiles*
Info 888  [00:17:47.000] Before ensureProjectForOpenFiles:
Info 889  [00:17:48.000] Project '/src/project/tsconfig.json' (Configured)
Info 889  [00:17:49.000] 	Files (22)

Info 889  [00:17:50.000] -----------------------------------------------
Info 889  [00:17:51.000] Open files: 
Info 889  [00:17:52.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 889  [00:17:53.000] 		Projects: /src/project/tsconfig.json
Info 889  [00:17:54.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 889  [00:17:55.000] 		Projects: /src/project/tsconfig.json
Info 889  [00:17:56.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 889  [00:17:57.000] 		Projects: /src/project/tsconfig.json
Info 889  [00:17:58.000] 	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 889  [00:17:59.000] 		Projects: /src/project/tsconfig.json
Info 889  [00:18:00.000] 	FileName: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 889  [00:18:01.000] 		Projects: /src/project/tsconfig.json
Info 889  [00:18:02.000] After ensureProjectForOpenFiles:
Info 890  [00:18:03.000] Project '/src/project/tsconfig.json' (Configured)
Info 890  [00:18:04.000] 	Files (22)

Info 890  [00:18:05.000] -----------------------------------------------
Info 890  [00:18:06.000] Open files: 
Info 890  [00:18:07.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 890  [00:18:08.000] 		Projects: /src/project/tsconfig.json
Info 890  [00:18:09.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 890  [00:18:10.000] 		Projects: /src/project/tsconfig.json
Info 890  [00:18:11.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 890  [00:18:12.000] 		Projects: /src/project/tsconfig.json
Info 890  [00:18:13.000] 	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 890  [00:18:14.000] 		Projects: /src/project/tsconfig.json
Info 890  [00:18:15.000] 	FileName: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 890  [00:18:16.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
