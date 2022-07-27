Input::
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
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[20,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[1]],[27,[1]],[28,[1]]]}},"version":"FakeTSVersion"}

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
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./f/fa/faa/faaa/filewithimports.ts",
        "Full"
      ],
      [
        "./f/fa/faa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
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
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6046
}


/a/lib/tsc.js -w --explainFiles
Output::
======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg0/package.json' does not exist.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/c'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg0' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m


>> Screen clear
[[90m12:02:02 AM[0m] Starting compilation in watch mode...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' found in cache from location '/src/project/f/fa/faa/faaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:03:22 AM[0m] Found 13 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
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

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[1]],[27,[1]],[28,[1]]]}},"version":"FakeTSVersion"}

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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
    "exportedModulesMap": {},
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
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6859
}

//// [/src/project/a/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/a/fileWithImports.d.ts]
export {};


//// [/src/project/b/ba/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/b/ba/fileWithImports.d.ts]
export {};


//// [/src/project/b/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/b/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/caa/caaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/c/ca/caa/caaa/fileWithImports.d.ts]
export {};


//// [/src/project/c/ca/caa/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/c/ca/caa/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/c/ca/fileWithImports.d.ts]
export {};


//// [/src/project/c/cb/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/c/cb/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/daaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/daa/daaa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/d/da/daa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/daa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/e/ea/eaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/eaa/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/fileWithImports.d.ts]
export {};


//// [/src/project/f/fa/faa/faaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/f/fa/faa/faaa/fileWithImports.d.ts]
export {};


//// [/src/project/f/fa/faa/x/y/z/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/f/fa/faa/x/y/z/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/fileWithImports.d.ts]
export {};


//// [/src/project/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;



Change:: modify randomFileForImport by adding import

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:03:28 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg0/package.json' does not exist.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
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
[[90m12:03:35 AM[0m] Found 13 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[1]],[27,[1]],[28,[1]]]}},"version":"FakeTSVersion"}

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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6913
}

//// [/src/project/randomFileForImport.js] file written with same contents

Change:: modify b/randomFileForImport by adding import

Input::
//// [/src/project/b/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:03:41 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
  Imported via "pkg0" from file 'a/fileWithImports.ts'
  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'b/randomFileForImport.ts'
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
[[90m12:03:48 AM[0m] Found 13 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/b/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/b/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[1]],[27,[1]],[28,[1]]]}},"version":"FakeTSVersion"}

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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6967
}

//// [/src/project/b/randomFileForImport.js] file written with same contents

Change:: modify c/ca/caa/randomFileForImport by adding import

Input::
//// [/src/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:03:54 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:04:01 AM[0m] Found 13 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/c/ca/caa/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/c/ca/caa/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[1]],[27,[1]],[28,[1]]]}},"version":"FakeTSVersion"}

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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 7021
}

//// [/src/project/c/ca/caa/randomFileForImport.js] file written with same contents

Change:: modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import

Input::
//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:04:08 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:04:15 AM[0m] Found 13 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[1]],[28,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 7161
}

//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.js] file written with same contents

Change:: modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import

Input::
//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:04:21 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:04:28 AM[0m] Found 13 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2],[1,3]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[3]],[28,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 7301
}

//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js] file written with same contents

Change:: modify randomFileForImport by adding unresolved import

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:04:34 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:04:41 AM[0m] Found 14 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2],[1,3]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[3]],[28,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 7518
}

//// [/src/project/randomFileForImport.js] file written with same contents

Change:: modify b/randomFileForImport by adding unresolved import

Input::
//// [/src/project/b/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:04:47 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:04:54 AM[0m] Found 15 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/b/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/b/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2],[1,3]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[3]],[28,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 7737
}

//// [/src/project/b/randomFileForImport.js] file written with same contents

Change:: modify c/ca/caa/randomFileForImport by adding unresolved import

