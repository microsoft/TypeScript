Input::
//// [/lib/lib.es2016.full.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0"}

//// [/src/projects/project/src/a/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/b/ba/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/b/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/caa/caaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/caa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/cb/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/daaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/f/fa/faa/faaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/src/projects/project/src/fileB.mts]
export function foo() {}

//// [/src/projects/project/src/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/tsconfig.json]
{"compilerOptions":{"target":"es2016","composite":true,"module":"node16","outDir":"../out","cacheResolutions":true,"traceResolution":true},"files":["fileA.ts","fileB.mts","randomFile.ts","a/randomFile.ts","b/ba/randomFile.ts","b/randomFile.ts","c/ca/randomFile.ts","c/ca/caa/randomFile.ts","c/ca/caa/caaa/randomFile.ts","c/cb/randomFile.ts","d/da/daa/daaa/x/y/z/randomFile.ts","d/da/daa/daaa/randomFile.ts","d/da/daa/randomFile.ts","d/da/randomFile.ts","e/ea/randomFile.ts","e/ea/eaa/randomFile.ts","e/ea/eaa/eaaa/randomFile.ts","e/ea/eaa/eaaa/x/y/z/randomFile.ts","f/fa/faa/x/y/z/randomFile.ts","f/fa/faa/faaa/randomFile.ts"]}



Output::
/lib/tsc --b /src/projects/project/src --explainFiles
File '/src/projects/project/src/package.json' does not exist.
Found 'package.json' at '/src/projects/project/package.json'.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'node', 'require', 'types'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/a/package.json' does not exist.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/c/cb/package.json' does not exist.
Directory '/src/projects/project/src/c' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
Directory '/src/projects/project/src/f/fa/faa' resolves to '/src/projects/project/package.json' scope according to cache.
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/projects/project/src/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/src/projects/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/projects/project/src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/projects/project/src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/projects/project/src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.es2016.full.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/lib/package.json",
    "/package.json"
  ]
}

File: /src/projects/project/src/fileA.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}
resolvedModules:
./fileB.mjs: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/projects/project/src/fileB.mts",
    "extension": ".mts",
    "isExternalLibraryImport": false
  }
}

File: /src/projects/project/src/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/a/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/ba/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/cb/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}


//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts","../src/a","../package.json","../src/b/ba","../src/c/ca/caa/caaa","../src/c/cb","../src/d/da/daa/daaa/x/y/z","../src/e/ea/eaa/eaaa/x/y/z","../src/f/fa/faa/x/y/z","../src/f/fa/faa/faaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,[3,[{"file":"../src/filea.ts","start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"messageText":"To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/src/projects/project/package.json'.","category":3,"code":1481}]}}]],2,4],"affectedFilesPendingEmit":[5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,2,4],"emitSignatures":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"cacheResolutions":{"resolutions":[{"resolvedModule":23}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,1]],"modules":[[22,[1]]],"packageJsons":[[24,25],[26,25],[27,25],[28,25],[29,25],[30,25],[31,25],[32,25]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts",
      "../src/a",
      "../package.json",
      "../src/b/ba",
      "../src/c/ca/caa/caaa",
      "../src/c/cb",
      "../src/d/da/daa/daaa/x/y/z",
      "../src/e/ea/eaa/eaaa/x/y/z",
      "../src/f/fa/faa/x/y/z",
      "../src/f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "original": {
          "version": "3524703962-export function foo() {}",
          "impliedFormat": 99
        },
        "version": "3524703962-export function foo() {}",
        "signature": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "original": {
          "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
          "impliedFormat": 1
        },
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "code": 1479,
            "category": 1,
            "messageText": {
              "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
              "category": 1,
              "code": 1479,
              "next": [
                {
                  "messageText": "To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/src/projects/project/package.json'.",
                  "category": 3,
                  "code": 1481
                }
              ]
            }
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/a/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/b/ba/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/b/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/caa/caaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/caa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/cb/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/daaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/f/fa/faa/faaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/filea.ts",
        "Js | Dts"
      ],
      [
        "../src/fileb.mts",
        "Js | Dts"
      ],
      [
        "../src/randomfile.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 23
          },
          "resolutionId": 1,
          "resolvedModule": "../src/fileB.mts"
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./fileB.mjs",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../src/fileB.mts"
          },
          "mode": "commonjs"
        }
      ],
      "modules": [
        {
          "dir": "../src",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./fileB.mjs",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../src/fileB.mts"
              },
              "mode": "commonjs"
            }
          ]
        }
      ],
      "packageJsons": [
        [
          "../src/a",
          "../package.json"
        ],
        [
          "../src/b/ba",
          "../package.json"
        ],
        [
          "../src/c/ca/caa/caaa",
          "../package.json"
        ],
        [
          "../src/c/cb",
          "../package.json"
        ],
        [
          "../src/d/da/daa/daaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/e/ea/eaa/eaaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/faaa",
          "../package.json"
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3991
}



Change:: random edit
Input::
//// [/src/projects/project/src/randomFile.ts]
export const x = 10;export const y = 10;



Output::
/lib/tsc --b /src/projects/project/src --explainFiles
Found 'package.json' at '/src/projects/project/package.json'.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Reusing resolution of module './fileB.mjs' from '/src/projects/project/src/fileA.ts' found in cache from location '/src/projects/project/src', it was successfully resolved to '/src/projects/project/src/fileB.mts'.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/projects/project/src/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/src/projects/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/projects/project/src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/projects/project/src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/projects/project/src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.es2016.full.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/lib/package.json",
    "/package.json"
  ]
}

