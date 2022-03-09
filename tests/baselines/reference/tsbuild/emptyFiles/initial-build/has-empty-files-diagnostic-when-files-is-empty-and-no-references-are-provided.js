Input::
//// [/lib/lib.d.ts]


//// [/src/core/index.ts]


//// [/src/core/tsconfig.json]


//// [/src/no-references/tsconfig.json]
{
    "references": [],
    "files": [],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    }
}


//// [/src/with-references/tsconfig.json]




Output::
/lib/tsc --b /src/no-references
[96msrc/no-references/tsconfig.json[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS18002: [0mThe 'files' list in config file '/src/no-references/tsconfig.json' is empty.

[7m3[0m     "files": [],
[7m [0m [91m             ~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


