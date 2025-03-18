
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::-w --watchInterval 1000

ExitStatus:: 1

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
Version 7.0.0-dev

tsc: The TypeScript Compiler - Version 7.0.0-dev

COMMON COMMANDS

  tsc
  Compiles the current project (tsconfig.json in the working directory.)

  tsc app.ts util.ts
  Ignoring tsconfig.json, compiles the specified files with default compiler options.

  tsc -b
  Build a composite project in the working directory.

  tsc --init
  Creates a tsconfig.json with the recommended settings in the working directory.

  tsc -p ./path/to/tsconfig.json
  Compiles the TypeScript project located at the specified path.

  tsc --help --all
  An expanded version of this information, showing all possible compiler options

  tsc --noEmit
  tsc --target esnext
  Compiles the current project, with additional settings.

COMMAND LINE FLAGS

COMMON COMPILER OPTIONS

You can learn about all of the compiler options at https://aka.ms/tsc


