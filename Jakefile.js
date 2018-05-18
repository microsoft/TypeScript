// This file contains the build logic for the public repo
// @ts-check
/// <reference types="jake" />

var fs = require("fs");
var os = require("os");
var path = require("path");
var child_process = require("child_process");
var fold = require("travis-fold");
var ts = require("./lib/typescript");

// Variables
var compilerDirectory = "src/compiler/";
var serverDirectory = "src/server/";
var harnessDirectory = "src/harness/";
var libraryDirectory = "src/lib/";
var scriptsDirectory = "scripts/";
var unittestsDirectory = "src/harness/unittests/";
var docDirectory = "doc/";
var lclDirectory = "src/loc/lcl";

var builtDirectory = "built/";
var builtLocalDirectory = "built/local/";
var LKGDirectory = "lib/";

var copyright = "CopyrightNotice.txt";
var thirdParty = "ThirdPartyNoticeText.txt";

var defaultTestTimeout = 40000;

// add node_modules to path so we don't need global modules, prefer the modules by adding them first
var nodeModulesPathPrefix = path.resolve("./node_modules/.bin/") + path.delimiter;
if (process.env.path !== undefined) {
    process.env.path = nodeModulesPathPrefix + process.env.path;
}
else if (process.env.PATH !== undefined) {
    process.env.PATH = nodeModulesPathPrefix + process.env.PATH;
}

/**
 * @param diagnostics {ts.Diagnostic[]}
 * @param [pretty] {boolean}
 */
function diagnosticsToString(diagnostics, pretty) {
    const host = {
        getCurrentDirectory() { return process.cwd(); },
        getCanonicalFileName(fileName) { return fileName; },
        getNewLine() { return os.EOL; }
    };
    return pretty ? ts.formatDiagnosticsWithColorAndContext(diagnostics, host) :
        ts.formatDiagnostics(diagnostics, host);
}

/** @param diagnostics {ts.Diagnostic[]} */
function reportDiagnostics(diagnostics) {
    console.log(diagnosticsToString(diagnostics, process.stdout.isTTY));
}

/** @param jsonPath {string} */
function readJson(jsonPath) {
    const jsonText = fs.readFileSync(jsonPath, "utf8");
    const result = ts.parseConfigFileTextToJson(jsonPath, jsonText);
    if (result.error) {
        reportDiagnostics([result.error]);
        throw new Error("An error occurred during parse.");
    }
    return result.config;
}

/** @param configPath {string} */
function filesFromConfig(configPath) {
    const config = readJson(configPath);
    const configFileContent = ts.parseJsonConfigFileContent(config, ts.sys, path.dirname(configPath));
    if (configFileContent.errors && configFileContent.errors.length) {
        reportDiagnostics(configFileContent.errors);
        throw new Error("An error occurred during parse.");
    }
    return configFileContent.fileNames;
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

function removeConstModifierFromEnumDeclarations(text) {
     return text.replace(/^(\s*)(export )?const enum (\S+) {(\s*)$/gm, '$1$2enum $3 {$4');
}

var compilerSources = filesFromConfig("./src/compiler/tsconfig.json");
var servicesSources = filesFromConfig("./src/services/tsconfig.json");
var cancellationTokenSources = filesFromConfig(path.join(serverDirectory, "cancellationToken/tsconfig.json"));
var typingsInstallerSources = filesFromConfig(path.join(serverDirectory, "typingsInstaller/tsconfig.json"));
var watchGuardSources = filesFromConfig(path.join(serverDirectory, "watchGuard/tsconfig.json"));
var serverSources = filesFromConfig(path.join(serverDirectory, "tsconfig.json"));
var languageServiceLibrarySources = filesFromConfig(path.join(serverDirectory, "tsconfig.library.json"));
var harnessSources = filesFromConfig("./src/harness/tsconfig.json");

var typesMapOutputPath = path.join(builtLocalDirectory, 'typesMap.json');

/** @type {{ libs: string[], paths?: Record<string, string>, sources?: Record<string, string[]> }} */
var libraries = readJson("./src/lib/libs.json");

/**
 * .lcg file is what localization team uses to know what messages to localize.
 * The file is always generated in 'enu\diagnosticMessages.generated.json.lcg'
 */
var generatedLCGFile = path.join(builtLocalDirectory, "enu", "diagnosticMessages.generated.json.lcg");

/**
 * The localization target produces the two following transformations:
 *    1. 'src\loc\lcl\<locale>\diagnosticMessages.generated.json.lcl' => 'built\local\<locale>\diagnosticMessages.generated.json'
 *       convert localized resources into a .json file the compiler can understand
 *    2. 'src\compiler\diagnosticMessages.generated.json' => 'built\local\ENU\diagnosticMessages.generated.json.lcg'
 *       generate the lcg file (source of messages to localize) from the diagnosticMessages.generated.json
 */
var localizationTargets = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-br", "ru", "tr", "zh-cn", "zh-tw"].map(function (f) {
    return path.join(builtLocalDirectory, f);
}).concat(path.dirname(generatedLCGFile));

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
    // append all files in sequence
    var text = "";
    for (var i = 0; i < sourceFiles.length; i++) {
        if (!fs.existsSync(sourceFiles[i])) {
            fail(sourceFiles[i] + " does not exist!");
        }
        if (i > 0) { text += "\n\n"; }
        text += fs.readFileSync(sourceFiles[i]).toString().replace(/\r?\n/g, "\n");
    }
    fs.writeFileSync(temp, text);
    // Move the file to the final destination
    fs.renameSync(temp, destinationFile);
}

