currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/index.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "listFiles": false,
        "listEmittedFiles": false,
        "explainFiles": false
    },
    "files": ["src/index.ts"]
}

tsgo --showConfig
ExitStatus:: Success
Output::
{
    "compilerOptions": {
        "explainFiles": false
    },
    "files": [
        "./src/index.ts"
    ]
}
