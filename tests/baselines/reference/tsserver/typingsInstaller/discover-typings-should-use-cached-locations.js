
//// [/home/src/projects/project/app.js]


//// [/home/src/projects/project/node.d.ts]


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


ts.JsTyping.discoverTypings::
    {
      "fileNames": [
        "/home/src/projects/project/app.js"
      ],
      "projectRootPath": "/home/src/projects/project",
      "safeList": {},
      "packageNameToTypingLocation": {
        "node": {
          "typingLocation": "/home/src/projects/project/node.d.ts",
          "version": {
            "major": 1,
            "minor": 3,
            "patch": 0,
            "prerelease": [],
            "build": []
          }
        }
      },
      "typeAcquisition": {
        "enable": true
      },
      "unresolvedImports": [
        "fs",
        "bar"
      ],
      "typesRegistry": {
        "node": {
          "latest": "1.3.0",
          "ts2.0": "1.0.0",
          "ts2.1": "1.0.0",
          "ts2.2": "1.2.0",
          "ts2.3": "1.3.0",
          "ts2.4": "1.3.0",
          "ts2.5": "1.3.0",
          "ts2.6": "1.3.0",
          "ts2.7": "1.3.0"
        }
      },
      "compilerOptions": {}
    }
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: ["node","bar"]
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [
        "/home/src/projects/project/node.d.ts"
      ],
      "newTypingNames": [
        "bar"
      ],
      "filesToWatch": [
        "/home/src/projects/project/bower_components",
        "/home/src/projects/project/node_modules"
      ]
    }
