
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::--lib es6  first.ts
//// [/home/src/workspaces/project/first.ts] new file
export const Key = Symbol()

ExitStatus:: 0

ParsedCommandLine::{
    "parsedConfig": {
        "compilerOptions": {
            "lib": [
                "lib.es2015.d.ts"
            ]
        },
        "watchOptions": {
            "watchInterval": null,
            "watchFile": 0,
            "watchDirectory": 0,
            "fallbackPolling": 0,
            "synchronousWatchDirectory": null,
            "excludeDirectories": null,
            "excludeFiles": null
        },
        "fileNames": [
            "first.ts"
        ],
        "projectReferences": null
    },
    "configFile": null,
    "errors": [],
    "raw": {
        "lib": [
            "lib.es2015.d.ts"
        ]
    },
    "compileOnSave": null
}
Output::
//// [/home/src/workspaces/project/first.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
exports.Key = Symbol();

//// [/home/src/workspaces/project/first.ts] no change

