currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/common.d.ts] *new* 
export type OnValue = (value: number) => void
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
import { ValueProducerDeclaration, ValueProducerFromTs } from "@producer"
declare let v: ValueProducerDeclaration;
// n is implicitly any because onValue is actually any (despite what the tooltip says)
v.onValue = (n) => {
}
// n is implicitly number as expected
declare let v2: ValueProducerFromTs;
v2.onValue = (n) => {
}
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "paths": {
            "@producer": ["../producer/index"],
        },
    },
    "references": [
        { "path": "../producer" },
    ],
}
//// [/home/src/workspaces/project/producer/in-js.d.ts] *new* 
import { OnValue } from "@common"
export interface ValueProducerDeclaration {
    onValue: OnValue;
}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
export { ValueProducerDeclaration } from "./in-js"
import { OnValue } from "@common"
export interface ValueProducerFromTs {
    onValue: OnValue;
}
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "composite": true,
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "paths": {
            "@common": ["../common.d.ts"],
        },
    },
}

tsgo --b consumer --traceResolution -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json
    * consumer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output file 'producer/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

======== Resolving module '@common' from '/home/src/workspaces/project/producer/in-js.d.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
'paths' option is specified, looking for a pattern to match module name '@common'.
Module name '@common', matched pattern '@common'.
Trying substitution '../common.d.ts', candidate module location: '../common.d.ts'.
File '/home/src/workspaces/project/common.d.ts' exists - use it as a name resolution result.
======== Module name '@common' was successfully resolved to '/home/src/workspaces/project/common.d.ts'. ========
======== Resolving module './in-js' from '/home/src/workspaces/project/producer/index.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/producer/in-js', target file types: TypeScript, JavaScript, Declaration.
File '/home/src/workspaces/project/producer/in-js.ts' does not exist.
File '/home/src/workspaces/project/producer/in-js.tsx' does not exist.
File '/home/src/workspaces/project/producer/in-js.d.ts' exists - use it as a name resolution result.
======== Module name './in-js' was successfully resolved to '/home/src/workspaces/project/producer/in-js.d.ts'. ========
======== Resolving module '@common' from '/home/src/workspaces/project/producer/index.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
'paths' option is specified, looking for a pattern to match module name '@common'.
Module name '@common', matched pattern '@common'.
Trying substitution '../common.d.ts', candidate module location: '../common.d.ts'.
File '/home/src/workspaces/project/common.d.ts' exists - use it as a name resolution result.
======== Module name '@common' was successfully resolved to '/home/src/workspaces/project/common.d.ts'. ========
[[90mHH:MM:SS AM[0m] Project 'consumer/tsconfig.json' is out of date because output file 'consumer/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'consumer/tsconfig.json'...

======== Resolving module '@producer' from '/home/src/workspaces/project/consumer/index.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
'paths' option is specified, looking for a pattern to match module name '@producer'.
Module name '@producer', matched pattern '@producer'.
Trying substitution '../producer/index', candidate module location: '../producer/index'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/producer/index', target file types: TypeScript, JavaScript, Declaration.
File '/home/src/workspaces/project/producer/index.ts' exists - use it as a name resolution result.
======== Module name '@producer' was successfully resolved to '/home/src/workspaces/project/producer/index.ts'. ========
======== Resolving module './in-js' from '/home/src/workspaces/project/producer/index.ts'. ========
Using compiler options of project reference redirect '/home/src/workspaces/project/producer/tsconfig.json'.
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/producer/in-js', target file types: TypeScript, JavaScript, Declaration.
File '/home/src/workspaces/project/producer/in-js.ts' does not exist.
File '/home/src/workspaces/project/producer/in-js.tsx' does not exist.
File '/home/src/workspaces/project/producer/in-js.d.ts' exists - use it as a name resolution result.
======== Module name './in-js' was successfully resolved to '/home/src/workspaces/project/producer/in-js.d.ts'. ========
======== Resolving module '@common' from '/home/src/workspaces/project/producer/index.ts'. ========
Using compiler options of project reference redirect '/home/src/workspaces/project/producer/tsconfig.json'.
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
'paths' option is specified, looking for a pattern to match module name '@common'.
Module name '@common', matched pattern '@common'.
Trying substitution '../common.d.ts', candidate module location: '../common.d.ts'.
File '/home/src/workspaces/project/common.d.ts' exists - use it as a name resolution result.
======== Module name '@common' was successfully resolved to '/home/src/workspaces/project/common.d.ts'. ========
======== Resolving module '@common' from '/home/src/workspaces/project/producer/in-js.d.ts'. ========
Using compiler options of project reference redirect '/home/src/workspaces/project/producer/tsconfig.json'.
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
'paths' option is specified, looking for a pattern to match module name '@common'.
Module name '@common', matched pattern '@common'.
Trying substitution '../common.d.ts', candidate module location: '../common.d.ts'.
File '/home/src/workspaces/project/common.d.ts' exists - use it as a name resolution result.
======== Module name '@common' was successfully resolved to '/home/src/workspaces/project/common.d.ts'. ========
//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/consumer/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// n is implicitly any because onValue is actually any (despite what the tooltip says)
v.onValue = (n) => {
};
v2.onValue = (n) => {
};

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./index.ts"]}
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": "./index.ts"
    }
  ],
  "size": 49
}
//// [/home/src/workspaces/project/producer/index.d.ts] *new* 
export { ValueProducerDeclaration } from "./in-js";
import { OnValue } from "@common";
export interface ValueProducerFromTs {
    onValue: OnValue;
}

