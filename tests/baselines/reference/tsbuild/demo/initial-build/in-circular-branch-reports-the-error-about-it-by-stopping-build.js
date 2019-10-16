//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig.json --verbose
12:00:00 AM - Projects in this build: 
    * src/animals/tsconfig.json
    * src/zoo/tsconfig.json
    * src/core/tsconfig.json
    * src/tsconfig.json

error TS6202: Project references may not form a circular graph. Cycle detected: /src/tsconfig.json
/src/core/tsconfig.json
/src/zoo/tsconfig.json
/src/animals/tsconfig.json
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

