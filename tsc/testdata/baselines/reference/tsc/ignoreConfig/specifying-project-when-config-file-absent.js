currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/c.ts] *new* 
export const c = 10;
//// [/home/src/workspaces/project/src/a.ts] *new* 
export const a = 10;
//// [/home/src/workspaces/project/src/b.ts] *new* 
export const b = 10;

tsgo -p .
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[91merror[0m[90m TS5081: [0mCannot find a tsconfig.json file at the current directory: /home/src/workspaces/project/tsconfig.json.

