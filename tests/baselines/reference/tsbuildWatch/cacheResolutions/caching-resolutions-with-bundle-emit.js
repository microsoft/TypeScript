Input::
//// [/src/project/tsconfig.json]
{"compilerOptions":{"module":"amd","composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js"},"include":["*.ts"],"exclude":["*.d.ts"]}

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { RequireInterface1 } from "pkg1";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/pkg0.d.ts]
export interface ImportInterface0 {}

//// [/src/project/fileWithTypeRefs.ts]
/// <reference types="pkg2"/>
/// <reference types="pkg3"/>
interface LocalInterface extends ImportInterface2, RequireInterface3 {}
export {}


//// [/src/project/randomFileForTypeRef.ts]
export const x = 10;

//// [/src/project/node_modules/pkg2/index.d.ts]
export {};
declare global {
    interface ImportInterface2 {}
}


//// [/src/project/node_modules/@types/pkg4/index.d.ts]
export const x = 10;

//// [/a/lib/lib.d.ts]
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


/a/lib/tsc.js -b -w --explainFiles
Output::
>> Screen clear
[[90m12:00:37 AM[0m] Starting compilation in watch mode...

======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' does not exist.
File '/src/pkg1.ts' does not exist.
File '/src/pkg1.tsx' does not exist.
File '/src/pkg1.d.ts' does not exist.
File '/pkg1.ts' does not exist.
File '/pkg1.tsx' does not exist.
File '/pkg1.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/pkg1.js' does not exist.
File '/src/project/pkg1.jsx' does not exist.
File '/src/pkg1.js' does not exist.
File '/src/pkg1.jsx' does not exist.
File '/pkg1.js' does not exist.
File '/pkg1.jsx' does not exist.
======== Module name 'pkg1' was not resolved. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:00:38 AM[0m] Found 3 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/filewithtyperefs.ts:
  {"fileName":"/src/project/fileWithTypeRefs.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/randomfilefortyperef.ts:
  {"fileName":"/src/project/randomFileForTypeRef.ts","pollingInterval":250}
/src/project/node_modules/@types/pkg1/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg1/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg2/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/pkg2/package.json:
  {"fileName":"/src/project/node_modules/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg3/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/pkg3/package.json:
  {"fileName":"/src/project/node_modules/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg4/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg4/package.json","pollingInterval":250}

FsWatches::
/src/project:
  {"directoryName":"/src/project"}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: modify randomFileForImport by adding import

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:00:41 AM[0m] File change detected. Starting incremental compilation...

======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' does not exist.
File '/src/pkg1.ts' does not exist.
File '/src/pkg1.tsx' does not exist.
File '/src/pkg1.d.ts' does not exist.
File '/pkg1.ts' does not exist.
File '/pkg1.tsx' does not exist.
File '/pkg1.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/pkg1.js' does not exist.
File '/src/project/pkg1.jsx' does not exist.
File '/src/pkg1.js' does not exist.
File '/src/pkg1.jsx' does not exist.
File '/pkg1.js' does not exist.
File '/pkg1.jsx' does not exist.
======== Module name 'pkg1' was not resolved. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:00:42 AM[0m] Found 3 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/filewithtyperefs.ts:
  {"fileName":"/src/project/fileWithTypeRefs.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/randomfilefortyperef.ts:
  {"fileName":"/src/project/randomFileForTypeRef.ts","pollingInterval":250}
/src/project/node_modules/@types/pkg1/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg1/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg2/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/pkg2/package.json:
  {"fileName":"/src/project/node_modules/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg3/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/pkg3/package.json:
  {"fileName":"/src/project/node_modules/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg4/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg4/package.json","pollingInterval":250}

FsWatches::
/src/project:
  {"directoryName":"/src/project"}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: modify randomFileForTypeRef by adding typeRef

Input::
//// [/src/project/randomFileForTypeRef.ts]
/// <reference types="pkg2"/>
export const x = 10;


Output::
>> Screen clear
[[90m12:00:45 AM[0m] File change detected. Starting incremental compilation...

======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' does not exist.
File '/src/pkg1.ts' does not exist.
File '/src/pkg1.tsx' does not exist.
File '/src/pkg1.d.ts' does not exist.
File '/pkg1.ts' does not exist.
File '/pkg1.tsx' does not exist.
File '/pkg1.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/pkg1.js' does not exist.
File '/src/project/pkg1.jsx' does not exist.
File '/src/pkg1.js' does not exist.
File '/src/pkg1.jsx' does not exist.
File '/pkg1.js' does not exist.
File '/pkg1.jsx' does not exist.
======== Module name 'pkg1' was not resolved. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts'. ========
Resolution for type reference directive 'pkg2' was found in cache from location '/src/project'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2792: [0mCannot find module 'pkg1'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import type { RequireInterface1 } from "pkg1";
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:00:46 AM[0m] Found 3 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/filewithtyperefs.ts:
  {"fileName":"/src/project/fileWithTypeRefs.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/randomfilefortyperef.ts:
  {"fileName":"/src/project/randomFileForTypeRef.ts","pollingInterval":250}
/src/project/node_modules/@types/pkg1/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg1/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg2/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/pkg2/package.json:
  {"fileName":"/src/project/node_modules/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg3/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/pkg3/package.json:
  {"fileName":"/src/project/node_modules/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg4/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg4/package.json","pollingInterval":250}

FsWatches::
/src/project:
  {"directoryName":"/src/project"}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: write file not resolved by import and random edit

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;export const y = 10;

//// [/src/project/pkg1.d.ts]
export interface RequireInterface1 {}


Output::
>> Screen clear
[[90m12:00:51 AM[0m] File change detected. Starting incremental compilation...

======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg1' was successfully resolved to '/src/project/pkg1.d.ts'. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts'. ========
Resolution for type reference directive 'pkg2' was found in cache from location '/src/project'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es3'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
pkg1.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:00:52 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/pkg1.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/filewithtyperefs.ts:
  {"fileName":"/src/project/fileWithTypeRefs.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/randomfilefortyperef.ts:
  {"fileName":"/src/project/randomFileForTypeRef.ts","pollingInterval":250}
/src/project/node_modules/@types/pkg1/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg1/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg2/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/pkg2/package.json:
  {"fileName":"/src/project/node_modules/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg3/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/pkg3/package.json:
  {"fileName":"/src/project/node_modules/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg4/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg4/package.json","pollingInterval":250}

FsWatches::
/src/project:
  {"directoryName":"/src/project"}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: write file not resolved by typeRef and random edit

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;export const y = 10;export const z = 10;

//// [/src/project/node_modules/pkg3/index.d.ts]
export {};
declare global {
    interface RequireInterface3 {}
}



Output::
>> Screen clear
[[90m12:01:00 AM[0m] File change detected. Starting incremental compilation...

======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg1' was successfully resolved to '/src/project/pkg1.d.ts'. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3/package.json' does not exist.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/pkg3/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg3/index.d.ts', result '/src/project/node_modules/pkg3/index.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts', primary: false. ========
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts'. ========
Resolution for type reference directive 'pkg2' was found in cache from location '/src/project'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
../../a/lib/lib.d.ts
  Default library for target 'es3'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
pkg1.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
node_modules/pkg3/index.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:01:12 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/pkg1.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/node_modules/pkg3/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/filewithtyperefs.ts:
  {"fileName":"/src/project/fileWithTypeRefs.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/randomfilefortyperef.ts:
  {"fileName":"/src/project/randomFileForTypeRef.ts","pollingInterval":250}
/src/project/node_modules/@types/pkg1/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg1/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg2/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/pkg2/package.json:
  {"fileName":"/src/project/node_modules/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg3/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/pkg3/package.json:
  {"fileName":"/src/project/node_modules/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg4/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg4/package.json","pollingInterval":250}

FsWatches::
/src/project:
  {"directoryName":"/src/project"}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/out.js]
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.z = exports.y = exports.x = void 0;
    exports.x = 10;
    exports.y = 10;
    exports.z = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});


//// [/src/project/out.d.ts]
declare module "fileWithImports" { }
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
    export const y = 10;
    export const z = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}


//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":796,"kind":"text"}],"hash":"-36437582393-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.z = exports.y = exports.x = void 0;\n    exports.x = 10;\n    exports.y = 10;\n    exports.z = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":273,"kind":"text"}],"hash":"-32434225881-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["./filewithimports.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./","./pkg0.d.ts","./pkg0.ts","./pkg0.tsx","./pkg1.d.ts","./pkg1.ts","./pkg1.tsx","./node_modules/pkg2/index.d.ts","./node_modules/@types/pkg2/package.json","./node_modules/@types/pkg2/index.d.ts","./node_modules/pkg2/package.json","./node_modules/pkg2.d.ts","./node_modules/pkg3/index.d.ts","./node_modules/@types/pkg3/package.json","./node_modules/@types/pkg3/index.d.ts","./node_modules/pkg3/package.json","./node_modules/pkg3.d.ts","./node_modules/@types/pkg4/index.d.ts","./node_modules/@types/pkg4/package.json"],"fileInfos":["17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","16859148566-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;export const z = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"out":"./out.js"},"outSignature":"-32434225881-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6},"failedLookupLocations":[7,8]},{"resolvedModule":{"resolvedFileName":9},"failedLookupLocations":[10,11]},{"resolvedTypeReferenceDirective":{"resolvedFileName":12,"isExternalLibraryImport":true},"failedLookupLocations":[13,14,15,16]},{"resolvedTypeReferenceDirective":{"resolvedFileName":17,"isExternalLibraryImport":true},"failedLookupLocations":[18,19,20,21]},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":22,"isExternalLibraryImport":true},"failedLookupLocations":[23]}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[5,[1,2]]],"typeRefs":[[5,[3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./fileWithImports.ts",
      "./fileWithTypeRefs.ts",
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 796,
          "kind": "text"
        }
      ],
      "hash": "-36437582393-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.z = exports.y = exports.x = void 0;\n    exports.x = 10;\n    exports.y = 10;\n    exports.z = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 273,
          "kind": "text"
        }
      ],
      "hash": "-32434225881-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./",
      "./pkg0.d.ts",
      "./pkg0.ts",
      "./pkg0.tsx",
      "./pkg1.d.ts",
      "./pkg1.ts",
      "./pkg1.tsx",
      "./node_modules/pkg2/index.d.ts",
      "./node_modules/@types/pkg2/package.json",
      "./node_modules/@types/pkg2/index.d.ts",
      "./node_modules/pkg2/package.json",
      "./node_modules/pkg2.d.ts",
      "./node_modules/pkg3/index.d.ts",
      "./node_modules/@types/pkg3/package.json",
      "./node_modules/@types/pkg3/index.d.ts",
      "./node_modules/pkg3/package.json",
      "./node_modules/pkg3.d.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/@types/pkg4/package.json"
    ],
    "fileInfos": {
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "16859148566-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;export const z = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "out": "./out.js"
    },
    "outSignature": "-32434225881-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          },
          "failedLookupLocations": [
            "./pkg0.ts",
            "./pkg0.tsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg1.d.ts"
          },
          "failedLookupLocations": [
            "./pkg1.ts",
            "./pkg1.tsx"
          ]
        },
        {
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/@types/pkg2/package.json",
            "./node_modules/@types/pkg2/index.d.ts",
            "./node_modules/pkg2/package.json",
            "./node_modules/pkg2.d.ts"
          ]
        },
        {
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/@types/pkg3/package.json",
            "./node_modules/@types/pkg3/index.d.ts",
            "./node_modules/pkg3/package.json",
            "./node_modules/pkg3.d.ts"
          ]
        },
        {
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/@types/pkg4/package.json"
          ]
        }
      ],
      "names": [
        "pkg0",
        "pkg1",
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            },
            "failedLookupLocations": [
              "./pkg0.ts",
              "./pkg0.tsx"
            ]
          }
        ],
        [
          "pkg1",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg1.d.ts"
            },
            "failedLookupLocations": [
              "./pkg1.ts",
              "./pkg1.tsx"
            ]
          }
        ],
        [
          "pkg2",
          {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/@types/pkg2/package.json",
              "./node_modules/@types/pkg2/index.d.ts",
              "./node_modules/pkg2/package.json",
              "./node_modules/pkg2.d.ts"
            ]
          }
        ],
        [
          "pkg3",
          {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/@types/pkg3/package.json",
              "./node_modules/@types/pkg3/index.d.ts",
              "./node_modules/pkg3/package.json",
              "./node_modules/pkg3.d.ts"
            ]
          }
        ],
        [
          "pkg4",
          {
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/@types/pkg4/package.json"
            ]
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./pkg0.d.ts"
                },
                "failedLookupLocations": [
                  "./pkg0.ts",
                  "./pkg0.tsx"
                ]
              }
            ],
            [
              "pkg1",
              {
                "resolvedModule": {
                  "resolvedFileName": "./pkg1.d.ts"
                },
                "failedLookupLocations": [
                  "./pkg1.ts",
                  "./pkg1.tsx"
                ]
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./",
          [
            [
              "pkg2",
              {
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/@types/pkg2/package.json",
                  "./node_modules/@types/pkg2/index.d.ts",
                  "./node_modules/pkg2/package.json",
                  "./node_modules/pkg2.d.ts"
                ]
              }
            ],
            [
              "pkg3",
              {
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/@types/pkg3/package.json",
                  "./node_modules/@types/pkg3/index.d.ts",
                  "./node_modules/pkg3/package.json",
                  "./node_modules/pkg3.d.ts"
                ]
              }
            ],
            [
              "pkg4",
              {
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/@types/pkg4/package.json"
                ]
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3771
}

//// [/src/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-796)
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.z = exports.y = exports.x = void 0;
    exports.x = 10;
    exports.y = 10;
    exports.z = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-273)
