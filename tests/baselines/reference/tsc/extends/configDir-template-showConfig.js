currentDirectory:: /home/src/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/configs/first/tsconfig.json]
{
  "extends": "../second/tsconfig.json",
  "include": [
    "${configDir}/src"
  ],
  "compilerOptions": {
    "typeRoots": [
      "root1",
      "${configDir}/root2",
      "root3"
    ],
    "types": []
  }
}

//// [/home/src/projects/configs/second/tsconfig.json]
{
  "files": [
    "${configDir}/main.ts"
  ],
  "compilerOptions": {
    "declarationDir": "${configDir}/decls",
    "paths": {
      "@myscope/*": [
        "${configDir}/types/*"
      ],
      "other/*": [
        "other/*"
      ]
    },
    "baseUrl": "${configDir}"
  },
  "watchOptions": {
    "excludeFiles": [
      "${configDir}/main.ts"
    ]
  }
}

//// [/home/src/projects/myproject/tsconfig.json]
{
  "extends": "../configs/first/tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "outDir",
    "traceResolution": true
  }
}

//// [/home/src/projects/myproject/main.ts]
// some comment
export const y = 10;
import { x } from "@myscope/sometype";


//// [/home/src/projects/myproject/src/secondary.ts]
// some comment
export const z = 10;
import { k } from "other/sometype2";


//// [/home/src/projects/myproject/types/sometype.ts]
export const x = 10;


//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts]
export const k = 10;


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --showConfig
Output::
{
    "compilerOptions": {
        "declarationDir": "./decls",
        "paths": {
            "@myscope/*": [
                "/home/src/projects/myproject/types/*"
            ],
            "other/*": [
                "other/*"
            ]
        },
        "baseUrl": "./",
        "typeRoots": [
            "../configs/first/root1",
            "./root2",
            "../configs/first/root3"
        ],
        "types": [],
        "declaration": true,
        "outDir": "./outDir",
        "traceResolution": true
    },
    "watchOptions": {
        "excludeFiles": [
            "/home/src/projects/myproject/main.ts"
        ]
    },
    "files": [
        "./main.ts"
    ],
    "include": [
        "/home/src/projects/myproject/src"
    ],
    "exclude": [
        "/home/src/projects/myproject/outDir",
        "/home/src/projects/myproject/decls"
    ]
}



exitCode:: ExitStatus.Success
