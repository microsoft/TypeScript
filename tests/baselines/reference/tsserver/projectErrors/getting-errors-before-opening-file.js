Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/project/file.ts]
let x: number = false;

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


Info 1    [00:00:16.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/a/b/project/file.ts"
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 3    [00:00:18.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
After checking timeout queue length (1) and running
