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

[1mCOMMON COMMANDS[22m

  [94mtsc[39m
  Compiles the current project (tsconfig.json in the working directory.)

  [94mtsc app.ts util.ts[39m
  Ignoring tsconfig.json, compiles the specified files with default compiler options.

  [94mtsc -b[39m
  Build a composite project in the working directory.

  [94mtsc --init[39m
  Creates a tsconfig.json with the recommended settings in the working directory.

  [94mtsc -p ./path/to/tsconfig.json[39m
  Compiles the TypeScript project located at the specified path.

  [94mtsc --help --all[39m
  An expanded version of this information, showing all possible compiler options

  [94mtsc --noEmit[39m
  [94mtsc --target esnext[39m
  Compiles the current project, with additional settings.

[1mCOMMAND LINE FLAGS[22m

[94m--help, -h[39m
Print this message.

[94m--watch, -w[39m
Watch input files.

[94m--all[39m
Show all compiler options.

[94m--version, -v[39m
Print the compiler's version.

[94m--init[39m
Initializes a TypeScript project and creates a tsconfig.json file.

[94m--project, -p[39m
Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.

[94m--build, -b[39m
Build one or more projects and their dependencies, if out of date

[94m--showConfig[39m
Print the final configuration instead of building.

[1mCOMMON COMPILER OPTIONS[22m

[94m--pretty[39m
Enable color and formatting in TypeScript's output to make compiler errors easier to read.
type: boolean
default: true

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

[94m--target, -t[39m
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
one of: ES5, ES2015/ES6, ES2016, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ES2023, ESNext
default: ES5

[94m--module, -m[39m
Specify what module code is generated.
one of: None, CommonJS, AMD, UMD, System, ES2015/ES6, ES2020, ES2022, ESNext, Node16, NodeNext, Preserve
default: undefined

[94m--lib[39m
Specify a set of bundled library declaration files that describe the target runtime environment.
one or more: ES5, ES2015/ES6, ES2016/ES7, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ES2023, ESNext, DOM, DOM.Iterable, DOM.AsyncIterable, WebWorker, WebWorker.ImportScripts, WebWorker.Iterable, WebWorker.AsyncIterable, ScriptHost, ES2015.Core, ES2015.Collection, ES2015.Generator, ES2015.Iterable, ES2015.Promise, ES2015.Proxy, ES2015.Reflect, ES2015.Symbol, ES2015.Symbol.WellKnown, ES2016.Array.Includes/ES2016.Array.Include, ES2016.Intl, ES2017.Date, ES2017.Object, ES2017.SharedMemory, ES2017.String, ES2017.Intl, ES2017.TypedArrays/ES2017.TypedArray, ES2018.AsyncGenerator, ES2018.AsyncIterable/ESNext.AsyncIterable, ES2018.Intl, ES2018.Promise, ES2018.RegExp, ES2019.Array, ES2019.Object, ES2019.String, ES2019.Symbol/ESNext.Symbol, ES2019.Intl, ES2020.BigInt/ESNext.BigInt, ES2020.Date, ES2020.Promise, ES2020.SharedMemory, ES2020.String, ES2020.Symbol.WellKnown, ES2020.Intl, ES2020.Number, ES2021.Promise, ES2021.String, ES2021.WeakRef/ESNext.WeakRef, ES2021.Intl, ES2022.Array, ES2022.Error, ES2022.Intl, ES2022.Object, ES2022.SharedMemory, ES2022.String, ES2022.RegExp, ES2023.Array, ES2023.Collection, ES2023.Intl, ESNext.Array, ESNext.Collection, ESNext.Intl, ESNext.Disposable, ESNext.String, ESNext.Promise, ESNext.Decorators, ESNext.Object, ESNext.RegExp, Decorators, Decorators.Legacy
default: undefined

[94m--allowJs[39m
Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files.
type: boolean
default: false

[94m--checkJs[39m
Enable error reporting in type-checked JavaScript files.
type: boolean
default: false

[94m--jsx[39m
Specify what JSX code is generated.
one of: preserve, react, react-native, react-jsx, react-jsxdev
default: undefined

[94m--outFile[39m
Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output.

[94m--outDir[39m
Specify an output folder for all emitted files.

[94m--removeComments[39m
Disable emitting comments.
type: boolean
default: false

[94m--noEmit[39m
Disable emitting files from a compilation.
type: boolean
default: false

[94m--strict[39m
Enable all strict type-checking options.
type: boolean
default: false

[94m--types[39m
Specify type package names to be included without being referenced in a source file.

[94m--esModuleInterop[39m
Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility.
type: boolean
default: false

You can learn about all of the compiler options at https://aka.ms/tsc

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


