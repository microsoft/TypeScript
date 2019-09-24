//// [/src/lib/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}
//# sourceMappingURL=a.d.ts.map

//// [/src/lib/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IAChB,CAAC,EAAE,CAAC,CAAC;IAAC,GAAG,EAAE,GAAG,CAAC;CAChB"}

//// [/src/lib/b.d.ts] file written with same contents
//// [/src/lib/b.d.ts.map] file written with same contents
//// [/src/lib/c.d.ts] file written with same contents
//// [/src/lib/c.d.ts.map] file written with same contents
//// [/src/lib/index.d.ts] file written with same contents
//// [/src/lib/index.d.ts.map] file written with same contents
//// [/src/src/a.ts]
import { B } from "./b";

export interface A {
  b: B; foo: any;
}


//// [/src/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "./src/c.ts": {
        "version": "429593025-import { A } from \"./a\";\n\nexport interface C {\n  a: A;\n}\n",
        "signature": "-21569163793-import { A } from \"./a\";\r\nexport interface C {\r\n    a: A;\r\n}\r\n//# sourceMappingURL=c.d.ts.map"
      },
      "./src/b.ts": {
        "version": "-2273488249-import { C } from \"./c\";\n\nexport interface B {\n  b: C;\n}\n",
        "signature": "25318058868-import { C } from \"./c\";\r\nexport interface B {\r\n    b: C;\r\n}\r\n//# sourceMappingURL=b.d.ts.map"
      },
      "./src/a.ts": {
        "version": "-14761736732-import { B } from \"./b\";\n\nexport interface A {\n  b: B; foo: any;\n}\n",
        "signature": "-11119001497-import { B } from \"./b\";\r\nexport interface A {\r\n    b: B;\r\n    foo: any;\r\n}\r\n//# sourceMappingURL=a.d.ts.map"
      },
      "./src/index.ts": {
        "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
        "signature": "14762544269-export { A } from \"./a\";\r\nexport { B } from \"./b\";\r\nexport { C } from \"./c\";\r\n//# sourceMappingURL=index.d.ts.map"
      }
    },
    "options": {
      "incremental": true,
      "target": 1,
      "module": 1,
      "declaration": true,
      "declarationMap": true,
      "sourceMap": true,
      "outDir": "./lib",
      "composite": true,
      "strict": true,
      "esModuleInterop": true,
      "alwaysStrict": true,
      "rootDir": "./src",
      "emitDeclarationOnly": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./src/a.ts": [
        "./src/b.ts"
      ],
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ],
      "./src/index.ts": [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/a.ts": [
        "./src/b.ts"
      ],
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ],
      "./src/index.ts": [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

