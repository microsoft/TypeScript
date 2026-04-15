currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/index.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "esModuleInterop": true,
        "target": "es5",
        "module": "commonjs",
        "strict": true
    },
    "compileOnSave": true,
    "exclude": [
        "dist"
    ],
    "files": [],
    "include": [
        "src/*"
    ],
    "references": [
        { "path": "./test" }
    ]
}

tsgo -p tsconfig.json --showConfig
ExitStatus:: Success
Output::
{
    "compilerOptions": {
        "module": "commonjs",
        "strict": true,
        "target": "es5",
        "esModuleInterop": true,
        "useDefineForClassFields": false
    },
    "references": [
        {
            "path": "./test"
        }
    ],
    "files": [
        "./src/index.ts"
    ],
    "include": [
        "src/*"
    ],
    "exclude": [
        "dist"
    ]
}
