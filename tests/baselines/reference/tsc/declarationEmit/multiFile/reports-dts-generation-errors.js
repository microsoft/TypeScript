currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "declaration": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true
  }
}

//// [/home/src/workspaces/project/index.ts]
import ky from 'ky';
export const api = ky.extend({});


//// [/home/src/workspaces/project/package.json]
{
  "type": "module"
}

//// [/home/src/workspaces/project/node_modules/ky/distribution/index.d.ts]
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;


//// [/home/src/workspaces/project/node_modules/ky/package.json]
{
  "name": "ky",
  "type": "module",
  "main": "./distribution/index.js"
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


/home/src/tslibs/TS/Lib/tsc.js --explainFiles --listEmittedFiles
Output::
[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /home/src/workspaces/project/index.js
../../tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'index.ts'
  File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m



//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*

//// [/home/src/workspaces/project/index.js]
import ky from 'ky';
export const api = ky.extend({});



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --explainFiles --listEmittedFiles
Output::
[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /home/src/workspaces/project/index.js
../../tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'index.ts'
  File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m



//// [/home/src/workspaces/project/index.js] file written with same contents

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b --explainFiles --listEmittedFiles -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /home/src/workspaces/project/index.js
TSFILE: /home/src/workspaces/project/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'index.ts'
  File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/home/src/workspaces/project/tsconfig.json'...


Found 1 error.



//// [/home/src/workspaces/project/index.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./index.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 63
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