File: /src/projects/project/src/fileA.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}
resolvedModules:
./fileB.mjs: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/projects/project/src/fileB.mts",
    "isExternalLibraryImport": false,
    "extension": ".mts"
  }
}

File: /src/projects/project/src/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/a/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/ba/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/cb/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}


//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts","../src/a","../package.json","../src/b/ba","../src/c/ca/caa/caaa","../src/c/cb","../src/d/da/daa/daaa/x/y/z","../src/e/ea/eaa/eaaa/x/y/z","../src/f/fa/faa/x/y/z","../src/f/fa/faa/faaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","impliedFormat":1},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,[3,[{"file":"../src/filea.ts","start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"messageText":"To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/src/projects/project/package.json'.","category":3,"code":1481}]}}]],2,4],"affectedFilesPendingEmit":[5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,2,4],"emitSignatures":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"cacheResolutions":{"resolutions":[{"resolvedModule":23}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,1]],"modules":[[22,[1]]],"packageJsons":[[24,25],[26,25],[27,25],[28,25],[29,25],[30,25],[31,25],[32,25]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts",
      "../src/a",
      "../package.json",
      "../src/b/ba",
      "../src/c/ca/caa/caaa",
      "../src/c/cb",
      "../src/d/da/daa/daaa/x/y/z",
      "../src/e/ea/eaa/eaaa/x/y/z",
      "../src/f/fa/faa/x/y/z",
      "../src/f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "original": {
          "version": "3524703962-export function foo() {}",
          "impliedFormat": 99
        },
        "version": "3524703962-export function foo() {}",
        "signature": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "original": {
          "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
          "impliedFormat": 1
        },
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "original": {
          "version": "-9547279430-export const x = 10;export const y = 10;",
          "signature": "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "code": 1479,
            "category": 1,
            "messageText": {
              "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
              "category": 1,
              "code": 1479,
              "next": [
                {
                  "messageText": "To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/src/projects/project/package.json'.",
                  "category": 3,
                  "code": 1481
                }
              ]
            }
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/a/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/b/ba/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/b/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/caa/caaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/caa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/cb/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/daaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/f/fa/faa/faaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/filea.ts",
        "Js | Dts"
      ],
      [
        "../src/fileb.mts",
        "Js | Dts"
      ],
      [
        "../src/randomfile.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 23
          },
          "resolutionId": 1,
          "resolvedModule": "../src/fileB.mts"
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./fileB.mjs",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../src/fileB.mts"
          },
          "mode": "commonjs"
        }
      ],
      "modules": [
        {
          "dir": "../src",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./fileB.mjs",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../src/fileB.mts"
              },
              "mode": "commonjs"
            }
          ]
        }
      ],
      "packageJsons": [
        [
          "../src/a",
          "../package.json"
        ],
        [
          "../src/b/ba",
          "../package.json"
        ],
        [
          "../src/c/ca/caa/caaa",
          "../package.json"
        ],
        [
          "../src/c/cb",
          "../package.json"
        ],
        [
          "../src/d/da/daa/daaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/e/ea/eaa/eaaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/faaa",
          "../package.json"
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4101
}



Change:: Modify package json file to add type module
Input::
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}



