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
  Default library for target 'es5'
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

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "failedLookupLocations": [
    "/src/project/pkg1.ts",
    "/src/project/pkg1.tsx",
    "/src/project/pkg1.d.ts",
    "/src/pkg1.ts",
    "/src/pkg1.tsx",
    "/src/pkg1.d.ts",
    "/pkg1.ts",
    "/pkg1.tsx",
    "/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/pkg1.js",
    "/src/project/pkg1.jsx",
    "/src/pkg1.js",
    "/src/pkg1.jsx",
    "/pkg1.js",
    "/pkg1.jsx"
  ]
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/package.json",
    "/src/project/node_modules/pkg3.d.ts",
    "/src/project/node_modules/pkg3/index.d.ts",
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3.d.ts",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/node_modules/pkg3/package.json",
    "/src/node_modules/pkg3.d.ts",
    "/src/node_modules/pkg3/index.d.ts",
    "/src/node_modules/@types/pkg3/package.json",
    "/src/node_modules/@types/pkg3.d.ts",
    "/src/node_modules/@types/pkg3/index.d.ts",
    "/node_modules/pkg3/package.json",
    "/node_modules/pkg3.d.ts",
    "/node_modules/pkg3/index.d.ts",
    "/node_modules/@types/pkg3/package.json",
    "/node_modules/@types/pkg3.d.ts",
    "/node_modules/@types/pkg3/index.d.ts"
  ]
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::
/src/project/node_modules/@types/pkg1/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}

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

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
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
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
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
  Default library for target 'es5'
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
Program structureReused: SafeModuleCache
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

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "failedLookupLocations": [
    "/src/project/pkg1.ts",
    "/src/project/pkg1.tsx",
    "/src/project/pkg1.d.ts",
    "/src/pkg1.ts",
    "/src/pkg1.tsx",
    "/src/pkg1.d.ts",
    "/pkg1.ts",
    "/pkg1.tsx",
    "/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/pkg1.js",
    "/src/project/pkg1.jsx",
    "/src/pkg1.js",
    "/src/pkg1.jsx",
    "/pkg1.js",
    "/pkg1.jsx"
  ]
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/package.json",
    "/src/project/node_modules/pkg3.d.ts",
    "/src/project/node_modules/pkg3/index.d.ts",
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3.d.ts",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/node_modules/pkg3/package.json",
    "/src/node_modules/pkg3.d.ts",
    "/src/node_modules/pkg3/index.d.ts",
    "/src/node_modules/@types/pkg3/package.json",
    "/src/node_modules/@types/pkg3.d.ts",
    "/src/node_modules/@types/pkg3/index.d.ts",
    "/node_modules/pkg3/package.json",
    "/node_modules/pkg3.d.ts",
    "/node_modules/pkg3/index.d.ts",
    "/node_modules/@types/pkg3/package.json",
    "/node_modules/@types/pkg3.d.ts",
    "/node_modules/@types/pkg3/index.d.ts"
  ]
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::
/src/project/node_modules/@types/pkg1/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}

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

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
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
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
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
  Default library for target 'es5'
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
Program structureReused: SafeModuleCache
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

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "failedLookupLocations": [
    "/src/project/pkg1.ts",
    "/src/project/pkg1.tsx",
    "/src/project/pkg1.d.ts",
    "/src/pkg1.ts",
    "/src/pkg1.tsx",
    "/src/pkg1.d.ts",
    "/pkg1.ts",
    "/pkg1.tsx",
    "/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/package.json",
    "/src/project/node_modules/@types/pkg1.d.ts",
    "/src/project/node_modules/@types/pkg1/index.d.ts",
    "/src/node_modules/@types/pkg1/package.json",
    "/src/node_modules/@types/pkg1.d.ts",
    "/src/node_modules/@types/pkg1/index.d.ts",
    "/node_modules/@types/pkg1/package.json",
    "/node_modules/@types/pkg1.d.ts",
    "/node_modules/@types/pkg1/index.d.ts",
    "/src/project/pkg1.js",
    "/src/project/pkg1.jsx",
    "/src/pkg1.js",
    "/src/pkg1.jsx",
    "/pkg1.js",
    "/pkg1.jsx"
  ]
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/package.json",
    "/src/project/node_modules/pkg3.d.ts",
    "/src/project/node_modules/pkg3/index.d.ts",
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3.d.ts",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/node_modules/pkg3/package.json",
    "/src/node_modules/pkg3.d.ts",
    "/src/node_modules/pkg3/index.d.ts",
    "/src/node_modules/@types/pkg3/package.json",
    "/src/node_modules/@types/pkg3.d.ts",
    "/src/node_modules/@types/pkg3/index.d.ts",
    "/node_modules/pkg3/package.json",
    "/node_modules/pkg3.d.ts",
    "/node_modules/pkg3/index.d.ts",
    "/node_modules/@types/pkg3/package.json",
    "/node_modules/@types/pkg3.d.ts",
    "/node_modules/@types/pkg3/index.d.ts"
  ]
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::
/src/project/node_modules/@types/pkg1/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}

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

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg1' was successfully resolved to '/src/project/pkg1.d.ts'. ========
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
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
Program structureReused: SafeModuleCache
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

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg1.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "failedLookupLocations": [
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/project/node_modules/pkg3/package.json",
    "/src/project/node_modules/pkg3.d.ts",
    "/src/project/node_modules/pkg3/index.d.ts",
    "/src/project/node_modules/@types/pkg3/package.json",
    "/src/project/node_modules/@types/pkg3.d.ts",
    "/src/project/node_modules/@types/pkg3/index.d.ts",
    "/src/node_modules/pkg3/package.json",
    "/src/node_modules/pkg3.d.ts",
    "/src/node_modules/pkg3/index.d.ts",
    "/src/node_modules/@types/pkg3/package.json",
    "/src/node_modules/@types/pkg3.d.ts",
    "/src/node_modules/@types/pkg3/index.d.ts",
    "/node_modules/pkg3/package.json",
    "/node_modules/pkg3.d.ts",
    "/node_modules/pkg3/index.d.ts",
    "/node_modules/@types/pkg3/package.json",
    "/node_modules/@types/pkg3.d.ts",
    "/node_modules/@types/pkg3/index.d.ts"
  ]
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::
/src/project/node_modules/@types/pkg1/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}

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

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg1.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3/package.json' does not exist.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/pkg3/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg3/index.d.ts', result '/src/project/node_modules/pkg3/index.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts', primary: false. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es5'
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
Program structureReused: SafeModuleCache
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

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg1.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg3/index.d.ts",
    "isExternalLibraryImport": true
  }
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::
/src/project/node_modules/@types/pkg1/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/out.js]
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = exports.y = exports.x = void 0;
    exports.x = 10;
    exports.y = 10;
    exports.z = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":940,"kind":"text"}],"hash":"21057699039-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.z = exports.y = exports.x = void 0;\n    exports.x = 10;\n    exports.y = 10;\n    exports.z = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":273,"kind":"text"}],"hash":"-32434225881-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./pkg0.d.ts","./pkg1.d.ts","./filewithimports.ts","./node_modules/pkg2/index.d.ts","./node_modules/pkg3/index.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","769951468-export interface ImportInterface0 {}","-3547817137-export interface RequireInterface1 {}","17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","16859148566-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;export const z = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-32434225881-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedModule":3},{"resolvedTypeReferenceDirective":5,"notPrimary":true},{"resolvedTypeReferenceDirective":6,"notPrimary":true},{"resolvedTypeReferenceDirective":10}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[11,[1,2]]],"typeRefs":[[11,[3,4,5]]]}},"version":"FakeTSVersion"}

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
          "end": 940,
          "kind": "text"
        }
      ],
      "hash": "21057699039-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.z = exports.y = exports.x = void 0;\n    exports.x = 10;\n    exports.y = 10;\n    exports.z = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
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
      "../../a/lib/lib.d.ts",
      "./pkg0.d.ts",
      "./pkg1.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/index.d.ts",
      "./node_modules/pkg3/index.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./pkg1.d.ts": "-3547817137-export interface RequireInterface1 {}",
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./node_modules/pkg3/index.d.ts": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "16859148566-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;export const z = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-32434225881-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 3
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg1.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 5,
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 6,
            "notPrimary": true
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 10
          },
          "resolutionId": 5,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg1.d.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 5,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./pkg1.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 3,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 5,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3896
}

