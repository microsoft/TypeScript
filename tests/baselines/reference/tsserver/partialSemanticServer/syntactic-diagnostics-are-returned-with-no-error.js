currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/a.ts]
if (a < (b + c) { }

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


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 3    [00:00:24.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 4    [00:00:25.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 5    [00:00:26.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "if (a < (b + c) { }"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a.ts
	  Root file specified for compilation

Info 6    [00:00:27.000] -----------------------------------------------
Info 7    [00:00:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 7    [00:00:29.000] 	Files (2)

Info 7    [00:00:30.000] -----------------------------------------------
Info 7    [00:00:31.000] Open files: 
Info 7    [00:00:32.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 7    [00:00:33.000] 		Projects: /dev/null/inferredProject1*
Info 7    [00:00:34.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 8    [00:00:35.000] request:
    {
      "type": "request",
      "seq": 2,
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      }
    }
Info 9    [00:00:36.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 17
          },
          "end": {
            "line": 1,
            "offset": 18
          },
          "text": "')' expected.",
          "code": 1005,
          "category": "error",
          "relatedInformation": [
            {
              "span": {
                "start": {
                  "line": 1,
                  "offset": 4
                },
                "end": {
                  "line": 1,
                  "offset": 5
                },
                "file": "/user/username/projects/myproject/a.ts"
              },
              "message": "The parser expected to find a ')' to match the '(' token here.",
              "category": "error",
              "code": 1007
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 10   [00:00:37.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/a.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 11   [00:00:38.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 12   [00:00:39.000] Session does not support events: ignored event: {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/a.ts","diagnostics":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":18},"text":"')' expected.","code":1005,"category":"error","relatedInformation":[{"span":{"start":{"line":1,"offset":4},"end":{"line":1,"offset":5},"file":"/user/username/projects/myproject/a.ts"},"message":"The parser expected to find a ')' to match the '(' token here.","category":"error","code":1007}]}]}}
Info 13   [00:00:40.000] Session does not support events: ignored event: {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
After checking timeout queue length (1) and running
