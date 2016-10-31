// This file contains the build logic for the public repo

var fs = require("fs");
var os = require("os");
var path = require("path");
var child_process = require("child_process");
var fold = require("travis-fold");
var runTestsInParallel = require("./scripts/mocha-parallel").runTestsInParallel;

// Variables
var compilerDirectory = "src/compiler/";
var servicesDirectory = "src/services/";
var serverDirectory = "src/server/";
var typingsInstallerDirectory = "src/server/typingsInstaller";
var cancellationTokenDirectory = "src/server/cancellationToken";
var harnessDirectory = "src/harness/";
var libraryDirectory = "src/lib/";
var scriptsDirectory = "scripts/";
var unittestsDirectory = "src/harness/unittests/";
var docDirectory = "doc/";

var builtDirectory = "built/";
var builtLocalDirectory = "built/local/";
var LKGDirectory = "lib/";

var copyright = "CopyrightNotice.txt";
var thirdParty = "ThirdPartyNoticeText.txt";

// add node_modules to path so we don't need global modules, prefer the modules by adding them first
var nodeModulesPathPrefix = path.resolve("./node_modules/.bin/") + path.delimiter;
if (process.env.path !== undefined) {
    process.env.path = nodeModulesPathPrefix + process.env.path;
} else if (process.env.PATH !== undefined) {
    process.env.PATH = nodeModulesPathPrefix + process.env.PATH;
}

function toNs(diff) {
    return diff[0] * 1e9 + diff[1];
}

function mark() {
    if (!fold.isTravis()) return;
    var stamp = process.hrtime();
    var id = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
    console.log("travis_time:start:" + id + "\r");
    return {
        stamp: stamp,
        id: id
    };
}

function measure(marker) {
    if (!fold.isTravis()) return;
    var diff = process.hrtime(marker.stamp);
    var total = [marker.stamp[0] + diff[0], marker.stamp[1] + diff[1]];
    console.log("travis_time:end:" + marker.id + ":start=" + toNs(marker.stamp) + ",finish=" + toNs(total) + ",duration=" + toNs(diff) + "\r");
}

var compilerSources = [
    "core.ts",
    "performance.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "factory.ts",
    "visitor.ts",
    "transformers/destructuring.ts",
    "transformers/ts.ts",
    "transformers/jsx.ts",
    "transformers/es2017.ts",
    "transformers/es2016.ts",
    "transformers/es2015.ts",
    "transformers/generators.ts",
    "transformers/es5.ts",
    "transformers/module/es2015.ts",
    "transformers/module/system.ts",
    "transformers/module/module.ts",
    "transformer.ts",
    "sourcemap.ts",
    "comments.ts",
    "declarationEmitter.ts",
    "emitter.ts",
    "program.ts",
    "commandLineParser.ts",
    "tsc.ts",
    "diagnosticInformationMap.generated.ts"
].map(function (f) {
    return path.join(compilerDirectory, f);
});

var servicesSources = [
    "core.ts",
    "performance.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "factory.ts",
    "visitor.ts",
    "transformers/destructuring.ts",
    "transformers/ts.ts",
    "transformers/jsx.ts",
    "transformers/es2017.ts",
    "transformers/es2016.ts",
    "transformers/es2015.ts",
    "transformers/generators.ts",
    "transformers/es5.ts",
    "transformers/module/es2015.ts",
    "transformers/module/system.ts",
    "transformers/module/module.ts",
    "transformer.ts",
    "sourcemap.ts",
    "comments.ts",
    "declarationEmitter.ts",
    "emitter.ts",
    "program.ts",
    "commandLineParser.ts",
    "diagnosticInformationMap.generated.ts"
].map(function (f) {
    return path.join(compilerDirectory, f);
}).concat([
    "types.ts",
    "utilities.ts",
    "breakpoints.ts",
    "classifier.ts",
    "completions.ts",
    "documentHighlights.ts",
    "documentRegistry.ts",
    "findAllReferences.ts",
    "goToDefinition.ts",
    "goToImplementation.ts",
    "jsDoc.ts",
    "jsTyping.ts",
    "navigateTo.ts",
    "navigationBar.ts",
    "outliningElementsCollector.ts",
    "patternMatcher.ts",
    "preProcess.ts",
    "rename.ts",
    "services.ts",
    "shims.ts",
    "signatureHelp.ts",
    "symbolDisplay.ts",
    "transpile.ts",
    "formatting/formatting.ts",
    "formatting/formattingContext.ts",
    "formatting/formattingRequestKind.ts",
    "formatting/formattingScanner.ts",
    "formatting/references.ts",
    "formatting/rule.ts",
    "formatting/ruleAction.ts",
    "formatting/ruleDescriptor.ts",
    "formatting/ruleFlag.ts",
    "formatting/ruleOperation.ts",
    "formatting/ruleOperationContext.ts",
    "formatting/rules.ts",
    "formatting/rulesMap.ts",
    "formatting/rulesProvider.ts",
    "formatting/smartIndenter.ts",
    "formatting/tokenRange.ts"
].map(function (f) {
    return path.join(servicesDirectory, f);
}));

var serverCoreSources = [
    "types.d.ts",
    "utilities.ts",
    "scriptVersionCache.ts",
    "typingsCache.ts",
    "scriptInfo.ts",
    "lsHost.ts",
    "project.ts",
    "editorServices.ts",
    "protocol.ts",
    "session.ts",
    "server.ts"
].map(function (f) {
    return path.join(serverDirectory, f);
});

var cancellationTokenSources = [
    "cancellationToken.ts"
].map(function (f) {
    return path.join(cancellationTokenDirectory, f);
});

var typingsInstallerSources = [
    "../types.d.ts",
    "typingsInstaller.ts",
    "nodeTypingsInstaller.ts"
].map(function (f) {
    return path.join(typingsInstallerDirectory, f);
});

var serverSources = serverCoreSources.concat(servicesSources);

