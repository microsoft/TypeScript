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


/home/src/tslibs/TS/Lib/tsc.js --help
Output::
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

[94m--showConfig[39m
Print the final configuration instead of building.

[94m--build, -b[39m
Build one or more projects and their dependencies, if out of date

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

[94m--noEmit[39m
Disable emitting files from a compilation.
type: boolean
default: false

[94m--target, -t[39m
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
one of: es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, esnext
default: es5

[94m--module, -m[39m
Specify what module code is generated.
one of: none, commonjs, amd, umd, system, es6/es2015, es2020, es2022, esnext, node16, node18, nodenext, preserve
default: undefined

[94m--lib[39m
Specify a set of bundled library declaration files that describe the target runtime environment.
one or more: es5, es6/es2015, es7/es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, esnext, dom, dom.iterable, dom.asynciterable, webworker, webworker.importscripts, webworker.iterable, webworker.asynciterable, scripthost, es2015.core, es2015.collection, es2015.generator, es2015.iterable, es2015.promise, es2015.proxy, es2015.reflect, es2015.symbol, es2015.symbol.wellknown, es2016.array.include, es2016.intl, es2017.arraybuffer, es2017.date, es2017.object, es2017.sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es2018.asyncgenerator, es2018.asynciterable/esnext.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es2019.array, es2019.object, es2019.string, es2019.symbol/esnext.symbol, es2019.intl, es2020.bigint/esnext.bigint, es2020.date, es2020.promise, es2020.sharedmemory, es2020.string, es2020.symbol.wellknown, es2020.intl, es2020.number, es2021.promise, es2021.string, es2021.weakref/esnext.weakref, es2021.intl, es2022.array, es2022.error, es2022.intl, es2022.object, es2022.string, es2022.regexp, es2023.array, es2023.collection, es2023.intl, es2024.arraybuffer, es2024.collection, es2024.object/esnext.object, es2024.promise, es2024.regexp/esnext.regexp, es2024.sharedmemory, es2024.string/esnext.string, esnext.array, esnext.collection, esnext.intl, esnext.disposable, esnext.promise, esnext.decorators, esnext.iterator, esnext.float16, decorators, decorators.legacy
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




exitCode:: ExitStatus.Success
