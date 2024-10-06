
//// [/home/src/projects/project/app.js]


//// [/home/src/projects/project/jquery.js]


//// [/home/src/projects/project/chroma.min.js]


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
        "/home/src/projects/project/app.js",
        "/home/src/projects/project/jquery.js",
        "/home/src/projects/project/chroma.min.js"
      ],
      "projectRootPath": "/home/src/projects/project",
      "safeList": {
        "jquery": "jquery",
        "chroma": "chroma-js"
      },
      "packageNameToTypingLocation": {},
      "typeAcquisition": {
        "enable": true
      },
      "unresolvedImports": [],
      "typesRegistry": {},
      "compilerOptions": {}
    }
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["jquery","chroma-js"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "jquery",
        "chroma-js"
      ],
      "filesToWatch": [
        "/home/src/projects/project/bower_components",
        "/home/src/projects/project/node_modules"
      ]
    }
