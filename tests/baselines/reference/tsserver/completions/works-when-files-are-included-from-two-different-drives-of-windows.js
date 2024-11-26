Info seq  [hh:mm:ss:mss] currentDirectory:: c:\home\src\Vscode\Projects\bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: c:/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: c:\typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [e:/solution/myproject/src/app.js]
import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";


//// [e:/solution/myproject/node_modules/@types/react/index.d.ts]
import * as PropTypes from 'prop-types';
export class Component {}


//// [e:/solution/myproject/node_modules/@types/prop-types/index.d.ts]
export type ReactComponentLike =
    | string
    | ((props: any, context?: any) => any)
    | (new (props: any, context?: any) => any);

export const PropTypes = {};


//// [c:/typescript/node_modules/@types/react-router-dom/index.d.ts]
import * as React from 'react';
export interface BrowserRouterProps {
    basename?: string;
    getUserConfirmation?: ((message: string, callback: (ok: boolean) => void) => void);
    forceRefresh?: boolean;
    keyLength?: number;
}

//// [c:/typescript/node_modules/@types/react/index.d.ts]
import * as PropTypes from 'prop-types';
export class Component {}


//// [e:/solution/myproject/package.json]
{
  "name": "test",
  "version": "0.1.0",
  "dependencies": {
    "react": "^16.12.0",
    "react-router-dom": "^5.1.2"
  }
}

//// [e:/solution/myproject/node_modules/@types/react/package.json]
{
  "name": "@types/react",
  "version": "16.9.14"
}

//// [e:/solution/myproject/node_modules/react-router-dom/package.json]
{
  "name": "react-router-dom",
  "version": "5.1.2"
}

//// [e:/solution/myproject/node_modules/react-router-dom/index.js]
export function foo() {}

//// [e:/solution/myproject/node_modules/@types/prop-types/package.json]
{
  "name": "@types/prop-types",
  "version": "15.7.3"
}

//// [c:/typescript/node_modules/@types/react-router-dom/package.json]
{
  "name": "@types/react-router-dom",
  "version": "5.1.2"
}

//// [c:/typescript/node_modules/@types/react/package.json]
{
  "name": "@types/react",
  "version": "16.9.14"
}

//// [c:/home/src/tslibs/TS/Lib/lib.d.ts]
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

//// [c:/typescript/package.json]
{ "private": true }

//// [c:/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "includePackageJsonAutoImports": "auto",
          "includeCompletionsForModuleExports": true,
          "includeCompletionsWithInsertText": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "e:/solution/myproject/src/app.js"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: e:/solution/myproject/src/app.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: e:/solution/myproject/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: e:/solution/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: e:/solution/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: e:/solution/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: e:/solution/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules/@types/prop-types/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules/@types/react/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules/react-router-dom/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/typescript/node_modules/@types/react-router-dom/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/typescript/node_modules/@types/react/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	c:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	e:/solution/myproject/node_modules/@types/prop-types/index.d.ts Text-1 "export type ReactComponentLike =\n    | string\n    | ((props: any, context?: any) => any)\n    | (new (props: any, context?: any) => any);\n\nexport const PropTypes = {};\n"
	e:/solution/myproject/node_modules/@types/react/index.d.ts Text-1 "import * as PropTypes from 'prop-types';\nexport class Component {}\n"
	c:/typescript/node_modules/@types/react/index.d.ts Text-1 "import * as PropTypes from 'prop-types';\nexport class Component {}\n"
	c:/typescript/node_modules/@types/react-router-dom/index.d.ts Text-1 "import * as React from 'react';\nexport interface BrowserRouterProps {\n    basename?: string;\n    getUserConfirmation?: ((message: string, callback: (ok: boolean) => void) => void);\n    forceRefresh?: boolean;\n    keyLength?: number;\n}"
	e:/solution/myproject/src/app.js SVC-1-0 "import React from 'react';\nimport {\n  BrowserRouter as Router,\n} from \"react-router-dom\";\n"


	c:/home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../node_modules/@types/prop-types/index.d.ts
	  Imported via 'prop-types' from file '../node_modules/@types/react/index.d.ts' with packageId '@types/prop-types/index.d.ts@15.7.3'
	  Entry point for implicit type library 'prop-types' with packageId '@types/prop-types/index.d.ts@15.7.3'
	../node_modules/@types/react/index.d.ts
	  Imported via 'react' from file 'app.js' with packageId '@types/react/index.d.ts@16.9.14'
	  Entry point for implicit type library 'react' with packageId '@types/react/index.d.ts@16.9.14'
	c:/typescript/node_modules/@types/react/index.d.ts
	  Imported via 'react' from file 'c:/typescript/node_modules/@types/react-router-dom/index.d.ts' with packageId '@types/react/index.d.ts@16.9.14'
	  File redirects to file '../node_modules/@types/react/index.d.ts'
	c:/typescript/node_modules/@types/react-router-dom/index.d.ts
	  Imported via "react-router-dom" from file 'app.js' with packageId '@types/react-router-dom/index.d.ts@5.1.2'
	app.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