Output::
/lib/tsc --b /src/projects/project/src --explainFiles
Found 'package.json' at '/src/projects/project/package.json'.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'node', 'import', 'types'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/projects/project/src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/projects/project/src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/projects/project/src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
exitCode:: ExitStatus.Success
File: /lib/lib.es2016.full.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/lib/package.json",
    "/package.json"
  ]
}

File: /src/projects/project/src/fileA.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}
resolvedModules:
./fileB.mjs: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/projects/project/src/fileB.mts",
    "extension": ".mts",
    "isExternalLibraryImport": false
  }
}

File: /src/projects/project/src/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/a/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/ba/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/cb/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}


//// [/src/projects/project/out/a/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/a/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/b/ba/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/b/ba/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/b/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/b/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/c/ca/caa/caaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/c/ca/caa/caaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/c/ca/caa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/c/ca/caa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/c/ca/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/c/ca/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/c/cb/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/c/cb/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/d/da/daa/daaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/d/da/daa/daaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/d/da/daa/daaa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/d/da/daa/daaa/x/y/z/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/d/da/daa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/d/da/daa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/d/da/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/d/da/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/e/ea/eaa/eaaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/e/ea/eaa/eaaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/e/ea/eaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/e/ea/eaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/e/ea/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/e/ea/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/f/fa/faa/faaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/f/fa/faa/faaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/f/fa/faa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/f/fa/faa/x/y/z/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/fileA.d.ts]
export {};


//// [/src/projects/project/out/fileA.js]
import { foo } from "./fileB.mjs";
foo();


//// [/src/projects/project/out/fileB.d.mts]
export declare function foo(): void;


//// [/src/projects/project/out/fileB.mjs]
export function foo() { }


//// [/src/projects/project/out/randomFile.d.ts]
export declare const x = 10;
export declare const y = 10;


//// [/src/projects/project/out/randomFile.js]
export const x = 10;
export const y = 10;


//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts","../src/a","../package.json","../src/b/ba","../src/c/ca/caa/caaa","../src/c/cb","../src/d/da/daa/daaa/x/y/z","../src/e/ea/eaa/eaaa/x/y/z","../src/f/fa/faa/x/y/z","../src/f/fa/faa/faaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-6972466928-export declare function foo(): void;\r\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-4882119183-export {};\r\n","impliedFormat":99},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,2,4],"latestChangedDtsFile":"./randomFile.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":23}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,99]],"modules":[[22,[1]]],"packageJsons":[[24,25],[26,25],[27,25],[28,25],[29,25],[30,25],[31,25],[32,25]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts",
      "../src/a",
      "../package.json",
      "../src/b/ba",
      "../src/c/ca/caa/caaa",
      "../src/c/cb",
      "../src/d/da/daa/daaa/x/y/z",
      "../src/e/ea/eaa/eaaa/x/y/z",
      "../src/f/fa/faa/x/y/z",
      "../src/f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "original": {
          "version": "3524703962-export function foo() {}",
          "signature": "-6972466928-export declare function foo(): void;\r\n",
          "impliedFormat": 99
        },
        "version": "3524703962-export function foo() {}",
        "signature": "-6972466928-export declare function foo(): void;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "original": {
          "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 99
        },
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "esnext"
      },
      "../src/randomfile.ts": {
        "original": {
          "version": "-9547279430-export const x = 10;export const y = 10;",
          "signature": "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/a/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/b/ba/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/b/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/c/cb/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/filea.ts",
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "latestChangedDtsFile": "./randomFile.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 23
          },
          "resolutionId": 1,
          "resolvedModule": "../src/fileB.mts"
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "./fileB.mjs",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../src/fileB.mts"
          },
          "mode": "esnext"
        }
      ],
      "modules": [
        {
          "dir": "../src",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./fileB.mjs",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../src/fileB.mts"
              },
              "mode": "esnext"
            }
          ]
        }
      ],
      "packageJsons": [
        [
          "../src/a",
          "../package.json"
        ],
        [
          "../src/b/ba",
          "../package.json"
        ],
        [
          "../src/c/ca/caa/caaa",
          "../package.json"
        ],
        [
          "../src/c/cb",
          "../package.json"
        ],
        [
          "../src/d/da/daa/daaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/e/ea/eaa/eaaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/faaa",
          "../package.json"
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4525
}



Change:: Modify package.json file to remove type module and randmon edit
Input::
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0"}

//// [/src/projects/project/src/randomFile.ts]
export const x = 10;export const y = 10;export const z = 10;



Output::
/lib/tsc --b /src/projects/project/src --explainFiles
Found 'package.json' at '/src/projects/project/package.json'.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'node', 'require', 'types'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/projects/project/src/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/src/projects/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/projects/project/src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/projects/project/src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/projects/project/src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"
src/projects/project/src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'src/projects/project/package.json' does not have field "type"

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.es2016.full.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/lib/package.json",
    "/package.json"
  ]
}

