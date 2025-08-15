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
    }
}
//// [/home/src/projects/configs/second/tsconfig.json] *new* 
{
    "files": ["${configDir}/main.ts"],
    "compilerOptions": {
        "declarationDir": "${configDir}/decls",
        "paths": {
            "@myscope/*": ["${configDir}/types/*"],
            "other/*": ["other/*"],
        },
        "baseUrl": "${configDir}",
    },
    "watchOptions": {
        "excludeFiles": ["${configDir}/main.ts"],
    },
}
//// [/home/src/projects/myproject/main.ts] *new* 
// some comment
export const y = 10;
import { x } from "@myscope/sometype";
//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts] *new* 
export const k = 10;
//// [/home/src/projects/myproject/src/secondary.ts] *new* 
// some comment
export const z = 10;
import { k } from "other/sometype2";
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
// some comment
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
        ],
        "other/*": [
            "other/*"
        ]
    },
    "traceResolution": true,
    "typeRoots": [
        "/home/src/projects/configs/first/root1",
        "/home/src/projects/myproject/root2",
        "/home/src/projects/configs/first/root3"
    ],
    "types": [],
    "baseUrl": "/home/src/projects/myproject",
    "configFilePath": "/home/src/projects/myproject/tsconfig.json",
    "pathsBasePath": "/home/src/projects/configs/second",
    "showConfig": true
}
