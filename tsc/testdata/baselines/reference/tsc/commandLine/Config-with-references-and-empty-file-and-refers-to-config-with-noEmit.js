currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/packages/pkg1/index.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/packages/pkg1/tsconfig.json] *new* 
{
                    "compilerOptions": {
                        "composite": true,
                        "noEmit": true
                    },
                    "files": [
                        "./index.ts",
                    ],
                }
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
                    "files": [],
                    "references": [
                        {
                            "path": "./packages/pkg1"
                        },
                    ],
                }

tsgo -p .
ExitStatus:: Success
Output::