File: /src/projects/project/src/fileA.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}
resolvedModules:
./fileB.mjs: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/projects/project/src/fileB.mts",
    "extension": ".mts",
    "isExternalLibraryImport": false
  }
}

File: /src/projects/project/src/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/a/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/ba/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/cb/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}


//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts","../src/a","../package.json","../src/b/ba","../src/c/ca/caa/caaa","../src/c/cb","../src/d/da/daa/daaa/x/y/z","../src/e/ea/eaa/eaaa/x/y/z","../src/f/fa/faa/x/y/z","../src/f/fa/faa/faaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-6972466928-export declare function foo(): void;\r\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"-8895866314-export const x = 10;export const y = 10;export const z = 10;","signature":"-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,[3,[{"file":"../src/filea.ts","start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"messageText":"To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/src/projects/project/package.json'.","category":3,"code":1481}]}}]],2,4],"affectedFilesPendingEmit":[5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,4],"emitSignatures":[[4,"-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n"]],"latestChangedDtsFile":"./randomFile.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":23}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,1]],"modules":[[22,[1]]],"packageJsons":[[24,25],[26,25],[27,25],[28,25],[29,25],[30,25],[31,25],[32,25]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts",
      "../src/a",
      "../package.json",
      "../src/b/ba",
      "../src/c/ca/caa/caaa",
      "../src/c/cb",
      "../src/d/da/daa/daaa/x/y/z",
      "../src/e/ea/eaa/eaaa/x/y/z",
      "../src/f/fa/faa/x/y/z",
      "../src/f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "original": {
          "version": "3524703962-export function foo() {}",
          "signature": "-6972466928-export declare function foo(): void;\r\n",
          "impliedFormat": 99
        },
        "version": "3524703962-export function foo() {}",
        "signature": "-6972466928-export declare function foo(): void;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "original": {
          "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "original": {
          "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
          "signature": "-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
        "signature": "-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "code": 1479,
            "category": 1,
            "messageText": {
              "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
              "category": 1,
              "code": 1479,
              "next": [
                {
                  "messageText": "To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/src/projects/project/package.json'.",
                  "category": 3,
                  "code": 1481
                }
              ]
            }
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/a/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/b/ba/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/b/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/caa/caaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/caa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/cb/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/daaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/f/fa/faa/faaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/filea.ts",
        "Js | Dts"
      ],
      [
        "../src/randomfile.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      [
        "../src/randomfile.ts",
        "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n"
      ]
    ],
    "latestChangedDtsFile": "./randomFile.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 23
          },
          "resolutionId": 1,
          "resolvedModule": "../src/fileB.mts"
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./fileB.mjs",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../src/fileB.mts"
          },
          "mode": "commonjs"
        }
      ],
      "modules": [
        {
          "dir": "../src",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./fileB.mjs",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../src/fileB.mts"
              },
              "mode": "commonjs"
            }
          ]
        }
      ],
      "packageJsons": [
        [
          "../src/a",
          "../package.json"
        ],
        [
          "../src/b/ba",
          "../package.json"
        ],
        [
          "../src/c/ca/caa/caaa",
          "../package.json"
        ],
        [
          "../src/c/cb",
          "../package.json"
        ],
        [
          "../src/d/da/daa/daaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/e/ea/eaa/eaaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/faaa",
          "../package.json"
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5332
}



Change:: Delete package.json
Input::
//// [/src/projects/project/package.json] unlink


Output::
/lib/tsc --b /src/projects/project/src --explainFiles
File '/src/projects/project/src/package.json' does not exist.
File '/src/projects/project/package.json' does not exist.
File '/src/projects/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Reusing resolution of module './fileB.mjs' from '/src/projects/project/src/fileA.ts' found in cache from location '/src/projects/project/src', it was successfully resolved to '/src/projects/project/src/fileB.mts'.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/a/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Directory '/src/projects/project/src/b' has no containing package.json scope according to cache.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
Directory '/src/projects/project/src/c/ca' has no containing package.json scope according to cache.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
Directory '/src/projects/project/src/c/ca/caa' has no containing package.json scope according to cache.
File '/src/projects/project/src/c/cb/package.json' does not exist.
Directory '/src/projects/project/src/c' has no containing package.json scope according to cache.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa' has no containing package.json scope according to cache.
Directory '/src/projects/project/src/d/da/daa' has no containing package.json scope according to cache.
Directory '/src/projects/project/src/d/da' has no containing package.json scope according to cache.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
Directory '/src/projects/project/src/e/ea' has no containing package.json scope according to cache.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
Directory '/src/projects/project/src/e/ea/eaa' has no containing package.json scope according to cache.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
Directory '/src/projects/project/src/e/ea/eaa/eaaa' has no containing package.json scope according to cache.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
Directory '/src/projects/project/src/f/fa/faa' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
[96msrc/projects/project/src/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/src/projects/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/projects/project/src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/projects/project/src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/projects/project/src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.es2016.full.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/fileA.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
./fileB.mjs: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/projects/project/src/fileB.mts",
    "isExternalLibraryImport": false,
    "extension": ".mts"
  }
}

