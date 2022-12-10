3:: Delete package.json
Buildinfo is not re-written so it has package.json map from before in incremental and no package.json map in clean build
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
        "version": "-9547279430-export const x = 10;export const y = 10;",
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
            "code": 1479,
            "category": 1,
            "messageText": {
              "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
              "category": 1,
              "code": 1479,
              "next": [
                {
                  "messageText": "To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ \"type\": \"module\" }`.",
                  "category": 3,
                  "code": 1480
                }
              ]
            }
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 23
          },
          "resolutionId": 1,
          "resolvedModule": "../src/fileB.mts"
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./fileB.mjs",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../src/fileB.mts"
          },
          "mode": "commonjs"
        }
      ],
      "modules": [
        {
          "dir": "../src",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./fileB.mjs",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../src/fileB.mts"
              },
              "mode": "commonjs"
            }
          ]
        }
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
        "version": "-9547279430-export const x = 10;export const y = 10;",
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
            "code": 1479,
            "category": 1,
            "messageText": {
              "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
              "category": 1,
              "code": 1479,
              "next": [
                {
                  "messageText": "To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/src/projects/project/package.json'.",
                  "category": 3,
                  "code": 1481
                }
              ]
            }
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 23
          },
          "resolutionId": 1,
          "resolvedModule": "../src/fileB.mts"
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./fileB.mjs",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../src/fileB.mts"
          },
          "mode": "commonjs"
        }
      ],
      "modules": [
        {
          "dir": "../src",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./fileB.mjs",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../src/fileB.mts"
              },
              "mode": "commonjs"
            }
          ]
        }
      ],
      "packageJsons": [
        [
          "../src/a",
          "../package.json"
        ],
        [
          "../src/b/ba",
          "../package.json"
        ],
        [
          "../src/c/ca/caa/caaa",
          "../package.json"
        ],
        [
          "../src/c/cb",
          "../package.json"
        ],
        [
          "../src/d/da/daa/daaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/e/ea/eaa/eaaa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/x/y/z",
          "../package.json"
        ],
        [
          "../src/f/fa/faa/faaa",
          "../package.json"
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}