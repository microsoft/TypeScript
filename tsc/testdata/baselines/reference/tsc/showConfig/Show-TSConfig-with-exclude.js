currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/index.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/test/test1.ts] *new* 
import { a } from "../src";
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true
    },
    "exclude": [
        "test"
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
        "./src/index.ts"
    ],
    "exclude": [
        "test"
    ]
}
