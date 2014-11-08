// This file contains the build logic for the public repo

var fs = require("fs");
var path = require("path");
var child_process = require("child_process");

// Variables
var compilerDirectory = "src/compiler/";
var servicesDirectory = "src/services/";
var harnessDirectory = "src/harness/";
var libraryDirectory = "src/lib/";
var scriptsDirectory = "scripts/";
var unittestsDirectory = "tests/cases/unittests/";
var docDirectory = "doc/";

var builtDirectory = "built/";
var builtLocalDirectory = "built/local/";
var LKGDirectory = "bin/";

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
    "binder.ts",
    "checker.ts",
    "emitter.ts",
    "commandLineParser.ts",
    "tsc.ts",
    "diagnosticInformationMap.generated.ts"
].map(function (f) {
    return path.join(compilerDirectory, f);
});

var servicesSources = [
    "core.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "binder.ts",
    "checker.ts",
    "emitter.ts"
].map(function (f) {
    return path.join(compilerDirectory, f);
}).concat([
    "breakpoints.ts",
    "services.ts",
    "shims.ts",
    "signatureHelp.ts",
    "utilities.ts",
    "navigationBar.ts",
    "outliningElementsCollector.ts"
].map(function (f) {
    return path.join(servicesDirectory, f);
}));

var harnessSources = [
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
    "runner.ts"
].map(function (f) {
    return path.join(harnessDirectory, f);
}).concat([
    "services/colorization.ts",
    "services/documentRegistry.ts",
    "services/preProcessFile.ts"
].map(function (f) {
    return path.join(unittestsDirectory, f);
}));

