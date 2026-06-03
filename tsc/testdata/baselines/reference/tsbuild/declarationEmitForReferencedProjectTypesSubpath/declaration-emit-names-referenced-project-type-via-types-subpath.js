currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/node_modules/@scope/consumer] -> /home/src/workspaces/solution/packages/consumer *new*
//// [/home/src/workspaces/solution/node_modules/@scope/dep] -> /home/src/workspaces/solution/packages/dep *new*
//// [/home/src/workspaces/solution/packages/consumer/package.json] *new* 
{
    "name": "@scope/consumer",
    "version": "1.0.0"
}
//// [/home/src/workspaces/solution/packages/consumer/src/index.ts] *new* 
import type { NewComponentTypes } from "@scope/dep"
declare const c: NewComponentTypes
export const style = c.formFieldLayout()
//// [/home/src/workspaces/solution/packages/consumer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "rootDir": "src",
        "outDir": "types",
        "declarationDir": "types",
        "strict": true
    },
    "include": ["src"],
    "references": [{ "path": "../dep" }]
}
//// [/home/src/workspaces/solution/packages/dep/package.json] *new* 
{
    "name": "@scope/dep",
    "version": "1.0.0",
    "exports": {
        "./src/*": "./src/*",
        "./types/*": "./types/*",
        ".": { "types": "./types/index.d.ts", "default": "./src/index.ts" }
    }
}
//// [/home/src/workspaces/solution/packages/dep/src/index.ts] *new* 
import type { ComponentTypes as NewComponentTypes } from "./themes/componentTypes/index.js"
export type { NewComponentTypes }
//// [/home/src/workspaces/solution/packages/dep/src/themes/componentTypes/formFieldLayout.ts] *new* 
export type FormFieldLayout = {
    textColor: string
    fontSize: string
}
export default FormFieldLayout
//// [/home/src/workspaces/solution/packages/dep/src/themes/componentTypes/index.ts] *new* 
import type FormFieldLayout from "./formFieldLayout.js"
export type ComponentTypes = {
    formFieldLayout: () => FormFieldLayout
}
//// [/home/src/workspaces/solution/packages/dep/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "rootDir": "src",
        "outDir": "types",
        "declarationDir": "types",
        "strict": true
    },
    "include": ["src"]
}

tsgo --b packages/consumer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/dep/tsconfig.json
    * packages/consumer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/dep/tsconfig.json' is out of date because output file 'packages/dep/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/dep/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'packages/consumer/tsconfig.json' is out of date because output file 'packages/consumer/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/consumer/tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
