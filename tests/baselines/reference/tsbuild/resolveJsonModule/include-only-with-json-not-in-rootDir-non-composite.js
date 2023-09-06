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

//// [/src/hello.json]
{
 "hello": "world"
}

//// [/src/src/index.ts]
import hello from "../hello.json"
export default hello.hello


//// [/src/tsconfig.json]
{
 "compilerOptions": {
  "moduleResolution": "node",
  "module": "commonjs",
  "resolveJsonModule": true,
  "esModuleInterop": true,
  "allowSyntheticDefaultImports": true,
  "outDir": "dist",
  "skipDefaultLibCheck": true,
  "rootDir": "src"
 },
 "include": [
  "src/**/*"
 ]
}



Output::
/lib/tsc --b /src/tsconfig.json --v --explainFiles --listEmittedFiles
[[90m12:00:12 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:13 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/dist/index.js' does not exist

[[90m12:00:14 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/src/index.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS6059: [0mFile '/src/hello.json' is not under 'rootDir' '/src/src'. 'rootDir' is expected to contain all source files.

[7m1[0m import hello from "../hello.json"
[7m [0m [91m                  ~~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/hello.json
  Imported via "../hello.json" from file 'src/src/index.ts'
src/src/index.ts
  Matched by include pattern 'src/**/*' in 'src/tsconfig.json'

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