Input::
//// [/src/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:05:01 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:05:08 AM[0m] Found 16 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/c/ca/caa/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/c/ca/caa/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[9,[{"file":"./c/ca/caa/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2],[1,3]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[3]],[28,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./c/ca/caa/randomfileforimport.ts",
        [
          {
            "file": "./c/ca/caa/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 7963
}

//// [/src/project/c/ca/caa/randomFileForImport.js] file written with same contents

Change:: modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import

Input::
//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:05:14 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:05:21 AM[0m] Found 17 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[9,[{"file":"./c/ca/caa/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[12,[{"file":"./d/da/daa/daaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2],[1,3]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[3]],[28,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./c/ca/caa/randomfileforimport.ts",
        [
          {
            "file": "./c/ca/caa/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 8200
}

//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.js] file written with same contents

Change:: modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import

Input::
//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:05:27 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:05:34 AM[0m] Found 18 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[9,[{"file":"./c/ca/caa/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[12,[{"file":"./d/da/daa/daaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[19,[{"file":"./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2],[1,3]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[3]],[28,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./c/ca/caa/randomfileforimport.ts",
        [
          {
            "file": "./c/ca/caa/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 8437
}

//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js] file written with same contents

Change:: modify f/fa/faa/x/y/z/randomFileForImport by adding import

Input::
//// [/src/project/f/fa/faa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:05:40 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:05:47 AM[0m] Found 18 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/f/fa/faa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[20,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[9,[{"file":"./c/ca/caa/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[12,[{"file":"./d/da/daa/daaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[19,[{"file":"./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],20,[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2],[1,3],[1,4]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[3]],[28,[4]],[29,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
      "./f/fa/faa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./c/ca/caa/randomfileforimport.ts",
        [
          {
            "file": "./c/ca/caa/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 4,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 4,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 4,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 8599
}

//// [/src/project/f/fa/faa/x/y/z/randomFileForImport.js] file written with same contents

Change:: modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import

Input::
//// [/src/project/f/fa/faa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:05:54 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:06:01 AM[0m] Found 19 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
/src/project/f/fa/faa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/src/project/node_modules:
  {"directoryName":"/src/project/node_modules"}
/src/project/a:
  {"directoryName":"/src/project/a"}
/src/project/b:
  {"directoryName":"/src/project/b"}
/src/project/c:
  {"directoryName":"/src/project/c"}
/src/project/d:
  {"directoryName":"/src/project/d"}
/src/project/e:
  {"directoryName":"/src/project/e"}
/src/project/f:
  {"directoryName":"/src/project/f"}

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[20,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[9,[{"file":"./c/ca/caa/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[12,[{"file":"./d/da/daa/daaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[19,[{"file":"./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[21,[{"file":"./f/fa/faa/faaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[20,[{"file":"./f/fa/faa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1],[1,2],[1,3],[1,4]],"modules":[[22,[1]],[23,[1]],[24,[1]],[25,[1]],[26,[2]],[27,[3]],[28,[4]],[29,[1]]]}},"version":"FakeTSVersion"}

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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
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
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
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
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
      "./f/fa/faa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
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
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./c/ca/caa/randomfileforimport.ts",
        [
          {
            "file": "./c/ca/caa/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./f/fa/faa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./f/fa/faa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
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
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 4,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 4,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 4,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 8831
}

//// [/src/project/f/fa/faa/x/y/z/randomFileForImport.js] file written with same contents

Change:: add file for unresolved import and random edit

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;export const y = 10;

//// [/src/project/node_modules/pkg1/index.d.ts]
export interface ImportInterface1 {}


Output::
>> Screen clear
[[90m12:06:11 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1/package.json' does not exist.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
File '/src/project/node_modules/pkg1/index.ts' does not exist.
File '/src/project/node_modules/pkg1/index.tsx' does not exist.
File '/src/project/node_modules/pkg1/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg1/index.d.ts', result '/src/project/node_modules/pkg1/index.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca/caa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa/daaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa/eaaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/f/fa/faa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
../../a/lib/lib.d.ts
  Default library for target 'es3'
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
[[90m12:07:15 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","/src/project/f/fa/faa/faaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
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

Semantic diagnostics in builder refreshed for::
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

Shape signatures in builder refreshed for::
/src/project/node_modules/pkg1/index.d.ts (used version)
/src/project/f/fa/faa/faaa/filewithimports.ts (computed .d.ts)
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts (computed .d.ts)
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts (computed .d.ts)
/src/project/e/ea/eaa/eaaa/filewithimports.ts (computed .d.ts)
/src/project/e/ea/eaa/filewithimports.ts (computed .d.ts)
/src/project/e/ea/filewithimports.ts (computed .d.ts)
/src/project/d/da/filewithimports.ts (computed .d.ts)
/src/project/d/da/daa/filewithimports.ts (computed .d.ts)
/src/project/d/da/daa/daaa/filewithimports.ts (computed .d.ts)
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts (computed .d.ts)
/src/project/c/cb/filewithimports.ts (computed .d.ts)
/src/project/c/ca/caa/caaa/filewithimports.ts (computed .d.ts)
/src/project/c/ca/caa/randomfileforimport.ts (computed .d.ts)
/src/project/c/ca/filewithimports.ts (computed .d.ts)
/src/project/b/randomfileforimport.ts (computed .d.ts)
/src/project/b/ba/filewithimports.ts (computed .d.ts)
/src/project/a/filewithimports.ts (computed .d.ts)
/src/project/randomfileforimport.ts (computed .d.ts)
/src/project/filewithimports.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg0/index.d.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/x/y/z/randomfileforimport.ts:
  {"fileName":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","pollingInterval":250}
/src/project/f/fa/faa/faaa/filewithimports.ts:
  {"fileName":"/src/project/f/fa/faa/faaa/fileWithImports.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/src/project/node_modules/@types:
  {"fileName":"/src/project/node_modules/@types","pollingInterval":500}
/src/project/node_modules/pkg1/index.d.ts:
  {"fileName":"/src/project/node_modules/pkg1/index.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./node_modules/pkg1/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./f/fa/faa/x/y/z/randomfileforimport.ts","./f/fa/faa/faaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z","./f/fa/faa/x/y/z","./f/fa/faa/faaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","769987405-export interface ImportInterface1 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"12644527452-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;","signature":"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3]],"referencedMap":[[6,1],[7,1],[8,1],[11,1],[10,1],[9,1],[12,1],[14,1],[13,1],[15,1],[16,1],[19,1],[20,1],[18,1],[17,1],[22,1],[21,1],[4,1],[5,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,6,7,8,11,10,9,12,14,13,15,16,19,20,18,17,22,21,4,2,3,5],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":3,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0","pkg1"],"resolutionEntries":[[1,1],[2,2],[1,3],[1,4],[1,5]],"modules":[[23,[1,2]],[24,[1,2]],[25,[1,2]],[26,[1,2]],[27,[2,3]],[28,[2,4]],[29,[2,5]],[30,[1,2]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./node_modules/pkg1/index.d.ts",
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
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z",
      "./f/fa/faa/x/y/z",
      "./f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./node_modules/pkg1/index.d.ts": {
        "version": "769987405-export interface ImportInterface1 {}",
        "signature": "769987405-export interface ImportInterface1 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "12644527452-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;",
        "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./f/fa/faa/faaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./f/fa/faa/faaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./f/fa/faa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./f/fa/faa/faaa/filewithimports.ts",
      "./f/fa/faa/x/y/z/randomfileforimport.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./node_modules/pkg1/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 4,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 5,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg1"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg1",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 4,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 5,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg0",
              {
                "id": 4,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/x/y/z",
          [
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg0",
              {
                "id": 5,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./f/fa/faa/faaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5747
}

//// [/src/project/a/fileWithImports.js] file written with same contents
//// [/src/project/b/ba/fileWithImports.js] file written with same contents
//// [/src/project/b/randomFileForImport.js] file written with same contents
//// [/src/project/c/ca/caa/caaa/fileWithImports.js] file written with same contents
//// [/src/project/c/ca/caa/randomFileForImport.js] file written with same contents
//// [/src/project/c/ca/fileWithImports.js] file written with same contents
//// [/src/project/c/cb/fileWithImports.js] file written with same contents
//// [/src/project/d/da/daa/daaa/fileWithImports.js] file written with same contents
//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.js] file written with same contents
//// [/src/project/d/da/daa/fileWithImports.js] file written with same contents
//// [/src/project/d/da/fileWithImports.js] file written with same contents
//// [/src/project/e/ea/eaa/eaaa/fileWithImports.js] file written with same contents
//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js] file written with same contents
//// [/src/project/e/ea/eaa/fileWithImports.js] file written with same contents
//// [/src/project/e/ea/fileWithImports.js] file written with same contents
//// [/src/project/f/fa/faa/faaa/fileWithImports.js] file written with same contents
//// [/src/project/f/fa/faa/x/y/z/randomFileForImport.js] file written with same contents
//// [/src/project/fileWithImports.js] file written with same contents
//// [/src/project/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.y = exports.x = void 0;
exports.x = 10;
exports.y = 10;


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;
export declare const y = 10;


