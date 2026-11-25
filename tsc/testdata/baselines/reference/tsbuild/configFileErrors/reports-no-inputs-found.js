currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{ "include": ["missing.ts"] }

tsc --b
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.json'. Specified 'include' paths were '["missing.ts"]' and 'exclude' paths were '[]'.

Found 1 error.

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [],
  "size": 51
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
