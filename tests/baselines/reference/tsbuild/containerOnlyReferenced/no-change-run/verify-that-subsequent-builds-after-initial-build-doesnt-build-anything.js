//// [/lib/no-change-runOutput.txt]
/lib/tsc --b /src --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/src/folder/tsconfig.json
    * src/src/folder2/tsconfig.json
    * src/src/tsconfig.json
    * src/tests/tsconfig.json
    * src/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/src/folder/tsconfig.json' is up to date because newest input 'src/src/folder/index.ts' is older than oldest output 'src/src/folder/index.js'

[[90m12:04:00 AM[0m] Project 'src/src/folder2/tsconfig.json' is up to date because newest input 'src/src/folder2/index.ts' is older than oldest output 'src/src/folder2/index.js'

[[90m12:04:00 AM[0m] Project 'src/tests/tsconfig.json' is up to date because newest input 'src/tests/index.ts' is older than oldest output 'src/tests/index.js'

exitCode:: ExitStatus.Success


