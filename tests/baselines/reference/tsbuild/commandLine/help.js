currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/tslibs/TS/Lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js --build --help
Output::
Version FakeTSVersion
tsc: The TypeScript Compiler - Version FakeTSVersion

[1mBUILD OPTIONS[22m

Using --build, -b will make tsc behave more like a build orchestrator than a compiler. This is used to trigger building composite projects which you can learn more about at https://aka.ms/tsc-composite-builds

[94m--help, -h[39m
Print this message.

[94m--help, -?[39m


[94m--watch, -w[39m
Watch input files.

[94m--preserveWatchOutput[39m
Disable wiping the console in watch mode.
type: boolean
default: false

[94m--listFiles[39m
Print all of the files read during the compilation.
type: boolean
default: false

[94m--explainFiles[39m
Print files read during the compilation including why it was included.
type: boolean
default: false

[94m--listEmittedFiles[39m
Print the names of emitted files after a compilation.
type: boolean
default: false

[94m--pretty[39m
Enable color and formatting in TypeScript's output to make compiler errors easier to read.
type: boolean
default: true

[94m--traceResolution[39m
Log paths used during the 'moduleResolution' process.
type: boolean
default: false

[94m--diagnostics[39m
Output compiler performance information after building.
type: boolean
default: false

[94m--extendedDiagnostics[39m
Output more detailed compiler performance information after building.
type: boolean
default: false

[94m--generateCpuProfile[39m
Emit a v8 CPU profile of the compiler run for debugging.
type: string
default: profile.cpuprofile

[94m--generateTrace[39m
Generates an event trace and a list of types.

[94m--incremental, -i[39m
Save .tsbuildinfo files to allow for incremental compilation of projects.
type: boolean
default: `false`, unless `composite` is set

[94m--declaration, -d[39m
Generate .d.ts files from TypeScript and JavaScript files in your project.
type: boolean
default: `false`, unless `composite` is set

[94m--declarationMap[39m
Create sourcemaps for d.ts files.
type: boolean
default: false

[94m--emitDeclarationOnly[39m
Only output d.ts files and not JavaScript files.
type: boolean
default: false

[94m--sourceMap[39m
Create source map files for emitted JavaScript files.
type: boolean
default: false

[94m--inlineSourceMap[39m
Include sourcemap files inside the emitted JavaScript.
type: boolean
default: false

[94m--noCheck[39m
Disable full type checking (only critical parse and emit errors will be reported).
type: boolean
default: false

[94m--noEmit[39m
Disable emitting files from a compilation.
type: boolean
default: false

[94m--assumeChangesOnlyAffectDirectDependencies[39m
Have recompiles in projects that use 'incremental' and 'watch' mode assume that changes within a file will only affect files directly depending on it.
type: boolean
default: false

[94m--locale[39m
Set the language of the messaging from TypeScript. This does not affect emit.

[94m--verbose, -v[39m
Enable verbose logging.

[94m--dry, -d[39m
Show what would be built (or deleted, if specified with '--clean')

[94m--force, -f[39m
Build all projects, including those that appear to be up to date.

[94m--clean[39m
Delete the outputs of all projects.

[94m--stopBuildOnErrors[39m
Skip building downstream projects on error in upstream project.




exitCode:: ExitStatus.Success
