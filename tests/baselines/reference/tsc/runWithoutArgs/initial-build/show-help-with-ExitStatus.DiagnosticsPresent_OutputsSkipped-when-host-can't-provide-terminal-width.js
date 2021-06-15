Input::
//// [/lib/lib.d.ts]




Output::
/lib/tsc 
Version FakeTSVersion
tsc: The TypeScript Compiler - Version FakeTSVersion

[1mCOMMON COMMANDS[22m

  [34mtsc[39m
  Compiles the current project (tsconfig.json in the working directory.)

  [34mtsc app.ts util.ts[39m
  Ignoring tsconfig.json, compiles the specified files with default compiler options

  [34mtsc -b[39m
  Build a composite project in the working directory.

  [34mtsc --init[39m
  Creates a tsconfig.json with the recommended settings in the working directory.

  [34mtsc -p .path/to/tsconfig.json[39m
  Compiles the TypeScript project located at the specified path

  [34mtsc --help --all[39m
  An expanded version of this information, showing all possible compiler options

  [34mtsc --noEmit[39m
  [34mtsc --target esnext[39m
  Compiles the current project, with additional settings

[1mCOMMAND LINE FLAGS[22m

[34m--help, -h[39m
Print this message.

[34m--watch, -w[39m
Watch input files.

[34m--all[39m
Show all compiler options.

[34m--version, -v[39m
Print the compiler's version.

[34m--init[39m
Initializes a TypeScript project and creates a tsconfig.json file.

[34m--project, -p[39m
Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.

[34m--build, -b[39m
Build one or more projects and their dependencies, if out of date

[34m--showConfig[39m
Print the final configuration instead of building.

[1mCOMMON COMPILER OPTIONS[22m

[34m--pretty[39m
Enable color and formatting in output to make compiler errors easier to read
type: boolean
default: true

[34m--target, -t[39m
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
one of: es3, es5, es6, es2015, es2016, es2017, es2018, es2019, es2020, es2021, esnext
default: ES3

[34m--module, -m[39m
Specify what module code is generated.
one of: none, commonjs, amd, system, umd, es6, es2015, es2020, esnext

[34m--lib[39m
Specify a set of bundled library declaration files that describe the target runtime environment.
one or more: es5, es6, es2015, es7, es2016, es2017, es2018, es2019, es2020, es2021, esnext, dom, dom.iterable, webworker, webworker.importscripts, webworker.iterable, scripthost, es2015.core, es2015.collection, es2015.generator, es2015.iterable, es2015.promise, es2015.proxy, es2015.reflect, es2015.symbol, es2015.symbol.wellknown, es2016.array.include, es2017.object, es2017.sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es2018.asyncgenerator, es2018.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es2019.array, es2019.object, es2019.string, es2019.symbol, es2020.bigint, es2020.promise, es2020.sharedmemory, es2020.string, es2020.symbol.wellknown, es2020.intl, es2021.promise, es2021.string, es2021.weakref, esnext.array, esnext.symbol, esnext.asynciterable, esnext.intl, esnext.bigint, esnext.string, esnext.promise, esnext.weakref

[34m--allowJs[39m
Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.
type: boolean
default: false

[34m--checkJs[39m
Enable error reporting in type-checked JavaScript files.
type: boolean
default: false

[34m--jsx[39m
Specify what JSX code is generated.
one of: preserve, react-native, react, react-jsx, react-jsxdev
default: undefined

[34m--declaration, -d[39m
Generate .d.ts files from TypeScript and JavaScript files in your project.
type: boolean
default: `false`, unless `composite` is set

[34m--declarationMap[39m
Create sourcemaps for d.ts files.
type: boolean
default: false

[34m--emitDeclarationOnly[39m
Only output d.ts files and not JavaScript files.
type: boolean
default: false

[34m--sourceMap[39m
Create source map files for emitted JavaScript files.
type: boolean
default: false

[34m--outFile[39m
Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.

[34m--outDir[39m
Specify an output folder for all emitted files.

[34m--removeComments[39m
Disable emitting comments.
type: boolean
default: false

[34m--noEmit[39m
Disable emitting file from a compilation.
type: boolean
default: false

[34m--strict[39m
Enable all strict type-checking options.
type: boolean
default: false

[34m--types[39m
Specify type package names to be included without being referenced in a source file.

[34m--esModuleInterop[39m
Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.
type: boolean
default: false

You can learn about all of the compiler options at https://aka.ms/tsconfig-reference

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


