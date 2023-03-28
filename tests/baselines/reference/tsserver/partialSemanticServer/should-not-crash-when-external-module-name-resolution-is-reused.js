currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:33.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 3    [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 4    [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 5    [00:00:36.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "import { y, cc } from \"./b\";\nimport { something } from \"something\";\nclass c { prop = \"hello\"; foo() { return this.prop; } }"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a.ts
	  Root file specified for compilation

Info 6    [00:00:37.000] -----------------------------------------------
Info 7    [00:00:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 7    [00:00:39.000] 	Files (2)

Info 7    [00:00:40.000] -----------------------------------------------
Info 7    [00:00:41.000] Open files: 
Info 7    [00:00:42.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 7    [00:00:43.000] 		Projects: /dev/null/inferredProject1*
Info 7    [00:00:44.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 8    [00:00:45.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 9    [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:47.000] 	Files (2)

Info 9    [00:00:48.000] -----------------------------------------------
Info 9    [00:00:49.000] Open files: 
Info 9    [00:00:50.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 10   [00:00:51.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/c.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 11   [00:00:52.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 12   [00:00:53.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:54.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:55.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/c.ts SVC-1-0 "export const cc = 10;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/c.ts
	  Root file specified for compilation

Info 15   [00:00:56.000] -----------------------------------------------
Info 16   [00:00:57.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:58.000] 	Files (2)

Info 16   [00:00:59.000] -----------------------------------------------
Info 16   [00:01:00.000] Open files: 
Info 16   [00:01:01.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 16   [00:01:02.000] 		Projects: /dev/null/inferredProject1*
Info 16   [00:01:03.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 17   [00:01:04.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 18   [00:01:05.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 19   [00:01:06.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:01:07.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 21   [00:01:08.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/c.ts SVC-1-0 "export const cc = 10;"
	/user/username/projects/myproject/b.ts SVC-1-0 "export { cc } from \"./c\";\nimport { something } from \"something\";\n                export const y = 10;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/c.ts
	  Root file specified for compilation
	user/username/projects/myproject/b.ts
	  Root file specified for compilation

Info 22   [00:01:09.000] -----------------------------------------------
Info 23   [00:01:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:01:11.000] 	Files (3)

Info 23   [00:01:12.000] -----------------------------------------------
Info 23   [00:01:13.000] Open files: 
Info 23   [00:01:14.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 23   [00:01:15.000] 		Projects: /dev/null/inferredProject1*
Info 23   [00:01:16.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 23   [00:01:17.000] 		Projects: /dev/null/inferredProject1*
Info 23   [00:01:18.000] response:
    {
      "responseRequired": false
    }
After request