File: /src/projects/project/src/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/a/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/b/ba/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/b/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/c/ca/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/c/cb/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/d/da/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/e/ea/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}




Change:: Add package json file with type module
Input::
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}



Output::
/lib/tsc --b /src/projects/project/src --explainFiles
Found 'package.json' at '/src/projects/project/package.json'.
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'node', 'import', 'types'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/projects/project/src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/projects/project/src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/projects/project/src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
src/projects/project/src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'src/projects/project/package.json' has field "type" with value "module"
exitCode:: ExitStatus.Success
File: /lib/lib.es2016.full.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/lib/package.json",
    "/package.json"
  ]
}

File: /src/projects/project/src/fileA.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}
resolvedModules:
./fileB.mjs: esnext: {
  "resolvedModule": {
    "resolvedFileName": "/src/projects/project/src/fileB.mts",
    "extension": ".mts",
    "isExternalLibraryImport": false
  }
}

File: /src/projects/project/src/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/a/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/ba/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/b/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/c/cb/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/d/da/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts
packageJsonScope:: {
  "contents": {
    "packageJsonText": "{\"name\":\"app\",\"version\":\"1.0.0\",\"type\":\"module\"}",
    "packageJsonContent": {
      "name": "app",
      "version": "1.0.0",
      "type": "module"
    }
  },
  "affectingLocations": [
    "/src/projects/project/package.json"
  ]
}


//// [/src/projects/project/out/a/randomFile.js] file written with same contents
//// [/src/projects/project/out/b/ba/randomFile.js] file written with same contents
//// [/src/projects/project/out/b/randomFile.js] file written with same contents
//// [/src/projects/project/out/c/ca/caa/caaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/c/ca/caa/randomFile.js] file written with same contents
//// [/src/projects/project/out/c/ca/randomFile.js] file written with same contents
//// [/src/projects/project/out/c/cb/randomFile.js] file written with same contents
//// [/src/projects/project/out/d/da/daa/daaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/d/da/daa/daaa/x/y/z/randomFile.js] file written with same contents
//// [/src/projects/project/out/d/da/daa/randomFile.js] file written with same contents
//// [/src/projects/project/out/d/da/randomFile.js] file written with same contents
//// [/src/projects/project/out/e/ea/eaa/eaaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js] file written with same contents
//// [/src/projects/project/out/e/ea/eaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/e/ea/randomFile.js] file written with same contents
//// [/src/projects/project/out/f/fa/faa/faaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/f/fa/faa/x/y/z/randomFile.js] file written with same contents
//// [/src/projects/project/out/fileA.js] file written with same contents
//// [/src/projects/project/out/randomFile.d.ts]
export declare const x = 10;
export declare const y = 10;
export declare const z = 10;


//// [/src/projects/project/out/randomFile.js]
export const x = 10;
export const y = 10;
export const z = 10;


