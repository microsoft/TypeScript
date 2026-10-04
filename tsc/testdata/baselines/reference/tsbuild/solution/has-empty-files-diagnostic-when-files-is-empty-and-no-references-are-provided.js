currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/no-references/tsconfig.json] *new* 
{
    "references": [],
    "files": [],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true,
    },
}

tsgo --b no-references
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96mno-references/tsconfig.json[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS18002: [0mThe 'files' list in config file '/home/src/workspaces/solution/no-references/tsconfig.json' is empty.

[7m3[0m     "files": [],
[7m [0m [91m             ~~[0m


Found 1 error in no-references/tsconfig.json[90m:3[0m


