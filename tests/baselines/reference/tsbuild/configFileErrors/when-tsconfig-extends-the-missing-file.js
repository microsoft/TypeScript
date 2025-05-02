currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.first.json]
{
  "extends": "./foobar.json",
  "compilerOptions": {
    "composite": true
  }
}

//// [/home/src/workspaces/project/tsconfig.second.json]
{
  "extends": "./foobar.json",
  "compilerOptions": {
    "composite": true
  }
}

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "./tsconfig.first.json"
    },
    {
      "path": "./tsconfig.second.json"
    }
  ]
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


/home/src/tslibs/TS/Lib/tsc.js --b
Output::
[91merror[0m[90m TS5083: [0mCannot read file '/home/src/workspaces/project/foobar.json'.

[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.first.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.

[91merror[0m[90m TS5083: [0mCannot read file '/home/src/workspaces/project/foobar.json'.

[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.second.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.


Found 4 errors.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
