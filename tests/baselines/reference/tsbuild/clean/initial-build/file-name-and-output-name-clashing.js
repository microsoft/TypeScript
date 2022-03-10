Input::
//// [/lib/lib.d.ts]


//// [/src/bar.ts]


//// [/src/index.js]


//// [/src/tsconfig.json]
{"compilerOptions":{"allowJs":true}}



Output::
/lib/tsc --b /src/tsconfig.json -clean
exitCode:: ExitStatus.Success


