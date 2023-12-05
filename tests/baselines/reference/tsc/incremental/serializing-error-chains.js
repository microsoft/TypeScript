currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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
interface ReadonlyArray<T> { readonly length: number }

//// [/src/project/index.tsx]
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

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "strict": true,
    "jsx": "react",
    "module": "esnext"
  }
}



Output::
/lib/tsc -p src/project
[96msrc/project/index.tsx[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m TS2746: [0mThis JSX tag's 'children' prop expects a single child of type 'never', but multiple children were provided.

[7m10[0m (<Component>
[7m  [0m [91m  ~~~~~~~~~[0m

[96msrc/project/index.tsx[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m TS2746: [0mThis JSX tag's 'children' prop expects a single child of type 'number | undefined', but multiple children were provided.

[7m10[0m (<Component>
[7m  [0m [91m  ~~~~~~~~~[0m

[96msrc/project/index.tsx[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m TS2769: [0mNo overload matches this call.
  This JSX tag's 'children' prop expects a single child of type 'never', but multiple children were provided.
  This JSX tag's 'children' prop expects a single child of type 'number | undefined', but multiple children were provided.

[7m10[0m (<Component>
[7m  [0m [91m  ~~~~~~~~~[0m



Found 3 errors in the same file, starting at: src/project/index.tsx[90m:10[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/index.js]
"use strict";
(React.createElement(Component, null,
    React.createElement("div", null),
    React.createElement("div", null)));


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./index.tsx"],"fileInfos":[{"version":"7198220534-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface ReadonlyArray<T> { readonly length: number }","affectsGlobalScope":true},{"version":"42569361247-declare namespace JSX {\n    interface ElementChildrenAttribute { children: {}; }\n    interface IntrinsicElements { div: {} }\n}\n\ndeclare var React: any;\n\ndeclare function Component(props: never): any;\ndeclare function Component(props: { children?: number }): any;\n(<Component>\n    <div />\n    <div />\n</Component>)","affectsGlobalScope":true}],"root":[2],"options":{"jsx":2,"module":99,"strict":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[2,[{"file":"./index.tsx","start":265,"length":9,"messageText":"This JSX tag's 'children' prop expects a single child of type 'never', but multiple children were provided.","category":1,"code":2746},{"file":"./index.tsx","start":265,"length":9,"messageText":"This JSX tag's 'children' prop expects a single child of type 'number | undefined', but multiple children were provided.","category":1,"code":2746},{"file":"./index.tsx","start":265,"length":9,"code":2769,"category":1,"messageText":{"messageText":"No overload matches this call.","category":1,"code":2769,"next":[{"code":2746,"category":1,"messageText":"This JSX tag's 'children' prop expects a single child of type 'never', but multiple children were provided."},{"code":2746,"category":1,"messageText":"This JSX tag's 'children' prop expects a single child of type 'number | undefined', but multiple children were provided."}]},"relatedInformation":[]}]]]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./index.tsx"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "7198220534-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface ReadonlyArray<T> { readonly length: number }",
          "affectsGlobalScope": true
        },
        "version": "7198220534-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface ReadonlyArray<T> { readonly length: number }",
        "signature": "7198220534-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface ReadonlyArray<T> { readonly length: number }",
        "affectsGlobalScope": true
      },
      "./index.tsx": {
        "original": {
          "version": "42569361247-declare namespace JSX {\n    interface ElementChildrenAttribute { children: {}; }\n    interface IntrinsicElements { div: {} }\n}\n\ndeclare var React: any;\n\ndeclare function Component(props: never): any;\ndeclare function Component(props: { children?: number }): any;\n(<Component>\n    <div />\n    <div />\n</Component>)",
          "affectsGlobalScope": true
        },
        "version": "42569361247-declare namespace JSX {\n    interface ElementChildrenAttribute { children: {}; }\n    interface IntrinsicElements { div: {} }\n}\n\ndeclare var React: any;\n\ndeclare function Component(props: never): any;\ndeclare function Component(props: { children?: number }): any;\n(<Component>\n    <div />\n    <div />\n</Component>)",
        "signature": "42569361247-declare namespace JSX {\n    interface ElementChildrenAttribute { children: {}; }\n    interface IntrinsicElements { div: {} }\n}\n\ndeclare var React: any;\n\ndeclare function Component(props: never): any;\ndeclare function Component(props: { children?: number }): any;\n(<Component>\n    <div />\n    <div />\n</Component>)",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./index.tsx"
      ]
    ],
    "options": {
      "jsx": 2,
      "module": 99,
      "strict": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./index.tsx",
        [
          {
            "file": "./index.tsx",
            "start": 265,
            "length": 9,
            "messageText": "This JSX tag's 'children' prop expects a single child of type 'never', but multiple children were provided.",
            "category": 1,
            "code": 2746
          },
          {
            "file": "./index.tsx",
            "start": 265,
            "length": 9,
            "messageText": "This JSX tag's 'children' prop expects a single child of type 'number | undefined', but multiple children were provided.",
            "category": 1,
            "code": 2746
          },
          {
            "file": "./index.tsx",
            "start": 265,
            "length": 9,
            "code": 2769,
            "category": 1,
            "messageText": {
              "messageText": "No overload matches this call.",
              "category": 1,
              "code": 2769,
              "next": [
                {
                  "code": 2746,
                  "category": 1,
                  "messageText": "This JSX tag's 'children' prop expects a single child of type 'never', but multiple children were provided."
                },
                {
                  "code": 2746,
                  "category": 1,
                  "messageText": "This JSX tag's 'children' prop expects a single child of type 'number | undefined', but multiple children were provided."
                }
              ]
            },
            "relatedInformation": []
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 2064
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p src/project
[96msrc/project/index.tsx[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m TS2746: [0mThis JSX tag's 'children' prop expects a single child of type 'never', but multiple children were provided.

[7m10[0m (<Component>
[7m  [0m [91m  ~~~~~~~~~[0m

[96msrc/project/index.tsx[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m TS2746: [0mThis JSX tag's 'children' prop expects a single child of type 'number | undefined', but multiple children were provided.

[7m10[0m (<Component>
[7m  [0m [91m  ~~~~~~~~~[0m

[96msrc/project/index.tsx[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m TS2769: [0mNo overload matches this call.
  This JSX tag's 'children' prop expects a single child of type 'never', but multiple children were provided.
  This JSX tag's 'children' prop expects a single child of type 'number | undefined', but multiple children were provided.

[7m10[0m (<Component>
[7m  [0m [91m  ~~~~~~~~~[0m



Found 3 errors in the same file, starting at: src/project/index.tsx[90m:10[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


