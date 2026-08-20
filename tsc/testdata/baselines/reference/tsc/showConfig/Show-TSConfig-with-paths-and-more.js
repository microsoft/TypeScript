currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/index.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "allowJs": true,
        "outDir": "./lib",
        "esModuleInterop": true,
        "module": "commonjs",
        "moduleResolution": "node",
        "target": "ES2017",
        "sourceMap": true,
        "baseUrl": ".",
        "paths": {
            "@root/*": ["./*"],
            "@configs/*": ["src/configs/*"],
            "@common/*": ["src/common/*"],
            "*": [
                "node_modules/*",
                "src/types/*"
            ]
        },
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "resolveJsonModule": true
    },
    "include": [
        "./src/**/*"
    ]
}

tsgo -p tsconfig.json --showConfig
ExitStatus:: Success
Output::
{
    "compilerOptions": {
        "allowJs": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "module": "commonjs",
        "moduleResolution": "node",
        "outDir": "./lib",
        "paths": {
            "@root/*": [
                "./*"
            ],
            "@configs/*": [
                "src/configs/*"
            ],
            "@common/*": [
                "src/common/*"
            ],
            "*": [
                "node_modules/*",
                "src/types/*"
            ]
        },
        "resolveJsonModule": true,
        "sourceMap": true,
        "target": "es2017",
        "baseUrl": "./",
        "esModuleInterop": true,
        "useDefineForClassFields": false
    },
    "files": [
        "./src/index.ts"
    ],
    "include": [
        "./src/**/*"
    ],
    "exclude": [
        "/home/src/workspaces/project/lib"
    ]
}
