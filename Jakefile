// This file contains the build logic for the public repo

var fs = require("fs");
var path = require("path");

// Variables
var compilerDirectory = "src/compiler/";
var servicesDirectory = "src/services/";
var harnessDirectory = "src/harness/";
var runnersDirectory = "tests/runners/";
var libraryDirectory = "typings/";

var builtDirectory = "built/";
var builtLocalDirectory = "built/local/";
var builtTestDirectory = "built/localtest/";
var LKGDirectory = "bin/";

var copyright = "CopyrightNotice.txt";
var thirdParty = "ThirdPartyNoticeText.txt";
var compilerSources = [
	"ast.ts",
	"astHelpers.ts",
	"astWalker.ts",
	"base64.ts",
	"bloomFilter.ts",
	"declarationEmitter.ts",
	"diagnostics.ts",
	"document.ts",
	"emitter.ts",
	"enumerator.ts",
	"flags.ts",
	"hashTable.ts",
	"identifierWalker.ts",
	"pathUtils.ts",
	"precompile.ts",
	"process.ts",
	"references.ts",
	"referenceResolution.ts",
	"referenceResolver.ts",
	"settings.ts",
	"sourceMapping.ts",
	"syntaxTreeToAstVisitor.ts",
	"types.ts",
	"core/arrayUtilities.ts",
	"core/bitVector.ts",
	"core/bitMatrix.ts",
	"core/constants.ts",
	"core/debug.ts",
	"core/diagnosticCore.ts",
	"core/diagnosticCategory.ts",
	"core/diagnosticInfo.ts",
	"core/environment.ts",
	"core/errors.ts",
	"core/hash.ts",
	"core/hashTable.ts",
	"core/integerUtilities.ts",
	"core/lineAndCharacter.ts",
	"core/lineMap.ts",
	"core/linePosition.ts",
	"core/mathPrototype.ts",
	"core/references.ts",
	"core/require.ts",
	"core/stringTable.ts",
	"core/stringUtilities.ts",
	"core/timer.ts",
	"resources/diagnosticCode.generated.ts",
	"resources/diagnosticInformationMap.generated.ts",
	"resources/references.ts",
	"syntax/characterInfo.ts",
	"syntax/constants.ts",
	"syntax/depthLimitedWalker.ts",
	"syntax/formattingOptions.ts",
	"syntax/indentation.ts",
	"syntax/languageVersion.ts",
	"syntax/parseOptions.ts",
	"syntax/parser.ts",
	"syntax/positionedElement.ts",
	"syntax/positionTrackingWalker.ts",
	"syntax/references.ts",
	"syntax/scanner.ts",
	"syntax/scannerUtilities.generated.ts",
	"syntax/separatedSyntaxList.ts",
	"syntax/slidingWindow.ts",
	"syntax/strings.ts",
	"syntax/syntax.ts",
	"syntax/syntaxDedenter.ts",
	"syntax/syntaxElement.ts",
	"syntax/syntaxFactory.generated.ts",
	"syntax/syntaxFacts.ts",
	"syntax/syntaxFacts2.ts",
	"syntax/syntaxIndenter.ts",
	"syntax/syntaxInformationMap.ts",
	"syntax/syntaxIndenter.ts",
	"syntax/syntaxKind.ts",
	"syntax/syntaxList.ts",
	"syntax/syntaxNode.ts",
	"syntax/syntaxNodeInvariantsChecker.ts",
	"syntax/syntaxNodeOrToken.ts",
	"syntax/syntaxNodes.generated.ts",
	"syntax/syntaxRewriter.generated.ts",
	"syntax/syntaxToken.generated.ts",
	"syntax/syntaxToken.ts",
	"syntax/syntaxTokenReplacer.ts",
	"syntax/syntaxTree.ts",
	"syntax/syntaxTrivia.ts",
	"syntax/syntaxTriviaList.ts",
	"syntax/syntaxUtilities.ts",
	"syntax/syntaxVisitor.generated.ts",
	"syntax/syntaxWalker.generated.ts",
	"syntax/unicode.ts",
	"text/characterCodes.ts",
	"text/lineMap.ts",
	"text/references.ts",
	"text/scriptSnapshot.ts",
	"text/text.ts",
	"text/textChangeRange.ts",
	"text/textFactory.ts",
	"text/textLine.ts",
	"text/textSpan.ts",
	"text/textUtilities.ts",
	"typecheck/pullDeclCollection.ts",
	"typecheck/pullDecls.ts",
	"typecheck/pullFlags.ts",
	"typecheck/pullHelpers.ts",	
	"typecheck/pullInstantiationHelpers.ts",	
	"typecheck/pullSemanticInfo.ts",
	"typecheck/pullSymbolBinder.ts",
	"typecheck/pullSymbols.ts",
	"typecheck/pullTypeResolution.ts",
	"typecheck/pullTypeResolutionContext.ts",
	"typecheck/pullTypeEnclosingTypeWalker.ts",
	"typecheck/pullTypeInstantiation.ts",
	"typescript.ts"
].map(function (f) {
	return path.join(compilerDirectory, f);
});

