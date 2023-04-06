currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/node_modules/@angular/forms/forms.d.ts]
export declare class PatternValidator {}

//// [/node_modules/@angular/forms/package.json]
{ "name": "@angular/forms", "typings": "./forms.d.ts" }

//// [/tsconfig.json]
{ "compilerOptions": { "module": "commonjs" } }

//// [/package.json]
{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }

//// [/index.ts]


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


Info 1    [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:27.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 3    [00:00:28.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 4    [00:00:29.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 5    [00:00:30.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/index.ts SVC-1-0 ""


	a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Root file specified for compilation

Info 6    [00:00:31.000] -----------------------------------------------
Info 7    [00:00:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 7    [00:00:33.000] 	Files (2)

Info 7    [00:00:34.000] -----------------------------------------------
Info 7    [00:00:35.000] Open files: 
Info 7    [00:00:36.000] 	FileName: /index.ts ProjectRootPath: undefined
Info 7    [00:00:37.000] 		Projects: /dev/null/inferredProject1*
Info 7    [00:00:38.000] response:
    {
      "responseRequired": false
    }
After request
