currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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

//// [/primary/a.ts]
export { };

//// [/primary/tsconfig.json]
{
  "compilerOptions": {
    "composite": false,
    "outDir": "bin"
  },
  "references": []
}

//// [/reference/b.ts]
import * as mod_0 from "../primary/a"

//// [/reference/tsconfig.json]
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



Output::
/lib/tsc --p /reference/tsconfig.json
exitCode:: ExitStatus.Success


//// [/reference/bin/tsconfig.tsbuildinfo]
{"fileNames":[],"fileInfos":[],"root":[],"options":{"composite":true,"outDir":"./"},"version":"FakeTSVersion"}

//// [/reference/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
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

