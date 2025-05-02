currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/file1.ts]
let t = 10;

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
                        "compilerOptions": {},
                        "include": ["app/*", "test/**/*", "something"]
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/user/username/workspace/solution/projects/project/tsconfig.json'. Specified 'include' paths were '["app/*","test/**/*","something"]' and 'exclude' paths were '[]'.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.




PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/app: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/something: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/test: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

Program root files: []
Program options: {
  "watch": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
