currentDirectory::/home/src/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/configs/first/tsconfig.json] *new* 
{
    "extends": "../second/tsconfig.json",
    "include": ["${configDir}/src"],
    "compilerOptions": {
        "typeRoots": ["root1", "${configDir}/root2", "root3"],
        "types": [],
    },
}
//// [/home/src/projects/configs/second/tsconfig.json] *new* 
{
    "files": ["${configDir}/main.ts"],
    "compilerOptions": {
        "declarationDir": "${configDir}/decls",
        "paths": {
            "@myscope/*": ["${configDir}/types/*"],
        },
    },
    "watchOptions": {
        "excludeFiles": ["${configDir}/main.ts"],
    },
}
//// [/home/src/projects/myproject/main.ts] *new* 
// some comment
export const y = 10;
import { x } from "@myscope/sometype";
//// [/home/src/projects/myproject/tsconfig.json] *new* 
{
    "extends": "../configs/first/tsconfig.json",
    "compilerOptions": {
        "declaration": true,
        "outDir": "outDir",
        "traceResolution": true,
    },
}
//// [/home/src/projects/myproject/types/sometype.ts] *new* 
export const x = 10;

tsgo --showConfig
ExitStatus:: Success
Output::
{
    "declaration": true,
    "declarationDir": "/home/src/projects/myproject/decls",
    "outDir": "/home/src/projects/myproject/outDir",
    "paths": {
        "@myscope/*": [
            "/home/src/projects/myproject/types/*"
        ]
    },
    "traceResolution": true,
    "typeRoots": [
        "/home/src/projects/configs/first/root1",
        "/home/src/projects/myproject/root2",
        "/home/src/projects/configs/first/root3"
    ],
    "types": [],
    "configFilePath": "/home/src/projects/myproject/tsconfig.json",
    "pathsBasePath": "/home/src/projects/configs/second",
    "showConfig": true
}
