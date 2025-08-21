currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.tsx] *new* 
declare namespace JSX {
    interface ElementChildrenAttribute { children: {}; }
    interface IntrinsicElements { div: {} }
}

declare var React: any;

declare function Component(props: never): any;
declare function Component(props: { children?: number }): any;
(<Component>
    <div />
    <div />
</Component>)
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true,
        "strict": true,
        "jsx": "react",
        "module": "esnext",
    },
}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.tsx[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m TS2769: [0mNo overload matches this call.
  The last overload gave the following error.
    Type '{ children: any[]; }' is not assignable to type '{ children?: number | undefined; }'.
      Types of property 'children' are incompatible.
        Type 'any[]' is not assignable to type 'number'.

[7m10[0m (<Component>
[7m  [0m [91m  ~~~~~~~~~[0m

  [96mindex.tsx[0m:[93m9[0m:[93m18[0m - The last overload is declared here.
    [7m9[0m declare function Component(props: { children?: number }): any;
    [7m [0m [96m                 ~~~~~~~~~[0m


Found 1 error in index.tsx[90m:10[0m

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
//// [/home/src/workspaces/project/index.js] *new* 
(React.createElement(Component, null, React.createElement("div", null), React.createElement("div", null)));

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./index.tsx"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"8ca521424834f2ae3377cc3ccc9dd3ef-declare namespace JSX {\n    interface ElementChildrenAttribute { children: {}; }\n    interface IntrinsicElements { div: {} }\n}\n\ndeclare var React: any;\n\ndeclare function Component(props: never): any;\ndeclare function Component(props: { children?: number }): any;\n(<Component>\n    <div />\n    <div />\n</Component>)","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"jsx":3,"module":99,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":265,"end":274,"code":2769,"category":1,"message":"No overload matches this call.","messageChain":[{"pos":265,"end":274,"code":2770,"category":1,"message":"The last overload gave the following error.","messageChain":[{"pos":265,"end":274,"code":2322,"category":1,"message":"Type '{ children: any[]; }' is not assignable to type '{ children?: number | undefined; }'.","messageChain":[{"pos":265,"end":274,"code":2326,"category":1,"message":"Types of property 'children' are incompatible.","messageChain":[{"pos":265,"end":274,"code":2322,"category":1,"message":"Type 'any[]' is not assignable to type 'number'."}]}]}]}],"relatedInformation":[{"pos":217,"end":226,"code":2771,"category":1,"message":"The last overload is declared here."}]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.tsx"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./index.tsx"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./index.tsx",
      "version": "8ca521424834f2ae3377cc3ccc9dd3ef-declare namespace JSX {\n    interface ElementChildrenAttribute { children: {}; }\n    interface IntrinsicElements { div: {} }\n}\n\ndeclare var React: any;\n\ndeclare function Component(props: never): any;\ndeclare function Component(props: { children?: number }): any;\n(<Component>\n    <div />\n    <div />\n</Component>)",
      "signature": "8ca521424834f2ae3377cc3ccc9dd3ef-declare namespace JSX {\n    interface ElementChildrenAttribute { children: {}; }\n    interface IntrinsicElements { div: {} }\n}\n\ndeclare var React: any;\n\ndeclare function Component(props: never): any;\ndeclare function Component(props: { children?: number }): any;\n(<Component>\n    <div />\n    <div />\n</Component>)",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8ca521424834f2ae3377cc3ccc9dd3ef-declare namespace JSX {\n    interface ElementChildrenAttribute { children: {}; }\n    interface IntrinsicElements { div: {} }\n}\n\ndeclare var React: any;\n\ndeclare function Component(props: never): any;\ndeclare function Component(props: { children?: number }): any;\n(<Component>\n    <div />\n    <div />\n</Component>)",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "jsx": 3,
    "module": 99,
    "strict": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.tsx",
      [
        {
          "pos": 265,
          "end": 274,
          "code": 2769,
          "category": 1,
          "message": "No overload matches this call.",
          "messageChain": [
            {
              "pos": 265,
              "end": 274,
              "code": 2770,
              "category": 1,
              "message": "The last overload gave the following error.",
              "messageChain": [
                {
                  "pos": 265,
                  "end": 274,
                  "code": 2322,
                  "category": 1,
                  "message": "Type '{ children: any[]; }' is not assignable to type '{ children?: number | undefined; }'.",
                  "messageChain": [
                    {
                      "pos": 265,
                      "end": 274,
                      "code": 2326,
                      "category": 1,
                      "message": "Types of property 'children' are incompatible.",
                      "messageChain": [
                        {
                          "pos": 265,
                          "end": 274,
                          "code": 2322,
                          "category": 1,
                          "message": "Type 'any[]' is not assignable to type 'number'."
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          "relatedInformation": [
            {
              "pos": 217,
              "end": 226,
              "code": 2771,
              "category": 1,
              "message": "The last overload is declared here."
            }
          ]
        }
      ]
    ]
  ],
  "size": 2109
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/index.tsx
Signatures::


Edit [0]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.tsx[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m TS2769: [0mNo overload matches this call.
  The last overload gave the following error.
    Type '{ children: any[]; }' is not assignable to type '{ children?: number | undefined; }'.
      Types of property 'children' are incompatible.
        Type 'any[]' is not assignable to type 'number'.

[7m10[0m (<Component>
[7m  [0m [91m  ~~~~~~~~~[0m

  [96mindex.tsx[0m:[93m9[0m:[93m18[0m - The last overload is declared here.
    [7m9[0m declare function Component(props: { children?: number }): any;
    [7m [0m [96m                 ~~~~~~~~~[0m


Found 1 error in index.tsx[90m:10[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
