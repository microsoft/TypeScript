
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::-w --watchInterval 1000
//// [/home/src/workspaces/project/first.ts] new file
export const a = 1
//// [/home/src/workspaces/project/tsconfig.json] new file
{ "compilerOptions": { "strict": true, "noEmit": true  } }

ExitStatus:: 0

ParsedCommandLine::{
    "parsedConfig": {
        "compilerOptions": {
            "watch": true
        },
        "watchOptions": {
            "watchInterval": 1000,
            "watchFile": 0,
            "watchDirectory": 0,
            "fallbackPolling": 0,
            "synchronousWatchDirectory": null,
            "excludeDirectories": null,
            "excludeFiles": null
        },
        "fileNames": [],
        "projectReferences": null
    },
    "configFile": null,
    "errors": [],
    "raw": {
        "watch": true,
        "watchInterval": 1000
    },
    "compileOnSave": null
}
Output::
No output
//// [/home/src/workspaces/project/first.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] no change

