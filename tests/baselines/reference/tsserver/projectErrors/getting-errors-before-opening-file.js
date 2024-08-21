currentDirectory:: /home/src/vscode/projects/bin useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/ts/lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/b/project/file.ts]
let x: number = false;

//// [/home/src/tslibs/ts/lib/lib.d.ts]
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
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/a/b/project/file.ts"
        ]
      },
      "seq": 1,
      "type": "request"
    }
After request

Timeout callback:: count: 1
1: checkOne *new*

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 1
      }
    }
After running Timeout callback:: count: 0
