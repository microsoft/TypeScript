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

//// [/lib/lib.esnext.full.d.ts]
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

//// [/src/project/index.ts]
import ky from 'ky';
export const api = ky.extend({});


//// [/src/project/node_modules/ky/distribution/index.d.ts]
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;


//// [/src/project/node_modules/ky/package.json]
{
  "name": "ky",
  "type": "module",
  "main": "./distribution/index.js"
}

//// [/src/project/package.json]
{
  "type": "module"
}

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "declaration": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true
  }
}



Output::
/lib/tsc -p /src/project --explainFiles --listEmittedFiles
[96msrc/project/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /src/project/index.js
lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
src/project/node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'src/project/index.ts'
  File is ECMAScript module because 'src/project/node_modules/ky/package.json' has field "type" with value "module"
src/project/index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"

Found 1 error in src/project/index.ts[90m:2[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/index.js]
import ky from 'ky';
export const api = ky.extend({});




Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/project --explainFiles --listEmittedFiles
[96msrc/project/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /src/project/index.js
lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
src/project/node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'src/project/index.ts'
  File is ECMAScript module because 'src/project/node_modules/ky/package.json' has field "type" with value "module"
src/project/index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"

Found 1 error in src/project/index.ts[90m:2[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/index.js] file written with same contents


Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/project --explainFiles --listEmittedFiles -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/index.d.ts' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
src/project/node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'src/project/index.ts'
  File is ECMAScript module because 'src/project/node_modules/ky/package.json' has field "type" with value "module"
src/project/index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