var languageServiceLibrarySources = [
    "protocol.ts",
    "utilities.ts",
    "scriptVersionCache.ts",
    "scriptInfo.ts",
    "lsHost.ts",
    "project.ts",
    "editorServices.ts",
    "session.ts",

].map(function (f) {
    return path.join(serverDirectory, f);
}).concat(servicesSources);

var harnessCoreSources = [
    "harness.ts",
    "virtualFileSystem.ts",
    "sourceMapRecorder.ts",
    "harnessLanguageService.ts",
    "fourslash.ts",
    "runnerbase.ts",
    "compilerRunner.ts",
    "typeWriter.ts",
    "fourslashRunner.ts",
    "projectsRunner.ts",
    "loggedIO.ts",
    "rwcRunner.ts",
    "test262Runner.ts",
    "runner.ts"
].map(function (f) {
    return path.join(harnessDirectory, f);
});

var harnessSources = harnessCoreSources.concat([
    "incrementalParser.ts",
    "jsDocParsing.ts",
    "services/colorization.ts",
    "services/documentRegistry.ts",
    "services/preProcessFile.ts",
    "services/patternMatcher.ts",
    "session.ts",
    "versionCache.ts",
    "convertToBase64.ts",
    "transpile.ts",
    "reuseProgramStructure.ts",
    "cachingInServerLSHost.ts",
    "moduleResolution.ts",
    "tsconfigParsing.ts",
    "commandLineParsing.ts",
    "configurationExtension.ts",
    "convertCompilerOptionsFromJson.ts",
    "convertTypingOptionsFromJson.ts",
    "tsserverProjectSystem.ts",
    "compileOnSave.ts",
    "typingsInstaller.ts",
    "projectErrors.ts",
    "matchFiles.ts",
    "initializeTSConfig.ts",
].map(function (f) {
    return path.join(unittestsDirectory, f);
})).concat([
    "protocol.ts",
    "utilities.ts",
    "scriptVersionCache.ts",
    "scriptInfo.ts",
    "lsHost.ts",
    "project.ts",
    "typingsCache.ts",
    "editorServices.ts",
    "session.ts",
].map(function (f) {
    return path.join(serverDirectory, f);
}));

var es2015LibrarySources = [
    "es2015.core.d.ts",
    "es2015.collection.d.ts",
    "es2015.generator.d.ts",
    "es2015.iterable.d.ts",
    "es2015.promise.d.ts",
    "es2015.proxy.d.ts",
    "es2015.reflect.d.ts",
    "es2015.symbol.d.ts",
    "es2015.symbol.wellknown.d.ts"
];

var es2015LibrarySourceMap = es2015LibrarySources.map(function (source) {
    return { target: "lib." + source, sources: ["header.d.ts", source] };
});

var es2016LibrarySource = ["es2016.array.include.d.ts"];

var es2016LibrarySourceMap = es2016LibrarySource.map(function (source) {
    return { target: "lib." + source, sources: ["header.d.ts", source] };
});

var es2017LibrarySource = [
    "es2017.object.d.ts",
    "es2017.sharedmemory.d.ts"
];

var es2017LibrarySourceMap = es2017LibrarySource.map(function (source) {
    return { target: "lib." + source, sources: ["header.d.ts", source] };
});

var hostsLibrarySources = ["dom.generated.d.ts", "webworker.importscripts.d.ts", "scripthost.d.ts"];

var librarySourceMap = [
    // Host library
    { target: "lib.dom.d.ts", sources: ["header.d.ts", "dom.generated.d.ts"] },
    { target: "lib.dom.iterable.d.ts", sources: ["header.d.ts", "dom.iterable.d.ts"] },
    { target: "lib.webworker.d.ts", sources: ["header.d.ts", "webworker.generated.d.ts"] },
    { target: "lib.scripthost.d.ts", sources: ["header.d.ts", "scripthost.d.ts"] },

    // JavaScript library
    { target: "lib.es5.d.ts", sources: ["header.d.ts", "es5.d.ts"] },
    { target: "lib.es2015.d.ts", sources: ["header.d.ts", "es2015.d.ts"] },
    { target: "lib.es2016.d.ts", sources: ["header.d.ts", "es2016.d.ts"] },
    { target: "lib.es2017.d.ts", sources: ["header.d.ts", "es2017.d.ts"] },

    // JavaScript + all host library
    { target: "lib.d.ts", sources: ["header.d.ts", "es5.d.ts"].concat(hostsLibrarySources) },
    { target: "lib.es6.d.ts", sources: ["header.d.ts", "es5.d.ts"].concat(es2015LibrarySources, hostsLibrarySources, "dom.iterable.d.ts") }
].concat(es2015LibrarySourceMap, es2016LibrarySourceMap, es2017LibrarySourceMap);

var libraryTargets = librarySourceMap.map(function (f) {
    return path.join(builtLocalDirectory, f.target);
});

// Prepends the contents of prefixFile to destinationFile
function prependFile(prefixFile, destinationFile) {
    if (!fs.existsSync(prefixFile)) {
        fail(prefixFile + " does not exist!");
    }
    if (!fs.existsSync(destinationFile)) {
        fail(destinationFile + " failed to be created!");
    }
    var temp = "temptemp";
    jake.cpR(prefixFile, temp, { silent: true });
    fs.appendFileSync(temp, fs.readFileSync(destinationFile));
    fs.renameSync(temp, destinationFile);
}

// concatenate a list of sourceFiles to a destinationFile
function concatenateFiles(destinationFile, sourceFiles) {
    var temp = "temptemp";
    // Copy the first file to temp
    if (!fs.existsSync(sourceFiles[0])) {
        fail(sourceFiles[0] + " does not exist!");
    }
    jake.cpR(sourceFiles[0], temp, { silent: true });
    // append all files in sequence
    for (var i = 1; i < sourceFiles.length; i++) {
        if (!fs.existsSync(sourceFiles[i])) {
            fail(sourceFiles[i] + " does not exist!");
        }
        fs.appendFileSync(temp, "\n\n");
        fs.appendFileSync(temp, fs.readFileSync(sourceFiles[i]));
    }
    // Move the file to the final destination
    fs.renameSync(temp, destinationFile);
}

