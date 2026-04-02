currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/index.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "strict": true
    },
    "references": [
        { "path": "./packages/a" },
        { "path": "./packages/b" }
    ]
}

tsgo -p tsconfig.json --showConfig
ExitStatus:: Success
Output::
{
    "compilerOptions": {
        "composite": true,
        "strict": true,
        "declaration": true,
        "incremental": true
    },
    "references": [
        {
            "path": "./packages/a"
        },
        {
            "path": "./packages/b"
        }
    ]
}
