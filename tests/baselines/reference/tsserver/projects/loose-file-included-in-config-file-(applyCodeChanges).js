Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/f1.ts]
let x =1;

//// [/user/username/projects/project/tsconfig.json]
{
  "compilerOptions": {},
  "files": [
    "f1.ts"
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "applyChangedToOpenFiles",
      "arguments": {
        "openFiles": [
          {
            "fileName": "/user/username/projects/project/f1.ts",
            "content": "let x =1;"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/Vscode/Projects/bin
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: false Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0) NoProgram

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/f1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/user/username/projects/project/f1.ts (Open) *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1* *default*
