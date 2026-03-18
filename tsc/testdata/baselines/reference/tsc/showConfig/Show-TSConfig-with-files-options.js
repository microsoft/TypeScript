currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::

tsgo --showConfig file0.ts file1.ts file2.ts
ExitStatus:: Success
Output::
{
    "compilerOptions": {},
    "files": [
        "./project/file0.ts",
        "./project/file1.ts",
        "./project/file2.ts"
    ]
}