//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts","../src/a","../package.json","../src/b/ba","../src/c/ca/caa/caaa","../src/c/cb","../src/d/da/daa/daaa/x/y/z","../src/e/ea/eaa/eaaa/x/y/z","../src/f/fa/faa/x/y/z","../src/f/fa/faa/faaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-6972466928-export declare function foo(): void;\r\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-4882119183-export {};\r\n","impliedFormat":99},{"version":"-8895866314-export const x = 10;export const y = 10;export const z = 10;","signature":"-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,2,4],"latestChangedDtsFile":"./randomFile.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":23}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,99]],"modules":[[22,[1]]],"packageJsons":[[24,25],[26,25],[27,25],[28,25],[29,25],[30,25],[31,25],[32,25]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts",
      "../src/a",
      "../package.json",
      "../src/b/ba",
      "../src/c/ca/caa/caaa",
      "../src/c/cb",
      "../src/d/da/daa/daaa/x/y/z",
      "../src/e/ea/eaa/eaaa/x/y/z",
      "../src/f/fa/faa/x/y/z",
      "../src/f/fa/faa/faaa"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "original": {
          "version": "3524703962-export function foo() {}",
          "signature": "-6972466928-export declare function foo(): void;\r\n",
          "impliedFormat": 99
        },
        "version": "3524703962-export function foo() {}",
        "signature": "-6972466928-export declare function foo(): void;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "original": {
          "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 99
        },
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "esnext"
      },
      "../src/randomfile.ts": {
        "original": {
          "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
          "signature": "-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
        "signature": "-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/a/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/b/ba/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/b/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/c/cb/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 99
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/filea.ts",
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "latestChangedDtsFile": "./randomFile.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 23
          },
          "resolutionId": 1,
          "resolvedModule": "../src/fileB.mts"
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "./fileB.mjs",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../src/fileB.mts"
          },
          "mode": "esnext"
        }
      ],
      "modules": [
        {
          "dir": "../src",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./fileB.mjs",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../src/fileB.mts"
              },
              "mode": "esnext"
            }
          ]
        }
      ],
      "packageJsons": [
        [
          "../src/a",
          "../package.json"
        ],
        [
          "../src/b/ba",
          "../package.json"
        ],
        [
          "../src/c/ca/caa/caaa",
          "../package.json"
        ],
        [
          "../src/c/cb",
          "../package.json"
        ],
        [
          "../src/d/da/daa/daaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/e/ea/eaa/eaaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/faaa",
          "../package.json"
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4578
}



Change:: Delete package.json and random edit
Input::
//// [/src/projects/project/package.json] unlink
//// [/src/projects/project/src/randomFile.ts]
export const x = 10;export const y = 10;export const z = 10;export const k = 10;



Output::
/lib/tsc --b /src/projects/project/src --explainFiles
File '/src/projects/project/src/package.json' does not exist.
File '/src/projects/project/package.json' does not exist.
File '/src/projects/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'node', 'require', 'types'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/a/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Directory '/src/projects/project/src/b' has no containing package.json scope according to cache.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
Directory '/src/projects/project/src/c/ca' has no containing package.json scope according to cache.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
Directory '/src/projects/project/src/c/ca/caa' has no containing package.json scope according to cache.
File '/src/projects/project/src/c/cb/package.json' does not exist.
Directory '/src/projects/project/src/c' has no containing package.json scope according to cache.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Directory '/src/projects/project/src/d/da/daa/daaa' has no containing package.json scope according to cache.
Directory '/src/projects/project/src/d/da/daa' has no containing package.json scope according to cache.
Directory '/src/projects/project/src/d/da' has no containing package.json scope according to cache.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
Directory '/src/projects/project/src/e/ea' has no containing package.json scope according to cache.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
Directory '/src/projects/project/src/e/ea/eaa' has no containing package.json scope according to cache.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
Directory '/src/projects/project/src/e/ea/eaa/eaaa' has no containing package.json scope according to cache.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
Directory '/src/projects/project/src' has no containing package.json scope according to cache.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
Directory '/src/projects/project/src/f/fa/faa' has no containing package.json scope according to cache.
File '/lib/package.json' does not exist.
Directory '/' has no containing package.json scope according to cache.
[96msrc/projects/project/src/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/projects/project/src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/projects/project/src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/projects/project/src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/projects/project/src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
File: /lib/lib.es2016.full.d.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/fileA.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}
resolvedModules:
./fileB.mjs: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "/src/projects/project/src/fileB.mts",
    "extension": ".mts",
    "isExternalLibraryImport": false
  }
}

