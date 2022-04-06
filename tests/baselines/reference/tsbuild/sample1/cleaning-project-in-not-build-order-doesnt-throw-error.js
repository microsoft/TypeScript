Input::
//// [/lib/lib.d.ts]


//// [/src/core/anotherModule.d.ts]


//// [/src/core/anotherModule.d.ts.map]


//// [/src/core/anotherModule.js]


//// [/src/core/anotherModule.ts]


//// [/src/core/index.d.ts]


//// [/src/core/index.d.ts.map]


//// [/src/core/index.js]


//// [/src/core/index.ts]


//// [/src/core/some_decl.d.ts]


//// [/src/core/tsconfig.json]


//// [/src/core/tsconfig.tsbuildinfo]


//// [/src/logic/index.d.ts]


//// [/src/logic/index.js]


//// [/src/logic/index.js.map]


//// [/src/logic/index.ts]


//// [/src/logic/tsconfig.json]


//// [/src/logic/tsconfig.tsbuildinfo]


//// [/src/tests/index.d.ts]


//// [/src/tests/index.js]


//// [/src/tests/index.ts]


//// [/src/tests/tsconfig.json]


//// [/src/tests/tsconfig.tsbuildinfo]


//// [/src/ui/index.ts]


//// [/src/ui/tsconfig.json]




Output::
/lib/tsc --b /src/logic2 --clean
exitCode:: ExitStatus.InvalidProject_OutputsSkipped


