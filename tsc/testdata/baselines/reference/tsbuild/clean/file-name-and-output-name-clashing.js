currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/bar.ts] *new* 

//// [/home/src/workspaces/solution/index.js] *new* 

//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{
    "compilerOptions": { "allowJs": true }
}

tsgo --b --clean
ExitStatus:: Success
Output::

