Input::
//// [/lib/lib.d.ts]


//// [/src/2/second-output.d.ts]


//// [/src/2/second-output.d.ts.map]


//// [/src/2/second-output.js]


//// [/src/2/second-output.js.map]


//// [/src/2/second-output.tsbuildinfo]


//// [/src/first/bin/first-output.d.ts]


//// [/src/first/bin/first-output.d.ts.map]


//// [/src/first/bin/first-output.js]


//// [/src/first/bin/first-output.js.map]


//// [/src/first/bin/first-output.tsbuildinfo]


//// [/src/first/first_PART1.ts]


//// [/src/first/first_part2.ts]


//// [/src/first/first_part3.ts]


//// [/src/first/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "outFile": "./bin/first-output.js",
    "skipDefaultLibCheck": true,
  },
  "files": [
    "first_PART1.ts",
    "first_part2.ts",
    "first_part3.ts"
  ],
  "references": [
  ]
}


//// [/src/second/second_part1.ts]


//// [/src/second/second_part2.ts]


//// [/src/second/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "outFile": "../2/second-output.js",
    "skipDefaultLibCheck": true
  },
  "references": [
  ]
}


//// [/src/third/thirdjs/output/third-output.d.ts]


//// [/src/third/thirdjs/output/third-output.d.ts.map]


//// [/src/third/thirdjs/output/third-output.js]


//// [/src/third/thirdjs/output/third-output.js.map]


//// [/src/third/thirdjs/output/third-output.tsbuildinfo]


//// [/src/third/third_part1.ts]


//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "outFile": "./thirdjs/output/third-output.js",
    "skipDefaultLibCheck": true,
  },
  "files": [
    "third_part1.ts"
  ],
  "references": [
    { "path": "../first", "prepend": true },
    { "path": "../second", "prepend": true },
  ]
}




Output::
/lib/tsc --b /src/third --clean
exitCode:: ExitStatus.Success


//// [/src/2/second-output.d.ts] unlink
//// [/src/2/second-output.d.ts.map] unlink
//// [/src/2/second-output.js] unlink
//// [/src/2/second-output.js.map] unlink
//// [/src/2/second-output.tsbuildinfo] unlink
//// [/src/first/bin/first-output.d.ts] unlink
//// [/src/first/bin/first-output.d.ts.map] unlink
//// [/src/first/bin/first-output.js] unlink
//// [/src/first/bin/first-output.js.map] unlink
//// [/src/first/bin/first-output.tsbuildinfo] unlink
//// [/src/third/thirdjs/output/third-output.d.ts] unlink
//// [/src/third/thirdjs/output/third-output.d.ts.map] unlink
//// [/src/third/thirdjs/output/third-output.js] unlink
//// [/src/third/thirdjs/output/third-output.js.map] unlink
//// [/src/third/thirdjs/output/third-output.tsbuildinfo] unlink


Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/third --clean
exitCode:: ExitStatus.Success


