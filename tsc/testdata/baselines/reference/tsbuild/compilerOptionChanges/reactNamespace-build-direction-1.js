currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/index.tsx] *new* 
declare namespace React {
    function createElement(...args: any[]): any;
    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }
}
export const result = <div />;
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "jsx": "react",
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "reactNamespace": "Other",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.tsx"
    ]
}

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output file 'producer/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/index.tsx[0m:[93m5[0m:[93m23[0m - [91merror[0m[90m TS7026: [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m5[0m export const result = <div />;
[7m [0m [91m                      ~~~~~~~[0m

[96mproducer/index.tsx[0m:[93m5[0m:[93m24[0m - [91merror[0m[90m TS2874: [0mThis JSX tag requires 'Other' to be in scope, but it could not be found.

[7m5[0m export const result = <div />;
[7m [0m [91m                       ~~~[0m


Found 2 errors in the same file, starting at: producer/index.tsx[90m:5[0m

//// [/home/src/tslibs/TS/Lib/lib.es2020.d.ts] *Lib*
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
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
export declare const result: any;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.tsx"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;","signature":"ade73a776296d5caf71a4247dda83bca-export declare const result: any;\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"jsx":2,"module":99,"moduleResolution":100,"outDir":"./","reactNamespace":"Other","rootDir":"..","strict":true,"target":7},"semanticDiagnosticsPerFile":[[2,[{"pos":182,"end":189,"code":7026,"category":1,"messageKey":"JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists_7026","messageArgs":["IntrinsicElements"]},{"pos":183,"end":186,"code":2874,"category":1,"messageKey":"This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found_2874","messageArgs":["Other"]}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.tsx"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.tsx"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../index.tsx",
      "version": "de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;",
      "signature": "ade73a776296d5caf71a4247dda83bca-export declare const result: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;",
        "signature": "ade73a776296d5caf71a4247dda83bca-export declare const result: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "jsx": 2,
    "module": 99,
    "moduleResolution": 100,
    "outDir": "./",
    "reactNamespace": "Other",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "semanticDiagnosticsPerFile": [
    [
      "../index.tsx",
      [
        {
          "pos": 182,
          "end": 189,
          "code": 7026,
          "category": 1,
          "messageKey": "JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists_7026",
          "messageArgs": [
            "IntrinsicElements"
          ]
        },
        {
          "pos": 183,
          "end": 186,
          "code": 2874,
          "category": 1,
          "messageKey": "This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found_2874",
          "messageArgs": [
            "Other"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1817
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.tsx
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.tsx


Edit [0]:: no change

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/index.tsx[0m:[93m5[0m:[93m23[0m - [91merror[0m[90m TS7026: [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m5[0m export const result = <div />;
[7m [0m [91m                      ~~~~~~~[0m

[96mproducer/index.tsx[0m:[93m5[0m:[93m24[0m - [91merror[0m[90m TS2874: [0mThis JSX tag requires 'Other' to be in scope, but it could not be found.

[7m5[0m export const result = <div />;
[7m [0m [91m                       ~~~[0m


Found 2 errors in the same file, starting at: producer/index.tsx[90m:5[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: change reactNamespace without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "jsx": "react",
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "reactNamespace": "React",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.tsx"
    ]
}

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/index.tsx[0m:[93m5[0m:[93m23[0m - [91merror[0m[90m TS7026: [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m5[0m export const result = <div />;
[7m [0m [91m                      ~~~~~~~[0m

[96mproducer/index.tsx[0m:[93m5[0m:[93m24[0m - [91merror[0m[90m TS2874: [0mThis JSX tag requires 'Other' to be in scope, but it could not be found.

[7m5[0m export const result = <div />;
[7m [0m [91m                       ~~~[0m


Found 2 errors in the same file, starting at: producer/index.tsx[90m:5[0m

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
declare namespace React {
    function createElement(...args: any[]): any;
    namespace JSX {
        interface Element {
        }
        interface IntrinsicElements {
            div: {};
        }
    }
}
export declare const result: React.JSX.Element;
export {};

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.tsx"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;","signature":"3cdabc52f221e33d6ad352fb07711b0b-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: React.JSX.Element;\nexport {};\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"jsx":2,"module":99,"moduleResolution":100,"outDir":"./","reactNamespace":"React","rootDir":"..","strict":true,"target":7},"semanticDiagnosticsPerFile":[[2,[{"pos":182,"end":189,"code":7026,"category":1,"messageKey":"JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists_7026","messageArgs":["IntrinsicElements"]},{"pos":183,"end":186,"code":2874,"category":1,"messageKey":"This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found_2874","messageArgs":["Other"]}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.tsx"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.tsx"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../index.tsx",
      "version": "de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;",
      "signature": "3cdabc52f221e33d6ad352fb07711b0b-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: React.JSX.Element;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;",
        "signature": "3cdabc52f221e33d6ad352fb07711b0b-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: React.JSX.Element;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "jsx": 2,
    "module": 99,
    "moduleResolution": 100,
    "outDir": "./",
    "reactNamespace": "React",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "semanticDiagnosticsPerFile": [
    [
      "../index.tsx",
      [
        {
          "pos": 182,
          "end": 189,
          "code": 7026,
          "category": 1,
          "messageKey": "JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists_7026",
          "messageArgs": [
            "IntrinsicElements"
          ]
        },
        {
          "pos": 183,
          "end": 186,
          "code": 2874,
          "category": 1,
          "messageKey": "This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found_2874",
          "messageArgs": [
            "Other"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2063
}

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.tsx


Diff:: Changing reactNamespace retains the previous JSX namespace diagnostics.
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -0,0 +1,13 @@
+[96mproducer/index.tsx[0m:[93m5[0m:[93m23[0m - [91merror[0m[90m TS7026: [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
+
+[7m5[0m export const result = <div />;
+[7m [0m [91m                      ~~~~~~~[0m
+
+[96mproducer/index.tsx[0m:[93m5[0m:[93m24[0m - [91merror[0m[90m TS2874: [0mThis JSX tag requires 'Other' to be in scope, but it could not be found.
+
+[7m5[0m export const result = <div />;
+[7m [0m [91m                       ~~~[0m
+
+
+Found 2 errors in the same file, starting at: producer/index.tsx[90m:5[0m
+

Edit [2]:: no change

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/index.tsx[0m:[93m5[0m:[93m23[0m - [91merror[0m[90m TS7026: [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m5[0m export const result = <div />;
[7m [0m [91m                      ~~~~~~~[0m

[96mproducer/index.tsx[0m:[93m5[0m:[93m24[0m - [91merror[0m[90m TS2874: [0mThis JSX tag requires 'Other' to be in scope, but it could not be found.

[7m5[0m export const result = <div />;
[7m [0m [91m                       ~~~[0m


Found 2 errors in the same file, starting at: producer/index.tsx[90m:5[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Changing reactNamespace retains the previous JSX namespace diagnostics.
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -0,0 +1,13 @@
+[96mproducer/index.tsx[0m:[93m5[0m:[93m23[0m - [91merror[0m[90m TS7026: [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
+
+[7m5[0m export const result = <div />;
+[7m [0m [91m                      ~~~~~~~[0m
+
+[96mproducer/index.tsx[0m:[93m5[0m:[93m24[0m - [91merror[0m[90m TS2874: [0mThis JSX tag requires 'Other' to be in scope, but it could not be found.
+
+[7m5[0m export const result = <div />;
+[7m [0m [91m                       ~~~[0m
+
+
+Found 2 errors in the same file, starting at: producer/index.tsx[90m:5[0m
+

Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.tsx"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;","signature":"3cdabc52f221e33d6ad352fb07711b0b-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: React.JSX.Element;\nexport {};\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"jsx":2,"module":99,"moduleResolution":100,"outDir":"./","reactNamespace":"React","rootDir":"..","strict":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.tsx"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.tsx"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../index.tsx",
      "version": "de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;",
      "signature": "3cdabc52f221e33d6ad352fb07711b0b-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: React.JSX.Element;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "de50583c1e9540dc37098c752276a365-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX { interface Element {} interface IntrinsicElements { div: {} } }\n}\nexport const result = <div />;",
        "signature": "3cdabc52f221e33d6ad352fb07711b0b-declare namespace React {\n    function createElement(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: React.JSX.Element;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "jsx": 2,
    "module": 99,
    "moduleResolution": 100,
    "outDir": "./",
    "reactNamespace": "React",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1697
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.tsx
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.tsx


Edit [4]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.tsx' is older than output 'producer/dist/tsconfig.tsbuildinfo'


