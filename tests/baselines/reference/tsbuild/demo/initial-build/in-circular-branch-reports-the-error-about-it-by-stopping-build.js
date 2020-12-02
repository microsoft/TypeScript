Input::
//// [/lib/lib.d.ts]


//// [/src/animals/animal.ts]


//// [/src/animals/dog.ts]


//// [/src/animals/index.ts]


//// [/src/animals/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/animals",
    "rootDir": ".",
  },
  "references": [
    { "path": "../core" }
  ]
}


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

//// [/src/core/utilities.ts]


//// [/src/tsconfig-base.json]
{
    "compilerOptions": {
        "declaration": true,
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "composite": true
    }
}

//// [/src/tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "./core"
    },
    {
      "path": "./animals"
    },
    {
      "path": "./zoo"
    }
  ]
}

//// [/src/zoo/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/zoo",
    "rootDir": "."
  },
  "references": [
    {
      "path": "../animals"
    }
  ]
}

//// [/src/zoo/zoo.ts]




Output::
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


