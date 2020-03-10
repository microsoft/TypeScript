//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
/lib/tsc --b /src/tsconfig.json
src/tsconfig.json(7,9): error TS1005: ',' expected.
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/a.ts]
export function foo() { }export function fooBar() { }