var useDebugMode = true;
var host = process.env.TYPESCRIPT_HOST || process.env.host || "node";
var compilerFilename = "tsc.js";
var LKGCompiler = path.join(LKGDirectory, compilerFilename);
var builtLocalCompiler = path.join(builtLocalDirectory, compilerFilename);

/**
 * Compiles a file from a list of sources
 * @param {string} outFile the target file name
 * @param {string[]} sources an array of the names of the source files
 * @param {string[]} prereqs prerequisite tasks to compiling the file
 * @param {string[]} prefixes a list of files to prepend to the target file
 * @param {boolean} useBuiltCompiler true to use the built compiler, false to use the LKG
 * @param {object} [opts] property bag containing auxiliary options
 * @param {boolean} [opts.noOutFile] true to compile without using --out
 * @param {boolean} [opts.generateDeclarations] true to compile using --declaration
 * @param {string} [opts.outDir] value for '--outDir' command line option
 * @param {boolean} [opts.keepComments] false to compile using --removeComments
 * @param {boolean} [opts.preserveConstEnums] true if compiler should keep const enums in code
 * @param {boolean} [opts.noResolve] true if compiler should not include non-rooted files in compilation
 * @param {boolean} [opts.stripInternal] true if compiler should remove declarations marked as internal
 * @param {boolean} [opts.inlineSourceMap] true if compiler should inline sourceMap
 * @param {string[]} [opts.types] array of types to include in compilation
 * @param {string} [opts.lib] explicit libs to include.
 * @param {function(): void} [callback] a function to execute after the compilation process ends
 */
