Input::
//// [/lib/lib.d.ts]




Output::
/lib/tsc 
Version FakeTSVersion
Syntax:   tsc [options] [file...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt
          tsc --build tsconfig.json

Options:
 -h, --help                                         Print this message.
 -w, --watch                                        Watch input files.
 --pretty                                           Enable color and formatting in output to make compiler errors easier to read
 --all                                              Show all compiler options.
 -v, --version                                      Print the compiler's version.
 --init                                             Initializes a TypeScript project and creates a tsconfig.json file.
 -p FILE OR DIRECTORY, --project FILE OR DIRECTORY  Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.
 -b, --build                                        Build one or more projects and their dependencies, if out of date
 -t VERSION, --target VERSION                       Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
 -m KIND, --module KIND                             Specify what module code is generated.
 --lib                                              Specify a set of bundled library declaration files that describe the target runtime environment.
                                                      'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017' 'es2018' 'es2019' 'es2020' 'es2021' 'esnext' 'dom' 'dom.iterable' 'webworker' 'webworker.importscripts' 'webworker.iterable' 'scripthost' 'es2015.core' 'es2015.collection' 'es2015.generator' 'es2015.iterable' 'es2015.promise' 'es2015.proxy' 'es2015.reflect' 'es2015.symbol' 'es2015.symbol.wellknown' 'es2016.array.include' 'es2017.object' 'es2017.sharedmemory' 'es2017.string' 'es2017.intl' 'es2017.typedarrays' 'es2018.asyncgenerator' 'es2018.asynciterable' 'es2018.intl' 'es2018.promise' 'es2018.regexp' 'es2019.array' 'es2019.object' 'es2019.string' 'es2019.symbol' 'es2020.bigint' 'es2020.promise' 'es2020.sharedmemory' 'es2020.string' 'es2020.symbol.wellknown' 'es2020.intl' 'es2021.promise' 'es2021.string' 'es2021.weakref' 'esnext.array' 'esnext.symbol' 'esnext.asynciterable' 'esnext.intl' 'esnext.bigint' 'esnext.string' 'esnext.promise' 'esnext.weakref' 
 --allowJs                                          Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.
 --jsx KIND                                         Specify what JSX code is generated.
 -d, --declaration                                  Generate .d.ts files from TypeScript and JavaScript files in your project.
 --declarationMap                                   Create sourcemaps for d.ts files.
 --sourceMap                                        Create source map files for emitted JavaScript files.
 --outFile FILE                                     Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.
 --outDir DIRECTORY                                 Specify an output folder for all emitted files.
 --removeComments                                   Disable emitting comments.
 --noEmit                                           Disable emitting file from a compilation.
 --strict                                           Enable all strict type-checking options.
 --noImplicitAny                                    Enable error reporting for expressions and declarations with an implied `any` type..
 --strictNullChecks                                 When type checking, take into account `null` and `undefined`.
 --strictFunctionTypes                              When assigning functions, check to ensure parameters and the return values are subtype-compatible.
 --strictBindCallApply                              Check that the arguments for `bind`, `call`, and `apply` methods match the original function.
 --strictPropertyInitialization                     Check for class properties that are declared but not set in the constructor.
 --strictOptionalProperties                         Enable strict checking of optional properties.
 --noImplicitThis                                   Enable error reporting when `this` is given the type `any`.
 --useUnknownInCatchVariables                       Type catch clause variables as 'unknown' instead of 'any'.
 --alwaysStrict                                     Ensure 'use strict' is always emitted.
 --noUnusedLocals                                   Enable error reporting when a local variables aren't read.
 --noUnusedParameters                               Raise an error when a function parameter isn't read
 --noImplicitReturns                                Enable error reporting for codepaths that do not explicitly return in a function.
 --noFallthroughCasesInSwitch                       Enable error reporting for fallthrough cases in switch statements.
 --types                                            Specify type package names to be included without being referenced in a source file.
 --esModuleInterop                                  Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.
 @<file>                                            Insert command line options and files from a file.
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


