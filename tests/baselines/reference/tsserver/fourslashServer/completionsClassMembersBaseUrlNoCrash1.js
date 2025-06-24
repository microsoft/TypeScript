Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
//// [/home/src/tslibs/TS/Lib/lib.d.ts]
lib.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/home/src/workspaces/solution/app/node_modules/rxjs/index.d.ts]
export declare class Subject<T> {}

//// [/home/src/workspaces/solution/app/node_modules/rxjs/package.json]
{
  "name": "rxjs"
}

//// [/home/src/workspaces/solution/app/package.json]
{
  "name": "tabby"
}

//// [/home/src/workspaces/solution/app/tsconfig.json]
{}

//// [/home/src/workspaces/solution/node_modules/rxjs/index.d.ts]
export declare class Subject<T> {}

//// [/home/src/workspaces/solution/node_modules/rxjs/package.json]
{
  "name": "rxjs"
}

//// [/home/src/workspaces/solution/package.json]
{
  "name": "monorepo-like",
}

//// [/home/src/workspaces/solution/tabby-core/package.json]
{
  "name": "tabby-core"
}

//// [/home/src/workspaces/solution/tabby-core/src/index.ts]
import { Subject } from "rxjs";

export abstract class BaseTabComponent {
  protected recoveryStateChangedHint = new Subject<void>();
}

//// [/home/src/workspaces/solution/tabby-core/tsconfig.json]
{
  "extends": "../tsconfig.json"
}

//// [/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts]
import { BaseTabComponent } from "tabby-core";
export class SettingsTabComponent extends BaseTabComponent {
  
}

//// [/home/src/workspaces/solution/tabby-settings/package.json]
{
  "name": "tabby-settings",
  "peerDependencies": {
    "rxjs": "^7"
  }
}

//// [/home/src/workspaces/solution/tabby-settings/tsconfig.json]
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "src"
  }
}

