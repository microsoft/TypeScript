// This file contains the build logic for the public repo

var fs = require("fs");
var os = require("os");
var path = require("path");
var child_process = require("child_process");
var Linter = require("tslint");

// Variables
var compilerDirectory = "src/compiler/";
var servicesDirectory = "src/services/";
var serverDirectory = "src/server/";
var harnessDirectory = "src/harness/";
var libraryDirectory = "src/lib/";
var scriptsDirectory = "scripts/";
var unittestsDirectory = "tests/cases/unittests/";
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

var compilerSources = [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "sourcemap.ts",
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
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "sourcemap.ts",
    "declarationEmitter.ts",
    "emitter.ts",
    "program.ts",
    "commandLineParser.ts",
    "diagnosticInformationMap.generated.ts"
].map(function (f) {
    return path.join(compilerDirectory, f);
}).concat([
    "breakpoints.ts",
    "navigateTo.ts",
    "navigationBar.ts",
    "outliningElementsCollector.ts",
    "patternMatcher.ts",
    "services.ts",
    "shims.ts",
    "signatureHelp.ts",
    "utilities.ts",
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
    "node.d.ts",
    "editorServices.ts",
    "protocol.d.ts",
    "session.ts",
    "server.ts"
].map(function (f) {
    return path.join(serverDirectory, f);
});

var serverSources = serverCoreSources.concat(servicesSources);

var languageServiceLibrarySources = [
    "editorServices.ts",
    "protocol.d.ts",
    "session.ts"
].map(function (f) {
    return path.join(serverDirectory, f);
}).concat(servicesSources);

var harnessCoreSources = [
    "harness.ts",
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
    "tsconfigParsing.ts"
].map(function (f) {
    return path.join(unittestsDirectory, f);
})).concat([
    "protocol.d.ts",
    "session.ts",
    "client.ts",
    "editorServices.ts",
].map(function (f) {
    return path.join(serverDirectory, f);
}));

var librarySourceMap = [
        { target: "lib.core.d.ts", sources: ["header.d.ts", "core.d.ts"] },
        { target: "lib.dom.d.ts", sources: ["importcore.d.ts", "intl.d.ts", "dom.generated.d.ts"], },
        { target: "lib.webworker.d.ts", sources: ["importcore.d.ts", "intl.d.ts", "webworker.generated.d.ts"], },
        { target: "lib.scriptHost.d.ts", sources: ["importcore.d.ts", "scriptHost.d.ts"], },
        { target: "lib.d.ts", sources: ["header.d.ts", "core.d.ts", "intl.d.ts", "dom.generated.d.ts", "webworker.importscripts.d.ts", "scriptHost.d.ts"], },
        { target: "lib.core.es6.d.ts", sources: ["header.d.ts", "core.d.ts", "es6.d.ts"]},
        { target: "lib.es6.d.ts", sources: ["header.d.ts", "es6.d.ts", "core.d.ts", "intl.d.ts", "dom.generated.d.ts", "dom.es6.d.ts", "webworker.importscripts.d.ts", "scriptHost.d.ts"] },
        { target: "lib.core.es7.d.ts", sources: ["header.d.ts", "core.d.ts", "es6.d.ts", "es7.d.ts"]},
        { target: "lib.es7.d.ts", sources: ["header.d.ts", "es6.d.ts", "es7.d.ts", "core.d.ts", "intl.d.ts", "dom.generated.d.ts", "dom.es6.d.ts", "webworker.importscripts.d.ts", "scriptHost.d.ts"] }
];

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
    jake.cpR(prefixFile, temp, {silent: true});
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
    jake.cpR(sourceFiles[0], temp, {silent: true});
    // append all files in sequence
    for (var i = 1; i < sourceFiles.length; i++) {
        if (!fs.existsSync(sourceFiles[i])) {
                fail(sourceFiles[i] + " does not exist!");
        }
        fs.appendFileSync(temp, fs.readFileSync(sourceFiles[i]));
    }
    // Move the file to the final destination
    fs.renameSync(temp, destinationFile);
}

var useDebugMode = true;
var host = (process.env.host || process.env.TYPESCRIPT_HOST || "node");
var compilerFilename = "tsc.js";
var LKGCompiler = path.join(LKGDirectory, compilerFilename);
var builtLocalCompiler = path.join(builtLocalDirectory, compilerFilename);

