currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/c.ts] *new* 
export const c = 10;
//// [/home/src/workspaces/project/src/a.ts] *new* 
export const a = 10;
//// [/home/src/workspaces/project/src/b.ts] *new* 
export const b = 10;

tsgo -p . src/a.ts c.ts --ignoreConfig
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[91merror[0m[90m TS5042: [0mOption 'project' cannot be mixed with source files on a command line.

