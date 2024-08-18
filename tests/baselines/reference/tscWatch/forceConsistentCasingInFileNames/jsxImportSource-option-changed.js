currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
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

//// [/user/username/projects/myproject/node_modules/react/Jsx-runtime/index.d.ts]
export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {
            propA?: boolean;
        };
    }
}
export function jsx(...args: any[]): void;
export function jsxs(...args: any[]): void;
export const Fragment: unique symbol;


//// [/user/username/projects/myproject/node_modules/react/package.json]
{
  "name": "react",
  "version": "0.0.1"
}

//// [/user/username/projects/myproject/index.tsx]
export const App = () => <div propA={true}></div>;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "forceConsistentCasingInFileNames": true
  },
  "files": [
    "node_modules/react/Jsx-Runtime/index.d.ts",
    "index.tsx"
  ]
}


/a/lib/tsc.js --w --p . --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS1149: [0mFile name '/user/username/projects/myproject/node_modules/react/jsx-runtime/index.d.ts' differs from already included file name '/user/username/projects/myproject/node_modules/react/Jsx-Runtime/index.d.ts' only in casing.
  The file is in the program because:
    Part of 'files' list in tsconfig.json
    Imported via "react/jsx-runtime" from file '/user/username/projects/myproject/index.tsx' with packageId 'react/jsx-runtime/index.d.ts@0.0.1' to import 'jsx' and 'jsxs' factory functions

  [96mtsconfig.json[0m:[93m8[0m:[93m5[0m
    [7m8[0m     "node_modules/react/Jsx-Runtime/index.d.ts",
    [7m [0m [96m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
    File is matched by 'files' list specified here.

../../../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/react/Jsx-Runtime/index.d.ts
  Part of 'files' list in tsconfig.json
  Imported via "react/jsx-runtime" from file 'index.tsx' with packageId 'react/jsx-runtime/index.d.ts@0.0.1' to import 'jsx' and 'jsxs' factory functions
index.tsx
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var App = function () { return (0, jsx_runtime_1.jsx)("div", { propA: true }); };
exports.App = App;



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/react/Jsx-runtime/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/index.tsx: *new*
  {}
/user/username/projects/myproject/node_modules/react/Jsx-Runtime/index.d.ts: *new*
  {}
/user/username/projects/myproject/node_modules/react/package.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/node_modules/react/Jsx-Runtime/index.d.ts",
  "/user/username/projects/myproject/index.tsx"
]
Program options: {
  "jsx": 4,
  "jsxImportSource": "react",
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/react/Jsx-Runtime/index.d.ts
/user/username/projects/myproject/index.tsx

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/node_modules/react/jsx-runtime/index.d.ts (used version)
/user/username/projects/myproject/index.tsx (used version)

exitCode:: ExitStatus.undefined
