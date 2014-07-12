/// <reference path='..\..\src\Services\es5compat.ts' />

///<reference path='..\..\src\compiler\syntax\references.ts' />
///<reference path='..\..\src\compiler\syntax\emitter.ts' />
///<reference path='..\..\src\compiler\syntax\prettyPrinter.ts' />
///<reference path='Test262.ts' />
///<reference path='incremental\IncrementalParserTests.ts' />
///<reference path='..\..\src\compiler\core\environment.ts' />
///<reference path='..\..\src\harness\diff.ts' />
///<reference path='..\..\src\compiler\syntaxTreeToAstVisitor.ts' />

var timer = new TypeScript.Timer();

var specificFile: string =
    // "ExportAssignment5.ts";
    undefined;

var generate = false;

var htmlReport = new Diff.HtmlBaselineReport("fidelity-report.html");
htmlReport.reset();

class Program {
    runAllTests(verify: boolean): void {
        TypeScript.Environment.standardOut.WriteLine("");

        if (generate) {
            TypeScript.Environment.standardOut.WriteLine("!!!!!!!!!! WARNING - GENERATING !!!!!!!!!");
            TypeScript.Environment.standardOut.WriteLine("");
        }

        // TypeScript.Environment.standardOut.WriteLine("Testing against fuzz.");
        // this.runTests("C:\\temp\\fuzz",
        //    fileName => this.runParser(fileName, LanguageVersion.EcmaScript5, /*verify:*/ false, /*generateBaselines:*/ generate), 2000);

        if (true) {
            // return;
        }

        //TypeScript.Environment.standardOut.WriteLine("Testing Monoco.");
        //this.runTests(TypeScript.Environment.currentDirectory() + "c:\\temp\\monoco",
        //    fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, false, /*generateBaselines:*/ generate, /*allowErrors:*/ false));

        if (specificFile === undefined) {
            TypeScript.Environment.standardOut.WriteLine("Testing Incremental 2.");
            TypeScript.IncrementalParserTests.runAllTests();
        }

        TypeScript.Environment.standardOut.WriteLine("Testing scanner ES3.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\scanner\\ecmascript3",
            fileName => this.runScanner(fileName, TypeScript.LanguageVersion.EcmaScript3, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.WriteLine("Testing scanner ES5.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\scanner\\ecmascript5",
            fileName => this.runScanner(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.WriteLine("Testing parser ES5.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\parser\\ecmascript5",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.WriteLine("Testing parser ES3.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\parser\\ecmascript3",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript3, verify, /*generateBaselines:*/ generate));

        if (specificFile === undefined) {
            this.testIncrementalSpeed(TypeScript.Environment.currentDirectory() + "\\src\\compiler\\Syntax\\SyntaxNodes.generated.ts");
        }

        TypeScript.Environment.standardOut.WriteLine("Testing emitter 1.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\emitter\\ecmascript5",
            fileName => this.runEmitter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate, /*justText:*/ false));

        TypeScript.Environment.standardOut.WriteLine("Testing against 262.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\test262",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, /*verify:*/ true, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.WriteLine("Testing pretty printer.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\prettyPrinter\\ecmascript5",
            fileName => this.runPrettyPrinter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.WriteLine("Testing findToken.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\findToken\\ecmascript5",
            fileName => this.runFindToken(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.WriteLine("Testing trivia.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\trivia\\ecmascript5",
            fileName => this.runTrivia(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.WriteLine("Testing Incremental 1.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\parser\\ecmascript5",
            fileName => this.runIncremental(fileName, TypeScript.LanguageVersion.EcmaScript5));
            
        TypeScript.Environment.standardOut.WriteLine("Testing emitter 2.");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\emitter2\\ecmascript5",
            fileName => this.runEmitter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate, /*justText:*/ true));
    }

    private static reusedElements(oldNode: TypeScript.SourceUnitSyntax, newNode: TypeScript.SourceUnitSyntax, key: any): { originalElements: number; reusedElements: number; } {
        var allOldElements = TypeScript.SyntaxElementsCollector.collectElements(oldNode);
        var allNewElements = TypeScript.SyntaxElementsCollector.collectElements(newNode);

        for (var i = 0; i < allOldElements.length; i++) {
            var oldElement: TypeScript.IIndexable<any> = <any>allOldElements[i];
            oldElement[key] = key;
        }

        var reused = 0;
        for (var j = 0; j < allNewElements.length; j++) {
            var newElement: TypeScript.IIndexable<any> = <any>allNewElements[j];
            if (newElement[key] === key) {
                reused++;
            }
        }

        return { originalElements: allOldElements.length, reusedElements: reused };
    }

    private testIncrementalSpeed(fileName: string): void {
        var repeat = 500;
        TypeScript.Environment.standardOut.WriteLine("Incremental Perf - Changed Text.");
        this.testIncrementalSpeedChange(fileName, repeat);

        TypeScript.Environment.standardOut.WriteLine("");
        TypeScript.Environment.standardOut.WriteLine("Incremental Perf - No Changed Text.");
        this.testIncrementalSpeedNoChange(fileName, repeat);
    }

    private testIncrementalSpeedNoChange(fileName: string, repeat: number): void {
        if (specificFile !== undefined) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;
        // TypeScript.Environment.standardOut.WriteLine(fileName);

        var text = TypeScript.TextFactory.createText(contents);
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), new TypeScript.ParseOptions(TypeScript.LanguageVersion.EcmaScript5, true));
        var originalTree = tree;
        var ast = TypeScript.SyntaxTreeToAstVisitor.visit(tree, fileName, TypeScript.ImmutableCompilationSettings.defaultSettings(), /*incrementalAST:*/ true);

        var totalIncrementalTime = 0;
        var totalIncrementalASTTime = 0;
        var timer = new TypeScript.Timer();

        for (var i = 0; i < repeat; i++) {
            var changeLength = i * 2;

            timer.start();
            var tree2 = TypeScript.Parser.incrementalParse(tree, new TypeScript.TextChangeRange( new TypeScript.TextSpan((text.length() / 2) - i, changeLength), changeLength), text);
            timer.end();
            totalIncrementalTime += timer.time;

            TypeScript.Debug.assert(tree.structuralEquals(tree2));

            timer.start();
            var ast2 = TypeScript.SyntaxTreeToAstVisitor.visit(tree2, fileName, TypeScript.ImmutableCompilationSettings.defaultSettings(), /*incrementalAST:*/ true);
            timer.end();
            totalIncrementalASTTime += timer.time;

            TypeScript.Debug.assert(ast.structuralEquals(ast2, true));

            tree = tree2;
            ast = ast2;
        }
        
        var rateBytesPerMillisecond = (contents.length * repeat) / totalIncrementalTime;
        var rateBytesPerSecond = rateBytesPerMillisecond * 1000;
        var rateMBPerSecond = rateBytesPerSecond / (1024 * 1024);

        // TypeScript.Environment.standardOut.WriteLine("Incremental     time: " + totalIncrementalTime);
        TypeScript.Environment.standardOut.WriteLine("Incremental     rate: " + rateMBPerSecond + " MB/s");

        rateBytesPerMillisecond = (contents.length * repeat) / totalIncrementalASTTime;
        rateBytesPerSecond = rateBytesPerMillisecond * 1000;
        rateMBPerSecond = rateBytesPerSecond / (1024 * 1024);

        // TypeScript.Environment.standardOut.WriteLine("Incremental AST time: " + totalIncrementalASTTime);
        TypeScript.Environment.standardOut.WriteLine("Incremental AST rate: " + rateMBPerSecond + " MB/s");

        var allOldElements = TypeScript.SyntaxElementsCollector.collectElements(originalTree.sourceUnit());
        var allNewElements = TypeScript.SyntaxElementsCollector.collectElements(tree.sourceUnit());

        var reuse = TypeScript.ArrayUtilities.where(allNewElements,
            v => TypeScript.ArrayUtilities.contains(allOldElements, v)).length;

        TypeScript.Environment.standardOut.WriteLine("Reuse: " + reuse / allNewElements.length);
    }

    private testIncrementalSpeedChange(fileName: string, repeat: number): void {
        if (specificFile !== undefined) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;
        // TypeScript.Environment.standardOut.WriteLine(fileName);

        var text = TypeScript.TextFactory.createText(contents);
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), new TypeScript.ParseOptions(TypeScript.LanguageVersion.EcmaScript5, true));
        var originalTree = tree;
        var ast = TypeScript.SyntaxTreeToAstVisitor.visit(tree, fileName, TypeScript.ImmutableCompilationSettings.defaultSettings(), /*incrementalAST:*/ true);

        var totalIncrementalTime = 0;
        var totalIncrementalASTTime = 0;
        var timer = new TypeScript.Timer();

        for (var i = 0; i < repeat; i++) {

            var changeLength = i * 2;
            var changeSpan = new TypeScript.TextSpan((text.length() / 2) - i, changeLength);

            contents = text.toString();
            var contentsToReplace = contents.substr(changeSpan.start(), changeSpan.length());

            var first = true;
            var updatedText = contentsToReplace.replace(/[^a-zA-Z0-9][a-z]+[^a-zA-Z0-9]/, (sub) => {
                if (first && TypeScript.SyntaxFacts.getTokenKind(sub.substr(1, sub.length - 2)) === TypeScript.SyntaxKind.None) {
                    first = false;
                    return sub.substr(0, sub.length - 1) + "a" + sub.substr(sub.length - 1);
                }

                return sub;
            });

            text = TypeScript.TextFactory.createText(
                contents.substr(0, changeSpan.start()) +
                updatedText +
                contents.substr(changeSpan.end()));
            var changeRange = new TypeScript.TextChangeRange(changeSpan, updatedText.length);

            timer.start();
            var tree2 = TypeScript.Parser.incrementalParse(tree, changeRange, text);
            timer.end();
            totalIncrementalTime += timer.time;

            timer.start();
            var ast2 = TypeScript.SyntaxTreeToAstVisitor.visit(tree2, fileName, TypeScript.ImmutableCompilationSettings.defaultSettings(), /*incrementalAST:*/ true);
            timer.end();
            totalIncrementalASTTime += timer.time;

            tree = tree2;
            ast = ast2;
        }

        var rateBytesPerMillisecond = (contents.length * repeat) / totalIncrementalTime;
        var rateBytesPerSecond = rateBytesPerMillisecond * 1000;
        var rateMBPerSecond = rateBytesPerSecond / (1024 * 1024);

        // TypeScript.Environment.standardOut.WriteLine("Incremental     time: " + totalIncrementalTime);
        TypeScript.Environment.standardOut.WriteLine("Incremental     rate: " + rateMBPerSecond + " MB/s");

        rateBytesPerMillisecond = (contents.length * repeat) / totalIncrementalASTTime;
        rateBytesPerSecond = rateBytesPerMillisecond * 1000;
        rateMBPerSecond = rateBytesPerSecond / (1024 * 1024);

        // TypeScript.Environment.standardOut.WriteLine("Incremental AST time: " + totalIncrementalASTTime);
        TypeScript.Environment.standardOut.WriteLine("Incremental AST rate: " + rateMBPerSecond + " MB/s");

        var allOldElements = TypeScript.SyntaxElementsCollector.collectElements(originalTree.sourceUnit());
        var allNewElements = TypeScript.SyntaxElementsCollector.collectElements(tree.sourceUnit());

        var reuse = TypeScript.ArrayUtilities.where(allNewElements,
            v => TypeScript.ArrayUtilities.contains(allOldElements, v)).length;

        TypeScript.Environment.standardOut.WriteLine("Reuse: " + reuse / allNewElements.length);
    }

    private handleException(fileName: string, e: Error): void {
        TypeScript.Environment.standardOut.WriteLine("");
        if ((<string>e.message).indexOf(fileName) < 0) {
            TypeScript.Environment.standardOut.WriteLine("Exception: " + fileName + ": " + e.message);
        }
        else {
            TypeScript.Environment.standardOut.WriteLine(e.message);
        }
    }

    private runTests(
        path: string,
        action: (fileName: string) => void) {

        var testFiles = TypeScript.Environment.listFiles(path, null, { recursive: true });
        var indexNum = 0;

        testFiles.forEach(fileName => {
            if (specificFile !== undefined && fileName.indexOf(specificFile) < 0) {
                return;
            }

            // TypeScript.Environment.standardOut.WriteLine(fileName);
            try {
                action(fileName);
            }
            catch (e) {
                this.handleException(fileName, e);
            }
        });
    }

    private checkResult(fileName: string, result: any, verify: boolean, generateBaseline: boolean, justText: boolean): void {
        var actualResult: string;

        var expectedFile = fileName + ".expected";
        var actualFile = fileName + ".actual";

        if (generateBaseline) {
            actualResult = justText ? result : JSON.stringify(result, null, 4);
            expectedFile = fileName + ".expected";

            // TypeScript.Environment.standardOut.WriteLine("Generating baseline for: " + fileName);
            TypeScript.Environment.writeFile(expectedFile, actualResult, /*writeByteOrderMark:*/ false);

            if (TypeScript.Environment.fileExists(actualFile)) {
                TypeScript.Environment.deleteFile(actualFile);
            }
        }
        else if (verify) {
            actualResult = justText ? result : JSON.stringify(result, null, 4);

            var expectedResult: string = null;
            if (!TypeScript.Environment.fileExists(expectedFile)) {
                TypeScript.Environment.writeFile(expectedFile, "", false);
            }
            else {
                expectedResult = TypeScript.Environment.readFile(expectedFile, /*codepage*/ null).contents;
            }

            if (expectedResult !== actualResult) {
                TypeScript.Environment.standardOut.WriteLine(" ! Fail: " + actualFile);
                TypeScript.Environment.writeFile(actualFile, actualResult, /*writeByteOrderMark:*/ false);

                if (!generate) {
                    var includeUnchangedRegions = expectedResult.length < 10240 && actualResult.length < 10240;
                    htmlReport.addDifference("", expectedFile, actualFile, expectedResult, actualResult, includeUnchangedRegions);
                }
            }
            else {
                if (TypeScript.Environment.fileExists(actualFile)) {
                    TypeScript.Environment.deleteFile(actualFile);
                }
            }
        }
    }
    
    runEmitter(fileName: string,
        languageVersion: TypeScript.LanguageVersion,
               verify: boolean,
               generateBaseline: boolean,
               justText: boolean): void {
        if (true) {
            // return;
        }

        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;
        // TypeScript.Environment.standardOut.WriteLine(fileName);

        totalSize += contents.length;

        var text = TypeScript.TextFactory.createText(contents);

                   var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), new TypeScript.ParseOptions(languageVersion, true));
        var emitted = TypeScript.Emitter1.emit(<TypeScript.SourceUnitSyntax>tree.sourceUnit());

        var result = justText
            ? <any>emitted.fullText()
            : { fullText: emitted.fullText().split("\r\n"), sourceUnit: emitted };
        this.checkResult(fileName, result, verify, generateBaseline, justText);
    }

    runPrettyPrinter(fileName: string,
        languageVersion: TypeScript.LanguageVersion,
        verify: boolean,
        generateBaseline: boolean): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;
        // TypeScript.Environment.standardOut.WriteLine(fileName);

        totalSize += contents.length;

        var text = TypeScript.TextFactory.createText(contents);

        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), new TypeScript.ParseOptions(languageVersion, true));
        var result = TypeScript.PrettyPrinter.prettyPrint(tree.sourceUnit());

        this.checkResult(fileName, result, verify, generateBaseline, true);

        totalTime += timer.time;
    }

    runParser(fileName: string,
              languageVersion: TypeScript.LanguageVersion,
              verify: boolean,
              generateBaseline: boolean,
              allowErrors = true): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;
        // TypeScript.Environment.standardOut.WriteLine(fileName);

        totalSize += contents.length;

        var text = TypeScript.TextFactory.createText(contents);

        timer.start();
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), new TypeScript.ParseOptions(languageVersion, true));
        timer.end();
        
        if (!allowErrors) {
            var diagnostics = tree.diagnostics();
            if (diagnostics.length > 0) {
                TypeScript.Environment.standardOut.WriteLine(fileName);
                TypeScript.Environment.standardOut.WriteLine("\t" + diagnostics[0].message());
            }
        }

        if (verify) {
            TypeScript.Debug.assert(tree.sourceUnit().fullWidth() === contents.length);

            TypeScript.SyntaxTreeToAstVisitor.visit(tree, "", TypeScript.ImmutableCompilationSettings.defaultSettings(), /*incrementalAST:*/ true);

            this.checkResult(fileName, tree, verify, generateBaseline, /*justText:*/ false);
        }
        totalTime += timer.time;
    }

    runIncremental(fileName: string,
                   languageVersion: TypeScript.LanguageVersion): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;
        // TypeScript.Environment.standardOut.WriteLine(fileName);

        var text = TypeScript.TextFactory.createText(contents);

            var tree1 = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), new TypeScript.ParseOptions(languageVersion, true));
        var tree2 = TypeScript.Parser.incrementalParse(
            new TypeScript.SyntaxTree(TypeScript.Syntax.emptySourceUnit(), TypeScript.isDTSFile(fileName), [], fileName, null, tree1.parseOptions()),
            new TypeScript.TextChangeRange(new TypeScript.TextSpan(0, 0), text.length()),
            text);

        TypeScript.Debug.assert(tree1.structuralEquals(tree2));
    }

    runFindToken(fileName: string,
        languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;
        // TypeScript.Environment.standardOut.WriteLine(fileName);

        var text = TypeScript.TextFactory.createText(contents);
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), new TypeScript.ParseOptions(languageVersion, true));
        var sourceUnit = tree.sourceUnit();

        TypeScript.Debug.assert(tree.sourceUnit().fullWidth() === contents.length);

        var tokens: TypeScript.IIndexable<any>= {};
        var tokensOnLeft: TypeScript.IIndexable<any> = {};
        var leftToRight: TypeScript.ISyntaxToken[] = [];
        var rightToLeft: TypeScript.ISyntaxToken[] = [];

        for (var i = 0; i <= contents.length; i++) {
            var token = sourceUnit.findToken(i).token();

            var left = sourceUnit.findTokenOnLeft(i);
            var tokenOnLeft = left === null ? null : left.token();

            TypeScript.Debug.assert(token.isToken());
            if (i === contents.length) {
                TypeScript.Debug.assert(token.kind() === TypeScript.SyntaxKind.EndOfFileToken);
            }
            else {
                TypeScript.Debug.assert(token.width() > 0 || token.kind() === TypeScript.SyntaxKind.EndOfFileToken);
                TypeScript.Debug.assert(token.fullWidth() > 0);
            }

            tokens[i] = token;
            tokensOnLeft[i] = tokenOnLeft;
        }

        var positionedToken = sourceUnit.findToken(0);
        while (positionedToken !== null) {
            leftToRight.push(positionedToken.token());
            positionedToken = positionedToken.nextToken();
        }

        positionedToken = sourceUnit.findToken(contents.length);
        while (positionedToken !== null) {
            rightToLeft.push(positionedToken.token());
            positionedToken = positionedToken.previousToken();
        }

        var result = {
            tokens: tokens,
            tokensOnLeft: tokensOnLeft,
            leftToRight: leftToRight,
            rightToLeft: rightToLeft,
        };

        this.checkResult(fileName, result, verify, generateBaseline, /*justText:*/ false);
    }

    runTrivia(fileName: string,
        languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts")) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;

        var text = TypeScript.TextFactory.createText(contents);
        var scanner = new TypeScript.Scanner(fileName, text, languageVersion);

        var tokens: TypeScript.ISyntaxToken[] = [];
        var textArray: string[] = [];
        var diagnostics: TypeScript.Diagnostic[] = [];

        while (true) {
            var token = scanner.scan(diagnostics, /*allowRegularExpression:*/ false);
            tokens.push(token);

            if (token.tokenKind === TypeScript.SyntaxKind.EndOfFileToken) {
                break;
            }
        }

        this.checkResult(fileName, tokens, verify, generateBaseline, false);
    }

    runScanner(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts")) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;

        var text = TypeScript.TextFactory.createText(contents);
        var scanner = new TypeScript.Scanner(fileName, text, languageVersion);

        var tokens: TypeScript.ISyntaxToken[] = [];
        var textArray: string[] = [];
        var diagnostics: TypeScript.Diagnostic[] = [];

        while (true) {
            var token = scanner.scan(diagnostics, /*allowRegularExpression:*/ false);
            tokens.push(token);

            if (token.tokenKind === TypeScript.SyntaxKind.EndOfFileToken) {
                break;
            }
        }

        if (verify) {
            var tokenText = TypeScript.ArrayUtilities.select(tokens, t => t.fullText()).join("");

            if (tokenText !== contents) {
                throw new Error("Token invariant broken!");
            }
        }

        var result = diagnostics.length === 0 ? <any>tokens : { diagnostics: diagnostics, tokens: tokens };
        this.checkResult(fileName, result, verify, generateBaseline, false);
    }

    parseArguments(): void {
        TypeScript.Environment.standardOut.WriteLine("Testing input files.");
        for (var index in TypeScript.Environment.arguments) {
            var fileName: string = TypeScript.Environment.arguments[index];
            if (specificFile !== undefined && fileName.indexOf(specificFile) < 0) {
                continue;
            }

            this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, /*verify:*/ false, /*generate:*/ false, /*allowErrors:*/ false);
        }
    }

    run262(): void {
        var path = "C:\\temp\\test262\\suite";
        var testFiles = TypeScript.Environment.listFiles(path, null, { recursive: true });

        var testCount = 0;
        var failCount = 0;
        var skippedTests:string[] = [];

        for (var index in testFiles) {
            var fileName: string = testFiles[index];

            if (specificFile !== undefined && fileName.indexOf(specificFile) < 0) {
                continue;
            }

            // All 262 files are utf8.  But they dont' have a BOM.  Force them to be read in
            // as UTF8.
            var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;

            var isNegative = contents.indexOf("@negative") >= 0

            testCount++;

            try {
                var stringText = TypeScript.TextFactory.createText(contents);
                var tree = TypeScript.Parser.parse(fileName, stringText, TypeScript.isDTSFile(fileName), new TypeScript.ParseOptions(TypeScript.LanguageVersion.EcmaScript5, true));

                if (isNegative) {
                    var nameOnly = fileName.substr(fileName.lastIndexOf("\\") + 1);
                    var canParseSuccessfully = negative262ExpectedResults[nameOnly];

                    if (canParseSuccessfully) {
                        // We expected to parse this successfully.  Report an error if we didn't.
                        if (tree.diagnostics() && tree.diagnostics().length > 0) {
                            TypeScript.Environment.standardOut.WriteLine("Negative test. Unexpected failure: " + fileName);
                            failCount++;
                        }
                    }
                    else {
                        // We expected to fail on this.  Report an error if we don't.
                        if (tree.diagnostics() === null || tree.diagnostics().length === 0) {
                            TypeScript.Environment.standardOut.WriteLine("Negative test. Unexpected success: " + fileName);
                            failCount++;
                        }
                    }
                }
                else {
                    // Not a negative test.  We can't have any errors or skipped tokens.
                    if (tree.diagnostics() && tree.diagnostics().length > 0) {
                        TypeScript.Environment.standardOut.WriteLine("Unexpected failure: " + fileName);
                        failCount++;
                    }
                }
            }
            catch (e) {
                failCount++;
                this.handleException(fileName, e);
            }
        }

        TypeScript.Environment.standardOut.WriteLine("");
        TypeScript.Environment.standardOut.WriteLine("Test 262 results:");
        TypeScript.Environment.standardOut.WriteLine("Test Count: " + testCount);
        TypeScript.Environment.standardOut.WriteLine("Skip Count: " + skippedTests.length);
        TypeScript.Environment.standardOut.WriteLine("Fail Count: " + failCount);

        for (var i = 0; i < skippedTests.length; i++) {
            TypeScript.Environment.standardOut.WriteLine(skippedTests[i]);
        }
    }
}

var diagnostics: TypeScript.IIndexable<any> = {};
for (var d in TypeScript.LocalizedDiagnosticMessages) {
    if (TypeScript.LocalizedDiagnosticMessages.hasOwnProperty(d)) {
        var info: TypeScript.DiagnosticInfo = TypeScript.LocalizedDiagnosticMessages[d];
        diagnostics[info.message] = { category: TypeScript.DiagnosticCategory[info.category], code: info.code };
    }
}
 
var whatever = JSON.stringify(diagnostics, null, 4);

var totalTime = 0;
var totalSize = 0;
var program = new Program();

// New parser.
totalTime = 0;
totalSize = 0;
program.runAllTests(true);

var count = 1;

//for (var i = 0; i < count; i++) {
//    program.parseArguments();
//}

TypeScript.Environment.standardOut.WriteLine("Total time: " + (totalTime / count));
TypeScript.Environment.standardOut.WriteLine("Total size: " + (totalSize / count));