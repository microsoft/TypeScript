currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/file1.ts]
let t = 10;

//// [/a/b/tsconfig.json]
{
                        "compilerOptions": {},
                        "include": ["app/*", "test/**/*", "something"]
                    }

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


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/a/b/tsconfig.json'. Specified 'include' paths were '["app/*","test/**/*","something"]' and 'exclude' paths were '[]'.

[[90m12:00:16 AM[0m] Found 1 error. Watching for file changes.




PolledWatches::
/a/b/app: *new*
  {"pollingInterval":500}
/a/b/something: *new*
  {"pollingInterval":500}
/a/b/test: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

Program root files: []
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
