//// [/lib/no-change-runOutput.txt]
/lib/tsc --b /src/tests --verbose
12:16:00 AM - Projects in this build: 
    * src/core/tsconfig.json
    * src/logic/tsconfig.json
    * src/tests/tsconfig.json

12:16:00 AM - Project 'src/core/tsconfig.json' is up to date because newest input 'src/core/anotherModule.ts' is older than oldest output 'src/core/anotherModule.js'

12:16:00 AM - Project 'src/logic/tsconfig.json' is up to date because newest input 'src/logic/index.ts' is older than oldest output 'src/logic/index.js'

12:16:00 AM - Project 'src/tests/tsconfig.json' is up to date because newest input 'src/tests/index.ts' is older than oldest output 'src/tests/index.js'

exitCode:: ExitStatus.Success
readFiles:: {
 "/src/tests/tsconfig.json": 1,
 "/src/core/tsconfig.json": 1,
 "/src/logic/tsconfig.json": 1,
 "/src/core/tsconfig.tsbuildinfo": 1,
 "/src/logic/tsconfig.tsbuildinfo": 1,
 "/src/tests/tsconfig.tsbuildinfo": 1
} 

