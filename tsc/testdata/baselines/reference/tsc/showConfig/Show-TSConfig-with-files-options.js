currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::

tsgo --showConfig file0.ts file1.ts file2.ts
ExitStatus:: Success
Output::
{
    "compilerOptions": {},
    "files": [
        "./file0.ts",
        "./file1.ts",
        "./file2.ts"
    ]
}