/* Compiles a file from a list of sources
    * @param outFile: the target file name
    * @param sources: an array of the names of the source files
    * @param prereqs: prerequisite tasks to compiling the file
    * @param prefixes: a list of files to prepend to the target file
    * @param useBuiltCompiler: true to use the built compiler, false to use the LKG
    * @param noOutFile: true to compile without using --out
    * @param generateDeclarations: true to compile using --declaration
    * @param outDir: true to compile using --outDir
    * @param keepComments: false to compile using --removeComments
    * @param callback: a function to execute after the compilation process ends
    */
function compileFile(outFile, sources, prereqs, prefixes, useBuiltCompiler, noOutFile, generateDeclarations, outDir, preserveConstEnums, keepComments, noResolve, stripInternal, callback) {
    file(outFile, prereqs, function() {
        var compilerPath = useBuiltCompiler ? builtLocalCompiler : LKGCompiler;
        var options = "--noImplicitAny --noEmitOnError --pretty";

        // Keep comments when specifically requested
        // or when in debug mode.
        if (!(keepComments || useDebugMode)) {
            options += " --removeComments";
        }

        if (generateDeclarations) {
            options += " --declaration";
        }

        if (preserveConstEnums || useDebugMode) {
            options += " --preserveConstEnums";
        }

        if (outDir) {
            options += " --outDir " + outDir;
        }

        if (!noOutFile) {
            options += " --out " + outFile;
        }
        else {
            options += " --module commonjs"
        }

        if(noResolve) {
            options += " --noResolve";
        }

        if (useDebugMode) {
            options += " -sourcemap -mapRoot file:///" + path.resolve(path.dirname(outFile));
        }

        if (stripInternal) {
            options += " --stripInternal"
        }

        var cmd = host + " " + compilerPath + " " + options + " ";
        cmd = cmd + sources.join(" ");
        console.log(cmd + "\n");

        var ex = jake.createExec([cmd]);
        // Add listeners for output and error
        ex.addListener("stdout", function(output) {
            process.stdout.write(output);
        });
        ex.addListener("stderr", function(error) {
            process.stderr.write(error);
        });
        ex.addListener("cmdEnd", function() {
            if (!useDebugMode && prefixes && fs.existsSync(outFile)) {
                for (var i in prefixes) {
                    prependFile(prefixes[i], outFile);
                }
            }

            if (callback) {
                callback();
            }

            complete();
        });
        ex.addListener("error", function() {
            fs.unlinkSync(outFile);
            fail("Compilation of " + outFile + " unsuccessful");
        });
        ex.run();
    }, {async: true});
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
        file(target, [builtLocalDirectory].concat(sources), function() {
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

// The generated diagnostics map; built for the compiler and for the 'generate-diagnostics' task
file(diagnosticInfoMapTs, [processDiagnosticMessagesJs, diagnosticMessagesJson], function () {
    var cmd = host + " " + processDiagnosticMessagesJs + " "  + diagnosticMessagesJson;
    console.log(cmd);
    var ex = jake.createExec([cmd]);
    // Add listeners for output and error
    ex.addListener("stdout", function(output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function(error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function() {
        complete();
    });
    ex.run();
}, {async: true});

file(builtGeneratedDiagnosticMessagesJSON,[generatedDiagnosticMessagesJSON], function() {
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
            /*sources*/ [configureNightlyTs],
            /*prereqs*/ [configureNightlyTs],
            /*prefixes*/ [],
            /*useBuiltCompiler*/ false,
            /*noOutFile*/ false,
            /*generateDeclarations*/ false,
            /*outDir*/ undefined,
            /*preserveConstEnums*/ undefined,
            /*keepComments*/ false,
            /*noResolve*/ false,
            /*stripInternal*/ false);

task("setDebugMode", function() {
    useDebugMode = true;
});

task("configure-nightly", [configureNightlyJs], function() {
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

var scriptsTsdJson = path.join(scriptsDirectory, "tsd.json");
file(scriptsTsdJson);

task("tsd-scripts", [scriptsTsdJson], function () {
    var cmd = "tsd --config " + scriptsTsdJson + " install";
    console.log(cmd)
    exec(cmd);
}, { async: true })

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
var standaloneDefinitionsFile = path.join(builtLocalDirectory, "typescriptServices.d.ts");
var nodePackageFile = path.join(builtLocalDirectory, "typescript.js");
var nodeDefinitionsFile = path.join(builtLocalDirectory, "typescript.d.ts");
var nodeStandaloneDefinitionsFile = path.join(builtLocalDirectory, "typescript_standalone.d.ts");

compileFile(servicesFile, servicesSources,[builtLocalDirectory, copyright].concat(servicesSources),
            /*prefixes*/ [copyright],
            /*useBuiltCompiler*/ true,
            /*noOutFile*/ false,
            /*generateDeclarations*/ true,
            /*outDir*/ undefined,
            /*preserveConstEnums*/ true,
            /*keepComments*/ true,
            /*noResolve*/ false,
            /*stripInternal*/ true,
            /*callback*/ function () {
                jake.cpR(servicesFile, nodePackageFile, {silent: true});

                prependFile(copyright, standaloneDefinitionsFile);

                // Stanalone/web definition file using global 'ts' namespace
                jake.cpR(standaloneDefinitionsFile, nodeDefinitionsFile, {silent: true});
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


var serverFile = path.join(builtLocalDirectory, "tsserver.js");
compileFile(serverFile, serverSources,[builtLocalDirectory, copyright].concat(serverSources), /*prefixes*/ [copyright], /*useBuiltCompiler*/ true);

var lsslFile = path.join(builtLocalDirectory, "tslssl.js");
compileFile(
    lsslFile,
    languageServiceLibrarySources,
    [builtLocalDirectory, copyright].concat(languageServiceLibrarySources),
    /*prefixes*/ [copyright],
    /*useBuiltCompiler*/ true,
    /*noOutFile*/ false,
    /*generateDeclarations*/ true);

// Local target to build the language service server library
desc("Builds language service server library");
task("lssl", [lsslFile]);

// Local target to build the compiler and services
desc("Builds the full compiler and services");
task("local", ["generate-diagnostics", "lib", tscFile, servicesFile, nodeDefinitionsFile, serverFile, builtGeneratedDiagnosticMessagesJSON]);

// Local target to build only tsc.js
desc("Builds only the compiler");
task("tsc", ["generate-diagnostics", "lib", tscFile]);

// Local target to build the compiler and services
desc("Sets release mode flag");
task("release", function() {
    useDebugMode = false;
});

// Set the default task to "local"
task("default", ["local"]);


// Cleans the built directory
desc("Cleans the compiler output, declare files, and tests");
task("clean", function() {
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
}, {async: true});


desc("Generates a Markdown version of the Language Specification");
task("generate-spec", [specMd]);


// Makes a new LKG. This target does not build anything, but errors if not all the outputs are present in the built/local directory
desc("Makes a new LKG out of the built js files");
task("LKG", ["clean", "release", "local"].concat(libraryTargets), function() {
    var expectedFiles = [tscFile, servicesFile, serverFile, nodePackageFile, nodeDefinitionsFile, standaloneDefinitionsFile].concat(libraryTargets);
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
compileFile(run, harnessSources, [builtLocalDirectory, tscFile].concat(libraryTargets).concat(harnessSources), [], /*useBuiltCompiler:*/ true);

var internalTests = "internal/"

var localBaseline = "tests/baselines/local/";
var refBaseline = "tests/baselines/reference/";

var localRwcBaseline = path.join(internalTests, "baselines/rwc/local");
var refRwcBaseline = path.join(internalTests, "baselines/rwc/reference");

var localTest262Baseline = path.join(internalTests, "baselines/test262/local");
var refTest262Baseline = path.join(internalTests, "baselines/test262/reference");

desc("Builds the test infrastructure using the built compiler");
task("tests", ["local", run].concat(libraryTargets));

function exec(cmd, completeHandler, errorHandler) {
    var ex = jake.createExec([cmd], {windowsVerbatimArguments: true});
    // Add listeners for output and error
    ex.addListener("stdout", function(output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function(error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function() {
        if (completeHandler) {
            completeHandler();
        }
        complete();
    });
    ex.addListener("error", function(e, status) {
        if(errorHandler) {
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
function writeTestConfigFile(tests, light, testConfigFile) {
    console.log('Running test(s): ' + tests);
    var testConfigContents = JSON.stringify({ test: [tests], light: light });
    fs.writeFileSync('test.config', testConfigContents);
}

function deleteTemporaryProjectOutput() {
    if (fs.existsSync(path.join(localBaseline, "projectOutput/"))) {
        jake.rmRf(path.join(localBaseline, "projectOutput/"));
    }
}

function runConsoleTests(defaultReporter, defaultSubsets, postLint) {
    cleanTestDirs();
    var debug = process.env.debug || process.env.d;
    tests = process.env.test || process.env.tests || process.env.t;
    var light = process.env.light || false;
    var testConfigFile = 'test.config';
    if(fs.existsSync(testConfigFile)) {
        fs.unlinkSync(testConfigFile);
    }

    if (tests || light) {
        writeTestConfigFile(tests, light, testConfigFile);
    }

    if (tests && tests.toLocaleLowerCase() === "rwc") {
        testTimeout = 100000;
    }

    colors = process.env.colors || process.env.color
    colors = colors ? ' --no-colors ' : ' --colors ';
    reporter = process.env.reporter || process.env.r || defaultReporter;

    // timeout normally isn't necessary but Travis-CI has been timing out on compiler baselines occasionally
    // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
    var subsetRegexes;
    if(defaultSubsets.length === 0) {
        subsetRegexes = [tests]
    }
    else {
        var subsets = tests ? tests.split("|") : defaultSubsets;
        subsetRegexes = subsets.map(function (sub) { return "^" + sub + ".*$"; });
        subsetRegexes.push("^(?!" + subsets.join("|") + ").*$");
    }
    subsetRegexes.forEach(function (subsetRegex) {
        tests = subsetRegex ? ' -g "' + subsetRegex + '"' : '';
        var cmd = "mocha" + (debug ? " --debug-brk" : "") + " -R " + reporter + tests + colors + ' -t ' + testTimeout + ' ' + run;
        console.log(cmd);
        exec(cmd, function () {
            deleteTemporaryProjectOutput();
            if (postLint) {
                var lint = jake.Task['lint'];
                lint.addListener('complete', function () {
                    complete();
                });
                lint.invoke();
            }
            else {
                complete();
            }
        });
    });
}

var testTimeout = 20000;
desc("Runs all the tests in parallel using the built run.js file. Optional arguments are: t[ests]=category1|category2|... d[ebug]=true.");
task("runtests-parallel", ["build-rules", "tests", builtLocalDirectory], function() {
    runConsoleTests('min', ['compiler', 'conformance', 'Projects', 'fourslash']);
}, {async: true});

desc("Runs the tests using the built run.js file. Optional arguments are: t[ests]=regex r[eporter]=[list|spec|json|<more>] d[ebug]=true color[s]=false.");
task("runtests", ["build-rules", "tests", builtLocalDirectory], function() {
    runConsoleTests('mocha-fivemat-progress-reporter', [], /*postLint*/ true);
}, {async: true});

desc("Generates code coverage data via instanbul");
task("generate-code-coverage", ["tests", builtLocalDirectory], function () {
    var cmd = 'istanbul cover node_modules/mocha/bin/_mocha -- -R min -t ' + testTimeout + ' ' + run;
    console.log(cmd);
    exec(cmd);
}, { async: true });

// Browser tests
var nodeServerOutFile = 'tests/webTestServer.js'
var nodeServerInFile = 'tests/webTestServer.ts'
compileFile(nodeServerOutFile, [nodeServerInFile], [builtLocalDirectory, tscFile], [], /*useBuiltCompiler:*/ true, /*noOutFile*/ true);

desc("Runs browserify on run.js to produce a file suitable for running tests in the browser");
task("browserify", ["tests", builtLocalDirectory, nodeServerOutFile], function() {
    var cmd = 'browserify built/local/run.js -o built/local/bundle.js';
    exec(cmd);
}, {async: true});

desc("Runs the tests using the built run.js file like 'jake runtests'. Syntax is jake runtests-browser. Additional optional parameters tests=[regex], port=, browser=[chrome|IE]");
task("runtests-browser", ["tests", "browserify", builtLocalDirectory], function() {
    cleanTestDirs();
    host = "node"
    port = process.env.port || process.env.p || '8888';
    browser = process.env.browser || process.env.b || "IE";
    tests = process.env.test || process.env.tests || process.env.t;
    var light = process.env.light || false;
    var testConfigFile = 'test.config';
    if(fs.existsSync(testConfigFile)) {
        fs.unlinkSync(testConfigFile);
    }
    if(tests || light) {
        writeTestConfigFile(tests, light, testConfigFile);
    }

    tests = tests ? tests : '';
    var cmd = host + " tests/webTestServer.js " + port + " " + browser + " " + tests
    console.log(cmd);
    exec(cmd);
}, {async: true});

function getDiffTool() {
    var program = process.env['DIFF']
    if (!program) {
        fail("Add the 'DIFF' environment variable to the path of the program you want to use.");
    }
    return program;
}

// Baseline Diff
desc("Diffs the compiler baselines using the diff tool specified by the 'DIFF' environment variable");
task('diff', function () {
    var cmd = '"' +  getDiffTool()  + '" ' + refBaseline + ' ' + localBaseline;
    console.log(cmd);
    exec(cmd);
}, {async: true});

desc("Diffs the RWC baselines using the diff tool specified by the 'DIFF' environment variable");
task('diff-rwc', function () {
    var cmd = '"' +  getDiffTool()  + '" ' + refRwcBaseline + ' ' + localRwcBaseline;
    console.log(cmd);
    exec(cmd);
}, {async: true});

desc("Builds the test sources and automation in debug mode");
task("tests-debug", ["setDebugMode", "tests"]);


// Makes the test results the new baseline
desc("Makes the most recent test results the new baseline, overwriting the old baseline");
task("baseline-accept", function(hardOrSoft) {
    if (!hardOrSoft || hardOrSoft == "hard") {
        jake.rmRf(refBaseline);
        fs.renameSync(localBaseline, refBaseline);
    }
    else if (hardOrSoft == "soft") {
        var files = jake.readdirR(localBaseline);
        for (var i in files) {
            jake.cpR(files[i], refBaseline);
        }
        jake.rmRf(path.join(refBaseline, "local"));
    }
});

desc("Makes the most recent rwc test results the new baseline, overwriting the old baseline");
task("baseline-accept-rwc", function() {
    jake.rmRf(refRwcBaseline);
    fs.renameSync(localRwcBaseline, refRwcBaseline);
});

desc("Makes the most recent test262 test results the new baseline, overwriting the old baseline");
task("baseline-accept-test262", function() {
    jake.rmRf(refTest262Baseline);
    fs.renameSync(localTest262Baseline, refTest262Baseline);
});


// Webhost
var webhostPath = "tests/webhost/webtsc.ts";
var webhostJsPath = "tests/webhost/webtsc.js";
compileFile(webhostJsPath, [webhostPath], [tscFile, webhostPath].concat(libraryTargets), [], /*useBuiltCompiler*/true);

desc("Builds the tsc web host");
task("webhost", [webhostJsPath], function() {
    jake.cpR(path.join(builtLocalDirectory, "lib.d.ts"), "tests/webhost/", {silent: true});
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
file(loggedIOJsPath, [builtLocalDirectory, loggedIOpath], function() {
    var temp = builtLocalDirectory + 'temp';
    jake.mkdirP(temp);
    var options = "--outdir " + temp + ' ' + loggedIOpath;
    var cmd = host + " " + LKGDirectory + compilerFilename + " " + options + " ";
    console.log(cmd + "\n");
    var ex = jake.createExec([cmd]);
    ex.addListener("cmdEnd", function() {
        fs.renameSync(temp + '/harness/loggedIO.js', loggedIOJsPath);
        jake.rmRf(temp);
        complete();
    });
    ex.run();
}, {async: true});

var instrumenterPath = harnessDirectory + 'instrumenter.ts';
var instrumenterJsPath = builtLocalDirectory + 'instrumenter.js';
compileFile(instrumenterJsPath, [instrumenterPath], [tscFile, instrumenterPath].concat(libraryTargets), [], /*useBuiltCompiler*/ true);

desc("Builds an instrumented tsc.js");
task('tsc-instrumented', [loggedIOJsPath, instrumenterJsPath, tscFile], function() {
    var cmd = host + ' ' + instrumenterJsPath + ' record iocapture ' + builtLocalDirectory + compilerFilename;
    console.log(cmd);
    var ex = jake.createExec([cmd]);
    ex.addListener("cmdEnd", function() {
        complete();
    });
    ex.run();
}, { async: true });

desc("Updates the sublime plugin's tsserver");
task("update-sublime", ["local", serverFile], function() {
    jake.cpR(serverFile, "../TypeScript-Sublime-Plugin/tsserver/");
    jake.cpR(serverFile + ".map", "../TypeScript-Sublime-Plugin/tsserver/");
});

var tslintRuleDir = "scripts/tslint";
var tslintRules = ([
    "nextLineRule",
    "noNullRule",
    "preferConstRule",
    "booleanTriviaRule",
    "typeOperatorSpacingRule",
    "noInOperatorRule",
    "noIncrementDecrementRule"
]);
var tslintRulesFiles = tslintRules.map(function(p) {
    return path.join(tslintRuleDir, p + ".ts");
});
var tslintRulesOutFiles = tslintRules.map(function(p) {
    return path.join(builtLocalDirectory, "tslint", p + ".js");
});
desc("Compiles tslint rules to js");
task("build-rules", tslintRulesOutFiles);
tslintRulesFiles.forEach(function(ruleFile, i) {
    compileFile(tslintRulesOutFiles[i], [ruleFile], [ruleFile], [], /*useBuiltCompiler*/ false, /*noOutFile*/ true, /*generateDeclarations*/ false, path.join(builtLocalDirectory, "tslint"));
});

function getLinterOptions() {
    return {
        configuration: require("./tslint.json"),
        formatter: "prose",
        formattersDirectory: undefined,
        rulesDirectory: "built/local/tslint"
    };
}

function lintFileContents(options, path, contents) {
    var ll = new Linter(path, contents, options);
    console.log("Linting '" + path + "'.")
    return ll.lint();
}

function lintFile(options, path) {
    var contents = fs.readFileSync(path, "utf8");
    return lintFileContents(options, path, contents);
}

function lintFileAsync(options, path, cb) {
    fs.readFile(path, "utf8", function(err, contents) {
        if (err) {
            return cb(err);
        }
        var result = lintFileContents(options, path, contents);
        cb(undefined, result);
    });
}

var servicesLintTargets = [
    "navigateTo.ts",
    "outliningElementsCollector.ts",
    "patternMatcher.ts",
    "services.ts",
    "shims.ts",
].map(function (s) {
    return path.join(servicesDirectory, s);
});
var lintTargets = compilerSources
    .concat(harnessCoreSources)
    .concat(serverCoreSources)
    .concat(tslintRulesFiles)
    .concat(servicesLintTargets);

desc("Runs tslint on the compiler sources");
task("lint", ["build-rules"], function() {
    var lintOptions = getLinterOptions();
    var failed = 0;
    for (var i in lintTargets) {
        var result = lintFile(lintOptions, lintTargets[i]);
        if (result.failureCount > 0) {
            console.log(result.output);
            failed += result.failureCount;
        }
    }
    if (failed > 0) {
        fail('Linter errors.', failed);
    }
});

/**
 * This is required because file watches on Windows get fires _twice_
 * when a file changes on some node/windows version configuations
 * (node v4 and win 10, for example). By not running a lint for a file
 * which already has a pending lint, we avoid duplicating our work.
 * (And avoid printing duplicate results!)
 */
var lintSemaphores = {};

function lintWatchFile(filename) {
    fs.watch(filename, {persistent: true}, function(event) {
        if (event !== "change") {
            return;
        }

        if (!lintSemaphores[filename]) {
            lintSemaphores[filename] = true;
            lintFileAsync(getLinterOptions(), filename, function(err, result) {
                delete lintSemaphores[filename];
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.failureCount > 0) {
                    console.log("***Lint failure***");
                    for (var i = 0; i < result.failures.length; i++) {
                        var failure = result.failures[i];
                        var start = failure.startPosition.lineAndCharacter;
                        var end = failure.endPosition.lineAndCharacter;
                        console.log("warning " + filename + " (" + (start.line + 1) + "," + (start.character + 1) + "," + (end.line + 1) + "," + (end.character + 1) + "): " + failure.failure);
                    }
                    console.log("*** Total " + result.failureCount + " failures.");
                }
            });
        }
    });
}

desc("Watches files for changes to rerun a lint pass");
task("lint-server", ["build-rules"], function() {
    console.log("Watching ./src for changes to linted files");
    for (var i = 0; i < lintTargets.length; i++) {
        lintWatchFile(lintTargets[i]);
    }
});