//// [/home/src/workspaces/project/producer/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/project/producer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[3,4]],"fileNames":["lib.esnext.full.d.ts","../common.d.ts","./in-js.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"3a9dc77bc99684cad72839382a1f46cb-export type OnValue = (value: number) => void","7677191ddc32f3fe5aa447395ff0553a-import { OnValue } from \"@common\"\nexport interface ValueProducerDeclaration {\n    onValue: OnValue;\n}",{"version":"3bb4cb1dd0764fa7c558b11ba246518a-export { ValueProducerDeclaration } from \"./in-js\"\nimport { OnValue } from \"@common\"\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}","signature":"846f65cd8d68b44b74d0de4a41b17245-export { ValueProducerDeclaration } from \"./in-js\";\nimport { OnValue } from \"@common\";\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n","impliedNodeFormat":1}],"fileIdsList":[[2],[2,3]],"options":{"composite":true,"module":199,"strict":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./in-js.d.ts",
        "./index.ts"
      ],
      "original": [
        3,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.esnext.full.d.ts",
    "../common.d.ts",
    "./in-js.d.ts",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.esnext.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../common.d.ts",
      "version": "3a9dc77bc99684cad72839382a1f46cb-export type OnValue = (value: number) => void",
      "signature": "3a9dc77bc99684cad72839382a1f46cb-export type OnValue = (value: number) => void",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./in-js.d.ts",
      "version": "7677191ddc32f3fe5aa447395ff0553a-import { OnValue } from \"@common\"\nexport interface ValueProducerDeclaration {\n    onValue: OnValue;\n}",
      "signature": "7677191ddc32f3fe5aa447395ff0553a-import { OnValue } from \"@common\"\nexport interface ValueProducerDeclaration {\n    onValue: OnValue;\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "3bb4cb1dd0764fa7c558b11ba246518a-export { ValueProducerDeclaration } from \"./in-js\"\nimport { OnValue } from \"@common\"\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}",
      "signature": "846f65cd8d68b44b74d0de4a41b17245-export { ValueProducerDeclaration } from \"./in-js\";\nimport { OnValue } from \"@common\";\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "3bb4cb1dd0764fa7c558b11ba246518a-export { ValueProducerDeclaration } from \"./in-js\"\nimport { OnValue } from \"@common\"\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}",
        "signature": "846f65cd8d68b44b74d0de4a41b17245-export { ValueProducerDeclaration } from \"./in-js\";\nimport { OnValue } from \"@common\";\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../common.d.ts"
    ],
    [
      "../common.d.ts",
      "./in-js.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 199,
    "strict": true
  },
  "referencedMap": {
    "./in-js.d.ts": [
      "../common.d.ts"
    ],
    "./index.ts": [
      "../common.d.ts",
      "./in-js.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1713
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/common.d.ts
*refresh*    /home/src/workspaces/project/producer/in-js.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/common.d.ts
*refresh*    /home/src/workspaces/project/producer/in-js.d.ts
*refresh*    /home/src/workspaces/project/producer/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
