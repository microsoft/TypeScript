currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::

tsc --showConfig --someNonExistOption
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[91merror[0m[90m TS5023: [0mUnknown compiler option '--someNonExistOption'.

