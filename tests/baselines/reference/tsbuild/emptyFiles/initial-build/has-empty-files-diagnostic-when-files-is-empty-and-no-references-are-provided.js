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
● [96msrc/no-references/tsconfig.json[0m:[93m3[0m:[93m14[0m TS18002
|     "files": [],
  [91m             ▔▔[0m
The 'files' list in config file '/src/no-references/tsconfig.json' is empty.


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


