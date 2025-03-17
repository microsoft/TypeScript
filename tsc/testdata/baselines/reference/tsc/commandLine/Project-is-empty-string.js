
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/first.ts] new file
export const a = 1
//// [/home/src/workspaces/project/tsconfig.json] new file
{ "compilerOptions": { "strict": true, "noEmit": true  } }

ExitStatus:: 0

ParsedCommandLine::{
    "parsedConfig": {
        "compilerOptions": {},
        "watchOptions": {
            "watchInterval": null,
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
    "raw": {},
    "compileOnSave": null
}
Output::
//// [/home/src/workspaces/project/first.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] no change