function compileFile(outFile, sources, prereqs, prefixes, useBuiltCompiler, opts, callback) {
    file(outFile, prereqs, function() {
        var startCompileTime = mark();
        opts = opts || {};
        var compilerPath = useBuiltCompiler ? builtLocalCompiler : LKGCompiler;
        var options = "--noImplicitAny --noImplicitThis --alwaysStrict --noEmitOnError";
        if (opts.types) {
            options += " --types " + opts.types.join(",");
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
            }
            else {
                options += " --sourcemap";
            }
        }
        options += " --newLine LF";

        if (opts.stripInternal) {
            options += " --stripInternal";
        }
        options +=  " --target es5";
        if (opts.lib) {
            options += " --lib " + opts.lib;
        }
        else {
            options += " --lib es5";
        }
        options += " --noUnusedLocals --noUnusedParameters";

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

var libraryTargets = libraries.libs.map(function (lib) {
    var relativeSources = ["header.d.ts"].concat(libraries.sources && libraries.sources[lib] || [lib + ".d.ts"]);
    var relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
    var sources = [copyright].concat(relativeSources.map(s => path.join(libraryDirectory, s)));
    var target = path.join(builtLocalDirectory, relativeTarget);
    file(target, [builtLocalDirectory].concat(sources), function () {
        concatenateFiles(target, sources);
    });
    return target;
});

// Lib target to build the library files
desc("Builds the library targets");
task("lib", libraryTargets);


// Generate diagnostics
var processDiagnosticMessagesJs = path.join(scriptsDirectory, "processDiagnosticMessages.js");
var processDiagnosticMessagesTs = path.join(scriptsDirectory, "processDiagnosticMessages.ts");
var processDiagnosticMessagesSources = filesFromConfig("./scripts/processDiagnosticMessages.tsconfig.json");

var diagnosticMessagesJson = path.join(compilerDirectory, "diagnosticMessages.json");
var diagnosticInfoMapTs = path.join(compilerDirectory, "diagnosticInformationMap.generated.ts");
var generatedDiagnosticMessagesJSON = path.join(compilerDirectory, "diagnosticMessages.generated.json");
var builtGeneratedDiagnosticMessagesJSON = path.join(builtLocalDirectory, "diagnosticMessages.generated.json");

file(processDiagnosticMessagesTs);

// processDiagnosticMessages script
compileFile(processDiagnosticMessagesJs,
    processDiagnosticMessagesSources,
    processDiagnosticMessagesSources,
    [],
    /*useBuiltCompiler*/ false);

// Localize diagnostics script
var generateLocalizedDiagnosticMessagesJs = path.join(scriptsDirectory, "generateLocalizedDiagnosticMessages.js");
var generateLocalizedDiagnosticMessagesTs = path.join(scriptsDirectory, "generateLocalizedDiagnosticMessages.ts");

file(generateLocalizedDiagnosticMessagesTs);

compileFile(generateLocalizedDiagnosticMessagesJs,
    [generateLocalizedDiagnosticMessagesTs],
    [generateLocalizedDiagnosticMessagesTs],
    [],
    /*useBuiltCompiler*/ false, { noOutFile: true, types: ["node", "xml2js"] });

// Localize diagnostics
file(generatedLCGFile, [generateLocalizedDiagnosticMessagesJs, diagnosticInfoMapTs, generatedDiagnosticMessagesJSON], function () {
    var cmd = host + " " + generateLocalizedDiagnosticMessagesJs + " " + lclDirectory + " " + builtLocalDirectory + " " + generatedDiagnosticMessagesJSON;
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

task("localize", [generatedLCGFile]);

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
    { noOutFile: true, lib: "es6" });

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
}, { async: true });

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
var configurePrereleaseJs = path.join(scriptsDirectory, "configurePrerelease.js");
var configurePrereleaseTs = path.join(scriptsDirectory, "configurePrerelease.ts");
var packageJson = "package.json";
var versionFile = path.join(compilerDirectory, "core.ts");

file(configurePrereleaseTs);

compileFile(/*outfile*/configurePrereleaseJs,
            /*sources*/[configurePrereleaseTs],
            /*prereqs*/[configurePrereleaseTs],
            /*prefixes*/[],
            /*useBuiltCompiler*/ false,
    { noOutFile: true, generateDeclarations: false, keepComments: false, noResolve: false, stripInternal: false });

task("setDebugMode", function () {
    useDebugMode = true;
});

task("configure-nightly", [configurePrereleaseJs], function () {
    var cmd = host + " " + configurePrereleaseJs + " dev " + packageJson + " " + versionFile;
    console.log(cmd);
    exec(cmd);
}, { async: true });

desc("Configure, build, test, and publish the nightly release.");
task("publish-nightly", ["configure-nightly", "LKG", "clean", "setDebugMode", "runtests-parallel"], function () {
    var cmd = "npm publish --tag next";
    console.log(cmd);
    exec(cmd);
});

task("configure-insiders", [configurePrereleaseJs], function () {
    var cmd = host + " " + configurePrereleaseJs + " insiders " + packageJson + " " + versionFile;
    console.log(cmd);
    exec(cmd);
}, { async: true });

desc("Configure, build, test, and publish the insiders release.");
task("publish-insiders", ["configure-insiders", "LKG", "clean", "setDebugMode", "runtests-parallel"], function () {
    var cmd = "npm publish --tag insiders";
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
        definitionFileContents = removeConstModifierFromEnumDeclarations(definitionFileContents);
        fs.writeFileSync(standaloneDefinitionsFile, definitionFileContents);

        // Official node package definition file, pointed to by 'typings' in package.json
        // Created by appending 'export = ts;' at the end of the standalone file to turn it into an external module
        var nodeDefinitionsFileContents = definitionFileContents + "\nexport = ts;";
        fs.writeFileSync(nodeDefinitionsFile, nodeDefinitionsFileContents);

        // Node package definition file to be distributed without the package. Created by replacing
        // 'ts' namespace with '"typescript"' as a module.
        var nodeStandaloneDefinitionsFileContents = definitionFileContents.replace(/declare (namespace|module) ts/g, 'declare module "typescript"');
        fs.writeFileSync(nodeStandaloneDefinitionsFile, nodeStandaloneDefinitionsFileContents);
    });

file(typescriptServicesDts, [servicesFile]);

var cancellationTokenFile = path.join(builtLocalDirectory, "cancellationToken.js");
compileFile(cancellationTokenFile, cancellationTokenSources, [builtLocalDirectory].concat(cancellationTokenSources), /*prefixes*/ [copyright], /*useBuiltCompiler*/ true, { types: ["node"], outDir: builtLocalDirectory, noOutFile: true, lib: "es6" });

var typingsInstallerFile = path.join(builtLocalDirectory, "typingsInstaller.js");
compileFile(typingsInstallerFile, typingsInstallerSources, [builtLocalDirectory].concat(typingsInstallerSources), /*prefixes*/ [copyright], /*useBuiltCompiler*/ true, { types: ["node"], outDir: builtLocalDirectory, noOutFile: false, lib: "es6" });

var watchGuardFile = path.join(builtLocalDirectory, "watchGuard.js");
compileFile(watchGuardFile, watchGuardSources, [builtLocalDirectory].concat(watchGuardSources), /*prefixes*/ [copyright], /*useBuiltCompiler*/ true, { types: ["node"], outDir: builtLocalDirectory, noOutFile: false, lib: "es6" });

var serverFile = path.join(builtLocalDirectory, "tsserver.js");
compileFile(serverFile, serverSources, [builtLocalDirectory, copyright, cancellationTokenFile, typingsInstallerFile, watchGuardFile].concat(serverSources).concat(servicesSources), /*prefixes*/ [copyright], /*useBuiltCompiler*/ true, { types: ["node"], preserveConstEnums: true, lib: "es6" });
var tsserverLibraryFile = path.join(builtLocalDirectory, "tsserverlibrary.js");
var tsserverLibraryDefinitionFile = path.join(builtLocalDirectory, "tsserverlibrary.d.ts");
file(typesMapOutputPath, /** @type {*} */(function() {
    var content = fs.readFileSync(path.join(serverDirectory, 'typesMap.json'));
    // Validate that it's valid JSON
    try {
        JSON.parse(content.toString());
    } catch (e) {
        console.log("Parse error in typesMap.json: " + e);
    }
    fs.writeFileSync(typesMapOutputPath, content);
}));
compileFile(
    tsserverLibraryFile,
    languageServiceLibrarySources,
    [builtLocalDirectory, copyright, builtLocalCompiler].concat(languageServiceLibrarySources).concat(libraryTargets),
    /*prefixes*/[copyright],
    /*useBuiltCompiler*/ true,
    { noOutFile: false, generateDeclarations: true, stripInternal: true, preserveConstEnums: true, keepComments: true },
    /*callback*/ function () {
        prependFile(copyright, tsserverLibraryDefinitionFile);

        // Appending exports at the end of the server library
        var tsserverLibraryDefinitionFileContents =
            fs.readFileSync(tsserverLibraryDefinitionFile).toString() +
            "\nexport = ts;" +
            "\nexport as namespace ts;";
        tsserverLibraryDefinitionFileContents = removeConstModifierFromEnumDeclarations(tsserverLibraryDefinitionFileContents);

        fs.writeFileSync(tsserverLibraryDefinitionFile, tsserverLibraryDefinitionFileContents);
    });

// Local target to build the language service server library
desc("Builds language service server library");
task("lssl", [tsserverLibraryFile, tsserverLibraryDefinitionFile, typesMapOutputPath]);

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
task("local", ["build-fold-start", "generate-diagnostics", "lib", tscFile, servicesFile, nodeDefinitionsFile, serverFile, buildProtocolDts, builtGeneratedDiagnosticMessagesJSON, "lssl", "localize", "build-fold-end"]);

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
    /*useBuiltCompiler*/ false,
    {
        lib: "scripthost,es5"
    });

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
    var expectedFiles = [tscFile, servicesFile, serverFile, nodePackageFile, nodeDefinitionsFile, standaloneDefinitionsFile, tsserverLibraryFile, tsserverLibraryDefinitionFile, cancellationTokenFile, typingsInstallerFile, buildProtocolDts, watchGuardFile].
        concat(libraryTargets).
        concat(localizationTargets);
    var missingFiles = expectedFiles.filter(function (f) {
        return !fs.existsSync(f);
    });
    if (missingFiles.length > 0) {
        fail(new Error("Cannot replace the LKG unless all built targets are present in directory " + builtLocalDirectory +
            ". The following files are missing:\n" + missingFiles.join("\n")));
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
    /*prereqs*/[builtLocalDirectory, tscFile, tsserverLibraryFile].concat(libraryTargets).concat(servicesSources).concat(harnessSources),
    /*prefixes*/[],
    /*useBuiltCompiler:*/ true,
    /*opts*/ { types: ["node", "mocha", "chai"], lib: "es6" });

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
    var ex = jake.createExec([cmd], /** @type {jake.ExecOptions} */({ windowsVerbatimArguments: true, interactive: true }));
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
        }
        else {
            fail("Process exited with code " + status);
        }
    });

    ex.run();
}