e:/solution/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}
e:/solution/myproject/src/jsconfig.json: *new*
  {"pollingInterval":2000}
e:/solution/myproject/src/node_modules: *new*
  {"pollingInterval":500}
e:/solution/myproject/src/node_modules/@types: *new*
  {"pollingInterval":500}
e:/solution/myproject/src/tsconfig.json: *new*
  {"pollingInterval":2000}
e:/solution/myproject/tsconfig.json: *new*
  {"pollingInterval":2000}
e:/solution/node_modules: *new*
  {"pollingInterval":500}
e:/solution/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
c:/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
c:/typescript/node_modules/@types/react-router-dom/package.json: *new*
  {}
c:/typescript/node_modules/@types/react/package.json: *new*
  {}
e:/solution/myproject/node_modules/@types/prop-types/package.json: *new*
  {}
e:/solution/myproject/node_modules/@types/react/package.json: *new*
  {}
e:/solution/myproject/node_modules/react-router-dom/package.json: *new*
  {}

FsWatchesRecursive::
c:/typescript/node_modules: *new*
  {}
e:/solution/myproject/node_modules: *new*
  {}
e:/solution/myproject/node_modules/@types: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
c:/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
c:/typescript/node_modules/@types/react-router-dom/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
c:/typescript/node_modules/@types/react/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
e:/solution/myproject/node_modules/@types/prop-types/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
e:/solution/myproject/node_modules/@types/react/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
e:/solution/myproject/src/app.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

TI:: [hh:mm:ss:mss] Global cache location 'c:\typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location 'c:\typescript'
TI:: [hh:mm:ss:mss] Trying to find 'c:/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location 'c:\typescript'
TI:: [hh:mm:ss:mss] Npm config file: c:/typescript/package.json
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete

TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "c:/home/src/tslibs/TS/Lib/lib.d.ts",
        "e:/solution/myproject/src/app.js"
      ],
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "e:/solution/myproject/src",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/home/src/tslibs/TS/Lib/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "e:/solution/myproject/src/bower_components",
        "e:/solution/myproject/src/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "e:/solution/myproject/src/bower_components",
        "e:/solution/myproject/src/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/src/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/src/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: e:/solution/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typings": [],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "target": 1,
          "jsx": 1,
          "allowNonTsExtensions": true,
          "allowJs": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: e:/solution/myproject/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: e:/solution/myproject/src/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
e:/solution/myproject/jsconfig.json:
  {"pollingInterval":2000}
e:/solution/myproject/src/bower_components: *new*
  {"pollingInterval":500}
e:/solution/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
e:/solution/myproject/src/node_modules:
  {"pollingInterval":500}
e:/solution/myproject/src/node_modules/@types:
  {"pollingInterval":500}
e:/solution/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
e:/solution/myproject/tsconfig.json:
  {"pollingInterval":2000}
e:/solution/node_modules:
  {"pollingInterval":500}
e:/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
c:/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
c:/typescript/node_modules/@types/react-router-dom/package.json:
  {}
c:/typescript/node_modules/@types/react/package.json:
  {}
e:/solution/myproject/node_modules/@types/prop-types/package.json:
  {}
e:/solution/myproject/node_modules/@types/react/package.json:
  {}
e:/solution/myproject/node_modules/react-router-dom/package.json:
  {}
e:/solution/myproject/package.json: *new*
  {}

FsWatchesRecursive::
c:/typescript/node_modules:
  {}
e:/solution/myproject/node_modules:
  {}
e:/solution/myproject/node_modules/@types:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "e:/solution/myproject/src/app.js",
        "line": 5,
        "offset": 1
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is incomplete
Info seq  [hh:mm:ss:mss] collectAutoImports: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "React",
            "kind": "alias",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "Router",
            "kind": "alias",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "as",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "asserts",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "async",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "await",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "break",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "case",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "catch",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "class",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "console",
            "kind": "const",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "const",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "continue",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "debugger",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "default",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "delete",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "do",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "else",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "export",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "extends",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "false",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "finally",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "for",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "function",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "globalThis",
            "kind": "module",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "if",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "import",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "in",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "instanceof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "let",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "new",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "null",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "package",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "return",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "satisfies",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "super",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "switch",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "this",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "throw",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "true",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "try",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "typeof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "undefined",
            "kind": "var",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "using",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "var",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "void",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "while",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "with",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "yield",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Component",
            "kind": "class",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "e:/solution/myproject/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "Component",
              "exportMapKey": "9 * Component ",
              "fileName": "e:/solution/myproject/node_modules/@types/react/index.d.ts"
            }
          },
          {
            "name": "BrowserRouter",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          }
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      },
      "responseRequired": true
    }
After request
