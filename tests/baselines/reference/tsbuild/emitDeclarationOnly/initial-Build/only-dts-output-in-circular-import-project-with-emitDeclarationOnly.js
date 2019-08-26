//// [/src/lib/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
}


//// [/src/lib/b.d.ts]
import { C } from "./c";
export interface B {
    b: C;
}


//// [/src/lib/c.d.ts]
import { A } from "./a";
export interface C {
    a: A;
}


//// [/src/lib/index.d.ts]
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";


//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "declaration": true,                   /* Generates corresponding '.d.ts' file. */
                    /* Generates a sourcemap for each corresponding '.d.ts' file. */
    "sourceMap": true,                     /* Generates corresponding '.map' file. */
    "outDir": "./lib",                        /* Redirect output structure to the directory. */
    "composite": true,                     /* Enable project compilation */
    "strict": true,                           /* Enable all strict type-checking options. */

    "esModuleInterop": true,                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    
    "alwaysStrict": true,
    "rootDir": "src",
    "emitDeclarationOnly": true
  } 
}


//// [/src/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397",
        "signature": "3858781397"
      },
      "./src/c.ts": {
        "version": "429593025",
        "signature": "-2697851509"
      },
      "./src/b.ts": {
        "version": "-2273488249",
        "signature": "20298635505"
      },
      "./src/a.ts": {
        "version": "-15463561693",
        "signature": "-4206296467"
      },
      "./src/index.ts": {
        "version": "1286756397",
        "signature": "-6009477228"
      }
    },
    "options": {
      "incremental": true,
      "target": 1,
      "module": 1,
      "declaration": true,
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

