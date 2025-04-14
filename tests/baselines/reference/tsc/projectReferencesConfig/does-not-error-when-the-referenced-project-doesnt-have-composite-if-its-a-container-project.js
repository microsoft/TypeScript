currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/primary/tsconfig.json]
{
  "compilerOptions": {
    "composite": false,
    "outDir": "bin"
  },
  "references": []
}

//// [/home/src/workspaces/project/primary/a.ts]
export { };

//// [/home/src/workspaces/project/reference/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": [
    {
      "path": "../primary"
    }
  ],
  "files": []
}

//// [/home/src/workspaces/project/reference/b.ts]
import * as mod_0 from "../primary/a"

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


/home/src/tslibs/TS/Lib/tsc.js --p reference/tsconfig.json
Output::


//// [/home/src/workspaces/project/reference/bin/tsconfig.tsbuildinfo]
{"fileNames":[],"fileInfos":[],"root":[],"options":{"composite":true,"outDir":"./"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/reference/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [],
  "fileInfos": {},
  "root": [],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "version": "FakeTSVersion",
  "size": 110
}


exitCode:: ExitStatus.Success
