Input::


Output::
/lib/tsc --b /src/tests --verbose --force
[[90m12:16:00 AM[0m] Projects in this build: 
    * src/core/tsconfig.json
    * src/logic/tsconfig.json
    * src/tests/tsconfig.json

[[90m12:16:00 AM[0m] Project 'src/core/tsconfig.json' is up to date because newest input 'src/core/anotherModule.ts' is older than oldest output 'src/core/anotherModule.js'

[[90m12:16:00 AM[0m] Building project '/src/core/tsconfig.json'...

[[90m12:16:00 AM[0m] Project 'src/logic/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:16:00 AM[0m] Building project '/src/logic/tsconfig.json'...

[[90m12:16:00 AM[0m] Project 'src/tests/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:16:00 AM[0m] Building project '/src/tests/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/core/anotherModule.d.ts] file written with same contents
//// [/src/core/anotherModule.d.ts.map] file written with same contents
//// [/src/core/anotherModule.js] file written with same contents
//// [/src/core/index.d.ts] file written with same contents
//// [/src/core/index.d.ts.map] file written with same contents
//// [/src/core/index.js] file written with same contents
//// [/src/core/tsconfig.tsbuildinfo] file written with same contents
//// [/src/logic/index.d.ts] file written with same contents
//// [/src/logic/index.js] file written with same contents
//// [/src/logic/index.js.map] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo] file written with same contents
//// [/src/tests/index.d.ts] file written with same contents
//// [/src/tests/index.js] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo] file written with same contents
