//// [/lib/no-change-runOutput.txt]
/lib/tsc --b /src --verbose
12:04:00 AM - Projects in this build: 
    * src/src/folder/tsconfig.json
    * src/src/folder2/tsconfig.json
    * src/src/tsconfig.json
    * src/tests/tsconfig.json
    * src/tsconfig.json

12:04:00 AM - Project 'src/src/folder/tsconfig.json' is up to date because newest input 'src/src/folder/index.ts' is older than oldest output 'src/src/folder/index.js'

12:04:00 AM - Project 'src/src/folder2/tsconfig.json' is up to date because newest input 'src/src/folder2/index.ts' is older than oldest output 'src/src/folder2/index.js'

12:04:00 AM - Project 'src/tests/tsconfig.json' is up to date because newest input 'src/tests/index.ts' is older than oldest output 'src/tests/index.js'

exitCode:: ExitStatus.Success


