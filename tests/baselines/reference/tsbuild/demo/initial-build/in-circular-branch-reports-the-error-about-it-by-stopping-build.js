//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig.json --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/animals/tsconfig.json
    * src/zoo/tsconfig.json
    * src/core/tsconfig.json
    * src/tsconfig.json

[91merror[0m[90m TS6202: [0mProject references may not form a circular graph. Cycle detected: /src/tsconfig.json
/src/core/tsconfig.json
/src/zoo/tsconfig.json
/src/animals/tsconfig.json


Found 1 error.

exitCode:: ExitStatus.ProjectReferenceCycle_OutputsSkupped


//// [/src/core/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/core",
    "rootDir": "."
  },
  "references": [
    {
      "path": "../zoo"
    }
  ]
}

