currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
Version FakeTSVersion
tsc: The TypeScript Compiler - Version FakeTSVersion                                                                   [44m     [39;49m
                                                                                                                   [44m[97m  TS [39m[39;49m
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

[94m     --help, -h  [39mPrint this message.


[94m    --watch, -w  [39mWatch input files.


[94m          --all  [39mShow all compiler options.


[94m  --version, -v  [39mPrint the compiler's version.


[94m         --init  [39mInitializes a TypeScript project and creates a tsconfig.json file.


[94m  --project, -p  [39mCompile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.


[94m   --showConfig  [39mPrint the final configuration instead of building.


[94m    --build, -b  [39mBuild one or more projects and their dependencies, if out of date


[1mCOMMON COMPILER OPTIONS[22m

[94m               --pretty  [39mEnable color and formatting in TypeScript's output to make compiler errors easier to read.

                  type:  boolean

               default:  true


[94m      --declaration, -d  [39mGenerate .d.ts files from TypeScript and JavaScript files in your project.

                  type:  boolean

               default:  `false`, unless `composite` is set


[94m       --declarationMap  [39mCreate sourcemaps for d.ts files.

                  type:  boolean

               default:  false


[94m  --emitDeclarationOnly  [39mOnly output d.ts files and not JavaScript files.

                  type:  boolean

               default:  false


[94m            --sourceMap  [39mCreate source map files for emitted JavaScript files.

                  type:  boolean

               default:  false


[94m               --noEmit  [39mDisable emitting files from a compilation.

                  type:  boolean

               default:  false


[94m           --target, -t  [39mSet the JavaScript language version for emitted JavaScript and include compatible library decla
                         rations.

                one of:  es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, esnext

               default:  es5


[94m           --module, -m  [39mSpecify what module code is generated.

                one of:  none, commonjs, amd, system, umd, es6/es2015, es2020, es2022, esnext, node16, node18, node20, n
                         odenext, preserve

               default:  undefined


[94m                  --lib  [39mSpecify a set of bundled library declaration files that describe the target runtime environment
                         .

           one or more:  es5, es6/es2015, es7/es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, es
                         next, dom, dom.iterable, dom.asynciterable, webworker, webworker.importscripts, webworker.itera
                         ble, webworker.asynciterable, scripthost, es2015.core, es2015.collection, es2015.generator, es2
                         015.iterable, es2015.promise, es2015.proxy, es2015.reflect, es2015.symbol, es2015.symbol.wellkn
                         own, es2016.array.include, es2016.intl, es2017.arraybuffer, es2017.date, es2017.object, es2017.
                         sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es2018.asyncgenerator, es2018.asy
                         nciterable/esnext.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es2019.array, es20
                         19.object, es2019.string, es2019.symbol/esnext.symbol, es2019.intl, es2020.bigint/esnext.bigint
                         , es2020.date, es2020.promise, es2020.sharedmemory, es2020.string, es2020.symbol.wellknown, es2
                         020.intl, es2020.number, es2021.promise, es2021.string, es2021.weakref/esnext.weakref, es2021.i
                         ntl, es2022.array, es2022.error, es2022.intl, es2022.object, es2022.string, es2022.regexp, es20
                         23.array, es2023.collection, es2023.intl, es2024.arraybuffer, es2024.collection, es2024.object/
                         esnext.object, es2024.promise, es2024.regexp/esnext.regexp, es2024.sharedmemory, es2024.string/
                         esnext.string, esnext.array, esnext.collection, esnext.intl, esnext.disposable, esnext.promise,
                          esnext.decorators, esnext.iterator, esnext.float16, esnext.error, esnext.sharedmemory, decorat
                         ors, decorators.legacy

               default:  undefined


[94m              --allowJs  [39mAllow JavaScript files to be a part of your program. Use the 'checkJs' option to get errors fro
                         m these files.

                  type:  boolean

               default:  false


[94m              --checkJs  [39mEnable error reporting in type-checked JavaScript files.

                  type:  boolean

               default:  false


[94m                  --jsx  [39mSpecify what JSX code is generated.

                one of:  preserve, react-native, react-jsx, react-jsxdev, react

               default:  undefined


[94m              --outFile  [39mSpecify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, als
                         o designates a file that bundles all .d.ts output.


[94m               --outDir  [39mSpecify an output folder for all emitted files.


[94m       --removeComments  [39mDisable emitting comments.

                  type:  boolean

               default:  false


[94m               --strict  [39mEnable all strict type-checking options.

                  type:  boolean

               default:  false


[94m                --types  [39mSpecify type package names to be included without being referenced in a source file.


[94m      --esModuleInterop  [39mEmit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowS
                         yntheticDefaultImports' for type compatibility.

                  type:  boolean

               default:  false


You can learn about all of the compiler options at https://aka.ms/tsc


