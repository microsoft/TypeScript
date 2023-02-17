TI:: [00:00:31.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:32.000] Processing cache location '/a/data/'
TI:: [00:00:33.000] Trying to find '/a/data/package.json'...
TI:: [00:00:34.000] Finished processing cache location '/a/data/'
Info 0    [00:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:36.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/a.ts]
import { y, cc } from "./b";
import { something } from "something";
class c { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/b.ts]
export { cc } from "./c";
import { something } from "something";
                export const y = 10;

//// [/user/username/projects/myproject/c.ts]
export const cc = 10;

//// [/user/username/projects/myproject/node_modules/something/index.d.ts]
export const something = 10;

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

//// [/user/username/projects/myproject/tsconfig.json]
{}


Info 2    [00:00:37.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 3    [00:00:38.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 4    [00:00:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 5    [00:00:40.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a.ts


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a.ts
	  Root file specified for compilation

Info 6    [00:00:41.000] -----------------------------------------------
Info 7    [00:00:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 7    [00:00:43.000] 	Files (2)

Info 7    [00:00:44.000] -----------------------------------------------
Info 7    [00:00:45.000] Open files: 
Info 7    [00:00:46.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 7    [00:00:47.000] 		Projects: /dev/null/inferredProject1*
After request

Info 7    [00:00:48.000] response:
    {
      "responseRequired": false
    }
Info 8    [00:00:49.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 1,
        "offset": 23
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request

Info 9    [00:00:50.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/b.ts",
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 1
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 1,
            "offset": 23
          },
          "end": {
            "line": 1,
            "offset": 28
          }
        }
      },
      "responseRequired": true
    }