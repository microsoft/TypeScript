currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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



Output::
/lib/tsc 
Version FakeTSVersion
tsc: The TypeScript Compiler - Version FakeTSVersion

COMMON COMMANDS

  tsc
  Compiles the current project (tsconfig.json in the working directory.)

  tsc app.ts util.ts
  Ignoring tsconfig.json, compiles the specified files with default compiler options.

  tsc -b
  Build a composite project in the working directory.

  tsc --init
  Creates a tsconfig.json with the recommended settings in the working directory.

  tsc -p ./path/to/tsconfig.json
  Compiles the TypeScript project located at the specified path.

  tsc --help --all
  An expanded version of this information, showing all possible compiler options

  tsc --noEmit
  tsc --target esnext
  Compiles the current project, with additional settings.

COMMAND LINE FLAGS

--help, -h
Print this message.

--watch, -w
Watch input files.

--all
Show all compiler options.

--version, -v
Print the compiler's version.

--init
Initializes a TypeScript project and creates a tsconfig.json file.

--project, -p
Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.

--build, -b
Build one or more projects and their dependencies, if out of date

--showConfig
Print the final configuration instead of building.

COMMON COMPILER OPTIONS

--pretty
Enable color and formatting in TypeScript's output to make compiler errors easier to read.
type: boolean
default: true

--declaration, -d
Generate .d.ts files from TypeScript and JavaScript files in your project.
type: boolean
default: `false`, unless `composite` is set

--declarationMap
Create sourcemaps for d.ts files.
type: boolean
default: false

--emitDeclarationOnly
Only output d.ts files and not JavaScript files.
type: boolean
default: false

--sourceMap
Create source map files for emitted JavaScript files.
type: boolean
default: false

--target, -t
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
one of: ES5, ES2015/ES6, ES2016, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ES2023, ESNext
default: ES5

--module, -m
Specify what module code is generated.
one of: None, CommonJS, AMD, UMD, System, ES2015/ES6, ES2020, ES2022, ESNext, Node16, NodeNext, Preserve
default: undefined

--lib
Specify a set of bundled library declaration files that describe the target runtime environment.
one or more: ES5, ES2015/ES6, ES2016/ES7, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ES2023, ESNext, DOM, DOM.Iterable, DOM.AsyncIterable, WebWorker, WebWorker.ImportScripts, WebWorker.Iterable, WebWorker.AsyncIterable, ScriptHost, ES2015.Core, ES2015.Collection, ES2015.Generator, ES2015.Iterable, ES2015.Promise, ES2015.Proxy, ES2015.Reflect, ES2015.Symbol, ES2015.Symbol.WellKnown, ES2016.Array.Includes/ES2016.Array.Include, ES2016.Intl, ES2017.Date, ES2017.Object, ES2017.SharedMemory, ES2017.String, ES2017.Intl, ES2017.TypedArrays/ES2017.TypedArray, ES2018.AsyncGenerator, ES2018.AsyncIterable/ESNext.AsyncIterable, ES2018.Intl, ES2018.Promise, ES2018.RegExp, ES2019.Array, ES2019.Object, ES2019.String, ES2019.Symbol/ESNext.Symbol, ES2019.Intl, ES2020.BigInt/ESNext.BigInt, ES2020.Date, ES2020.Promise, ES2020.SharedMemory, ES2020.String, ES2020.Symbol.WellKnown, ES2020.Intl, ES2020.Number, ES2021.Promise, ES2021.String, ES2021.WeakRef/ESNext.WeakRef, ES2021.Intl, ES2022.Array, ES2022.Error, ES2022.Intl, ES2022.Object, ES2022.SharedMemory, ES2022.String, ES2022.RegExp, ES2023.Array, ES2023.Collection, ES2023.Intl, ESNext.Array, ESNext.Collection, ESNext.Intl, ESNext.Disposable, ESNext.String, ESNext.Promise, ESNext.Decorators, ESNext.Object, ESNext.RegExp, Decorators, Decorators.Legacy
default: undefined

--allowJs
Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files.
type: boolean
default: false

--checkJs
Enable error reporting in type-checked JavaScript files.
type: boolean
default: false

--jsx
Specify what JSX code is generated.
one of: preserve, react, react-native, react-jsx, react-jsxdev
default: undefined

--outFile
Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output.

--outDir
Specify an output folder for all emitted files.

--removeComments
Disable emitting comments.
type: boolean
default: false

--noEmit
Disable emitting files from a compilation.
type: boolean
default: false

--strict
Enable all strict type-checking options.
type: boolean
default: false

--types
Specify type package names to be included without being referenced in a source file.

--esModuleInterop
Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility.
type: boolean
default: false

You can learn about all of the compiler options at https://aka.ms/tsc

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


