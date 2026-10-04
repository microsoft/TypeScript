currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/c.ts] *new* 
export const c = 10;
//// [/home/src/workspaces/project/src/a.ts] *new* 
export const a = 10;
//// [/home/src/workspaces/project/src/b.ts] *new* 
export const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "include": ["src"],
}

tsgo src/a.ts
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[91merror[0m[90m TS5112: [0mtsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.