var librarySourceMap = [
        { target: "lib.core.d.ts", sources: ["core.d.ts"] },
        { target: "lib.dom.d.ts", sources: ["importcore.d.ts", "extensions.d.ts", "dom.generated.d.ts"], },
        { target: "lib.webworker.d.ts", sources: ["importcore.d.ts", "extensions.d.ts", "webworker.generated.d.ts"], },
        { target: "lib.scriptHost.d.ts", sources: ["importcore.d.ts", "scriptHost.d.ts"], },
        { target: "lib.d.ts", sources: ["core.d.ts", "extensions.d.ts", "dom.generated.d.ts", "webworker.importscripts.d.ts", "scriptHost.d.ts"], },
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
var generateDeclarations = false;
var host = (process.env.host || process.env.TYPESCRIPT_HOST || "node");
var compilerFilename = "tsc.js";
/* Compiles a file from a list of sources
    * @param outFile: the target file name
    * @param sources: an array of the names of the source files
    * @param prereqs: prerequisite tasks to compiling the file
    * @param prefixes: a list of files to prepend to the target file
    * @param useBuiltCompiler: true to use the built compiler, false to use the LKG
    * @param noOutFile: true to compile without using --out
    */
function compileFile(outFile, sources, prereqs, prefixes, useBuiltCompiler, noOutFile) {
    file(outFile, prereqs, function() {
        var dir = useBuiltCompiler ? builtLocalDirectory : LKGDirectory;
        var options = "-removeComments --module commonjs -noImplicitAny ";
        if (generateDeclarations) {
            options += "--declaration ";
        }

        if (useDebugMode) {
            options += "--preserveConstEnums ";
        }
        
        var cmd = host + " " + dir + compilerFilename + " " + options + " ";
        cmd = cmd + sources.join(" ") + (!noOutFile ? " -out " + outFile : "");
        if (useDebugMode) {
            cmd = cmd + " -sourcemap -mapRoot file:///" + path.resolve(path.dirname(outFile));
        }
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
            complete();
        });
        ex.addListener("error", function() {
            fs.unlinkSync(outFile);
            console.log("Compilation of " + outFile + " unsuccessful");
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

file(processDiagnosticMessagesTs)

// processDiagnosticMessages script
compileFile(processDiagnosticMessagesJs,
            [processDiagnosticMessagesTs],
            [processDiagnosticMessagesTs],
            [],
            false);

// The generated diagnostics map; built for the compiler and for the 'generate-diagnostics' task
file(diagnosticInfoMapTs, [processDiagnosticMessagesJs, diagnosticMessagesJson], function () {
    var cmd = "node " + processDiagnosticMessagesJs + " "  + diagnosticMessagesJson;
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
}, {async: true})


desc("Generates a diagnostic file in TypeScript based on an input JSON file");
task("generate-diagnostics", [diagnosticInfoMapTs])


// Local target to build the compiler and services
var tscFile = path.join(builtLocalDirectory, compilerFilename);
compileFile(tscFile, compilerSources, [builtLocalDirectory, copyright].concat(compilerSources), [copyright], /*useBuiltCompiler:*/ false);

var servicesFile = path.join(builtLocalDirectory, "typescriptServices.js");
compileFile(servicesFile, servicesSources, [builtLocalDirectory, copyright].concat(servicesSources), [copyright], /*useBuiltCompiler:*/ false);

// Local target to build the compiler and services
desc("Builds the full compiler and services");
task("local", ["generate-diagnostics", "lib", tscFile, servicesFile]);


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

// generate declarations for compiler and services
desc("Generate declarations for compiler and services");
task("declaration", function() {
    generateDeclarations = true;
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
            false);

// The generated spec.md; built for the 'generate-spec' task
file(specMd, [word2mdJs, specWord], function () {
    var specWordFullPath = path.resolve(specWord);
    var cmd = "cscript //nologo " + word2mdJs + ' "' + specWordFullPath + '" ' + specMd;
    console.log(cmd);
    child_process.exec(cmd, function () {
        complete();
    });
}, {async: true})


desc("Generates a Markdown version of the Language Specification");
task("generate-spec", [specMd])


// Makes a new LKG. This target does not build anything, but errors if not all the outputs are present in the built/local directory
desc("Makes a new LKG out of the built js files");
task("LKG", ["clean", "release", "local"].concat(libraryTargets), function() {
    var expectedFiles = [tscFile, servicesFile].concat(libraryTargets);
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

var localBaseline = "tests/baselines/local/";
var refBaseline = "tests/baselines/reference/";

var localRwcBaseline = "tests/baselines/rwc/local/";
var refRwcBaseline = "tests/baselines/rwc/reference/";

desc("Builds the test infrastructure using the built compiler");
task("tests", ["local", run].concat(libraryTargets));

function exec(cmd, completeHandler) {
    var ex = jake.createExec([cmd]);
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
        process.stderr.write(status);
        process.stderr.write(e);
        complete();
    })
    try{
        ex.run();
    } catch(e) {
        console.log('Exception: ' + e)
    }
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

    jake.mkdirP(localBaseline);
}

// used to pass data from jake command line directly to run.js
function writeTestConfigFile(tests, testConfigFile) {
    console.log('Running test(s): ' + tests);
    var testConfigContents = '{\n' + '\ttest: [\'' + tests + '\']\n}';
    fs.writeFileSync('test.config', testConfigContents);
}

function deleteTemporaryProjectOutput() {
    if (fs.existsSync(localBaseline + "projectOutput/")) {
        jake.rmRf(localBaseline + "projectOutput/");
    }
}

var testTimeout = 5000;
desc("Runs the tests using the built run.js file. Syntax is jake runtests. Optional parameters 'host=', 'tests=[regex], reporter=[list|spec|json|<more>]'.");
task("runtests", ["tests", builtLocalDirectory], function() {
    cleanTestDirs();
    host = "mocha"
    tests = process.env.test || process.env.tests || process.env.t;
    var testConfigFile = 'test.config';
    if(fs.existsSync(testConfigFile)) {
        fs.unlinkSync(testConfigFile);
    }

    if(tests) {
        writeTestConfigFile(tests, testConfigFile);
    }

    if (tests && tests.toLocaleLowerCase() === "rwc") {
        testTimeout = 50000;
    }

    colors = process.env.colors || process.env.color
    colors = colors ? ' --no-colors ' : ''
    tests = tests ? ' -g ' + tests : '';
    reporter = process.env.reporter || process.env.r || 'dot';
    // timeout normally isn't necessary but Travis-CI has been timing out on compiler baselines occasionally
    // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
    var cmd = host + " -R " + reporter + tests + colors + ' -t ' + testTimeout + ' ' + run;
    console.log(cmd);
    exec(cmd, deleteTemporaryProjectOutput);
}, {async: true});

desc("Generates code coverage data via instanbul")
task("generate-code-coverage", ["tests", builtLocalDirectory], function () {
    var cmd = 'istanbul cover node_modules/mocha/bin/_mocha -- -R min -t ' + testTimeout + ' ' + run;
    console.log(cmd);
    exec(cmd);
}, { async: true });

// Browser tests
var nodeServerOutFile = 'tests/webTestServer.js'
var nodeServerInFile = 'tests/webTestServer.ts'
compileFile(nodeServerOutFile, [nodeServerInFile], [builtLocalDirectory, tscFile], [], true, true);

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
    var testConfigFile = 'test.config';
    if(fs.existsSync(testConfigFile)) {
        fs.unlinkSync(testConfigFile);
    }
    if(tests) {
        writeTestConfigFile(tests, testConfigFile);
    }

    tests = tests ? tests : '';
    var cmd = host + " tests/webTestServer.js " + port + " " + browser + " " + tests
    console.log(cmd);
    exec(cmd);
}, {async: true});


// Baseline Diff
desc("Diffs the compiler baselines using the diff tool specified by the %DIFF% environment variable");
task('diff', function () {
    var cmd = "%DIFF% " + refBaseline + ' ' + localBaseline;
    console.log(cmd)
    exec(cmd);
}, {async: true});

desc("Diffs the RWC baselines using the diff tool specified by the %DIFF% environment variable");
task('diff-rwc', function () {
    var cmd = "%DIFF% " + refRwcBaseline + ' ' + localRwcBaseline;
    console.log(cmd)
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


// Webhost
var webhostPath = "tests/webhost/webtsc.ts";
var webhostJsPath = "tests/webhost/webtsc.js";
compileFile(webhostJsPath, [webhostPath], [tscFile, webhostPath].concat(libraryTargets), [], true);

desc("Builds the tsc web host");
task("webhost", [webhostJsPath], function() {
    jake.cpR(path.join(builtLocalDirectory, "lib.d.ts"), "tests/webhost/", {silent: true});
});

// Perf compiler
var perftscPath = "tests/perftsc.ts";
var perftscJsPath = "built/local/perftsc.js";
compileFile(perftscJsPath, [perftscPath], [tscFile, perftscPath, "tests/perfsys.ts"].concat(libraryTargets), [], true);
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
compileFile(instrumenterJsPath, [instrumenterPath], [tscFile, instrumenterPath], [], true);

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
