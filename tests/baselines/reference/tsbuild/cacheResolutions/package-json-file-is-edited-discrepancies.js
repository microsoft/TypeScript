0:: random edit
Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "../src/filea.ts": [
    "../src/fileb.mts"
  ]
}
Clean: {}
2:: Modify package.json file to remove type module and randmon edit
Clean build and incremental build differ in emit signature and latestChangedDtsFile since incremental persists it from previous build and clean has errors
TsBuild info text without affectedFilesPendingEmit:: /src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "emitSignatures": [
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "emitSignatures": [
      [
        "../src/randomfile.ts",
        "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n"
      ]
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}
3:: Delete package.json
Clean build and incremental build differ in emit signature and latestChangedDtsFile since incremental persists it from previous build and clean has errors
TsBuild info text without affectedFilesPendingEmit:: /src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "emitSignatures": [
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "emitSignatures": [
      [
        "../src/randomfile.ts",
        "-5110318392-export declare const x = 10;\r\nexport declare const y = 10;\r\n"
      ]
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}
5:: Delete package.json and random edit
Clean build and incremental build differ in emit signature and latestChangedDtsFile since incremental persists it from previous build and clean has errors
TsBuild info text without affectedFilesPendingEmit:: /src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-7156111517-export const x = 10;export const y = 10;export const z = 10;export const k = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "emitSignatures": [
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.es2016.full.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-7156111517-export const x = 10;export const y = 10;export const z = 10;export const k = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "emitSignatures": [
      [
        "../src/randomfile.ts",
        "-16481542517-export declare const x = 10;\r\nexport declare const y = 10;\r\nexport declare const z = 10;\r\n"
      ]
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}