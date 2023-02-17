TI:: Creating typing installer
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


TI:: [00:00:15.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:16.000] Processing cache location '/a/data/'
TI:: [00:00:17.000] Trying to find '/a/data/package.json'...
TI:: [00:00:18.000] Finished processing cache location '/a/data/'
TI:: [00:00:19.000] Npm config file: /a/data/package.json
TI:: [00:00:20.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:25.000] Updating types-registry npm package...
TI:: [00:00:26.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:33.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:34.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:35.000] request:
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
Before request

After request

Info 2    [00:00:36.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

Info 3    [00:00:37.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
After checking timeout queue length (1) and running
