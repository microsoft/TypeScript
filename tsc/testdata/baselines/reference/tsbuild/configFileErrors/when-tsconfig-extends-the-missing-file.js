currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/tsconfig.first.json] *new* 
{
    "extends": "./foobar.json",
    "compilerOptions": {
        "composite": true
    }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "./tsconfig.first.json" },
        { "path": "./tsconfig.second.json" }
    ]
}
//// [/home/src/workspaces/project/tsconfig.second.json] *new* 
{
    "extends": "./foobar.json",
    "compilerOptions": {
        "composite": true
    }
}

tsgo --b
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[91merror[0m[90m TS5083: [0mCannot read file '/home/src/workspaces/project/foobar.json'.
[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.first.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.
[91merror[0m[90m TS5083: [0mCannot read file '/home/src/workspaces/project/foobar.json'.
[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.second.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.

Found 4 errors.

//// [/home/src/workspaces/project/tsconfig.first.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"fileInfos":[],"options":{"composite":true}}
//// [/home/src/workspaces/project/tsconfig.first.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "fileInfos": [],
  "options": {
    "composite": true
  },
  "size": 85
}
//// [/home/src/workspaces/project/tsconfig.second.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"fileInfos":[],"options":{"composite":true}}
//// [/home/src/workspaces/project/tsconfig.second.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "fileInfos": [],
  "options": {
    "composite": true
  },
  "size": 85
}

tsconfig.first.json::
SemanticDiagnostics::
Signatures::

tsconfig.second.json::
SemanticDiagnostics::
Signatures::