var tscSources = [
	"io.ts",
	"optionsParser.ts",
	"tsc.ts"
].map(function (f) {
	return path.join(compilerDirectory, f);
});

var servicesSources = [
	"braceMatcher.ts",
	"breakpoints.ts",
	"classifier.ts",
	"compilerState.ts",
	"completionHelpers.ts",
	"completionSession.ts",
	"coreServices.ts",
	"getScriptLexicalStructureWalker.ts",
	"diagnosticServices.ts",
	"es5compat.ts",
	"findReferenceHelpers.ts",
	"indenter.ts",
	"keywordCompletions.ts",
	"languageService.ts",
	"outliningElementsCollector.ts",
	"pullLanguageService.ts",
	"shims.ts",
	"signatureInfoHelpers.ts",
	"formatting/formatter.ts", 
	"formatting/formatting.ts", 
	"formatting/formattingContext.ts",
	"formatting/formattingManager.ts",
	"formatting/formattingRequestKind.ts",
	"formatting/indentationNodeContext.ts", 
	"formatting/indentationNodeContextPool.ts", 
	"formatting/indentationTrackingWalker.ts", 
	"formatting/multipleTokenIndenter.ts", 
	"formatting/rule.ts",
	"formatting/ruleAction.ts",
	"formatting/ruleDescriptor.ts",
	"formatting/ruleFlag.ts",
	"formatting/ruleOperation.ts",
	"formatting/ruleOperationContext.ts",
	"formatting/rules.ts",
	"formatting/rulesMap.ts",
	"formatting/rulesProvider.ts",
	"formatting/singleTokenIndenter.ts", 
	"formatting/snapshotPoint.ts",
	"formatting/textEditInfo.ts",
	"formatting/textSnapshot.ts",
	"formatting/textSnapshotLine.ts",
	"formatting/tokenRange.ts",
	"formatting/tokenSpan.ts", 
	"typescriptServices.ts"
].map(function (f) {
	return path.join(servicesDirectory, f);
});

var harnessSources = [
	path.join(compilerDirectory, "io.ts"),
	path.join(compilerDirectory, "optionsParser.ts"),

	path.join(harnessDirectory, "exec.ts"),
	path.join(harnessDirectory, "diff.ts"),
	path.join(harnessDirectory, "harness.ts"),
	path.join(harnessDirectory, "baselining.ts"),
	path.join(harnessDirectory, "fourslash.ts"),
	path.join(harnessDirectory, "runner.ts"),

	path.join(runnersDirectory, "runnerBase.ts"),
	path.join(runnersDirectory, "compiler/compilerRunner.ts"),
	path.join(runnersDirectory, "compiler/typeWriter.ts"),
	path.join(runnersDirectory, "fourslash/fourslashRunner.ts"),
	path.join(runnersDirectory, "projects/projectsRunner.ts"),
	path.join(runnersDirectory, "unittest/unittestRunner.ts"),
	path.join(runnersDirectory, "rwc/rwcRunner.ts"),

	path.join(runnersDirectory, "../cases/unittests/samples/samples.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/callSignatureTests.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/classOverloads.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/constructSignatureTests.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/declarationTests.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/functionSignaturesTests.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/identifiers.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/moduleAlias.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/pathing.ts"),
	path.join(runnersDirectory, "../cases/unittests/compiler/propertySignatureTests.ts"),
];

