TI:: Creating typing installer
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


TI:: [00:00:31.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:32.000] Processing cache location '/a/data/'
TI:: [00:00:33.000] Trying to find '/a/data/package.json'...
TI:: [00:00:34.000] Finished processing cache location '/a/data/'
TI:: [00:00:35.000] Npm config file: /a/data/package.json
TI:: [00:00:36.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:41.000] Updating types-registry npm package...
TI:: [00:00:42.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:49.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:50.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:51.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:52.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 3    [00:00:53.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: false Elapsed:: *ms
Info 4    [00:00:54.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 5    [00:00:55.000] 	Files (0) NoProgram

Info 6    [00:00:56.000] -----------------------------------------------
Info 7    [00:00:57.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 7    [00:00:58.000] 	Files (0) NoProgram

Info 7    [00:00:59.000] -----------------------------------------------
Info 7    [00:01:00.000] Open files: 
Info 7    [00:01:01.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 7    [00:01:02.000] 		Projects: /dev/null/inferredProject1*
After request

Info 7    [00:01:03.000] response:
    {
      "responseRequired": false
    }
Info 8    [00:01:04.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

Info 9    [00:01:05.000] Request: semanticDiagnosticsSync not allowed in LanguageServiceMode.Syntactic
Info 10   [00:01:06.000] LanguageService Operation: getSemanticDiagnostics not allowed in LanguageServiceMode.Syntactic