currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app.vue] *new* 
export const value = 1;
//// [/home/src/workspaces/project/node_modules/mapper/package.json] *new* 
{
	"name": "mapper",
	"version": "1.0.0",
	"typescript": { "contentMapper": { "exec": ["verbatim-mapper"] } }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": { "incremental": true, "noCheck": true },
    "contentMappers": [
        {
            "package": "mapper",
            "extensions": [".vue"],
            "options": { "plugins": [{ "name": 1 }] }
        }
    ]
}

tsgo --build --verbose --runExternalCode --pretty false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
HH:MM:SS AM - Projects in this build: 
    * tsconfig.json

HH:MM:SS AM - Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

HH:MM:SS AM - Building project 'tsconfig.json'...

tsconfig.json(7,48): error mapper123: Option 'name' requires a string.
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
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"checkPending":true,"root":[2],"contentMapperIdentities":["mapper@1.0.0:f8bda358cf5ca3162625594e4ea48580"],"fileNames":["lib.es2025.full.d.ts","./app.vue"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"524c966cec21221cb68a7d73bb38aaf5-export const value = 1;\u0000mapper@1.0.0:f8bda358cf5ca3162625594e4ea48580"],"semanticDiagnosticsPerFile":[1,2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "checkPending": true,
  "root": [
    {
      "files": [
        "./app.vue"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./app.vue"
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
      "fileName": "./app.vue",
      "version": "524c966cec21221cb68a7d73bb38aaf5-export const value = 1;\u0000mapper@1.0.0:f8bda358cf5ca3162625594e4ea48580",
      "signature": "524c966cec21221cb68a7d73bb38aaf5-export const value = 1;\u0000mapper@1.0.0:f8bda358cf5ca3162625594e4ea48580",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "semanticDiagnosticsPerFile": [
    "lib.es2025.full.d.ts",
    "./app.vue"
  ],
  "size": 1126
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*not cached* /home/src/workspaces/project/app.vue
Signatures::


Edit [0]:: no change

tsgo --build --verbose --runExternalCode --pretty false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
HH:MM:SS AM - Projects in this build: 
    * tsconfig.json

HH:MM:SS AM - Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

HH:MM:SS AM - Building project 'tsconfig.json'...

tsconfig.json(7,48): error mapper123: Option 'name' requires a string.

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*not cached* /home/src/workspaces/project/app.vue
Signatures::