//// [/home/src/workspaces/solution/packages/consumer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.es2025.full.d.ts","../dep/types/themes/componentTypes/formFieldLayout.d.ts","../dep/types/themes/componentTypes/index.d.ts","../dep/types/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"2265bb6aae4ea44359eda1a1333669d7-export type FormFieldLayout = {\n    textColor: string;\n    fontSize: string;\n};\nexport default FormFieldLayout;\n","262c77b15a9433c1a517a42af08dabc4-import type FormFieldLayout from \"./formFieldLayout.js\";\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout;\n};\n","8c960f82affa27b6eaa999ea3cdac3e7-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\";\nexport type { NewComponentTypes };\n",{"version":"0eb11471bc41fb5a80fd0098368e8295-import type { NewComponentTypes } from \"@scope/dep\"\ndeclare const c: NewComponentTypes\nexport const style = c.formFieldLayout()","signature":"9cca47ad36e3ee3df7f98a27c15d37b0-export declare const style: import(\"@scope/dep/types/themes/componentTypes/formFieldLayout.js\").FormFieldLayout;\n","impliedNodeFormat":1}],"fileIdsList":[[4],[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"declarationDir":"./types","module":99,"outDir":"./types","rootDir":"./src","strict":true},"referencedMap":[[5,1],[4,2],[3,3]],"latestChangedDtsFile":"./types/index.d.ts"}
//// [/home/src/workspaces/solution/packages/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../dep/types/themes/componentTypes/formFieldLayout.d.ts",
    "../dep/types/themes/componentTypes/index.d.ts",
    "../dep/types/index.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "../dep/types/themes/componentTypes/formFieldLayout.d.ts",
      "version": "2265bb6aae4ea44359eda1a1333669d7-export type FormFieldLayout = {\n    textColor: string;\n    fontSize: string;\n};\nexport default FormFieldLayout;\n",
      "signature": "2265bb6aae4ea44359eda1a1333669d7-export type FormFieldLayout = {\n    textColor: string;\n    fontSize: string;\n};\nexport default FormFieldLayout;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../dep/types/themes/componentTypes/index.d.ts",
      "version": "262c77b15a9433c1a517a42af08dabc4-import type FormFieldLayout from \"./formFieldLayout.js\";\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout;\n};\n",
      "signature": "262c77b15a9433c1a517a42af08dabc4-import type FormFieldLayout from \"./formFieldLayout.js\";\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout;\n};\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../dep/types/index.d.ts",
      "version": "8c960f82affa27b6eaa999ea3cdac3e7-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\";\nexport type { NewComponentTypes };\n",
      "signature": "8c960f82affa27b6eaa999ea3cdac3e7-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\";\nexport type { NewComponentTypes };\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/index.ts",
      "version": "0eb11471bc41fb5a80fd0098368e8295-import type { NewComponentTypes } from \"@scope/dep\"\ndeclare const c: NewComponentTypes\nexport const style = c.formFieldLayout()",
      "signature": "9cca47ad36e3ee3df7f98a27c15d37b0-export declare const style: import(\"@scope/dep/types/themes/componentTypes/formFieldLayout.js\").FormFieldLayout;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0eb11471bc41fb5a80fd0098368e8295-import type { NewComponentTypes } from \"@scope/dep\"\ndeclare const c: NewComponentTypes\nexport const style = c.formFieldLayout()",
        "signature": "9cca47ad36e3ee3df7f98a27c15d37b0-export declare const style: import(\"@scope/dep/types/themes/componentTypes/formFieldLayout.js\").FormFieldLayout;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../dep/types/index.d.ts"
    ],
    [
      "../dep/types/themes/componentTypes/index.d.ts"
    ],
    [
      "../dep/types/themes/componentTypes/formFieldLayout.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationDir": "./types",
    "module": 99,
    "outDir": "./types",
    "rootDir": "./src",
    "strict": true
  },
  "referencedMap": {
    "./src/index.ts": [
      "../dep/types/index.d.ts"
    ],
    "../dep/types/index.d.ts": [
      "../dep/types/themes/componentTypes/index.d.ts"
    ],
    "../dep/types/themes/componentTypes/index.d.ts": [
      "../dep/types/themes/componentTypes/formFieldLayout.d.ts"
    ]
  },
  "latestChangedDtsFile": "./types/index.d.ts",
  "size": 2144
}
//// [/home/src/workspaces/solution/packages/consumer/types/index.d.ts] *new* 
export declare const style: import("@scope/dep/types/themes/componentTypes/formFieldLayout.js").FormFieldLayout;

