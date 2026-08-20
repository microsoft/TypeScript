currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/bin/tool.ts] *new* 
export const b = 2;
//// [/home/src/workspaces/project/src/index.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "outDir": "./build"
    },
    "exclude": [
        "build"
    ]
}

tsgo -p tsconfig.json --showConfig
ExitStatus:: Success
Output::
{
    "compilerOptions": {
        "outDir": "./build",
        "strict": true
    },
    "files": [
        "./src/index.ts",
        "./src/bin/tool.ts"
    ],
    "exclude": [
        "build"
    ]
}
