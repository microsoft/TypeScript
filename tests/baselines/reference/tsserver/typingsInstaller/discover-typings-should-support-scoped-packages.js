
//// [/home/src/projects/project/app.js]


//// [/home/src/projects/project/node_modules/@a/b/package.json]
{
  "name": "@a/b"
}

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
      "packageNameToTypingLocation": {},
      "typeAcquisition": {
        "enable": true
      },
      "unresolvedImports": [],
      "typesRegistry": {},
      "compilerOptions": {}
    }
TI:: [hh:mm:ss:mss] Searching for typing names in /home/src/projects/project/node_modules; all files: ["/home/src/projects/project/node_modules/@a/b/package.json"]
TI:: [hh:mm:ss:mss]     Found package names: ["@a/b"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "@a/b"
      ],
      "filesToWatch": [
        "/home/src/projects/project/bower_components",
        "/home/src/projects/project/node_modules"
      ]
    }