var libraryFiles = [
	"lib.d.ts",
	"jquery.d.ts",
	"winjs.d.ts",
	"winrt.d.ts"
];

var librarySources = libraryFiles.map(function (f) {
	return path.join(libraryDirectory, f);
});

var libraryTargets = libraryFiles.map(function (f) {
	return path.join(builtLocalDirectory, f);
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
	jake.cpR(prefixFile, temp);
	fs.appendFileSync(temp, fs.readFileSync(destinationFile));
	fs.renameSync(temp, destinationFile);
}

var useDebugMode = false;
/* Compiles a file from a list of sources
	* @param outFile: the target file name
	* @param sources: an array of the names of the source files
	* @param prereqs: prerequisite tasks to compiling the file
	* @param prefixes: a list of files to prepend to the target file
	* @param useBuiltCompiler: true to use the built compiler, false to use the LKG
	*/
function compileFile(outFile, sources, prereqs, prefixes, useBuiltCompiler) {
	file(outFile, prereqs, function() {
		var dir = useBuiltCompiler ? builtLocalDirectory : LKGDirectory;
		var cmd = (process.env.host || process.env.TYPESCRIPT_HOST || "node") + " " + dir + "tsc.js -removeComments -propagateEnumConstants -declaration -noImplicitAny --module commonjs " + sources.join(" ") + " -out " + outFile;
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
		file(libraryTargets[i], [builtLocalDirectory, librarySources[i]], function() {
			jake.cpR(librarySources[i], builtLocalDirectory);
		});
	})(i);
}

var typescriptFile = path.join(builtLocalDirectory, "typescript.js");
compileFile(typescriptFile, compilerSources, [builtLocalDirectory, copyright].concat(compilerSources), [copyright]);

var tscFile = path.join(builtLocalDirectory, "tsc.js");
compileFile(tscFile, compilerSources.concat(tscSources), [builtLocalDirectory, copyright].concat(compilerSources).concat(tscSources), [copyright]);

var serviceFile = path.join(builtLocalDirectory, "typescriptServices.js");
compileFile(serviceFile, compilerSources.concat(servicesSources), [builtLocalDirectory, thirdParty, copyright].concat(compilerSources).concat(servicesSources), [thirdParty, copyright]);

// Local target to build the compiler and services
desc("Builds the full compiler and services");
task("local", libraryTargets.concat([typescriptFile, tscFile, serviceFile]));

// Local target to build the compiler and services
desc("Emit debug mode files with sourcemaps");
task("setDebugMode", function() {
    useDebugMode = true;
});

// Local target to build the compiler and services
desc("Builds the full compiler and services in debug mode");
task("local-debug", ["setDebugMode", "local"]);

// Set the default task to "local"
task("default", ["local"]);

// Cleans the built directory
desc("Cleans the compiler output, declare files, and tests");
task("clean", function() {
	jake.rmRf(builtDirectory);
});


// Makes a new LKG. This target does not build anything, but errors if not all the outputs are present in the built/local directory
desc("Makes a new LKG out of the built js files");
task("LKG", libraryTargets, function() {
	var expectedFiles = [typescriptFile, tscFile, serviceFile];
	var missingFiles = expectedFiles.filter(function (f) {
		return !fs.existsSync(f);
	});
	if (missingFiles.length > 0) {
		fail("Cannot replace the LKG unless all built targets are present in directory " + builtLocalDirectory +
			    ". The following files are missing:\n" + missingFiles.join("\n"));
	}
	// Copy all the targets into the LKG directory
	jake.mkdirP(LKGDirectory);
	for (var i in librarySources) {
		jake.cpR(libraryTargets[i], LKGDirectory);
	}
	for (i in expectedFiles) {
		jake.cpR(expectedFiles[i], LKGDirectory);
	}
	//var resourceDirectories = fs.readdirSync(builtLocalResourcesDirectory).map(function(p) { return path.join(builtLocalResourcesDirectory, p); });
	//resourceDirectories.map(function(d) {
	//	jake.cpR(d, LKGResourcesDirectory);
	//});
});

// Test directory
directory(builtTestDirectory);

// Task to build the tests infrastructure using the built compiler
var run = path.join(builtTestDirectory, "run.js");
var json2 = path.join(harnessDirectory, "external/json2.js")   
compileFile(run, harnessSources, [builtTestDirectory, tscFile].concat(libraryTargets).concat(harnessSources), [json2], true);  


// Webharness
var frontEndPath = "tests/cases/webharness/frontEnd.ts";
var perfCompilerPath = "tests/cases/webharness/perfCompiler.js";
compileFile(perfCompilerPath, [frontEndPath], [tscFile], [], true);

// Webhost
var webhostPath = "tests/cases/webhost/webtsc.ts";
var webhostJsPath = "tests/cases/webhost/webtsc.js";
desc("Builds the web host");
compileFile(webhostJsPath, [webhostPath], [tscFile, webhostPath], [], true);

desc("Builds the tsc web host");
task("webhost", [webhostJsPath], function() {
    jake.cpR(path.join(libraryDirectory, "lib.d.ts"), "tests/cases/webhost");
});

// Fidelity Tests
var fidelityTestsOutFile = "tests/Fidelity/program.js";
var fidelityTestsInFile1 = "tests/Fidelity/Program.ts";
var fidelityTestsInFile2 = "tests/Fidelity/incremental/IncrementalParserTests.ts";
compileFile(fidelityTestsOutFile, [fidelityTestsInFile1], [tscFile, fidelityTestsInFile2].concat(compilerSources.concat(servicesSources)), [], true);

desc("Builds the web harness front end");
task("test-harness", [perfCompilerPath]);

var localBaseline = "tests/baselines/local/";
var refBaseline = "tests/baselines/reference/";

var localRwcBaseline = "tests/baselines/rwc/local/";
var refRwcBaseline = "tests/baselines/rwc/reference/";

desc("Builds the test infrastructure using the built compiler");
task("tests", [run, serviceFile, fidelityTestsOutFile, perfCompilerPath].concat(libraryTargets), function() {	
	// Copy the language service over to the test directory
	jake.cpR(serviceFile, builtTestDirectory);
	jake.cpR(path.join(libraryDirectory, "lib.d.ts"), builtTestDirectory);

	jake.cpR(path.join(libraryDirectory, "lib.d.ts"), "tests/cases/webhost");
});

desc("Runs the tests using the built run.js file. Syntax is jake runtests. Optional parameters 'host=' and 'tests='.");
task("runtests", ["local", "tests", builtTestDirectory], function() {
	// Clean the local baselines directory
	if (fs.existsSync(localBaseline)) {
		jake.rmRf(localBaseline);
	}

    // Clean the local Rwc baselines directory
	if (fs.existsSync(localRwcBaseline)) {
		jake.rmRf(localRwcBaseline);
	}

	jake.mkdirP(localBaseline);
	host = process.env.host || process.env.TYPESCRIPT_HOST || "node";
	tests = process.env.test || process.env.tests;
	tests = tests ? tests.split(',').join(' ') : ([].slice.call(arguments).join(' ') || "");
        var cmd = host + " " + run + " " + tests;
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
                                          
// Syntax Generator
var syntaxGeneratorOutFile = compilerDirectory + "syntax/SyntaxGenerator.js";
var syntaxGeneratorInFile = compilerDirectory + "syntax/SyntaxGenerator.ts";
file(compilerDirectory + "syntax/syntaxKind.ts");
file(compilerDirectory + "syntax/syntaxFacts.ts");
compileFile(syntaxGeneratorOutFile, [syntaxGeneratorInFile], [syntaxGeneratorInFile, compilerDirectory + "syntax/syntaxKind.ts", compilerDirectory + "syntax/syntaxFacts.ts"], [], /*useBuiltCompiler:*/ false);

desc("Builds and runs the syntax generator");
task("run-syntax-generator", [syntaxGeneratorOutFile], function() {
	host = process.env.host || process.env.TYPESCRIPT_HOST || "node";
	var cmd = host + " " + syntaxGeneratorOutFile;
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

desc("Builds and runs the Fidelity tests");
task("run-fidelity-tests", [fidelityTestsOutFile], function() {
	host = process.env.host || process.env.TYPESCRIPT_HOST || "node";
	var cmd = host + " " + fidelityTestsOutFile;
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