var useDebugMode = true;
var host = process.env.TYPESCRIPT_HOST || process.env.host || "node";
var compilerFilename = "tsc.js";
var LKGCompiler = path.join(LKGDirectory, compilerFilename);
var builtLocalCompiler = path.join(builtLocalDirectory, compilerFilename);

/* Compiles a file from a list of sources
    * @param outFile: the target file name
    * @param sources: an array of the names of the source files
    * @param prereqs: prerequisite tasks to compiling the file
    * @param prefixes: a list of files to prepend to the target file
    * @param useBuiltCompiler: true to use the built compiler, false to use the LKG
    * @parap {Object}  opts - property bag containing auxiliary options
    * @param {boolean} opts.noOutFile: true to compile without using --out
    * @param {boolean} opts.generateDeclarations: true to compile using --declaration
    * @param {string}  opts.outDir: value for '--outDir' command line option
    * @param {boolean} opts.keepComments: false to compile using --removeComments
    * @param {boolean} opts.preserveConstEnums: true if compiler should keep const enums in code
    * @param {boolean} opts.noResolve: true if compiler should not include non-rooted files in compilation
    * @param {boolean} opts.stripInternal: true if compiler should remove declarations marked as @internal
    * @param {boolean} opts.noMapRoot: true if compiler omit mapRoot option
    * @param {boolean} opts.inlineSourceMap: true if compiler should inline sourceMap
    * @param {Array} opts.types: array of types to include in compilation
    * @param callback: a function to execute after the compilation process ends
    */
function compileFile(outFile, sources, prereqs, prefixes, useBuiltCompiler, opts, callback) {
    file(outFile, prereqs, function() {
        if (process.env.USE_TRANSFORMS === "false") {
            useBuiltCompiler = false;
        }
        var startCompileTime = mark();
        opts = opts || {};
        var compilerPath = useBuiltCompiler ? builtLocalCompiler : LKGCompiler;
        var options = "--noImplicitAny --noImplicitThis --noEmitOnError --types "
        if (opts.types) {
            options += opts.types.join(",");
        }
        options += " --pretty";
        // Keep comments when specifically requested
        // or when in debug mode.
        if (!(opts.keepComments || useDebugMode)) {
            options += " --removeComments";
        }

        if (opts.generateDeclarations) {
            options += " --declaration";
        }

        if (opts.preserveConstEnums || useDebugMode) {
            options += " --preserveConstEnums";
        }

        if (opts.outDir) {
            options += " --outDir " + opts.outDir;
        }

        if (!opts.noOutFile) {
            options += " --out " + outFile;
        }
        else {
            options += " --module commonjs";
        }

        if (opts.noResolve) {
            options += " --noResolve";
        }

        if (useDebugMode) {
            if (opts.inlineSourceMap) {
                options += " --inlineSourceMap --inlineSources";
            } else {
                options += " -sourcemap";
                if (!opts.noMapRoot) {
                    options += " -mapRoot file:///" + path.resolve(path.dirname(outFile));
                }
            }
        } else {
            options += " --newLine LF";
        }

        if (opts.stripInternal) {
            options += " --stripInternal";
        }

        options += " --target es5 --noUnusedLocals --noUnusedParameters";

        var cmd = host + " " + compilerPath + " " + options + " ";
        cmd = cmd + sources.join(" ");
        console.log(cmd + "\n");

        var ex = jake.createExec([cmd]);
        // Add listeners for output and error
        ex.addListener("stdout", function (output) {
            process.stdout.write(output);
        });
        ex.addListener("stderr", function (error) {
            process.stderr.write(error);
        });
        ex.addListener("cmdEnd", function () {
            if (!useDebugMode && prefixes && fs.existsSync(outFile)) {
                for (var i in prefixes) {
                    prependFile(prefixes[i], outFile);
                }
            }

            if (callback) {
                callback();
            }

            measure(startCompileTime);
            complete();
        });
        ex.addListener("error", function () {
            fs.unlinkSync(outFile);
            fail("Compilation of " + outFile + " unsuccessful");
            measure(startCompileTime);
        });
        ex.run();
    }, { async: true });
}

// Prerequisite task for built directory and library typings
directory(builtLocalDirectory);

for (var i in libraryTargets) {
    (function (i) {
        var entry = librarySourceMap[i];
        var target = libraryTargets[i];
        var sources = [copyright].concat(entry.sources.map(function (s) {
            return path.join(libraryDirectory, s);
        }));
        file(target, [builtLocalDirectory].concat(sources), function () {
            concatenateFiles(target, sources);
        });
    })(i);
}

// Lib target to build the library files
desc("Builds the library targets");
task("lib", libraryTargets);


// Generate diagnostics
var processDiagnosticMessagesJs = path.join(scriptsDirectory, "processDiagnosticMessages.js");
var processDiagnosticMessagesTs = path.join(scriptsDirectory, "processDiagnosticMessages.ts");
var diagnosticMessagesJson = path.join(compilerDirectory, "diagnosticMessages.json");
var diagnosticInfoMapTs = path.join(compilerDirectory, "diagnosticInformationMap.generated.ts");
var generatedDiagnosticMessagesJSON = path.join(compilerDirectory, "diagnosticMessages.generated.json");
var builtGeneratedDiagnosticMessagesJSON = path.join(builtLocalDirectory, "diagnosticMessages.generated.json");

file(processDiagnosticMessagesTs);

// processDiagnosticMessages script
compileFile(processDiagnosticMessagesJs,
    [processDiagnosticMessagesTs],
    [processDiagnosticMessagesTs],
    [],
            /*useBuiltCompiler*/ false);

var buildProtocolTs = path.join(scriptsDirectory, "buildProtocol.ts");
var buildProtocolJs = path.join(scriptsDirectory, "buildProtocol.js");
var buildProtocolDts = path.join(builtLocalDirectory, "protocol.d.ts");
var typescriptServicesDts = path.join(builtLocalDirectory, "typescriptServices.d.ts");

