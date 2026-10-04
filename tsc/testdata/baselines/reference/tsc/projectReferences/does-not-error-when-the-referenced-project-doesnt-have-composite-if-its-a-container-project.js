currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/primary/a.ts] *new* 
export { };
//// [/home/src/workspaces/project/primary/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": false,
        "outDir": "bin",
    }
}
//// [/home/src/workspaces/project/reference/b.ts] *new* 
import * as mod_1 from "../primary/a";
//// [/home/src/workspaces/project/reference/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "bin",
    },
    "files": [ ],
    "references": [{
        "path": "../primary"
    }]
}

tsgo --p reference/tsconfig.json
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/reference/bin/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","fileInfos":[],"options":{"composite":true,"outDir":"./"}}
//// [/home/src/workspaces/project/reference/bin/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "fileInfos": [],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "size": 85
}

reference/tsconfig.json::
SemanticDiagnostics::
Signatures::
