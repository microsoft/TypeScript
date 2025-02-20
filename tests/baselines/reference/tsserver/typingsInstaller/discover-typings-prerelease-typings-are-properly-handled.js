
//// [/home/src/projects/project/app.js]


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
          "typingLocation": "/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts",
          "version": {
            "major": 1,
            "minor": 3,
            "patch": 0,
            "prerelease": [
              "next",
              "0"
            ],
            "build": []
          }
        },
        "commander": {
          "typingLocation": "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts",
          "version": {
            "major": 1,
            "minor": 3,
            "patch": 0,
            "prerelease": [
              "next",
              "0"
            ],
            "build": []
          }
        }
      },
      "typeAcquisition": {
        "enable": true
      },
      "unresolvedImports": [
        "http",
        "commander"
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
          "ts2.7": "1.3.0",
          "tsFakeMajor.Minor": "1.3.0-next.1"
        },
        "commander": {
          "latest": "1.3.0",
          "ts2.0": "1.0.0",
          "ts2.1": "1.0.0",
          "ts2.2": "1.2.0",
          "ts2.3": "1.3.0",
          "ts2.4": "1.3.0",
          "ts2.5": "1.3.0",
          "ts2.6": "1.3.0",
          "ts2.7": "1.3.0",
          "tsFakeMajor.Minor": "1.3.0-next.1"
        }
      },
      "compilerOptions": {}
    }
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: ["node","commander"]
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "node",
        "commander"
      ],
      "filesToWatch": [
        "/home/src/projects/project/bower_components",
        "/home/src/projects/project/node_modules"
      ]
    }
