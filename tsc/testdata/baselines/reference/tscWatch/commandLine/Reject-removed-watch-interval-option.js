currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/first.ts] *new* 
export const a = 1
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "noEmit": true
    }
}

tsgo -w --watchInterval 1000
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[91merror[0m[90m TS5023: [0mUnknown compiler option '--watchInterval'.