declare module "fileWithImports" { }
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
    export const y = 10;
    export const z = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}

======================================================================


Change:: Random edit

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;export const y = 10;export const z = 10;export const k = 10;


Output::
>> Screen clear
[[90m12:01:15 AM[0m] File change detected. Starting incremental compilation...

======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg1' was successfully resolved to '/src/project/pkg1.d.ts'. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3/package.json' does not exist.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/pkg3/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg3/index.d.ts', result '/src/project/node_modules/pkg3/index.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts', primary: false. ========
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts'. ========
Resolution for type reference directive 'pkg2' was found in cache from location '/src/project'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
../../a/lib/lib.d.ts
  Default library for target 'es3'
pkg0.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
pkg1.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
node_modules/pkg3/index.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90m12:01:32 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts","/src/project/randomFileForImport.ts","/src/project/randomFileForTypeRef.ts"]
Program options: {"module":2,"composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js","watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/pkg0.d.ts
/src/project/pkg1.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/node_modules/pkg3/index.d.ts
/src/project/fileWithTypeRefs.ts
/src/project/randomFileForImport.ts
/src/project/randomFileForTypeRef.ts
/src/project/node_modules/@types/pkg4/index.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/filewithtyperefs.ts:
  {"fileName":"/src/project/fileWithTypeRefs.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/randomfilefortyperef.ts:
  {"fileName":"/src/project/randomFileForTypeRef.ts","pollingInterval":250}
/src/project/node_modules/@types/pkg1/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg1/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg2/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/pkg2/package.json:
  {"fileName":"/src/project/node_modules/pkg2/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg3/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/pkg3/package.json:
  {"fileName":"/src/project/node_modules/pkg3/package.json","pollingInterval":250}
/src/project/node_modules/@types/pkg4/package.json:
  {"fileName":"/src/project/node_modules/@types/pkg4/package.json","pollingInterval":250}

FsWatches::
/src/project:
  {"directoryName":"/src/project"}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/out.js]
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.k = exports.z = exports.y = exports.x = void 0;
    exports.x = 10;
    exports.y = 10;
    exports.z = 10;
    exports.k = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});


//// [/src/project/out.d.ts]
declare module "fileWithImports" { }
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
    export const y = 10;
    export const z = 10;
    export const k = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}


//// [/src/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":828,"kind":"text"}],"hash":"2292201219-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.k = exports.z = exports.y = exports.x = void 0;\n    exports.x = 10;\n    exports.y = 10;\n    exports.z = 10;\n    exports.k = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":298,"kind":"text"}],"hash":"-40150904130-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n    export const k = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["./filewithimports.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./","./pkg0.d.ts","./pkg0.ts","./pkg0.tsx","./pkg1.d.ts","./pkg1.ts","./pkg1.tsx","./node_modules/pkg2/index.d.ts","./node_modules/@types/pkg2/package.json","./node_modules/@types/pkg2/index.d.ts","./node_modules/pkg2/package.json","./node_modules/pkg2.d.ts","./node_modules/pkg3/index.d.ts","./node_modules/@types/pkg3/package.json","./node_modules/@types/pkg3/index.d.ts","./node_modules/pkg3/package.json","./node_modules/pkg3.d.ts","./node_modules/@types/pkg4/index.d.ts","./node_modules/@types/pkg4/package.json"],"fileInfos":["17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","6292958787-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;export const z = 10;export const k = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"out":"./out.js"},"outSignature":"-40150904130-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n    export const k = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6},"failedLookupLocations":[7,8]},{"resolvedModule":{"resolvedFileName":9},"failedLookupLocations":[10,11]},{"resolvedTypeReferenceDirective":{"resolvedFileName":12,"isExternalLibraryImport":true},"failedLookupLocations":[13,14,15,16]},{"resolvedTypeReferenceDirective":{"resolvedFileName":17,"isExternalLibraryImport":true},"failedLookupLocations":[18,19,20,21]},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":22,"isExternalLibraryImport":true},"failedLookupLocations":[23]}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[5,[1,2]]],"typeRefs":[[5,[3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./fileWithImports.ts",
      "./fileWithTypeRefs.ts",
      "./randomFileForImport.ts",
      "./randomFileForTypeRef.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 828,
          "kind": "text"
        }
      ],
      "hash": "2292201219-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.k = exports.z = exports.y = exports.x = void 0;\n    exports.x = 10;\n    exports.y = 10;\n    exports.z = 10;\n    exports.k = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 298,
          "kind": "text"
        }
      ],
      "hash": "-40150904130-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n    export const k = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./",
      "./pkg0.d.ts",
      "./pkg0.ts",
      "./pkg0.tsx",
      "./pkg1.d.ts",
      "./pkg1.ts",
      "./pkg1.tsx",
      "./node_modules/pkg2/index.d.ts",
      "./node_modules/@types/pkg2/package.json",
      "./node_modules/@types/pkg2/index.d.ts",
      "./node_modules/pkg2/package.json",
      "./node_modules/pkg2.d.ts",
      "./node_modules/pkg3/index.d.ts",
      "./node_modules/@types/pkg3/package.json",
      "./node_modules/@types/pkg3/index.d.ts",
      "./node_modules/pkg3/package.json",
      "./node_modules/pkg3.d.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/@types/pkg4/package.json"
    ],
    "fileInfos": {
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "6292958787-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;export const z = 10;export const k = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "out": "./out.js"
    },
    "outSignature": "-40150904130-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n    export const k = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          },
          "failedLookupLocations": [
            "./pkg0.ts",
            "./pkg0.tsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg1.d.ts"
          },
          "failedLookupLocations": [
            "./pkg1.ts",
            "./pkg1.tsx"
          ]
        },
        {
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/@types/pkg2/package.json",
            "./node_modules/@types/pkg2/index.d.ts",
            "./node_modules/pkg2/package.json",
            "./node_modules/pkg2.d.ts"
          ]
        },
        {
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/@types/pkg3/package.json",
            "./node_modules/@types/pkg3/index.d.ts",
            "./node_modules/pkg3/package.json",
            "./node_modules/pkg3.d.ts"
          ]
        },
        {
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/@types/pkg4/package.json"
          ]
        }
      ],
      "names": [
        "pkg0",
        "pkg1",
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            },
            "failedLookupLocations": [
              "./pkg0.ts",
              "./pkg0.tsx"
            ]
          }
        ],
        [
          "pkg1",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg1.d.ts"
            },
            "failedLookupLocations": [
              "./pkg1.ts",
              "./pkg1.tsx"
            ]
          }
        ],
        [
          "pkg2",
          {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/@types/pkg2/package.json",
              "./node_modules/@types/pkg2/index.d.ts",
              "./node_modules/pkg2/package.json",
              "./node_modules/pkg2.d.ts"
            ]
          }
        ],
        [
          "pkg3",
          {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/@types/pkg3/package.json",
              "./node_modules/@types/pkg3/index.d.ts",
              "./node_modules/pkg3/package.json",
              "./node_modules/pkg3.d.ts"
            ]
          }
        ],
        [
          "pkg4",
          {
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/@types/pkg4/package.json"
            ]
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./pkg0.d.ts"
                },
                "failedLookupLocations": [
                  "./pkg0.ts",
                  "./pkg0.tsx"
                ]
              }
            ],
            [
              "pkg1",
              {
                "resolvedModule": {
                  "resolvedFileName": "./pkg1.d.ts"
                },
                "failedLookupLocations": [
                  "./pkg1.ts",
                  "./pkg1.tsx"
                ]
              }
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./",
          [
            [
              "pkg2",
              {
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/@types/pkg2/package.json",
                  "./node_modules/@types/pkg2/index.d.ts",
                  "./node_modules/pkg2/package.json",
                  "./node_modules/pkg2.d.ts"
                ]
              }
            ],
            [
              "pkg3",
              {
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/@types/pkg3/package.json",
                  "./node_modules/@types/pkg3/index.d.ts",
                  "./node_modules/pkg3/package.json",
                  "./node_modules/pkg3.d.ts"
                ]
              }
            ],
            [
              "pkg4",
              {
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/@types/pkg4/package.json"
                ]
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3873
}

//// [/src/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-828)
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.k = exports.z = exports.y = exports.x = void 0;
    exports.x = 10;
    exports.y = 10;
    exports.z = 10;
    exports.k = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    /// <reference types="pkg2"/>
    exports.x = 10;
});

======================================================================
======================================================================
File:: ./out.d.ts
----------------------------------------------------------------------
text: (0-298)
declare module "fileWithImports" { }
declare module "fileWithTypeRefs" {
    export {};
}
declare module "randomFileForImport" {
    export const x = 10;
    export const y = 10;
    export const z = 10;
    export const k = 10;
}
declare module "randomFileForTypeRef" {
    export const x = 10;
}

======================================================================

