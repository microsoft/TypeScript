currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    },
    "files": ["index.ts"],
    "references": [
        { "path": true },
        { "circular": true },
        { "path": "./utils", "circular": "yes" },
        { "path": "" },
        { "path": "./valid", "circular": true }
    ]
}
//// [/home/src/workspaces/project/utils/index.ts] *new* 
export const y = 10;
//// [/home/src/workspaces/project/utils/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    },
    "files": ["index.ts"]
}
//// [/home/src/workspaces/project/valid/index.ts] *new* 
export const z = 10;
//// [/home/src/workspaces/project/valid/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    },
    "files": ["index.ts"]
}

tsgo --b --dry
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] A non-dry build would build project '/home/src/workspaces/project/utils/tsconfig.json'

[[90mHH:MM:SS AM[0m] A non-dry build would build project '/home/src/workspaces/project/valid/tsconfig.json'

[[90mHH:MM:SS AM[0m] A non-dry build would build project '/home/src/workspaces/project/tsconfig.json'

[96mtsconfig.json[0m:[93m7[0m:[93m19[0m - [91merror[0m[90m TS5024: [0mCompiler option 'reference.path' requires a value of type string.

[7m7[0m         { "path": true },
[7m [0m [91m                  ~~~~[0m

[96mtsconfig.json[0m:[93m8[0m:[93m9[0m - [91merror[0m[90m TS5024: [0mCompiler option 'reference.path' requires a value of type string.

[7m8[0m         { "circular": true },
[7m [0m [91m        ~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m9[0m:[93m42[0m - [91merror[0m[90m TS5024: [0mCompiler option 'reference.circular' requires a value of type boolean.

[7m9[0m         { "path": "./utils", "circular": "yes" },
[7m [0m [91m                                         ~~~~~[0m

[96mtsconfig.json[0m:[93m10[0m:[93m19[0m - [91merror[0m[90m TS18051: [0mCompiler option 'reference.path' cannot be given an empty string.

[7m10[0m         { "path": "" },
[7m  [0m [91m                  ~~[0m


Found 4 errors in the same file, starting at: tsconfig.json[90m:7[0m