//// [/home/src/workspaces/solution/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node",
    "paths": {
      "*": ["../../app/node_modules/*"],
      "tabby-*": ["../../tabby-*/src"],
    }
  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/solution/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/solution/package.json ProjectRootPath: undefined:: Result: /home/src/workspaces/solution/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/solution/tsconfig.json, currentDirectory: /home/src/workspaces/solution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tsconfig.json 2000 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/solution/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/solution/tabby-core/src/index.ts",
  "/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts"
 ],
 "options": {
  "moduleResolution": 2,
  "paths": {
   "*": [
    "../../app/node_modules/*"
   ],
   "tabby-*": [
    "../../tabby-*/src"
   ]
  },
  "pathsBasePath": "/home/src/workspaces/solution",
  "configFilePath": "/home/src/workspaces/solution/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/solution/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/solution/package.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution 1 undefined Config: /home/src/workspaces/solution/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution 1 undefined Config: /home/src/workspaces/solution/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-core/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/solution/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/rxjs/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/app/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/app/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-core 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-core 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/rxjs/package.json 2000 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/tabby-core 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/tabby-core 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/solution/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/solution/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/solution/node_modules/rxjs/index.d.ts Text-1 "export declare class Subject<T> {}"
	/home/src/workspaces/solution/tabby-core/src/index.ts Text-1 "import { Subject } from \"rxjs\";\n\nexport abstract class BaseTabComponent {\n  protected recoveryStateChangedHint = new Subject<void>();\n}"
	/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts Text-1 "import { BaseTabComponent } from \"tabby-core\";\nexport class SettingsTabComponent extends BaseTabComponent {\n  \n}"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
	node_modules/rxjs/index.d.ts
	  Imported via "rxjs" from file 'tabby-core/src/index.ts'
	tabby-core/src/index.ts
	  Matched by default include pattern '**/*'
	tabby-settings/components/settingsTab.component.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/solution/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/solution/package.json",
        "configFile": "/home/src/workspaces/solution/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/solution/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/solution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/solution/package.json SVC-1-0 "{\n  \"name\": \"monorepo-like\",\n}"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/solution/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/solution/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 0,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/solution/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/solution/node_modules/rxjs/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/solution/node_modules/rxjs/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/solution/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/solution/tabby-core/src/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/solution/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/app/node_modules: *new*
  {}
/home/src/tabby-core: *new*
  {}
/home/src/workspaces/node_modules: *new*
  {}
  {}
/home/src/workspaces/node_modules/@types: *new*
  {}
  {}
/home/src/workspaces/solution: *new*
  {}
/home/src/workspaces/solution/node_modules: *new*
  {}
  {}
/home/src/workspaces/solution/node_modules/@types: *new*
  {}
  {}
/home/src/workspaces/solution/tabby-core: *new*
  {}
/home/src/workspaces/solution/tabby-settings: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/solution/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/solution/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/solution/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/solution/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/solution/node_modules/rxjs/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/solution/tsconfig.json
/home/src/workspaces/solution/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/solution/tabby-core/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/solution/tsconfig.json
/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/solution/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/solution/tabby-settings/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/solution/tabby-settings/tsconfig.json, currentDirectory: /home/src/workspaces/solution/tabby-settings
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings/tsconfig.json 2000 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/solution/tabby-settings/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts"
 ],
 "options": {
  "moduleResolution": 2,
  "paths": {
   "*": [
    "../../app/node_modules/*"
   ],
   "tabby-*": [
    "../../tabby-*/src"
   ]
  },
  "pathsBasePath": "/home/src/workspaces/solution",
  "baseUrl": "/home/src/workspaces/solution/tabby-settings/src",
  "configFilePath": "/home/src/workspaces/solution/tabby-settings/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tsconfig.json 2000 undefined Config: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/solution/tabby-settings/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings 1 undefined Config: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings 1 undefined Config: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/app/node_modules/rxjs/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings/node_modules 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings/node_modules 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-core 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-core 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/app/node_modules 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/app/node_modules 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/app/node_modules/rxjs/package.json 2000 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/solution/tabby-settings/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/solution/tabby-settings/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/solution/app/node_modules/rxjs/index.d.ts Text-1 "export declare class Subject<T> {}"
	/home/src/workspaces/solution/tabby-core/src/index.ts Text-1 "import { Subject } from \"rxjs\";\n\nexport abstract class BaseTabComponent {\n  protected recoveryStateChangedHint = new Subject<void>();\n}"
	/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts Text-1 "import { BaseTabComponent } from \"tabby-core\";\nexport class SettingsTabComponent extends BaseTabComponent {\n  \n}"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.d.ts'
	../app/node_modules/rxjs/index.d.ts
	  Imported via "rxjs" from file '../tabby-core/src/index.ts'
	../tabby-core/src/index.ts
	  Imported via "tabby-core" from file 'components/settingsTab.component.ts'
	components/settingsTab.component.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tabby-settings/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject1*, currentDirectory: /home/src/workspaces/solution/tabby-settings
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/rxjs/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/home/src/workspaces/solution/node_modules/rxjs/index.d.ts Text-1 "export declare class Subject<T> {}"


	../node_modules/rxjs/index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/solution/tabby-settings/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts",
        "configFile": "/home/src/workspaces/solution/tabby-settings/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/solution/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	/home/src/workspaces/solution/node_modules/rxjs/index.d.ts
	/home/src/workspaces/solution/tabby-core/src/index.ts
	/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
	node_modules/rxjs/index.d.ts
	  Imported via "rxjs" from file 'tabby-core/src/index.ts'
	tabby-core/src/index.ts
	  Matched by default include pattern '**/*'
	tabby-settings/components/settingsTab.component.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution 1 undefined Config: /home/src/workspaces/solution/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution 1 undefined Config: /home/src/workspaces/solution/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/app/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/app/node_modules 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/tabby-core 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/tabby-core 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/tabby-core 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/tabby-core 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/tabby-settings 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/tabby-settings 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/node_modules/rxjs/package.json 2000 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/solution/tabby-settings/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/solution/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/solution/tabby-settings/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/app/node_modules/rxjs/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/solution/app/node_modules/rxjs/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/solution/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/node_modules/rxjs/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/node_modules/rxjs/package.json:
  {"pollingInterval":2000} *new*
/home/src/workspaces/solution/package.json:
  {"pollingInterval":250}
/home/src/workspaces/solution/tabby-core/src/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/tabby-settings/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/solution/tabby-settings/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/solution/tsconfig.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*

watchedFiles *deleted*::
/home/src/workspaces/solution/node_modules/rxjs/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {} *new*
  {}
/home/src/workspaces/node_modules/@types:
  {} *new*
  {}
/home/src/workspaces/solution/app/node_modules: *new*
  {}
/home/src/workspaces/solution/node_modules:
  {} *new*
  {}
/home/src/workspaces/solution/node_modules/@types:
  {} *new*
  {}
/home/src/workspaces/solution/tabby-core:
  {} *new*
/home/src/workspaces/solution/tabby-settings:
  {} *new*
/home/src/workspaces/solution/tabby-settings/node_modules: *new*
  {}
/home/src/workspaces/solution/tabby-settings/node_modules/@types: *new*
  {}

watchedDirectoriesRecursive *deleted*::
/home/src/app/node_modules:
  {}
/home/src/tabby-core:
  {}
/home/src/workspaces/node_modules:
  {}
/home/src/workspaces/node_modules/@types:
  {}
/home/src/workspaces/solution:
  {}
/home/src/workspaces/solution/node_modules:
  {}
/home/src/workspaces/solution/node_modules/@types:
  {}
/home/src/workspaces/solution/tabby-core:
  {}
/home/src/workspaces/solution/tabby-settings:
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/solution/tabby-settings/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/home/src/workspaces/solution/tsconfig.json (Configured) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/solution/tabby-settings/tsconfig.json *new*
        /home/src/workspaces/solution/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/solution/tabby-settings/tsconfig.json *new*
        /home/src/workspaces/solution/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/solution/tabby-settings/tsconfig.json *new*
        /home/src/workspaces/solution/tsconfig.json *deleted*
/home/src/workspaces/solution/app/node_modules/rxjs/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/solution/tabby-settings/tsconfig.json
/home/src/workspaces/solution/node_modules/rxjs/index.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/autoImportProviderProject1* *new*
        /home/src/workspaces/solution/tsconfig.json *deleted*
/home/src/workspaces/solution/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/solution/tabby-core/src/index.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/workspaces/solution/tabby-settings/tsconfig.json *new*
        /home/src/workspaces/solution/tsconfig.json *deleted*
/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/workspaces/solution/tabby-settings/tsconfig.json *default* *new*
        /home/src/workspaces/solution/tsconfig.json *deleted*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "preferences": {
          "includeCompletionsWithInsertText": true,
          "includeCompletionsWithClassMemberSnippets": true
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 2,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts",
        "line": 3,
        "offset": 3
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/app/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/app/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 3,
      "success": true,
      "body": {
        "flags": 0,
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "recoveryStateChangedHint",
            "kind": "property",
            "kindModifiers": "protected",
            "sortText": "11",
            "insertText": "protected recoveryStateChangedHint: Subject<void>;",
            "filterText": "recoveryStateChangedHint"
          },
          {
            "name": "abstract",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "accessor",
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
            "name": "constructor",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "declare",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "get",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "override",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "private",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "protected",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "public",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "set",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "static",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          }
        ],
        "defaultCommitCharacters": []
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/app/node_modules/rxjs/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/app/node_modules/rxjs/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/node_modules/rxjs/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/node_modules/rxjs/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/package.json:
  {"pollingInterval":250}
/home/src/workspaces/solution/tabby-core/src/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/tabby-settings/package.json:
  {"pollingInterval":250}
/home/src/workspaces/solution/tabby-settings/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/tsconfig.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/solution/app/node_modules:
  {}
  {} *new*
/home/src/workspaces/solution/node_modules:
  {}
  {}
/home/src/workspaces/solution/node_modules/@types:
  {}
  {}
/home/src/workspaces/solution/tabby-core:
  {}
/home/src/workspaces/solution/tabby-settings:
  {}
/home/src/workspaces/solution/tabby-settings/node_modules:
  {}
/home/src/workspaces/solution/tabby-settings/node_modules/@types:
  {}
