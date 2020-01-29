//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
/lib/tsc --b /src/tsconfig.json
src/tsconfig.json(8,9): error TS1005: ',' expected.
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


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

