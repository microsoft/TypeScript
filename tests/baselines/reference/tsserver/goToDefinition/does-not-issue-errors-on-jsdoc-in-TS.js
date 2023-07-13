currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/packages/babel-loader/tsconfig.json]

{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"],
}


//// [/packages/babel-loader/src/index.ts]

declare class Stuff {
    /** For more thorough tests, use {@link checkFooIs} */
    checkFooLengthIs(len: number): void;

    checkFooIs(value: object): void;
}



Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "openFiles": [
          {
            "file": "/packages/babel-loader/src/index.ts",
            "fileContent": "\ndeclare class Stuff {\n    /** For more thorough tests, use {@link checkFooIs} */\n    checkFooLengthIs(len: number): void;\n\n    checkFooIs(value: object): void;\n}\n"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/babel-loader/src
Info seq  [hh:mm:ss:mss] For info: /packages/babel-loader/src/index.ts :: Config file name: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/babel-loader/tsconfig.json 2000 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /packages/babel-loader/tsconfig.json : {
 "rootNames": [
  "/packages/babel-loader/src/index.ts"
 ],
 "options": {
  "target": 5,
  "module": 1,
  "strict": true,
  "esModuleInterop": true,
  "rootDir": "/packages/babel-loader/src",
  "outDir": "/packages/babel-loader/dist",
  "configFilePath": "/packages/babel-loader/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/src 1 undefined Config: /packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/src 1 undefined Config: /packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2018.full.d.ts 500 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/babel-loader/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/packages/babel-loader/src/index.ts SVC-1-0 "\ndeclare class Stuff {\n    /** For more thorough tests, use {@link checkFooIs} */\n    checkFooLengthIs(len: number): void;\n\n    checkFooIs(value: object): void;\n}\n"


	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.es2018.full.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/packages/babel-loader/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/packages/babel-loader/src: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definition",
      "arguments": {
        "line": 3,
        "offset": 45,
        "file": "/packages/babel-loader/src/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/packages/babel-loader/src/index.ts",
          "start": {
            "line": 6,
            "offset": 5
          },
          "end": {
            "line": 6,
            "offset": 15
          },
          "contextStart": {
            "line": 6,
            "offset": 5
          },
          "contextEnd": {
            "line": 6,
            "offset": 37
          }
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/packages/babel-loader/src/index.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