//// [/src/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-940)
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = exports.y = exports.x = void 0;
    exports.x = 10;
    exports.y = 10;
    exports.z = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg1.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es5'
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
Program structureReused: SafeModuleCache
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

File: /src/project/fileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}
pkg1: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg1.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/fileWithTypeRefs.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}
pkg3: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg3/index.d.ts",
    "isExternalLibraryImport": true
  }
}

File: /src/project/randomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false
  }
}

File: /src/project/randomFileForTypeRef.ts
resolvedTypeReferenceDirectiveNames:
pkg2: {
  "resolvedTypeReferenceDirective": {
    "primary": false,
    "resolvedFileName": "/src/project/node_modules/pkg2/index.d.ts",
    "isExternalLibraryImport": true
  }
}

automaticTypeDirectiveResolutions:
pkg4: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/src/project/node_modules/@types/pkg4/index.d.ts",
    "isExternalLibraryImport": true
  }
}

PolledWatches::
/src/project/node_modules/@types/pkg1/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg2/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/pkg3/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfileforimport.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/out.js]
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.k = exports.z = exports.y = exports.x = void 0;
    exports.x = 10;
    exports.y = 10;
    exports.z = 10;
    exports.k = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./fileWithImports.ts","./fileWithTypeRefs.ts","./randomFileForImport.ts","./randomFileForTypeRef.ts"],"js":{"sections":[{"pos":0,"end":972,"kind":"text"}],"hash":"-14017033189-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.k = exports.z = exports.y = exports.x = void 0;\n    exports.x = 10;\n    exports.y = 10;\n    exports.z = 10;\n    exports.k = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":298,"kind":"text"}],"hash":"-40150904130-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n    export const k = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n"}},"program":{"fileNames":["../../a/lib/lib.d.ts","./pkg0.d.ts","./pkg1.d.ts","./filewithimports.ts","./node_modules/pkg2/index.d.ts","./node_modules/pkg3/index.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","769951468-export interface ImportInterface0 {}","-3547817137-export interface RequireInterface1 {}","17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n","1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n","-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","6292958787-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;export const z = 10;export const k = 10;","-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true,"module":2,"out":"./out.js"},"outSignature":"-40150904130-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n    export const k = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n","latestChangedDtsFile":"./out.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedModule":3},{"resolvedTypeReferenceDirective":5,"notPrimary":true},{"resolvedTypeReferenceDirective":6,"notPrimary":true},{"resolvedTypeReferenceDirective":10}],"names":["pkg0","pkg1","pkg2","pkg3","pkg4"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[11,[1,2]]],"typeRefs":[[11,[3,4,5]]]}},"version":"FakeTSVersion"}

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
          "end": 972,
          "kind": "text"
        }
      ],
      "hash": "-14017033189-define(\"fileWithImports\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n});\ndefine(\"fileWithTypeRefs\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    /// <reference types=\"pkg2\"/>\n    /// <reference types=\"pkg3\"/>\n});\ndefine(\"randomFileForImport\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.k = exports.z = exports.y = exports.x = void 0;\n    exports.x = 10;\n    exports.y = 10;\n    exports.z = 10;\n    exports.k = 10;\n});\ndefine(\"randomFileForTypeRef\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    /// <reference types=\"pkg2\"/>\n    exports.x = 10;\n});\n"
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
      "../../a/lib/lib.d.ts",
      "./pkg0.d.ts",
      "./pkg1.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/index.d.ts",
      "./node_modules/pkg3/index.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./pkg0.d.ts": "769951468-export interface ImportInterface0 {}",
      "./pkg1.d.ts": "-3547817137-export interface RequireInterface1 {}",
      "./filewithimports.ts": "17369432329-import type { ImportInterface0 } from \"pkg0\";\nimport type { RequireInterface1 } from \"pkg1\";\n",
      "./node_modules/pkg2/index.d.ts": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
      "./node_modules/pkg3/index.d.ts": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
      "./filewithtyperefs.ts": "-9965483727-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
      "./randomfileforimport.ts": "6292958787-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;export const z = 10;export const k = 10;",
      "./randomfilefortyperef.ts": "-2210321256-/// <reference types=\"pkg2\"/>\nexport const x = 10;",
      "./node_modules/@types/pkg4/index.d.ts": "-10726455937-export const x = 10;"
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2,
      "out": "./out.js"
    },
    "outSignature": "-40150904130-declare module \"fileWithImports\" { }\ndeclare module \"fileWithTypeRefs\" {\n    export {};\n}\ndeclare module \"randomFileForImport\" {\n    export const x = 10;\n    export const y = 10;\n    export const z = 10;\n    export const k = 10;\n}\ndeclare module \"randomFileForTypeRef\" {\n    export const x = 10;\n}\n",
    "latestChangedDtsFile": "./out.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 3
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg1.d.ts"
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 5,
            "notPrimary": true
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 6,
            "notPrimary": true
          },
          "resolutionId": 4,
          "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 10
          },
          "resolutionId": 5,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg1",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg1.d.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "pkg3",
          "resolution": {
            "resolutionId": 4,
            "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
            "notPrimary": true
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 5,
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./pkg0.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg1",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./pkg1.d.ts"
              }
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 3,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/pkg2/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "pkg3",
              "resolution": {
                "resolutionId": 4,
                "resolvedTypeReferenceDirective": "./node_modules/pkg3/index.d.ts",
                "notPrimary": true
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 5,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4001
}

//// [/src/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: ./out.js
----------------------------------------------------------------------
text: (0-972)
define("fileWithImports", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileWithTypeRefs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="pkg2"/>
    /// <reference types="pkg3"/>
});
define("randomFileForImport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.k = exports.z = exports.y = exports.x = void 0;
    exports.x = 10;
    exports.y = 10;
    exports.z = 10;
    exports.k = 10;
});
define("randomFileForTypeRef", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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

