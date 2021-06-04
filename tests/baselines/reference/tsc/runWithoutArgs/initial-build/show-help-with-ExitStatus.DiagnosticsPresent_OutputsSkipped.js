Input::
//// [/lib/lib.d.ts]




Output::
/lib/tsc 
Version FakeTSVersion
tsc: The Typescript Compiler - Version FakeTSVersion                                                                   [44m     [49m
                                                                                                                   [44m[37m  TS [39m[49m
[1mCOMMON COMMANDS[22m

  [34mtsc[39m
  Compiles the current project (tsconfig.json in the working diirectory.)

  [34mtsc app.ts util.ts
[39m  Ignoring tsconfig.json, compiles the specified files with default compiler options

  [34mtsc -b
[39m  Build a composite project in the working directory.

  [34mtsc --init
[39m  Creates a tsconfig.json with the recommended settings in the working directory.

  [34mtsc -p .path/to/tsconfig.json
[39m  compiles the Typescript project located at the specified path

  [34mtsc --help --all
[39m  An expanded version of this information, showing all possible compiler options

  [34mtsc --noEmit
[39m  [34mtsc --target esnext
[39m  Compiles the current project, with additional settings.

[1mCOMMON COMPILER OPTIONS[22m

[34m                      --help, -h  [39mPrint this message.
                           type:  boolean

[34m                     --watch, -w  [39mWatch input files.
                           type:  boolean

[34m                        --pretty  [39mStylize errors and messages using color and context (experimental).
                           type:  boolean
                        default:  true

[34m                           --all  [39mShow all compiler options.
                           type:  boolean

[34m                   --version, -v  [39mPrint the compiler's version.
                           type:  boolean

[34m                          --init  [39mInitializes a TypeScript project and creates a tsconfig.json file.
                           type:  boolean

[34m                   --project, -p  [39mCompile the project given the path to its configuration file, or to a folder with a 't                                  sconfig.json'.
[34m                     --build, -b  [39mBuild one or more projects and their dependencies, if out of date
                           type:  boolean

[34m                    --showConfig  [39mPrint the final configuration instead of building.
                           type:  boolean

[34m                    --target, -t  [39mSpecify ECMAScript target version.
                         one of:  es3, es5, es6, es2015, es2016, es2017, es2018, es2019, es2020, es2021, esnext
                        default:  ES3

[34m                    --module, -m  [39mSpecify module code generation.
                         one of:  none, commonjs, amd, system, umd, es6, es2015, es2020, esnext

[34m                           --lib  [39mSpecify library files to be included in the compilation.
                    one or more:  es5, es6, es2015, es7, es2016, es2017, es2018, es2019, es2020, es2021, esnext, dom, do                                  m.iterable, webworker, webworker.importscripts, webworker.iterable, scripthost, es2015                                  .core, es2015.collection, es2015.generator, es2015.iterable, es2015.promise, es2015.pr                                  oxy, es2015.reflect, es2015.symbol, es2015.symbol.wellknown, es2016.array.include, es2                                  017.object, es2017.sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es201                                  8.asyncgenerator, es2018.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es                                  2019.array, es2019.object, es2019.string, es2019.symbol, es2020.bigint, es2020.promise                                  , es2020.sharedmemory, es2020.string, es2020.symbol.wellknown, es2020.intl, es2021.pro                                  mise, es2021.string, es2021.weakref, esnext.array, esnext.symbol, esnext.asynciterable                                  , esnext.intl, esnext.bigint, esnext.string, esnext.promise, esnext.weakref

[34m                       --allowJs  [39mAllow javascript files to be compiled.
                           type:  boolean
                        default:  false

[34m                           --jsx  [39mSpecify JSX code generation.
                         one of:  preserve, react-native, react, react-jsx, react-jsxdev
                        default:  undefined

[34m               --declaration, -d  [39mGenerates corresponding '.d.ts' file.
                           type:  boolean
                        default:  `false`, unless `composite` is set

[34m                --declarationMap  [39mGenerates a sourcemap for each corresponding '.d.ts' file.
                           type:  boolean
                        default:  false

[34m                     --sourceMap  [39mGenerates corresponding '.map' file.
                           type:  boolean
                        default:  false

[34m                       --outFile  [39mConcatenate and emit output to single file.
[34m                        --outDir  [39mRedirect output structure to the directory.
[34m                --removeComments  [39mDo not emit comments to output.
                           type:  boolean
                        default:  false

[34m                        --noEmit  [39mDo not emit outputs.
                           type:  boolean
                        default:  false

[34m                        --strict  [39mEnable all strict type-checking options.
                           type:  boolean
                        default:  false

[34m                 --noImplicitAny  [39mRaise error on expressions and declarations with an implied 'any' type.
                           type:  boolean
                        default:  `false`, unless `strict` is set

[34m              --strictNullChecks  [39mEnable strict null checks.
                           type:  boolean
                        default:  `false`, unless `strict` is set

[34m           --strictFunctionTypes  [39mEnable strict checking of function types.
                           type:  boolean
                        default:  `false`, unless `strict` is set

[34m           --strictBindCallApply  [39mEnable strict 'bind', 'call', and 'apply' methods on functions.
                           type:  boolean
                        default:  `false`, unless `strict` is set

[34m  --strictPropertyInitialization  [39mEnable strict checking of property initialization in classes.
                           type:  boolean
                        default:  `false`, unless `strict` is set

[34m      --strictOptionalProperties  [39mEnable strict checking of optional properties.
                           type:  boolean

[34m                --noImplicitThis  [39mRaise error on 'this' expressions with an implied 'any' type.
                           type:  boolean
                        default:  `false`, unless `strict` is set

[34m    --useUnknownInCatchVariables  [39mType catch clause variables as 'unknown' instead of 'any'.
                           type:  boolean

[34m                  --alwaysStrict  [39mParse in strict mode and emit "use strict" for each source file.
                           type:  boolean
                        default:  `false`, unless `strict` is set

[34m                --noUnusedLocals  [39mReport errors on unused locals.
                           type:  boolean
                        default:  false

[34m            --noUnusedParameters  [39mReport errors on unused parameters.
                           type:  boolean
                        default:  false

[34m             --noImplicitReturns  [39mReport error when not all code paths in function return a value.
                           type:  boolean
                        default:  false

[34m    --noFallthroughCasesInSwitch  [39mReport errors for fallthrough cases in switch statement.
                           type:  boolean

[34m                         --types  [39mType declaration files to be included in compilation.
[34m               --esModuleInterop  [39mEnables emit interoperability between CommonJS and ES Modules via creation of namespac                                  e objects for all imports. Implies 'allowSyntheticDefaultImports'.
                           type:  boolean
                        default:  false

You can learn about all of the compiler options at https://aka.ms/tsconfig-reference

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


