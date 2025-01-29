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


/home/src/tslibs/TS/Lib/tsc.js --help --all
Output::
tsc: The TypeScript Compiler - Version FakeTSVersion

[1mALL COMPILER OPTIONS[22m

### Command-line Options

[94m--all[39m
Show all compiler options.

[94m--build, -b[39m
Build one or more projects and their dependencies, if out of date

[94m--help, -h[39m
Print this message.

[94m--help, -?[39m


[94m--init[39m
Initializes a TypeScript project and creates a tsconfig.json file.

[94m--listFilesOnly[39m
Print names of files that are part of the compilation and then stop processing.

[94m--locale[39m
Set the language of the messaging from TypeScript. This does not affect emit.

[94m--project, -p[39m
Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.

[94m--showConfig[39m
Print the final configuration instead of building.

[94m--version, -v[39m
Print the compiler's version.

[94m--watch, -w[39m
Watch input files.

### Modules

[94m--allowArbitraryExtensions[39m
Enable importing files with any extension, provided a declaration file is present.
type: boolean
default: false

[94m--allowImportingTsExtensions[39m
Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.
type: boolean
default: false

[94m--allowUmdGlobalAccess[39m
Allow accessing UMD globals from modules.
type: boolean
default: false

[94m--baseUrl[39m
Specify the base directory to resolve non-relative module names.

[94m--customConditions[39m
Conditions to set in addition to the resolver-specific defaults when resolving imports.

[94m--module, -m[39m
Specify what module code is generated.
one of: none, commonjs, amd, umd, system, es6/es2015, es2020, es2022, esnext, node16, node18, nodenext, preserve
default: undefined

[94m--moduleResolution[39m
Specify how TypeScript looks up a file from a given module specifier.
one of: classic, node10, node16, nodenext, bundler
default: module === `AMD` or `UMD` or `System` or `ES6`, then `Classic`, Otherwise `Node`

[94m--moduleSuffixes[39m
List of file name suffixes to search when resolving a module.

[94m--noResolve[39m
Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project.
type: boolean
default: false

[94m--noUncheckedSideEffectImports[39m
Check side effect imports.
type: boolean
default: false

[94m--paths[39m
Specify a set of entries that re-map imports to additional lookup locations.
default: undefined

[94m--resolveJsonModule[39m
Enable importing .json files.
type: boolean
default: false

[94m--resolvePackageJsonExports[39m
Use the package.json 'exports' field when resolving package imports.
type: boolean
default: `true` when 'moduleResolution' is 'node16', 'nodenext', or 'bundler'; otherwise `false`.

[94m--resolvePackageJsonImports[39m
Use the package.json 'imports' field when resolving imports.
type: boolean
default: `true` when 'moduleResolution' is 'node16', 'nodenext', or 'bundler'; otherwise `false`.

[94m--rewriteRelativeImportExtensions[39m
Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files.
type: boolean
default: false

[94m--rootDir[39m
Specify the root folder within your source files.
type: string
default: Computed from the list of input files

[94m--rootDirs[39m
Allow multiple folders to be treated as one when resolving modules.
one or more: string
default: Computed from the list of input files

[94m--typeRoots[39m
Specify multiple folders that act like './node_modules/@types'.

[94m--types[39m
Specify type package names to be included without being referenced in a source file.

### JavaScript Support

[94m--allowJs[39m
Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files.
type: boolean
default: false

[94m--checkJs[39m
Enable error reporting in type-checked JavaScript files.
type: boolean
default: false

[94m--maxNodeModuleJsDepth[39m
Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'.
type: number
default: 0

### Interop Constraints

[94m--allowSyntheticDefaultImports[39m
Allow 'import x from y' when a module doesn't have a default export.
type: boolean
default: module === "system" or esModuleInterop

[94m--erasableSyntaxOnly[39m
Do not allow runtime constructs that are not part of ECMAScript.
type: boolean
default: false

[94m--esModuleInterop[39m
Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility.
type: boolean
default: false

[94m--forceConsistentCasingInFileNames[39m
Ensure that casing is correct in imports.
type: boolean
default: true

[94m--isolatedDeclarations[39m
Require sufficient annotation on exports so other tools can trivially generate declaration files.
type: boolean
default: false

[94m--isolatedModules[39m
Ensure that each file can be safely transpiled without relying on other imports.
type: boolean
default: false

[94m--preserveSymlinks[39m
Disable resolving symlinks to their realpath. This correlates to the same flag in node.
type: boolean
default: false

[94m--verbatimModuleSyntax[39m
Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.
type: boolean
default: false

### Type Checking

[94m--allowUnreachableCode[39m
Disable error reporting for unreachable code.
type: boolean
default: undefined

[94m--allowUnusedLabels[39m
Disable error reporting for unused labels.
type: boolean
default: undefined

[94m--alwaysStrict[39m
Ensure 'use strict' is always emitted.
type: boolean
default: `false`, unless `strict` is set

[94m--exactOptionalPropertyTypes[39m
Interpret optional property types as written, rather than adding 'undefined'.
type: boolean
default: false

[94m--noFallthroughCasesInSwitch[39m
Enable error reporting for fallthrough cases in switch statements.
type: boolean
default: false

[94m--noImplicitAny[39m
Enable error reporting for expressions and declarations with an implied 'any' type.
type: boolean
default: `false`, unless `strict` is set

[94m--noImplicitOverride[39m
Ensure overriding members in derived classes are marked with an override modifier.
type: boolean
default: false

[94m--noImplicitReturns[39m
Enable error reporting for codepaths that do not explicitly return in a function.
type: boolean
default: false

[94m--noImplicitThis[39m
Enable error reporting when 'this' is given the type 'any'.
type: boolean
default: `false`, unless `strict` is set

[94m--noPropertyAccessFromIndexSignature[39m
Enforces using indexed accessors for keys declared using an indexed type.
type: boolean
default: false

[94m--noUncheckedIndexedAccess[39m
Add 'undefined' to a type when accessed using an index.
type: boolean
default: false

[94m--noUnusedLocals[39m
Enable error reporting when local variables aren't read.
type: boolean
default: false

[94m--noUnusedParameters[39m
Raise an error when a function parameter isn't read.
type: boolean
default: false

[94m--strict[39m
Enable all strict type-checking options.
type: boolean
default: false

[94m--strictBindCallApply[39m
Check that the arguments for 'bind', 'call', and 'apply' methods match the original function.
type: boolean
default: `false`, unless `strict` is set

[94m--strictBuiltinIteratorReturn[39m
Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.
type: boolean
default: `false`, unless `strict` is set

[94m--strictFunctionTypes[39m
When assigning functions, check to ensure parameters and the return values are subtype-compatible.
type: boolean
default: `false`, unless `strict` is set

[94m--strictNullChecks[39m
When type checking, take into account 'null' and 'undefined'.
type: boolean
default: `false`, unless `strict` is set

[94m--strictPropertyInitialization[39m
Check for class properties that are declared but not set in the constructor.
type: boolean
default: `false`, unless `strict` is set

[94m--useUnknownInCatchVariables[39m
Default catch clause variables as 'unknown' instead of 'any'.
type: boolean
default: `false`, unless `strict` is set

### Watch and Build Modes

[94m--assumeChangesOnlyAffectDirectDependencies[39m
Have recompiles in projects that use 'incremental' and 'watch' mode assume that changes within a file will only affect files directly depending on it.
type: boolean
default: false

### Backwards Compatibility

[94m--charset[39m
No longer supported. In early versions, manually set the text encoding for reading files.
type: string
default: utf8

[94m--importsNotUsedAsValues[39m
Specify emit/checking behavior for imports that are only used for types.
one of: remove, preserve, error
default: remove

[94m--keyofStringsOnly[39m
Make keyof only return strings instead of string, numbers or symbols. Legacy option.
type: boolean
default: false

[94m--noImplicitUseStrict[39m
Disable adding 'use strict' directives in emitted JavaScript files.
type: boolean
default: false

[94m--noStrictGenericChecks[39m
Disable strict checking of generic signatures in function types.
type: boolean
default: false

[94m--out[39m
Deprecated setting. Use 'outFile' instead.

[94m--preserveValueImports[39m
Preserve unused imported values in the JavaScript output that would otherwise be removed.
type: boolean
default: false

[94m--suppressExcessPropertyErrors[39m
Disable reporting of excess property errors during the creation of object literals.
type: boolean
default: false

[94m--suppressImplicitAnyIndexErrors[39m
Suppress 'noImplicitAny' errors when indexing objects that lack index signatures.
type: boolean
default: false

### Projects

[94m--composite[39m
Enable constraints that allow a TypeScript project to be used with project references.
type: boolean
default: false

[94m--disableReferencedProjectLoad[39m
Reduce the number of projects loaded automatically by TypeScript.
type: boolean
default: false

[94m--disableSolutionSearching[39m
Opt a project out of multi-project reference checking when editing.
type: boolean
default: false

[94m--disableSourceOfProjectReferenceRedirect[39m
Disable preferring source files instead of declaration files when referencing composite projects.
type: boolean
default: false

[94m--incremental, -i[39m
Save .tsbuildinfo files to allow for incremental compilation of projects.
type: boolean
default: `false`, unless `composite` is set

[94m--tsBuildInfoFile[39m
Specify the path to .tsbuildinfo incremental compilation file.
type: string
default: .tsbuildinfo

### Emit

[94m--declaration, -d[39m
Generate .d.ts files from TypeScript and JavaScript files in your project.
type: boolean
default: `false`, unless `composite` is set

[94m--declarationDir[39m
Specify the output directory for generated declaration files.

[94m--declarationMap[39m
Create sourcemaps for d.ts files.
type: boolean
default: false

[94m--downlevelIteration[39m
Emit more compliant, but verbose and less performant JavaScript for iteration.
type: boolean
default: false

[94m--emitBOM[39m
Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.
type: boolean
default: false

[94m--emitDeclarationOnly[39m
Only output d.ts files and not JavaScript files.
type: boolean
default: false

[94m--importHelpers[39m
Allow importing helper functions from tslib once per project, instead of including them per-file.
type: boolean
default: false

[94m--inlineSourceMap[39m
Include sourcemap files inside the emitted JavaScript.
type: boolean
default: false

[94m--inlineSources[39m
Include source code in the sourcemaps inside the emitted JavaScript.
type: boolean
default: false

[94m--mapRoot[39m
Specify the location where debugger should locate map files instead of generated locations.

[94m--newLine[39m
Set the newline character for emitting files.
one of: crlf, lf

[94m--noEmit[39m
Disable emitting files from a compilation.
type: boolean
default: false

[94m--noEmitHelpers[39m
Disable generating custom helper functions like '__extends' in compiled output.
type: boolean
default: false

[94m--noEmitOnError[39m
Disable emitting files if any type checking errors are reported.
type: boolean
default: false

[94m--outDir[39m
Specify an output folder for all emitted files.

[94m--outFile[39m
Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output.

[94m--preserveConstEnums[39m
Disable erasing 'const enum' declarations in generated code.
type: boolean
default: false

[94m--removeComments[39m
Disable emitting comments.
type: boolean
default: false

[94m--sourceMap[39m
Create source map files for emitted JavaScript files.
type: boolean
default: false

[94m--sourceRoot[39m
Specify the root path for debuggers to find the reference source code.

[94m--stripInternal[39m
Disable emitting declarations that have '@internal' in their JSDoc comments.
type: boolean
default: false

### Compiler Diagnostics

[94m--diagnostics[39m
Output compiler performance information after building.
type: boolean
default: false

[94m--explainFiles[39m
Print files read during the compilation including why it was included.
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

[94m--listEmittedFiles[39m
Print the names of emitted files after a compilation.
type: boolean
default: false

[94m--listFiles[39m
Print all of the files read during the compilation.
type: boolean
default: false

[94m--noCheck[39m
Disable full type checking (only critical parse and emit errors will be reported).
type: boolean
default: false

[94m--traceResolution[39m
Log paths used during the 'moduleResolution' process.
type: boolean
default: false

### Editor Support

[94m--disableSizeLimit[39m
Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.
type: boolean
default: false

[94m--plugins[39m
Specify a list of language service plugins to include.
one or more: 
default: undefined

### Language and Environment

[94m--emitDecoratorMetadata[39m
Emit design-type metadata for decorated declarations in source files.
type: boolean
default: false

[94m--experimentalDecorators[39m
Enable experimental support for legacy experimental decorators.
type: boolean
default: false

[94m--jsx[39m
Specify what JSX code is generated.
one of: preserve, react, react-native, react-jsx, react-jsxdev
default: undefined

[94m--jsxFactory[39m
Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'.
type: string
default: `React.createElement`

[94m--jsxFragmentFactory[39m
Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.
type: string
default: React.Fragment

[94m--jsxImportSource[39m
Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'.
type: string
default: react

[94m--lib[39m
Specify a set of bundled library declaration files that describe the target runtime environment.
one or more: es5, es6/es2015, es7/es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, esnext, dom, dom.iterable, dom.asynciterable, webworker, webworker.importscripts, webworker.iterable, webworker.asynciterable, scripthost, es2015.core, es2015.collection, es2015.generator, es2015.iterable, es2015.promise, es2015.proxy, es2015.reflect, es2015.symbol, es2015.symbol.wellknown, es2016.array.include, es2016.intl, es2017.arraybuffer, es2017.date, es2017.object, es2017.sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es2018.asyncgenerator, es2018.asynciterable/esnext.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es2019.array, es2019.object, es2019.string, es2019.symbol/esnext.symbol, es2019.intl, es2020.bigint/esnext.bigint, es2020.date, es2020.promise, es2020.sharedmemory, es2020.string, es2020.symbol.wellknown, es2020.intl, es2020.number, es2021.promise, es2021.string, es2021.weakref/esnext.weakref, es2021.intl, es2022.array, es2022.error, es2022.intl, es2022.object, es2022.string, es2022.regexp, es2023.array, es2023.collection, es2023.intl, es2024.arraybuffer, es2024.collection, es2024.object/esnext.object, es2024.promise, es2024.regexp/esnext.regexp, es2024.sharedmemory, es2024.string/esnext.string, esnext.array, esnext.collection, esnext.intl, esnext.disposable, esnext.promise, esnext.decorators, esnext.iterator, esnext.float16, decorators, decorators.legacy
default: undefined

[94m--libReplacement[39m
Enable lib replacement.
type: boolean
default: true

[94m--moduleDetection[39m
Control what method is used to detect module-format JS files.
one of: legacy, auto, force
default: "auto": Treat files with imports, exports, import.meta, jsx (with jsx: react-jsx), or esm format (with module: node16+) as modules.

[94m--noLib[39m
Disable including any library files, including the default lib.d.ts.
type: boolean
default: false

[94m--reactNamespace[39m
Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit.
type: string
default: `React`

[94m--target, -t[39m
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
one of: es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, esnext
default: es5

[94m--useDefineForClassFields[39m
Emit ECMAScript-standard-compliant class fields.
type: boolean
default: `true` for ES2022 and above, including ESNext.

### Output Formatting

[94m--noErrorTruncation[39m
Disable truncating types in error messages.
type: boolean
default: false

[94m--preserveWatchOutput[39m
Disable wiping the console in watch mode.
type: boolean
default: false

[94m--pretty[39m
Enable color and formatting in TypeScript's output to make compiler errors easier to read.
type: boolean
default: true

### Completeness

[94m--skipDefaultLibCheck[39m
Skip type checking .d.ts files that are included with TypeScript.
type: boolean
default: false

[94m--skipLibCheck[39m
Skip type checking all .d.ts files.
type: boolean
default: false

You can learn about all of the compiler options at https://aka.ms/tsc

[1mWATCH OPTIONS[22m

Including --watch, -w will start watching the current project for the file changes. Once set, you can config watch mode with:

[94m--watchFile[39m
Specify how the TypeScript watch mode works.
one of: fixedpollinginterval, prioritypollinginterval, dynamicprioritypolling, fixedchunksizepolling, usefsevents, usefseventsonparentdirectory
default: usefsevents

[94m--watchDirectory[39m
Specify how directories are watched on systems that lack recursive file-watching functionality.
one of: usefsevents, fixedpollinginterval, dynamicprioritypolling, fixedchunksizepolling
default: usefsevents

[94m--fallbackPolling[39m
Specify what approach the watcher should use if the system runs out of native file watchers.
one of: fixedinterval, priorityinterval, dynamicpriority, fixedchunksize
default: priorityinterval

[94m--synchronousWatchDirectory[39m
Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.
type: boolean
default: false

[94m--excludeDirectories[39m
Remove a list of directories from the watch process.

[94m--excludeFiles[39m
Remove a list of files from the watch mode's processing.

[1mBUILD OPTIONS[22m

Using --build, -b will make tsc behave more like a build orchestrator than a compiler. This is used to trigger building composite projects which you can learn more about at https://aka.ms/tsc-composite-builds

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