file(buildProtocolTs);

compileFile(buildProtocolJs,
    [buildProtocolTs],
    [buildProtocolTs],
    [],
    /*useBuiltCompiler*/ false,
    {noOutFile: true});

file(buildProtocolDts, [buildProtocolTs, buildProtocolJs, typescriptServicesDts], function() {

    var protocolTs = path.join(serverDirectory, "protocol.ts");

    var cmd = host + " " + buildProtocolJs + " "+ protocolTs + " " + typescriptServicesDts + " " + buildProtocolDts;
    console.log(cmd);
    var ex = jake.createExec([cmd]);
    // Add listeners for output and error
    ex.addListener("stdout", function (output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function (error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function () {
        complete();
    });
    ex.run();
}, { async: true })

// The generated diagnostics map; built for the compiler and for the 'generate-diagnostics' task
file(diagnosticInfoMapTs, [processDiagnosticMessagesJs, diagnosticMessagesJson], function () {
    var cmd = host + " " + processDiagnosticMessagesJs + " " + diagnosticMessagesJson;
    console.log(cmd);
    var ex = jake.createExec([cmd]);
    // Add listeners for output and error
    ex.addListener("stdout", function (output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function (error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function () {
        complete();
    });
    ex.run();
}, { async: true });

file(builtGeneratedDiagnosticMessagesJSON, [generatedDiagnosticMessagesJSON], function () {
    if (fs.existsSync(builtLocalDirectory)) {
        jake.cpR(generatedDiagnosticMessagesJSON, builtGeneratedDiagnosticMessagesJSON);
    }
});

desc("Generates a diagnostic file in TypeScript based on an input JSON file");
task("generate-diagnostics", [diagnosticInfoMapTs]);

// Publish nightly
var configureNightlyJs = path.join(scriptsDirectory, "configureNightly.js");
var configureNightlyTs = path.join(scriptsDirectory, "configureNightly.ts");
var packageJson = "package.json";
var programTs = path.join(compilerDirectory, "program.ts");

file(configureNightlyTs);

compileFile(/*outfile*/configureNightlyJs,
            /*sources*/[configureNightlyTs],
            /*prereqs*/[configureNightlyTs],
            /*prefixes*/[],
            /*useBuiltCompiler*/ false,
    { noOutFile: false, generateDeclarations: false, keepComments: false, noResolve: false, stripInternal: false });

task("setDebugMode", function () {
    useDebugMode = true;
});

task("configure-nightly", [configureNightlyJs], function () {
    var cmd = host + " " + configureNightlyJs + " " + packageJson + " " + programTs;
    console.log(cmd);
    exec(cmd);
}, { async: true });

desc("Configure, build, test, and publish the nightly release.");
task("publish-nightly", ["configure-nightly", "LKG", "clean", "setDebugMode", "runtests"], function () {
    var cmd = "npm publish --tag next";
    console.log(cmd);
    exec(cmd);
});

var importDefinitelyTypedTestsDirectory = path.join(scriptsDirectory, "importDefinitelyTypedTests");
var importDefinitelyTypedTestsJs = path.join(importDefinitelyTypedTestsDirectory, "importDefinitelyTypedTests.js");
var importDefinitelyTypedTestsTs = path.join(importDefinitelyTypedTestsDirectory, "importDefinitelyTypedTests.ts");

file(importDefinitelyTypedTestsTs);
file(importDefinitelyTypedTestsJs, ["tsd-scripts", importDefinitelyTypedTestsTs], function () {
    var cmd = host + " " + LKGCompiler + " -p " + importDefinitelyTypedTestsDirectory;
    console.log(cmd);
    exec(cmd);
}, { async: true });

task("importDefinitelyTypedTests", [importDefinitelyTypedTestsJs], function () {
    var cmd = host + " " + importDefinitelyTypedTestsJs + " ./ ../DefinitelyTyped";
    console.log(cmd);
    exec(cmd);
}, { async: true });

// Local target to build the compiler and services
var tscFile = path.join(builtLocalDirectory, compilerFilename);
compileFile(tscFile, compilerSources, [builtLocalDirectory, copyright].concat(compilerSources), [copyright], /*useBuiltCompiler:*/ false);

var servicesFile = path.join(builtLocalDirectory, "typescriptServices.js");
var servicesFileInBrowserTest = path.join(builtLocalDirectory, "typescriptServicesInBrowserTest.js");
var standaloneDefinitionsFile = path.join(builtLocalDirectory, "typescriptServices.d.ts");
var nodePackageFile = path.join(builtLocalDirectory, "typescript.js");
var nodeDefinitionsFile = path.join(builtLocalDirectory, "typescript.d.ts");
var nodeStandaloneDefinitionsFile = path.join(builtLocalDirectory, "typescript_standalone.d.ts");

compileFile(servicesFile, servicesSources, [builtLocalDirectory, copyright].concat(servicesSources),
            /*prefixes*/[copyright],
            /*useBuiltCompiler*/ true,
            /*opts*/ {
        noOutFile: false,
        generateDeclarations: true,
        preserveConstEnums: true,
        keepComments: true,
        noResolve: false,
        stripInternal: true
    },
            /*callback*/ function () {
        jake.cpR(servicesFile, nodePackageFile, { silent: true });

        prependFile(copyright, standaloneDefinitionsFile);

        // Stanalone/web definition file using global 'ts' namespace
        jake.cpR(standaloneDefinitionsFile, nodeDefinitionsFile, { silent: true });
        var definitionFileContents = fs.readFileSync(nodeDefinitionsFile).toString();
        definitionFileContents = definitionFileContents.replace(/^(\s*)(export )?const enum (\S+) {(\s*)$/gm, '$1$2enum $3 {$4');
        fs.writeFileSync(standaloneDefinitionsFile, definitionFileContents);

        // Official node package definition file, pointed to by 'typings' in package.json
        // Created by appending 'export = ts;' at the end of the standalone file to turn it into an external module
        var nodeDefinitionsFileContents = definitionFileContents + "\r\nexport = ts;";
        fs.writeFileSync(nodeDefinitionsFile, nodeDefinitionsFileContents);

        // Node package definition file to be distributed without the package. Created by replacing
        // 'ts' namespace with '"typescript"' as a module.
        var nodeStandaloneDefinitionsFileContents = definitionFileContents.replace(/declare (namespace|module) ts/g, 'declare module "typescript"');
        fs.writeFileSync(nodeStandaloneDefinitionsFile, nodeStandaloneDefinitionsFileContents);
    });

compileFile(
    servicesFileInBrowserTest,
    servicesSources,
    [builtLocalDirectory, copyright].concat(servicesSources),
    /*prefixes*/[copyright],
    /*useBuiltCompiler*/ true,
    {
        noOutFile: false,
        generateDeclarations: true,
        preserveConstEnums: true,
        keepComments: true,
        noResolve: false,
        stripInternal: true,
        noMapRoot: true,
        inlineSourceMap: true
    });

file(typescriptServicesDts, [servicesFile]);

var cancellationTokenFile = path.join(builtLocalDirectory, "cancellationToken.js");
compileFile(cancellationTokenFile, cancellationTokenSources, [builtLocalDirectory].concat(cancellationTokenSources), /*prefixes*/ [copyright], /*useBuiltCompiler*/ true, { outDir: builtLocalDirectory, noOutFile: true });

var typingsInstallerFile = path.join(builtLocalDirectory, "typingsInstaller.js");
compileFile(typingsInstallerFile, typingsInstallerSources, [builtLocalDirectory].concat(typingsInstallerSources), /*prefixes*/ [copyright], /*useBuiltCompiler*/ true, { outDir: builtLocalDirectory, noOutFile: false });

var serverFile = path.join(builtLocalDirectory, "tsserver.js");
compileFile(serverFile, serverSources, [builtLocalDirectory, copyright, cancellationTokenFile, typingsInstallerFile].concat(serverSources), /*prefixes*/ [copyright], /*useBuiltCompiler*/ true, { types: ["node"] });
var tsserverLibraryFile = path.join(builtLocalDirectory, "tsserverlibrary.js");
var tsserverLibraryDefinitionFile = path.join(builtLocalDirectory, "tsserverlibrary.d.ts");
compileFile(
    tsserverLibraryFile,
    languageServiceLibrarySources,
    [builtLocalDirectory, copyright, builtLocalCompiler].concat(languageServiceLibrarySources).concat(libraryTargets),
    /*prefixes*/[copyright],
    /*useBuiltCompiler*/ true,
    { noOutFile: false, generateDeclarations: true });

// Local target to build the language service server library
desc("Builds language service server library");
task("lssl", [tsserverLibraryFile, tsserverLibraryDefinitionFile]);

desc("Emit the start of the build fold");
task("build-fold-start", [], function () {
    if (fold.isTravis()) console.log(fold.start("build"));
});

desc("Emit the end of the build fold");
task("build-fold-end", [], function () {
    if (fold.isTravis()) console.log(fold.end("build"));
});

// Local target to build the compiler and services
desc("Builds the full compiler and services");
task("local", ["build-fold-start", "generate-diagnostics", "lib", tscFile, servicesFile, nodeDefinitionsFile, serverFile, buildProtocolDts, builtGeneratedDiagnosticMessagesJSON, "lssl", "build-fold-end"]);

// Local target to build only tsc.js
desc("Builds only the compiler");
task("tsc", ["generate-diagnostics", "lib", tscFile]);

// Local target to build the compiler and services
desc("Sets release mode flag");
task("release", function () {
    useDebugMode = false;
});

// Set the default task to "local"
task("default", ["local"]);


// Cleans the built directory
desc("Cleans the compiler output, declare files, and tests");
task("clean", function () {
    jake.rmRf(builtDirectory);
});

// Generate Markdown spec
var word2mdJs = path.join(scriptsDirectory, "word2md.js");
var word2mdTs = path.join(scriptsDirectory, "word2md.ts");
var specWord = path.join(docDirectory, "TypeScript Language Specification.docx");
var specMd = path.join(docDirectory, "spec.md");

file(word2mdTs);

// word2md script
compileFile(word2mdJs,
    [word2mdTs],
    [word2mdTs],
    [],
            /*useBuiltCompiler*/ false);

// The generated spec.md; built for the 'generate-spec' task
file(specMd, [word2mdJs, specWord], function () {
    var specWordFullPath = path.resolve(specWord);
    var specMDFullPath = path.resolve(specMd);
    var cmd = "cscript //nologo " + word2mdJs + ' "' + specWordFullPath + '" ' + '"' + specMDFullPath + '"';
    console.log(cmd);
    child_process.exec(cmd, function () {
        complete();
    });
}, { async: true });


desc("Generates a Markdown version of the Language Specification");
task("generate-spec", [specMd]);


// Makes a new LKG. This target does not build anything, but errors if not all the outputs are present in the built/local directory
desc("Makes a new LKG out of the built js files");
task("LKG", ["clean", "release", "local"].concat(libraryTargets), function () {
    var expectedFiles = [tscFile, servicesFile, serverFile, nodePackageFile, nodeDefinitionsFile, standaloneDefinitionsFile, tsserverLibraryFile, tsserverLibraryDefinitionFile, cancellationTokenFile, typingsInstallerFile, buildProtocolDts].concat(libraryTargets);
    var missingFiles = expectedFiles.filter(function (f) {
        return !fs.existsSync(f);
    });
    if (missingFiles.length > 0) {
        fail("Cannot replace the LKG unless all built targets are present in directory " + builtLocalDirectory +
            ". The following files are missing:\n" + missingFiles.join("\n"));
    }
    // Copy all the targets into the LKG directory
    jake.mkdirP(LKGDirectory);
    for (i in expectedFiles) {
        jake.cpR(expectedFiles[i], LKGDirectory);
    }
    //var resourceDirectories = fs.readdirSync(builtLocalResourcesDirectory).map(function(p) { return path.join(builtLocalResourcesDirectory, p); });
    //resourceDirectories.map(function(d) {
    //    jake.cpR(d, LKGResourcesDirectory);
    //});
});

// Test directory
directory(builtLocalDirectory);

// Task to build the tests infrastructure using the built compiler
var run = path.join(builtLocalDirectory, "run.js");
compileFile(
    /*outFile*/ run,
    /*source*/ harnessSources,
    /*prereqs*/[builtLocalDirectory, tscFile].concat(libraryTargets).concat(servicesSources).concat(harnessSources),
    /*prefixes*/[],
    /*useBuiltCompiler:*/ true,
    /*opts*/ { inlineSourceMap: true, types: ["node", "mocha", "chai"] });

var internalTests = "internal/";

var localBaseline = "tests/baselines/local/";
var refBaseline = "tests/baselines/reference/";

var localRwcBaseline = path.join(internalTests, "baselines/rwc/local");
var refRwcBaseline = path.join(internalTests, "baselines/rwc/reference");

var localTest262Baseline = path.join(internalTests, "baselines/test262/local");
var refTest262Baseline = path.join(internalTests, "baselines/test262/reference");

desc("Builds the test infrastructure using the built compiler");
task("tests", ["local", run].concat(libraryTargets));

function exec(cmd, completeHandler, errorHandler) {
    var ex = jake.createExec([cmd], { windowsVerbatimArguments: true });
    // Add listeners for output and error
    ex.addListener("stdout", function (output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function (error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function () {
        if (completeHandler) {
            completeHandler();
        }
        complete();
    });
    ex.addListener("error", function (e, status) {
        if (errorHandler) {
            errorHandler(e, status);
        } else {
            fail("Process exited with code " + status);
        }
    });

    ex.run();
}

function cleanTestDirs() {
    // Clean the local baselines directory
    if (fs.existsSync(localBaseline)) {
        jake.rmRf(localBaseline);
    }

    // Clean the local Rwc baselines directory
    if (fs.existsSync(localRwcBaseline)) {
        jake.rmRf(localRwcBaseline);
    }

    jake.mkdirP(localRwcBaseline);
    jake.mkdirP(localTest262Baseline);
    jake.mkdirP(localBaseline);
}

// used to pass data from jake command line directly to run.js
function writeTestConfigFile(tests, light, taskConfigsFolder, workerCount, stackTraceLimit) {
    var testConfigContents = JSON.stringify({
        test: tests ? [tests] : undefined,
        light: light,
        workerCount: workerCount,
        taskConfigsFolder: taskConfigsFolder,
        stackTraceLimit: stackTraceLimit
    });
    fs.writeFileSync('test.config', testConfigContents);
}

function deleteTemporaryProjectOutput() {
    if (fs.existsSync(path.join(localBaseline, "projectOutput/"))) {
        jake.rmRf(path.join(localBaseline, "projectOutput/"));
    }
}

function runConsoleTests(defaultReporter, runInParallel) {
    var dirty = process.env.dirty;
    if (!dirty) {
        cleanTestDirs();
    }

    var debug = process.env.debug || process.env.d;
    tests = process.env.test || process.env.tests || process.env.t;
    var light = process.env.light || false;
    var stackTraceLimit = process.env.stackTraceLimit;
    var testConfigFile = 'test.config';
    if (fs.existsSync(testConfigFile)) {
        fs.unlinkSync(testConfigFile);
    }
    var workerCount, taskConfigsFolder;
    if (runInParallel) {
        // generate name to store task configuration files
        var prefix = os.tmpdir() + "/ts-tests";
        var i = 1;
        do {
            taskConfigsFolder = prefix + i;
            i++;
        } while (fs.existsSync(taskConfigsFolder));
        fs.mkdirSync(taskConfigsFolder);

        workerCount = process.env.workerCount || os.cpus().length;
    }

    if (tests || light || taskConfigsFolder) {
        writeTestConfigFile(tests, light, taskConfigsFolder, workerCount, stackTraceLimit);
    }

    if (tests && tests.toLocaleLowerCase() === "rwc") {
        testTimeout = 400000;
    }

    colors = process.env.colors || process.env.color;
    colors = colors ? ' --no-colors ' : ' --colors ';
    reporter = process.env.reporter || process.env.r || defaultReporter;
    var bail = (process.env.bail || process.env.b) ? "--bail" : "";
    var lintFlag = process.env.lint !== 'false';

    // timeout normally isn't necessary but Travis-CI has been timing out on compiler baselines occasionally
    // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
    if (!runInParallel) {
        var startTime = mark();
        tests = tests ? ' -g "' + tests + '"' : '';
        var cmd = "mocha" + (debug ? " --debug-brk" : "") + " -R " + reporter + tests + colors + bail + ' -t ' + testTimeout + ' ' + run;
        console.log(cmd);

        var savedNodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";
        exec(cmd, function () {
            process.env.NODE_ENV = savedNodeEnv;
            measure(startTime);
            runLinter();
            finish();
        }, function (e, status) {
            process.env.NODE_ENV = savedNodeEnv;
            measure(startTime);
            finish(status);
        });

    }
    else {
        var savedNodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";
        var startTime = mark();
        runTestsInParallel(taskConfigsFolder, run, { testTimeout: testTimeout, noColors: colors === " --no-colors " }, function (err) {
            process.env.NODE_ENV = savedNodeEnv;
            measure(startTime);
            // last worker clean everything and runs linter in case if there were no errors
            deleteTemporaryProjectOutput();
            jake.rmRf(taskConfigsFolder);
            if (err) {
                fail(err);
            }
            else {
                runLinter();
                complete();
            }
        });
    }

    function failWithStatus(status) {
        fail("Process exited with code " + status);
    }

    function finish(errorStatus) {
        deleteTemporaryProjectOutput();
        if (errorStatus !== undefined) {
            failWithStatus(errorStatus);
        }
        else {
            complete();
        }
    }
    function runLinter() {
        if (!lintFlag || dirty) {
            return;
        }
        var lint = jake.Task['lint'];
        lint.addListener('complete', function () {
            complete();
        });
        lint.invoke();
    }
}

var testTimeout = 20000;
desc("Runs all the tests in parallel using the built run.js file. Optional arguments are: t[ests]=category1|category2|... d[ebug]=true.");
task("runtests-parallel", ["build-rules", "tests", builtLocalDirectory], function () {
    runConsoleTests('min', /*runInParallel*/ true);
}, { async: true });

desc("Runs the tests using the built run.js file. Optional arguments are: t[ests]=regex r[eporter]=[list|spec|json|<more>] d[ebug]=true color[s]=false lint=true bail=false dirty=false.");
task("runtests", ["build-rules", "tests", builtLocalDirectory], function() {
    runConsoleTests('mocha-fivemat-progress-reporter', /*runInParallel*/ false);
}, { async: true });

desc("Generates code coverage data via instanbul");
task("generate-code-coverage", ["tests", builtLocalDirectory], function () {
    var cmd = 'istanbul cover node_modules/mocha/bin/_mocha -- -R min -t ' + testTimeout + ' ' + run;
    console.log(cmd);
    exec(cmd);
}, { async: true });

// Browser tests
var nodeServerOutFile = "tests/webTestServer.js";
var nodeServerInFile = "tests/webTestServer.ts";
compileFile(nodeServerOutFile, [nodeServerInFile], [builtLocalDirectory, tscFile], [], /*useBuiltCompiler:*/ true, { noOutFile: true });

desc("Runs browserify on run.js to produce a file suitable for running tests in the browser");
task("browserify", ["tests", builtLocalDirectory, nodeServerOutFile], function() {
    var cmd = 'browserify built/local/run.js -t ./scripts/browserify-optional -d -o built/local/bundle.js';
    exec(cmd);
}, { async: true });

desc("Runs the tests using the built run.js file like 'jake runtests'. Syntax is jake runtests-browser. Additional optional parameters tests=[regex], browser=[chrome|IE]");
task("runtests-browser", ["tests", "browserify", builtLocalDirectory, servicesFileInBrowserTest], function () {
    cleanTestDirs();
    host = "node";
    browser = process.env.browser || process.env.b ||  (os.platform() === "linux" ? "chrome" : "IE");
    tests = process.env.test || process.env.tests || process.env.t;
    var light = process.env.light || false;
    var testConfigFile = 'test.config';
    if (fs.existsSync(testConfigFile)) {
        fs.unlinkSync(testConfigFile);
    }
    if (tests || light) {
        writeTestConfigFile(tests, light);
    }

    tests = tests ? tests : '';
    var cmd = host + " tests/webTestServer.js " + browser + " " + JSON.stringify(tests);
    console.log(cmd);
    exec(cmd);
}, { async: true });

function getDiffTool() {
    var program = process.env['DIFF'];
    if (!program) {
        fail("Add the 'DIFF' environment variable to the path of the program you want to use.");
    }
    return program;
}

// Baseline Diff
desc("Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable");
task('diff', function () {
    var cmd = '"' + getDiffTool() + '" ' + refBaseline + ' ' + localBaseline;
    console.log(cmd);
    exec(cmd);
}, { async: true });

desc("Diffs the RWC baselines using the diff tool specified by the 'DIFF' environment variable");
task('diff-rwc', function () {
    var cmd = '"' + getDiffTool() + '" ' + refRwcBaseline + ' ' + localRwcBaseline;
    console.log(cmd);
    exec(cmd);
}, { async: true });

desc("Builds the test sources and automation in debug mode");
task("tests-debug", ["setDebugMode", "tests"]);


// Makes the test results the new baseline
desc("Makes the most recent test results the new baseline, overwriting the old baseline");
task("baseline-accept", function () {
    acceptBaseline("");
});

function acceptBaseline(containerFolder) {
    var sourceFolder = path.join(localBaseline, containerFolder);
    var targetFolder = path.join(refBaseline, containerFolder);
    console.log('Accept baselines from ' + sourceFolder + ' to ' + targetFolder);
    var files = fs.readdirSync(sourceFolder);
    var deleteEnding = '.delete';
    for (var i in files) {
        var filename = files[i];
        var fullLocalPath = path.join(sourceFolder, filename);
        if (fs.statSync(fullLocalPath).isFile()) {
            if (filename.substr(filename.length - deleteEnding.length) === deleteEnding) {
                filename = filename.substr(0, filename.length - deleteEnding.length);
                fs.unlinkSync(path.join(targetFolder, filename));
            } else {
                var target = path.join(targetFolder, filename);
                if (fs.existsSync(target)) {
                    fs.unlinkSync(target);
                }
                fs.renameSync(path.join(sourceFolder, filename), target);
            }
        }
    }
}

desc("Makes the most recent rwc test results the new baseline, overwriting the old baseline");
task("baseline-accept-rwc", function () {
    acceptBaseline("rwc");
});

desc("Makes the most recent test262 test results the new baseline, overwriting the old baseline");
task("baseline-accept-test262", function () {
    acceptBaseline("test262");
});


// Webhost
var webhostPath = "tests/webhost/webtsc.ts";
var webhostJsPath = "tests/webhost/webtsc.js";
compileFile(webhostJsPath, [webhostPath], [tscFile, webhostPath].concat(libraryTargets), [], /*useBuiltCompiler*/true);

desc("Builds the tsc web host");
task("webhost", [webhostJsPath], function () {
    jake.cpR(path.join(builtLocalDirectory, "lib.d.ts"), "tests/webhost/", { silent: true });
});

// Perf compiler
var perftscPath = "tests/perftsc.ts";
var perftscJsPath = "built/local/perftsc.js";
compileFile(perftscJsPath, [perftscPath], [tscFile, perftscPath, "tests/perfsys.ts"].concat(libraryTargets), [], /*useBuiltCompiler*/ true);
desc("Builds augmented version of the compiler for perf tests");
task("perftsc", [perftscJsPath]);

// Instrumented compiler
var loggedIOpath = harnessDirectory + 'loggedIO.ts';
var loggedIOJsPath = builtLocalDirectory + 'loggedIO.js';
file(loggedIOJsPath, [builtLocalDirectory, loggedIOpath], function () {
    var temp = builtLocalDirectory + 'temp';
    jake.mkdirP(temp);
    var options = "--types --outdir " + temp + ' ' + loggedIOpath;
    var cmd = host + " " + LKGDirectory + compilerFilename + " " + options + " ";
    console.log(cmd + "\n");
    var ex = jake.createExec([cmd]);
    ex.addListener("cmdEnd", function () {
        fs.renameSync(temp + '/harness/loggedIO.js', loggedIOJsPath);
        jake.rmRf(temp);
        complete();
    });
    ex.run();
}, { async: true });

var instrumenterPath = harnessDirectory + 'instrumenter.ts';
var instrumenterJsPath = builtLocalDirectory + 'instrumenter.js';
compileFile(instrumenterJsPath, [instrumenterPath], [tscFile, instrumenterPath].concat(libraryTargets), [], /*useBuiltCompiler*/ true);

desc("Builds an instrumented tsc.js");
task('tsc-instrumented', [loggedIOJsPath, instrumenterJsPath, tscFile], function () {
    var cmd = host + ' ' + instrumenterJsPath + ' record iocapture ' + builtLocalDirectory + compilerFilename;
    console.log(cmd);
    var ex = jake.createExec([cmd]);
    ex.addListener("cmdEnd", function () {
        complete();
    });
    ex.run();
}, { async: true });

desc("Updates the sublime plugin's tsserver");
task("update-sublime", ["local", serverFile], function () {
    jake.cpR(serverFile, "../TypeScript-Sublime-Plugin/tsserver/");
    jake.cpR(serverFile + ".map", "../TypeScript-Sublime-Plugin/tsserver/");
});

var tslintRuleDir = "scripts/tslint";
var tslintRules = [
    "nextLineRule",
    "preferConstRule",
    "booleanTriviaRule",
    "typeOperatorSpacingRule",
    "noInOperatorRule",
    "noIncrementDecrementRule",
    "objectLiteralSurroundingSpaceRule",
    "noTypeAssertionWhitespaceRule"
];
var tslintRulesFiles = tslintRules.map(function (p) {
    return path.join(tslintRuleDir, p + ".ts");
});
var tslintRulesOutFiles = tslintRules.map(function (p) {
    return path.join(builtLocalDirectory, "tslint", p + ".js");
});
desc("Compiles tslint rules to js");
task("build-rules", ["build-rules-start"].concat(tslintRulesOutFiles).concat(["build-rules-end"]));
tslintRulesFiles.forEach(function (ruleFile, i) {
    compileFile(tslintRulesOutFiles[i], [ruleFile], [ruleFile], [], /*useBuiltCompiler*/ false,
        { noOutFile: true, generateDeclarations: false, outDir: path.join(builtLocalDirectory, "tslint") });
});

desc("Emit the start of the build-rules fold");
task("build-rules-start", [], function () {
    if (fold.isTravis()) console.log(fold.start("build-rules"));
});

desc("Emit the end of the build-rules fold");
task("build-rules-end", [], function () {
    if (fold.isTravis()) console.log(fold.end("build-rules"));
});

var lintTargets = compilerSources
    .concat(harnessSources)
    // Other harness sources
    .concat(["instrumenter.ts"].map(function (f) { return path.join(harnessDirectory, f) }))
    .concat(serverCoreSources)
    .concat(tslintRulesFiles)
    .concat(servicesSources)
    .concat(typingsInstallerSources)
    .concat(cancellationTokenSources)
    .concat(["Gulpfile.ts"])
    .concat([nodeServerInFile, perftscPath, "tests/perfsys.ts", webhostPath]);

function sendNextFile(files, child, callback, failures) {
    var file = files.pop();
    if (file) {
        console.log("Linting '" + file + "'.");
        child.send({ kind: "file", name: file });
    }
    else {
        child.send({ kind: "close" });
        callback(failures);
    }
}

function spawnLintWorker(files, callback) {
    var child = child_process.fork("./scripts/parallel-lint");
    var failures = 0;
    child.on("message", function (data) {
        switch (data.kind) {
            case "result":
                if (data.failures > 0) {
                    failures += data.failures;
                    console.log(data.output);
                }
                sendNextFile(files, child, callback, failures);
                break;
            case "error":
                console.error(data.error);
                failures++;
                sendNextFile(files, child, callback, failures);
                break;
        }
    });
    sendNextFile(files, child, callback, failures);
}

desc("Runs tslint on the compiler sources. Optional arguments are: f[iles]=regex");
task("lint", ["build-rules"], function () {
    if (fold.isTravis()) console.log(fold.start("lint"));
    var startTime = mark();
    var failed = 0;
    var fileMatcher = RegExp(process.env.f || process.env.file || process.env.files || "");
    var done = {};
    for (var i in lintTargets) {
        var target = lintTargets[i];
        if (!done[target] && fileMatcher.test(target)) {
            done[target] = fs.statSync(target).size;
        }
    }

    var workerCount = (process.env.workerCount && +process.env.workerCount) || os.cpus().length;

    var names = Object.keys(done).sort(function (namea, nameb) {
        return done[namea] - done[nameb];
    });

    for (var i = 0; i < workerCount; i++) {
        spawnLintWorker(names, finished);
    }

    var completed = 0;
    var failures = 0;
    function finished(fails) {
        completed++;
        failures += fails;
        if (completed === workerCount) {
            measure(startTime);
            if (fold.isTravis()) console.log(fold.end("lint"));
            if (failures > 0) {
                fail('Linter errors.', failed);
            }
            else {
                complete();
            }
        }
    }
}, { async: true });
