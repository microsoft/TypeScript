currentDirectory:: /users/user/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/users/user/projects/myconfigs/node_modules/@something/tsconfig-node/tsconfig.json]
{"extends":"@something/tsconfig-base/tsconfig.json","compilerOptions":{"removeComments":true}}

//// [/users/user/projects/myconfigs/node_modules/@something/tsconfig-base/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/users/user/projects/myproject/src/index.ts]
// some comment
export const x = 10;


//// [/users/user/projects/myproject/src/tsconfig.json]
{"extends":"@something/tsconfig-node/tsconfig.json"}

//// [/users/user/projects/myproject/node_modules/@something/tsconfig-node] symlink(/users/user/projects/myconfigs/node_modules/@something/tsconfig-node)
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


/a/lib/tsc.js -b src --extendedDiagnostics
Output::
[96mnode_modules/@something/tsconfig-node/tsconfig.json[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS6053: [0mFile '@something/tsconfig-base/tsconfig.json' not found.

[7m1[0m {"extends":"@something/tsconfig-base/tsconfig.json","compilerOptions":{"removeComments":true}}
[7m [0m [91m           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.



Program root files: ["/users/user/projects/myproject/src/index.ts"]
Program options: {"removeComments":true,"extendedDiagnostics":true,"configFilePath":"/users/user/projects/myproject/src/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/user/projects/myproject/src/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

