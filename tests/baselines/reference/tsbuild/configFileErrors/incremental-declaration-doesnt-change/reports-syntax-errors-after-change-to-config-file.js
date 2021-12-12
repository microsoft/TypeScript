Input::
//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}



Output::
/lib/tsc --b /src/tsconfig.json
● [96msrc/tsconfig.json[0m:[93m8[0m:[93m9[0m TS1005
|         "b.ts"
  [91m        ▔▔▔▔▔▔[0m
',' expected.


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