File: /src/projects/project/src/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/a/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/b/ba/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/b/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/c/ca/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/c/cb/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/daaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/d/da/daa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/d/da/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/e/ea/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}

File: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts
packageJsonScope:: {
  "failedLookupLocations": [
    "/src/projects/project/src/package.json",
    "/src/projects/project/package.json",
    "/src/projects/package.json",
    "/src/package.json",
    "/package.json",
    "/src/projects/project/src/a/package.json",
    "/src/projects/project/src/b/ba/package.json",
    "/src/projects/project/src/b/package.json",
    "/src/projects/project/src/c/ca/package.json",
    "/src/projects/project/src/c/package.json",
    "/src/projects/project/src/c/ca/caa/package.json",
    "/src/projects/project/src/c/ca/caa/caaa/package.json",
    "/src/projects/project/src/c/cb/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/y/package.json",
    "/src/projects/project/src/d/da/daa/daaa/x/package.json",
    "/src/projects/project/src/d/da/daa/daaa/package.json",
    "/src/projects/project/src/d/da/daa/package.json",
    "/src/projects/project/src/d/da/package.json",
    "/src/projects/project/src/d/package.json",
    "/src/projects/project/src/e/ea/package.json",
    "/src/projects/project/src/e/package.json",
    "/src/projects/project/src/e/ea/eaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json",
    "/src/projects/project/src/e/ea/eaa/eaaa/x/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/z/package.json",
    "/src/projects/project/src/f/fa/faa/x/y/package.json",
    "/src/projects/project/src/f/fa/faa/x/package.json",
    "/src/projects/project/src/f/fa/faa/package.json",
    "/src/projects/project/src/f/fa/package.json",
    "/src/projects/project/src/f/package.json",
    "/src/projects/project/src/f/fa/faa/faaa/package.json",
    "/lib/package.json"
  ]
}


//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-6972466928-export declare function foo(): void;\r\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-4882119183-export {};\r\n","impliedFormat":1},{"version":"-7156111517-export const x = 10;export const y = 10;export const z = 10;export const k = 10;","signature":"-16631504257-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\nexport declare const k = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,[3,[{"file":"../src/filea.ts","start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"messageText":"To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ \"type\": \"module\" }`.","category":3,"code":1480}]}}]],2,4],"affectedFilesPendingEmit":[5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,4],"emitSignatures":[[4,"-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n"]],"latestChangedDtsFile":"./randomFile.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":23}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,1]],"modules":[[22,[1]]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "original": {
          "version": "3524703962-export function foo() {}",
          "signature": "-6972466928-export declare function foo(): void;\r\n",
          "impliedFormat": 99
        },
        "version": "3524703962-export function foo() {}",
        "signature": "-6972466928-export declare function foo(): void;\r\n",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "original": {
          "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
          "signature": "-4882119183-export {};\r\n",
          "impliedFormat": 1
        },
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-4882119183-export {};\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "original": {
          "version": "-7156111517-export const x = 10;export const y = 10;export const z = 10;export const k = 10;",
          "signature": "-16631504257-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\nexport declare const k = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-7156111517-export const x = 10;export const y = 10;export const z = 10;export const k = 10;",
        "signature": "-16631504257-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\nexport declare const k = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6057683066-export declare const x = 10;\r\n",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "code": 1479,
            "category": 1,
            "messageText": {
              "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
              "category": 1,
              "code": 1479,
              "next": [
                {
                  "messageText": "To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ \"type\": \"module\" }`.",
                  "category": 3,
                  "code": 1480
                }
              ]
            }
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/a/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/b/ba/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/b/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/caa/caaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/caa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/ca/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/c/cb/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/daaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/daa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/d/da/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/eaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/e/ea/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/f/fa/faa/faaa/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "Js | Dts"
      ],
      [
        "../src/filea.ts",
        "Js | Dts"
      ],
      [
        "../src/randomfile.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      [
        "../src/randomfile.ts",
        "-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n"
      ]
    ],
    "latestChangedDtsFile": "./randomFile.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 23
          },
          "resolutionId": 1,
          "resolvedModule": "../src/fileB.mts"
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./fileB.mjs",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../src/fileB.mts"
          },
          "mode": "commonjs"
        }
      ],
      "modules": [
        {
          "dir": "../src",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./fileB.mjs",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../src/fileB.mts"
              },
              "mode": "commonjs"
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5138
}

