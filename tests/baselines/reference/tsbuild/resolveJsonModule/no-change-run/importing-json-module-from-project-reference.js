//// [/lib/no-change-runOutput.txt]
/lib/tsc --b src/tsconfig.json --verbose
12:04:00 AM - Projects in this build: 
    * src/strings/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

12:04:00 AM - Project 'src/strings/tsconfig.json' is up to date because newest input 'src/strings/foo.json' is older than oldest output 'src/strings/tsconfig.tsbuildinfo'

12:04:00 AM - Project 'src/main/tsconfig.json' is up to date because newest input 'src/main/index.ts' is older than oldest output 'src/main/index.js'

exitCode:: ExitStatus.Success