//// [/home/src/workspaces/solution/packages/dep/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2025.full.d.ts","./src/themes/componentTypes/formFieldLayout.ts","./src/themes/componentTypes/index.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d384c9df99c755540ca5330780b4f5e5-export type FormFieldLayout = {\n    textColor: string\n    fontSize: string\n}\nexport default FormFieldLayout","signature":"2265bb6aae4ea44359eda1a1333669d7-export type FormFieldLayout = {\n    textColor: string;\n    fontSize: string;\n};\nexport default FormFieldLayout;\n","impliedNodeFormat":1},{"version":"7e5adf3645b6325e5ba90d41821e4802-import type FormFieldLayout from \"./formFieldLayout.js\"\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout\n}","signature":"262c77b15a9433c1a517a42af08dabc4-import type FormFieldLayout from \"./formFieldLayout.js\";\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout;\n};\n","impliedNodeFormat":1},{"version":"aac956f8322a5530cde691c46bad3b7d-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\"\nexport type { NewComponentTypes }","signature":"8c960f82affa27b6eaa999ea3cdac3e7-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\";\nexport type { NewComponentTypes };\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"declarationDir":"./types","module":99,"outDir":"./types","rootDir":"./src","strict":true},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./types/index.d.ts"}
//// [/home/src/workspaces/solution/packages/dep/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/themes/componentTypes/formFieldLayout.ts",
        "./src/themes/componentTypes/index.ts",
        "./src/index.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./src/themes/componentTypes/formFieldLayout.ts",
    "./src/themes/componentTypes/index.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "./src/themes/componentTypes/formFieldLayout.ts",
      "version": "d384c9df99c755540ca5330780b4f5e5-export type FormFieldLayout = {\n    textColor: string\n    fontSize: string\n}\nexport default FormFieldLayout",
      "signature": "2265bb6aae4ea44359eda1a1333669d7-export type FormFieldLayout = {\n    textColor: string;\n    fontSize: string;\n};\nexport default FormFieldLayout;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d384c9df99c755540ca5330780b4f5e5-export type FormFieldLayout = {\n    textColor: string\n    fontSize: string\n}\nexport default FormFieldLayout",
        "signature": "2265bb6aae4ea44359eda1a1333669d7-export type FormFieldLayout = {\n    textColor: string;\n    fontSize: string;\n};\nexport default FormFieldLayout;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/themes/componentTypes/index.ts",
      "version": "7e5adf3645b6325e5ba90d41821e4802-import type FormFieldLayout from \"./formFieldLayout.js\"\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout\n}",
      "signature": "262c77b15a9433c1a517a42af08dabc4-import type FormFieldLayout from \"./formFieldLayout.js\";\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout;\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7e5adf3645b6325e5ba90d41821e4802-import type FormFieldLayout from \"./formFieldLayout.js\"\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout\n}",
        "signature": "262c77b15a9433c1a517a42af08dabc4-import type FormFieldLayout from \"./formFieldLayout.js\";\nexport type ComponentTypes = {\n    formFieldLayout: () => FormFieldLayout;\n};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "aac956f8322a5530cde691c46bad3b7d-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\"\nexport type { NewComponentTypes }",
      "signature": "8c960f82affa27b6eaa999ea3cdac3e7-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\";\nexport type { NewComponentTypes };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "aac956f8322a5530cde691c46bad3b7d-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\"\nexport type { NewComponentTypes }",
        "signature": "8c960f82affa27b6eaa999ea3cdac3e7-import type { ComponentTypes as NewComponentTypes } from \"./themes/componentTypes/index.js\";\nexport type { NewComponentTypes };\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/themes/componentTypes/index.ts"
    ],
    [
      "./src/themes/componentTypes/formFieldLayout.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationDir": "./types",
    "module": 99,
    "outDir": "./types",
    "rootDir": "./src",
    "strict": true
  },
  "referencedMap": {
    "./src/index.ts": [
      "./src/themes/componentTypes/index.ts"
    ],
    "./src/themes/componentTypes/index.ts": [
      "./src/themes/componentTypes/formFieldLayout.ts"
    ]
  },
  "latestChangedDtsFile": "./types/index.d.ts",
  "size": 2350
}
//// [/home/src/workspaces/solution/packages/dep/types/index.d.ts] *new* 
import type { ComponentTypes as NewComponentTypes } from "./themes/componentTypes/index.js";
export type { NewComponentTypes };

//// [/home/src/workspaces/solution/packages/dep/types/themes/componentTypes/formFieldLayout.d.ts] *new* 
export type FormFieldLayout = {
    textColor: string;
    fontSize: string;
};
export default FormFieldLayout;

//// [/home/src/workspaces/solution/packages/dep/types/themes/componentTypes/index.d.ts] *new* 
import type FormFieldLayout from "./formFieldLayout.js";
export type ComponentTypes = {
    formFieldLayout: () => FormFieldLayout;
};


packages/dep/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/solution/packages/dep/src/themes/componentTypes/formFieldLayout.ts
*refresh*    /home/src/workspaces/solution/packages/dep/src/themes/componentTypes/index.ts
*refresh*    /home/src/workspaces/solution/packages/dep/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/packages/dep/src/themes/componentTypes/formFieldLayout.ts
(stored at emit) /home/src/workspaces/solution/packages/dep/src/themes/componentTypes/index.ts
(stored at emit) /home/src/workspaces/solution/packages/dep/src/index.ts

packages/consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/solution/packages/dep/types/themes/componentTypes/formFieldLayout.d.ts
*refresh*    /home/src/workspaces/solution/packages/dep/types/themes/componentTypes/index.d.ts
*refresh*    /home/src/workspaces/solution/packages/dep/types/index.d.ts
*refresh*    /home/src/workspaces/solution/packages/consumer/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/packages/consumer/src/index.ts