const del = require("del");
function cleanTestDirs() {
    // Clean the local baselines directory
    if (fs.existsSync(localBaseline)) {
        del.sync(localBaseline);
    }

    // Clean the local Rwc baselines directory
    if (fs.existsSync(localRwcBaseline)) {
        del.sync(localRwcBaseline);
    }

    jake.mkdirP(localRwcBaseline);
    jake.mkdirP(localTest262Baseline);
    jake.mkdirP(localBaseline);
}

// used to pass data from jake command line directly to run.js
function writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, colors, testTimeout) {
    var testConfigContents = JSON.stringify({
        runners: runners ? runners.split(",") : undefined,
        test: tests ? [tests] : undefined,
        light: light,
        workerCount: workerCount,
        taskConfigsFolder: taskConfigsFolder,
        stackTraceLimit: stackTraceLimit,
        noColor: !colors,
        timeout: testTimeout
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

    var debug = process.env.debug || process.env["debug-brk"] || process.env.d;
    var inspect = process.env.inspect || process.env["inspect-brk"] || process.env.i;
    var testTimeout = process.env.timeout || defaultTestTimeout;
    var runners = process.env.runners || process.env.runner || process.env.ru;
    var tests = process.env.test || process.env.tests || process.env.t;
    var light = process.env.light === undefined || process.env.light !== "false";
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

        workerCount = process.env.workerCount || process.env.p || os.cpus().length;
    }

    if (tests && tests.toLocaleLowerCase() === "rwc") {
        testTimeout = 800000;
    }

    if (tests || runners || light || testTimeout || taskConfigsFolder) {
        writeTestConfigFile(tests, runners, light, taskConfigsFolder, workerCount, stackTraceLimit, colors, testTimeout);
    }

    var colorsFlag = process.env.color || process.env.colors;
    var colors = colorsFlag !== "false" && colorsFlag !== "0";
    var reporter = process.env.reporter || process.env.r || defaultReporter;
    var bail = process.env.bail || process.env.b;
    var lintFlag = process.env.lint !== 'false';

    // timeout normally isn't necessary but Travis-CI has been timing out on compiler baselines occasionally
    // default timeout is 2sec which really should be enough, but maybe we just need a small amount longer
    if (!runInParallel) {
        var startTime = mark();
        var args = [];
        args.push("-R", reporter);
        if (tests) {
            args.push("-g", `"${tests}"`);
        }
        if (colors) {
            args.push("--colors");
        }
        else {
            args.push("--no-colors");
        }
        if (bail) {
            args.push("--bail");
        }
        if (inspect) {
            args.unshift("--inspect-brk");
        }
        else if (debug) {
            args.unshift("--debug-brk");
        }
        else {
            args.push("-t", testTimeout);
        }
        args.push(run);

        var cmd = "mocha " + args.join(" ");
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
        exec(host + " " + run, function () {
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
    var testTimeout = process.env.timeout || defaultTestTimeout;
    var cmd = 'istanbul cover node_modules/mocha/bin/_mocha -- -R min -t ' + testTimeout + ' ' + run;
    console.log(cmd);
    exec(cmd);
}, { async: true });

// Browser tests
var nodeServerOutFile = "tests/webTestServer.js";
var nodeServerInFile = "tests/webTestServer.ts";
compileFile(nodeServerOutFile, [nodeServerInFile], [builtLocalDirectory, tscFile], [], /*useBuiltCompiler:*/ true, { noOutFile: true, lib: "es6" });

desc("Runs browserify on run.js to produce a file suitable for running tests in the browser");
task("browserify", [], function() {
    // Shell out to `gulp`, since we do the work to handle sourcemaps correctly w/o inline maps there
    var cmd = 'gulp browserify --silent';
    exec(cmd);
}, { async: true });

desc("Runs the tests using the built run.js file like 'jake runtests'. Syntax is jake runtests-browser. Additional optional parameters tests=[regex], browser=[chrome|IE]");
task("runtests-browser", ["browserify", nodeServerOutFile], function () {
    cleanTestDirs();
    host = "node";
    var browser = process.env.browser || process.env.b ||  (os.platform() === "win32" ? "edge" : "chrome");
    var runners = process.env.runners || process.env.runner || process.env.ru;
    var tests = process.env.test || process.env.tests || process.env.t;
    var light = process.env.light || false;
    var testConfigFile = 'test.config';
    if (fs.existsSync(testConfigFile)) {
        fs.unlinkSync(testConfigFile);
    }
    if (tests || runners || light) {
        writeTestConfigFile(tests, runners, light);
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
    acceptBaseline(localBaseline, refBaseline);
});

function acceptBaseline(sourceFolder, targetFolder) {
    console.log('Accept baselines from ' + sourceFolder + ' to ' + targetFolder);
    var deleteEnding = '.delete';

    acceptBaselineFolder(sourceFolder, targetFolder);

    function acceptBaselineFolder(sourceFolder, targetFolder) {
        var files = fs.readdirSync(sourceFolder);

        for (var i in files) {
            var filename = files[i];
            var fullLocalPath = path.join(sourceFolder, filename);
            var stat = fs.statSync(fullLocalPath);
            if (stat.isFile()) {
                if (filename.substr(filename.length - deleteEnding.length) === deleteEnding) {
                    filename = filename.substr(0, filename.length - deleteEnding.length);
                    fs.unlinkSync(path.join(targetFolder, filename));
                }
                else {
                    var target = path.join(targetFolder, filename);
                    if (fs.existsSync(target)) {
                        fs.unlinkSync(target);
                    }
                    jake.mkdirP(path.dirname(target));
                    fs.renameSync(path.join(sourceFolder, filename), target);
                }
            }
            else if (stat.isDirectory()) {
                acceptBaselineFolder(fullLocalPath, path.join(targetFolder, filename));
            }
        }
    }
}

desc("Makes the most recent rwc test results the new baseline, overwriting the old baseline");
task("baseline-accept-rwc", function () {
    acceptBaseline(localRwcBaseline, refRwcBaseline);
});

desc("Makes the most recent test262 test results the new baseline, overwriting the old baseline");
task("baseline-accept-test262", function () {
    acceptBaseline(localTest262Baseline, refTest262Baseline);
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
    var options = "--target es5 --lib es6 --types --outdir " + temp + ' ' + loggedIOpath;
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
compileFile(instrumenterJsPath, [instrumenterPath], [tscFile, instrumenterPath].concat(libraryTargets), [], /*useBuiltCompiler*/ true, { lib: "es6", types: ["node"], noOutFile: true, outDir: builtLocalDirectory });

desc("Builds an instrumented tsc.js - run with test=[testname]");
task('tsc-instrumented', [loggedIOJsPath, instrumenterJsPath, tscFile], function () {
    var test = process.env.test || process.env.tests || process.env.t || "iocapture";
    var cmd = host + ' ' + instrumenterJsPath + " record " + test + " " + builtLocalDirectory + compilerFilename;
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

var tslintRuleDir = "scripts/tslint/rules";
var tslintRules = fs.readdirSync(tslintRuleDir);
var tslintRulesFiles = tslintRules.map(function (p) {
    return path.join(tslintRuleDir, p);
});
var tslintRulesOutFiles = tslintRules.map(function (p) {
    return path.join(builtLocalDirectory, "tslint/rules", p.replace(".ts", ".js"));
});
var tslintFormattersDir = "scripts/tslint/formatters";
var tslintFormatters = [
    "autolinkableStylishFormatter",
];
var tslintFormatterFiles = tslintFormatters.map(function (p) {
    return path.join(tslintFormattersDir, p + ".ts");
});
var tslintFormattersOutFiles = tslintFormatters.map(function (p) {
    return path.join(builtLocalDirectory, "tslint/formatters", p + ".js");
});
desc("Compiles tslint rules to js");
task("build-rules", ["build-rules-start"].concat(tslintRulesOutFiles).concat(tslintFormattersOutFiles).concat(["build-rules-end"]));
tslintRulesFiles.forEach(function (ruleFile, i) {
    compileFile(tslintRulesOutFiles[i], [ruleFile], [ruleFile], [], /*useBuiltCompiler*/ false,
        { noOutFile: true, generateDeclarations: false, outDir: path.join(builtLocalDirectory, "tslint/rules"), lib: "es6" });
});
tslintFormatterFiles.forEach(function (ruleFile, i) {
    compileFile(tslintFormattersOutFiles[i], [ruleFile], [ruleFile], [], /*useBuiltCompiler*/ false,
        { noOutFile: true, generateDeclarations: false, outDir: path.join(builtLocalDirectory, "tslint/formatters"), lib: "es6" });
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
    .concat(["instrumenter.ts"].map(function (f) { return path.join(harnessDirectory, f); }))
    .concat(serverSources)
    .concat(tslintRulesFiles)
    .concat(servicesSources)
    .concat(typingsInstallerSources)
    .concat(cancellationTokenSources)
    .concat(["Gulpfile.ts"])
    .concat([nodeServerInFile, perftscPath, "tests/perfsys.ts", webhostPath])
    .map(function (p) { return path.resolve(p); });
// keep only unique items
lintTargets = Array.from(new Set(lintTargets));

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
task("lint", ["build-rules"], () => {
    if (fold.isTravis()) console.log(fold.start("lint"));
   function lint(project, cb) {
        const cmd = `node node_modules/tslint/bin/tslint --project ${project} --formatters-dir ./built/local/tslint/formatters --format autolinkableStylish`;
        console.log("Linting: " + cmd);
        jake.exec([cmd], cb, /** @type {jake.ExecOptions} */({ interactive: true, windowsVerbatimArguments: true }));
   }
   lint("scripts/tslint/tsconfig.json", () => lint("src/tsconfig-base.json", () => {
        if (fold.isTravis()) console.log(fold.end("lint"));
        complete();
   }));
});
