Input::
//// [/src/a.ts]
export function foo() { }export function fooBar() { }



Output::
/lib/tsc --b /src/tsconfig.json
● [96msrc/tsconfig.json[0m:[93m7[0m:[93m9[0m TS1005
|         "b.ts"
  [91m        ▔▔▔▔▔▔[0m
',' expected.


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


