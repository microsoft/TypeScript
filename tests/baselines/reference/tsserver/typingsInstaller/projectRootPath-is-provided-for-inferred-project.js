currentDirectory:: /user/username/projects/anotherProject useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/san2/x.js]
const aaaaaaav = 1;

//// [/user/username/projects/anotherProject/package.json]
{
  "devDependencies": {
    "pkgcurrentdirectory": ""
  }
}

//// [/user/username/projects/anotherProject/node_modules/pkgcurrentdirectory/package.json]
{
  "name": "pkgcurrentdirectory",
  "main": "index.js",
  "typings": "index.d.ts"
}

//// [/user/username/projects/anotherProject/node_modules/pkgcurrentdirectory/index.d.ts]
export function foo() { }

//// [/users/username/Library/Caches/typescript/2.7/package.json]
{
  "devDependencies": {}
}

//// [/users/username/Library/Caches/typescript/2.7/package-lock.json]
{
  "dependencies": {}
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "module": "CommonJS",
          "target": "ES2016",
          "jsx": "Preserve",
          "experimentalDecorators": true,
          "allowJs": true,
          "allowSyntheticDefaultImports": true,
          "allowNonTsExtensions": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/san2/x.js",
        "projectRootPath": "/user/username/projects/san2"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/san2
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/san2/x.js :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/san2/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/san2/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/user/username/projects/san2/x.js SVC-1-0 "const aaaaaaav = 1;"


	x.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.es2016.full.d.ts: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/san2/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/san2/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/san2/tsconfig.json: *new*
  {"pollingInterval":2000}

TI:: [hh:mm:ss:mss] Global cache location '/users/username/Library/Caches/typescript/2.7', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/users/username/Library/Caches/typescript/2.7'
TI:: [hh:mm:ss:mss] Trying to find '/users/username/Library/Caches/typescript/2.7/package.json'...
TI:: [hh:mm:ss:mss] Loaded content of '/users/username/Library/Caches/typescript/2.7/package.json':
    {
      "devDependencies": {}
    }
TI:: [hh:mm:ss:mss] Loaded content of '/users/username/Library/Caches/typescript/2.7/package-lock.json':
    {
      "dependencies": {}
    }
TI:: [hh:mm:ss:mss] Finished processing cache location '/users/username/Library/Caches/typescript/2.7'
TI:: [hh:mm:ss:mss] Npm config file: /users/username/Library/Caches/typescript/2.7/package.json
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/users/username/Library/Caches/typescript/2.7/node_modules/types-registry/index.json]
{
  "entries": {
    "pkgcurrentdirectory": {
      "latest": "1.3.0",
      "ts2.0": "1.0.0",
      "ts2.1": "1.0.0",
      "ts2.2": "1.2.0",
      "ts2.3": "1.3.0",
      "ts2.4": "1.3.0",
      "ts2.5": "1.3.0",
      "ts2.6": "1.3.0",
      "ts2.7": "1.3.0"
    }
  }
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/user/username/projects/san2/x.js"
      ],
      "compilerOptions": {
        "module": 1,
        "target": 3,
        "jsx": 1,
        "experimentalDecorators": true,
        "allowJs": true,
        "allowSyntheticDefaultImports": true,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/user/username/projects/san2",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/san2/bower_components",
        "/user/username/projects/san2/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/user/username/projects/san2/bower_components",
        "/user/username/projects/san2/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "module": 1,
        "target": 3,
        "jsx": 1,
        "experimentalDecorators": true,
        "allowJs": true,
        "allowSyntheticDefaultImports": true,
        "allowNonTsExtensions": true,
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
          "module": 1,
          "target": 3,
          "jsx": 1,
          "experimentalDecorators": true,
          "allowJs": true,
          "allowSyntheticDefaultImports": true,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/san2/x.js ProjectRootPath: /user/username/projects/san2
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es2016.full.d.ts:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/san2/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/san2/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/san2/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/san2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/san2/tsconfig.json:
  {"pollingInterval":2000}
