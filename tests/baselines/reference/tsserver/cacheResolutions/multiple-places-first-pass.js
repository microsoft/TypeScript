Info 0    [00:02:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:02:06.000] request:
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
import type { ImportInterface0 } from "pkg0";
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

Info 2    [00:02:07.000] Search path: /src/project
Info 3    [00:02:08.000] For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:02:09.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:02:10.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:02:11.000] Config: /src/project/tsconfig.json : {
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
Info 7    [00:02:12.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 8    [00:02:13.000] FileWatcher:: Added:: WatchInfo: /src/project/a/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 9    [00:02:14.000] FileWatcher:: Added:: WatchInfo: /src/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 10   [00:02:15.000] FileWatcher:: Added:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 11   [00:02:16.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 12   [00:02:17.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 13   [00:02:18.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/caaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 14   [00:02:19.000] FileWatcher:: Added:: WatchInfo: /src/project/c/cb/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 15   [00:02:20.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 16   [00:02:21.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 17   [00:02:22.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 18   [00:02:23.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 19   [00:02:24.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 20   [00:02:25.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 21   [00:02:26.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 22   [00:02:27.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 23   [00:02:28.000] FileWatcher:: Added:: WatchInfo: /src/project/f/fa/faa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 24   [00:02:29.000] FileWatcher:: Added:: WatchInfo: /src/project/f/fa/faa/faaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 25   [00:02:30.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 26   [00:02:31.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 27   [00:02:32.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 28   [00:02:33.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 29   [00:02:34.000] Module resolution kind is not specified, using 'NodeJs'.
Info 30   [00:02:35.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 31   [00:02:36.000] File '/src/project/node_modules/pkg1.ts' does not exist.
Info 32   [00:02:37.000] File '/src/project/node_modules/pkg1.tsx' does not exist.
Info 33   [00:02:38.000] File '/src/project/node_modules/pkg1.d.ts' does not exist.
Info 34   [00:02:39.000] Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Info 35   [00:02:40.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 36   [00:02:41.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 37   [00:02:42.000] Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
Info 38   [00:02:43.000] File '/src/project/node_modules/pkg1.js' does not exist.
Info 39   [00:02:44.000] File '/src/project/node_modules/pkg1.jsx' does not exist.
Info 40   [00:02:45.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 41   [00:02:46.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 42   [00:02:47.000] ======== Module name 'pkg1' was not resolved. ========
Info 43   [00:02:48.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 44   [00:02:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 45   [00:02:50.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 46   [00:02:51.000] ======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Info 47   [00:02:52.000] Module resolution kind is not specified, using 'NodeJs'.
Info 48   [00:02:53.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 49   [00:02:54.000] Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Info 50   [00:02:55.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 51   [00:02:56.000] ======== Module name 'pkg1' was not resolved. ========
Info 52   [00:02:57.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 53   [00:02:58.000] ======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Info 54   [00:02:59.000] Module resolution kind is not specified, using 'NodeJs'.
Info 55   [00:03:00.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 56   [00:03:01.000] Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info 57   [00:03:02.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 58   [00:03:03.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 59   [00:03:04.000] ======== Module name 'pkg1' was not resolved. ========
Info 60   [00:03:05.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 61   [00:03:06.000] ======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Info 62   [00:03:07.000] Module resolution kind is not specified, using 'NodeJs'.
Info 63   [00:03:08.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 64   [00:03:09.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 65   [00:03:10.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 66   [00:03:11.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 67   [00:03:12.000] ======== Module name 'pkg1' was not resolved. ========
Info 68   [00:03:13.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 69   [00:03:14.000] ======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info 70   [00:03:15.000] Module resolution kind is not specified, using 'NodeJs'.
Info 71   [00:03:16.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 72   [00:03:17.000] Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info 73   [00:03:18.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 74   [00:03:19.000] Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
Info 75   [00:03:20.000] ======== Module name 'pkg1' was not resolved. ========
Info 76   [00:03:21.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 77   [00:03:22.000] ======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Info 78   [00:03:23.000] Module resolution kind is not specified, using 'NodeJs'.
Info 79   [00:03:24.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 80   [00:03:25.000] Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info 81   [00:03:26.000] Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
Info 82   [00:03:27.000] ======== Module name 'pkg1' was not resolved. ========
Info 83   [00:03:28.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info 84   [00:03:29.000] Module resolution kind is not specified, using 'NodeJs'.
Info 85   [00:03:30.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 86   [00:03:31.000] Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 87   [00:03:32.000] Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 88   [00:03:33.000] Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info 89   [00:03:34.000] Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa/daaa'.
Info 90   [00:03:35.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 91   [00:03:36.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 92   [00:03:37.000] ======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info 93   [00:03:38.000] Module resolution kind is not specified, using 'NodeJs'.
Info 94   [00:03:39.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 95   [00:03:40.000] Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info 96   [00:03:41.000] Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info 97   [00:03:42.000] Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info 98   [00:03:43.000] Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Info 99   [00:03:44.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 100  [00:03:45.000] ======== Module name 'pkg1' was not resolved. ========
Info 101  [00:03:46.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 102  [00:03:47.000] ======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Info 103  [00:03:48.000] Module resolution kind is not specified, using 'NodeJs'.
Info 104  [00:03:49.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 105  [00:03:50.000] Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
Info 106  [00:03:51.000] ======== Module name 'pkg1' was not resolved. ========
Info 107  [00:03:52.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 108  [00:03:53.000] ======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Info 109  [00:03:54.000] Module resolution kind is not specified, using 'NodeJs'.
Info 110  [00:03:55.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 111  [00:03:56.000] Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
Info 112  [00:03:57.000] ======== Module name 'pkg1' was not resolved. ========
Info 113  [00:03:58.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 114  [00:03:59.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Info 115  [00:04:00.000] Module resolution kind is not specified, using 'NodeJs'.
Info 116  [00:04:01.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 117  [00:04:02.000] Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info 118  [00:04:03.000] Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Info 119  [00:04:04.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 120  [00:04:05.000] ======== Module name 'pkg1' was not resolved. ========
Info 121  [00:04:06.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 122  [00:04:07.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Info 123  [00:04:08.000] Module resolution kind is not specified, using 'NodeJs'.
Info 124  [00:04:09.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 125  [00:04:10.000] Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info 126  [00:04:11.000] Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
Info 127  [00:04:12.000] ======== Module name 'pkg1' was not resolved. ========
Info 128  [00:04:13.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 129  [00:04:14.000] ======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info 130  [00:04:15.000] Module resolution kind is not specified, using 'NodeJs'.
Info 131  [00:04:16.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 132  [00:04:17.000] Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info 133  [00:04:18.000] Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
Info 134  [00:04:19.000] ======== Module name 'pkg1' was not resolved. ========
Info 135  [00:04:20.000] Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' found in cache from location '/src/project/f/fa/faa/faaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 136  [00:04:21.000] ======== Resolving module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Info 137  [00:04:22.000] Module resolution kind is not specified, using 'NodeJs'.
Info 138  [00:04:23.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 139  [00:04:24.000] Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Info 140  [00:04:25.000] Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Info 141  [00:04:26.000] Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Info 142  [00:04:27.000] Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Info 143  [00:04:28.000] Resolution for module 'pkg1' was found in cache from location '/src/project'.
Info 144  [00:04:29.000] ======== Module name 'pkg1' was not resolved. ========
Info 145  [00:04:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 146  [00:04:31.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 147  [00:04:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 148  [00:04:33.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 149  [00:04:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 150  [00:04:35.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 151  [00:04:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 152  [00:04:37.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 153  [00:04:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 154  [00:04:39.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 155  [00:04:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 156  [00:04:41.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 157  [00:04:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 158  [00:04:43.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 159  [00:04:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 160  [00:04:45.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 161  [00:04:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 162  [00:04:47.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 163  [00:04:48.000] Project '/src/project/tsconfig.json' (Configured)
Info 164  [00:04:49.000] 	Files (21)
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
	  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
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

Info 165  [00:04:50.000] -----------------------------------------------
Info 166  [00:04:51.000] Search path: /src/project
Info 167  [00:04:52.000] For info: /src/project/tsconfig.json :: No config files found.
Info 168  [00:04:53.000] Project '/src/project/tsconfig.json' (Configured)
Info 168  [00:04:54.000] 	Files (21)

Info 168  [00:04:55.000] -----------------------------------------------
Info 168  [00:04:56.000] Open files: 
Info 168  [00:04:57.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 168  [00:04:58.000] 		Projects: /src/project/tsconfig.json
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

Info 168  [00:04:59.000] response:
    {
      "responseRequired": false
    }