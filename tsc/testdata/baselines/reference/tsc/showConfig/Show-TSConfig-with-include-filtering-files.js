currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/extra.ts] *new* 
export const c = 3;
//// [/home/src/workspaces/project/src/main.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/src/util.ts] *new* 
export const b = 2;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true
    },
    "include": [
        "src/**/*"
    ]
}

tsgo -p tsconfig.json --showConfig
ExitStatus:: Success
Output::
{
    "compilerOptions": {
        "strict": true
    },
    "files": [
        "./src/main.ts",
        "./src/util.ts"
    ],
    "include": [
        "src/**/*"
    ]
}
