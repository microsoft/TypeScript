/// <reference path='..\..\src\services\es5compat.ts' />

///<reference path='..\..\src\compiler\syntax\references.ts' />
///<reference path='..\..\src\compiler\syntax\syntaxNodes.concrete.generated.ts' />
///<reference path='..\..\src\compiler\syntax\prettyPrinter.ts' />
///<reference path='Test262.ts' />
///<reference path='incremental\IncrementalParserTests.ts' />
///<reference path='..\..\src\compiler\core\environment.ts' />
///<reference path='..\..\src\compiler\references.ts' />
///<reference path='..\..\src\compiler\syntax\testUtilities.ts' />

var timer = new TypeScript.Timer();

var specificFile: string =
    // "S7.9_A4.js";
    undefined;

var generate = false;

class PositionValidatingWalker extends TypeScript.SyntaxWalker {
    private position = 0;

    public visitToken(token: TypeScript.ISyntaxToken): void {
        TypeScript.Debug.assert(this.position === token.fullStart());
        this.position += token.fullWidth();
    }
}

function tokenToJSON(token: TypeScript.ISyntaxToken, text: TypeScript.ISimpleText): any {
    if (token === null) {
        return null;
    }

    var result: any = {};

    for (var name in TypeScript.SyntaxKind) {
        if (<any>TypeScript.SyntaxKind[name] === token.kind()) {
            result.kind = name;
            break;
        }
    }

    result.fullStart = token.fullStart();
    result.fullEnd = TypeScript.fullEnd(token);

    result.start = TypeScript.start(token, text);
    result.end = TypeScript.end(token, text);

    result.fullWidth = token.fullWidth();
    result.width = TypeScript.width(token);

    result.text = token.text();

    var value = TypeScript.tokenValue(token);
    if (value !== null) {
        result.value = value;
        result.valueText = TypeScript.tokenValueText(token);
    }

    if (token.isKeywordConvertedToIdentifier()) {
        result.isKeywordConvertedToIdentifier = true;
    }

    var leadingTrivia: TypeScript.ISyntaxTriviaList = null;
    if (token.hasLeadingTrivia()) {
        result.hasLeadingTrivia = true;
        leadingTrivia = token.leadingTrivia(text);
    }

    if (token.hasLeadingComment()) {
        result.hasLeadingComment = true;

        TypeScript.Debug.assert(token.hasLeadingTrivia());
        TypeScript.Debug.assert(leadingTrivia.hasComment());
    }

    if (leadingTrivia) {
        if (leadingTrivia.hasNewLine()) {
            result.hasLeadingNewLine = true;
        }

        if (leadingTrivia.hasSkippedToken()) {
            result.hasLeadingSkippedText = true;
        }
    }

    var trailingTrivia: TypeScript.ISyntaxTriviaList = null;
    if (token.hasTrailingTrivia()) {
        result.hasTrailingTrivia = true;
        trailingTrivia = token.trailingTrivia(text);
    }

    if (token.hasTrailingComment()) {
        result.hasTrailingComment = true;

        TypeScript.Debug.assert(token.hasTrailingTrivia());
        TypeScript.Debug.assert(trailingTrivia.hasComment());
    }

    if (trailingTrivia) {
        if (trailingTrivia.hasNewLine()) {
            result.hasTrailingNewLine = true;
        }

        if (trailingTrivia.hasSkippedToken()) {
            result.hasTrailingSkippedText = true;
        }
    }

    if (leadingTrivia) {
        result.leadingTrivia = triviaListToJSON(leadingTrivia, text);
    }

    if (trailingTrivia) {
        result.trailingTrivia = triviaListToJSON(trailingTrivia, text);
    }

    return result;
}

function triviaListToJSON(trivia: TypeScript.ISyntaxTriviaList, text: TypeScript.ISimpleText): any {
    var result: any[] = [];

    for (var i = 0, n = trivia.count(); i < n; i++) {
        result.push(triviaToJSON(trivia.syntaxTriviaAt(i), text));
    }

    return result;
}

function triviaToJSON(trivia: TypeScript.ISyntaxTrivia, text: TypeScript.ISimpleText): any {
    var result: any = {};

    for (var name in TypeScript.SyntaxKind) {
        if (<any>TypeScript.SyntaxKind[name] === trivia.kind()) {
            result.kind = name;
            break;
        }
    }

    if (trivia.isSkippedToken()) {
        result.skippedToken = tokenToJSON(trivia.skippedToken(), text);
    }
    else {
        result.fullStart = trivia.fullStart();
        result.fullEnd = trivia.fullStart() + trivia.fullWidth();
        result.text = trivia.fullText();
    }

    return result;
}

function nodeToJSON(node: TypeScript.ISyntaxNode, text: TypeScript.ISimpleText): any {
    var result: any = {}

    for (var name in TypeScript.SyntaxKind) {
        if (<any>TypeScript.SyntaxKind[name] === node.kind()) {
            result.kind = name;
            break;
        }
    }

    result.fullStart = TypeScript.fullStart(node);
    result.fullEnd = TypeScript.fullEnd(node);

    result.start = TypeScript.start(node);
    result.end = TypeScript.end(node);

    result.fullWidth = TypeScript.fullWidth(node);
    result.width = TypeScript.width(node);

    if (TypeScript.isIncrementallyUnusable(node)) {
        result.isIncrementallyUnusable = true;
    }

    if (TypeScript.parsedInStrictMode(node)) {
        result.parsedInStrictMode = true;
    }

    var thisAsIndexable: TypeScript.IIndexable<any> = <any>node;
    for (var i = 0, n = TypeScript.childCount(node); i < n; i++) {
        var value = TypeScript.childAt(node, i);

        if (value) {
            for (var name in node) {
                if (value === thisAsIndexable[name]) {
                    result[name] = elementToJSON(value, text);
                    break;
                }
            }
        }
    }

    return result;
}

function elementToJSON(element: TypeScript.ISyntaxElement, text: TypeScript.ISimpleText): any {
    if (TypeScript.isToken(element)) {
        return tokenToJSON(<TypeScript.ISyntaxToken>element, text);
    }
    else if (TypeScript.isList(element) || TypeScript.isSeparatedList(element)) {
        var result: any[] = [];

        for (var i = 0, n = TypeScript.childCount(element); i < n; i++) {
            result.push(elementToJSON(TypeScript.childAt(element, i), text));
        }

        return result;
    }
    else {
        return nodeToJSON(<TypeScript.ISyntaxNode>element, text);
    }
}

function syntaxTreeToJSON(tree: TypeScript.SyntaxTree): any {
    var result: any = {};

    result.isDeclaration = tree.isDeclaration();
    result.languageVersion = TypeScript.LanguageVersion[tree.languageVersion()];

    if (tree.diagnostics().length > 0) {
        result.diagnostics = tree.diagnostics();
    }

    result.sourceUnit = elementToJSON(tree.sourceUnit(), tree.text);
    result.lineMap = tree.lineMap();

    return result;
}

function emptySourceUnit(): TypeScript.SourceUnitSyntax {
    return TypeScript.Parser.parse("", TypeScript.SimpleText.fromString(""), TypeScript.LanguageVersion.EcmaScript5, false).sourceUnit();
}

class Program {
    runAllTests(verify: boolean): void {
        TypeScript.Environment.standardOut.WriteLine("");

        //var libdts = TypeScript.Environment.readFile("built\\local\\lib.d.ts", null);

        //TypeScript.Environment.standardOut.WriteLine("size: " + libdts.contents.length);
        //var libsource = ts.createSourceFile("lib.d.ts", libdts.contents);
        //ts.parseSourceFile(libsource);

        //var reps = 10;
        //timer.start();
        //for (var i = 0; i < reps; i++) {
        //    var libsource = ts.createSourceFile("lib.d.ts", libdts.contents);
        //    ts.parseSourceFile(libsource);
        //}
        //timer.end();
        //TypeScript.Environment.standardOut.WriteLine("Anders Parse: " + (timer.time / reps));

        //var txt = TypeScript.SimpleText.fromString(libdts.contents);
        //timer.start();
        //for (var i = 0; i < reps; i++) {
        //    TypeScript.Parser.parse("lib.d.ts.", txt, true, new TypeScript.ParseOptions(TypeScript.LanguageVersion.EcmaScript5, true));
        //}
        //timer.end();
        //TypeScript.Environment.standardOut.WriteLine("Cyrus Parse: " + (timer.time / reps));

        if (generate) {
            TypeScript.Environment.standardOut.WriteLine("!!!!!!!!!! WARNING - GENERATING !!!!!!!!!");
            TypeScript.Environment.standardOut.WriteLine("");
        }

        TypeScript.Environment.standardOut.Write("Testing Incremental 1:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\parser\\ecmascript5",
            fileName => this.runIncremental(fileName, TypeScript.LanguageVersion.EcmaScript5));

        if (specificFile === undefined) {
            TypeScript.Environment.standardOut.WriteLine("Testing Incremental 2.");
            TypeScript.IncrementalParserTests.runAllTests();
        }

        TypeScript.Environment.standardOut.Write("Testing scanner ES3:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\scanner\\ecmascript3",
            fileName => this.runScanner(fileName, TypeScript.LanguageVersion.EcmaScript3, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.Write("Testing scanner ES5:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\scanner\\ecmascript5",
            fileName => this.runScanner(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.Write("Testing findToken:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\findToken\\ecmascript5",
            fileName => this.runFindToken(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.Write("Testing trivia:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\trivia\\ecmascript5",
            fileName => this.runTrivia(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.Write("Testing parser ES5:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\parser\\ecmascript5",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.Write("Testing parser ES3:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\parser\\ecmascript3",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript3, verify, /*generateBaselines:*/ generate));

        TypeScript.Environment.standardOut.Write("Testing emitter 2:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\emitter2\\ecmascript5",
            fileName => this.runEmitter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate, /*justText:*/ true));

        //TypeScript.Environment.standardOut.WriteLine("Testing Monoco.");
        //this.runTests(TypeScript.Environment.currentDirectory() + "c:\\temp\\monoco",
        //    fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, false, /*generateBaselines:*/ generate, /*allowErrors:*/ false));

        TypeScript.Environment.standardOut.Write("Testing emitter 1:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\emitter\\ecmascript5",
            fileName => this.runEmitter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate, /*justText:*/ false));

        TypeScript.Environment.standardOut.Write("Testing pretty printer:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\prettyPrinter\\ecmascript5",
            fileName => this.runPrettyPrinter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        if (specificFile === undefined) {
            this.testIncrementalSpeed(TypeScript.Environment.currentDirectory() + "\\src\\compiler\\syntax\\syntaxNodes.concrete.generated.ts");
        }

        TypeScript.Environment.standardOut.Write("Testing against 262:");
        this.runTests(TypeScript.Environment.currentDirectory() + "\\tests\\Fidelity\\test262",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));
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

        var text = TypeScript.SimpleText.fromString(contents);
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.LanguageVersion.EcmaScript5, TypeScript.isDTSFile(fileName));
        var originalTree = tree;

        var totalIncrementalTime = 0;
        var timer = new TypeScript.Timer();

        for (var i = 0; i < repeat; i++) {
            var changeLength = i * 2;

            timer.start();
            var tree2 = TypeScript.IncrementalParser.parse(tree, new TypeScript.TextChangeRange( new TypeScript.TextSpan(((text.length() / 2) >> 0) - i, changeLength), changeLength), text);
            timer.end();
            totalIncrementalTime += timer.time;

            // we can't check parents here because we are explicitly destroying the original tree 
            // to make the new tree.  Thus, the parents in the first tree won't actually match.
            TypeScript.Debug.assert(TypeScript.treeStructuralEquals(tree, tree2, /*checkParents:*/ false));

            tree = tree2;
        }
        
        var rateBytesPerMillisecond = (contents.length * repeat) / totalIncrementalTime;
        var rateBytesPerSecond = rateBytesPerMillisecond * 1000;
        var rateMBPerSecond = rateBytesPerSecond / (1024 * 1024);

        // TypeScript.Environment.standardOut.WriteLine("Incremental     time: " + totalIncrementalTime);
        TypeScript.Environment.standardOut.WriteLine("Incremental     rate: " + rateMBPerSecond + " MB/s");

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

        var text = TypeScript.SimpleText.fromString(contents);
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.LanguageVersion.EcmaScript5, TypeScript.isDTSFile(fileName));
        var originalTree = tree;

        var totalIncrementalTime = 0;
        var totalIncrementalASTTime = 0;
        var timer = new TypeScript.Timer();

        for (var i = 0; i < repeat; i++) {

            var changeLength = i * 2;
            var changeSpan = new TypeScript.TextSpan(((text.length() / 2) >> 0) - i, changeLength);

            contents = text.substr(0, text.length());
            var contentsToReplace = contents.substr(changeSpan.start(), changeSpan.length());

            var first = true;
            var updatedText = contentsToReplace.replace(/[^a-zA-Z0-9][a-z]+[^a-zA-Z0-9]/, (sub) => {
                if (first && TypeScript.SyntaxFacts.getTokenKind(sub.substr(1, sub.length - 2)) === TypeScript.SyntaxKind.None) {
                    first = false;
                    return sub.substr(0, sub.length - 1) + "a" + sub.substr(sub.length - 1);
                }

                return sub;
            });

            text = TypeScript.SimpleText.fromString(
                contents.substr(0, changeSpan.start()) +
                updatedText +
                contents.substr(changeSpan.end()));
            var changeRange = new TypeScript.TextChangeRange(changeSpan, updatedText.length);

            timer.start();
            var tree2 = TypeScript.IncrementalParser.parse(tree, changeRange, text);
            timer.end();
            totalIncrementalTime += timer.time;

            tree = tree2;
        }

        var rateBytesPerMillisecond = (contents.length * repeat) / totalIncrementalTime;
        var rateBytesPerSecond = rateBytesPerMillisecond * 1000;
        var rateMBPerSecond = rateBytesPerSecond / (1024 * 1024);

        TypeScript.Environment.standardOut.WriteLine("Incremental     rate: " + rateMBPerSecond + " MB/s");

        rateBytesPerMillisecond = (contents.length * repeat) / totalIncrementalASTTime;
        rateBytesPerSecond = rateBytesPerMillisecond * 1000;
        rateMBPerSecond = rateBytesPerSecond / (1024 * 1024);

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

            if (indexNum % 100 === 0) {
                TypeScript.Environment.standardOut.Write(".");
            }

            // TypeScript.Environment.standardOut.WriteLine(fileName);
            try {
                action(fileName);
            }
            catch (e) {
                this.handleException(fileName, e);
            }

            indexNum++;
        });

        TypeScript.Environment.standardOut.WriteLine("");
    }

    private checkResult(fileName: string, result: any, convert: (a: any) => any, verify: boolean, generateBaseline: boolean, justText: boolean): void {
        var actualResult: string;

        var expectedFile = fileName + ".expected";
        var actualFile = fileName + ".actual";

        if (generateBaseline) {
            actualResult = justText ? result : JSON.stringify(convert(result), null, 4);
            expectedFile = fileName + ".expected";

            // TypeScript.Environment.standardOut.WriteLine("Generating baseline for: " + fileName);
            TypeScript.Environment.writeFile(expectedFile, actualResult, /*writeByteOrderMark:*/ false);

            if (TypeScript.Environment.fileExists(actualFile)) {
                TypeScript.Environment.deleteFile(actualFile);
            }
        }
        else if (verify) {
            actualResult = justText ? result : JSON.stringify(convert(result), null, 4);

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
            return;
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

        var text = TypeScript.SimpleText.fromString(contents);

        var tree = TypeScript.Parser.parse(fileName, text, languageVersion, TypeScript.isDTSFile(fileName));
        //var emitted = TypeScript.Emitter1.emit(<TypeScript.SourceUnitSyntax>tree.sourceUnit());

        //var result = justText
        //    ? <any>emitted.fullText()
        //    : { fullText: emitted.fullText().split("\r\n"), sourceUnit: emitted };
        //this.checkResult(fileName, result, verify, generateBaseline, justText);
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

        var text = TypeScript.SimpleText.fromString(contents);

        var tree = TypeScript.Parser.parse(fileName, text, languageVersion, TypeScript.isDTSFile(fileName));
        var result = TypeScript.PrettyPrinter.prettyPrint(tree.sourceUnit());

        this.checkResult(fileName, result, null, verify, generateBaseline, true);

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

        var text = TypeScript.SimpleText.fromString(contents);

        //var andersText = ts.createSourceFile(fileName, contents);
        //timer.start();
        //var andersTree = ts.parseSourceFile(andersText);
        //timer.end();
        //andersTime += timer.time;

        timer.start();
        var tree = TypeScript.Parser.parse(fileName, text, languageVersion, TypeScript.isDTSFile(fileName));
        timer.end();

        cyrusTime += timer.time;

        if (!allowErrors) {
            var diagnostics = tree.diagnostics();
            if (diagnostics.length > 0) {
                TypeScript.Environment.standardOut.WriteLine(fileName);
                TypeScript.Environment.standardOut.WriteLine("\t" + diagnostics[0].message());
            }
        }

        if (verify) {
            TypeScript.Debug.assert(TypeScript.fullWidth(tree.sourceUnit()) === contents.length);
            TypeScript.visitNodeOrToken(new PositionValidatingWalker(), tree.sourceUnit());

            this.checkResult(fileName, tree, syntaxTreeToJSON, verify, generateBaseline, /*justText:*/ false);
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

        var text = TypeScript.SimpleText.fromString(contents);

        var tree1 = TypeScript.Parser.parse(fileName, text, languageVersion, TypeScript.isDTSFile(fileName));
        var tree2 = TypeScript.IncrementalParser.parse(
            new TypeScript.SyntaxTree(/*isConcrete:*/ true, emptySourceUnit(), TypeScript.isDTSFile(fileName), [], fileName, text, tree1.languageVersion()),
            new TypeScript.TextChangeRange(new TypeScript.TextSpan(0, 0), text.length()),
            text);

        TypeScript.Debug.assert(TypeScript.treeStructuralEquals(tree1, tree2, /*checkParents:*/ true));
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

        var text = TypeScript.SimpleText.fromString(contents);
        var tree = TypeScript.Parser.parse(fileName, text, languageVersion, TypeScript.isDTSFile(fileName));
        var sourceUnit = tree.sourceUnit();

        TypeScript.Debug.assert(TypeScript.fullWidth(tree.sourceUnit()) === contents.length);

        var tokens: TypeScript.IIndexable<any>= {};
        var tokensOnLeft: TypeScript.IIndexable<any> = {};
        var leftToRight: TypeScript.ISyntaxToken[] = [];
        var rightToLeft: TypeScript.ISyntaxToken[] = [];

        for (var i = 0; i <= contents.length; i++) {
            var token = TypeScript.findToken(sourceUnit, i);

            var left = TypeScript.Syntax.findTokenOnLeft(sourceUnit, i);
            var tokenOnLeft = left === null ? null : left;

            TypeScript.Debug.assert(TypeScript.isToken(token));
            if (i === contents.length) {
                TypeScript.Debug.assert(token.kind() === TypeScript.SyntaxKind.EndOfFileToken);
            }
            else {
                TypeScript.Debug.assert(TypeScript.width(token) > 0 || token.kind() === TypeScript.SyntaxKind.EndOfFileToken);
                TypeScript.Debug.assert(token.fullWidth() > 0);
            }

            tokens[i] = tokenToJSON(token, text);
            tokensOnLeft[i] = tokenToJSON(tokenOnLeft, text);
        }

        var positionedToken = TypeScript.findToken(sourceUnit, 0);
        while (positionedToken !== null) {
            leftToRight.push(tokenToJSON(positionedToken, text));
            positionedToken = TypeScript.nextToken(positionedToken);
        }

        positionedToken = TypeScript.findToken(sourceUnit, contents.length);
        while (positionedToken !== null) {
            rightToLeft.push(tokenToJSON(positionedToken, text));
            positionedToken = TypeScript.previousToken(positionedToken);
        }

        var result = {
            tokens: tokens,
            tokensOnLeft: tokensOnLeft,
            leftToRight: leftToRight,
            rightToLeft: rightToLeft,
        };

        this.checkResult(fileName, result, a => a, verify, generateBaseline, /*justText:*/ false);
    }

    runTrivia(fileName: string,
        languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts")) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;
        var text = TypeScript.SimpleText.fromString(contents);
        var scanner = TypeScript.Scanner.createScanner(languageVersion, text, () => { });

        var tokens: TypeScript.ISyntaxToken[] = [];
        var textArray: string[] = [];
        var diagnostics: TypeScript.Diagnostic[] = [];

        while (true) {
            var token = scanner.scan(/*allowRegularExpression:*/ false);
            tokens.push(tokenToJSON(token, text));

            if (token.kind() === TypeScript.SyntaxKind.EndOfFileToken) {
                break;
            }
        }

        this.checkResult(fileName, tokens, a => a, verify, generateBaseline, false);
    }

    runScanner(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: boolean, generateBaseline: boolean): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts")) {
            return;
        }

        var contents = TypeScript.Environment.readFile(fileName, /*codepage*/ null).contents;

        var diagnostics: TypeScript.Diagnostic[] = [];
        var reportDiagnostic = (position: number, fullWidth: number, diagnosticKey: string, args: any[]) => {
            diagnostics.push(new TypeScript.Diagnostic(fileName, text.lineMap(), position, fullWidth, diagnosticKey, args));
        };

        var text = TypeScript.SimpleText.fromString(contents);
        var scanner = TypeScript.Scanner.createScanner(languageVersion, text, reportDiagnostic);

        var tokens: TypeScript.ISyntaxToken[] = [];
        var jsonTokens: any[] = [];
        var textArray: string[] = [];
        var position = 0;

        while (true) {
            var token = scanner.scan(/*allowRegularExpression:*/ false);
            jsonTokens.push(tokenToJSON(token, text));
            tokens.push(token);

            TypeScript.Debug.assert(position === token.fullStart());
            position += token.fullWidth();

            if (token.kind() === TypeScript.SyntaxKind.EndOfFileToken) {
                break;
            }
        }

        if (verify) {
            var tokenText = TypeScript.ArrayUtilities.select(tokens, t => t.fullText(text)).join("");

            if (tokenText !== contents) {
                throw new Error("Token invariant broken!");
            }
        }

        var result = diagnostics.length === 0 ? <any>jsonTokens : { diagnostics: diagnostics, tokens: jsonTokens };
        this.checkResult(fileName, result, a => a, verify, generateBaseline, false);
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
                var stringText = TypeScript.SimpleText.fromString(contents);
                var tree = TypeScript.Parser.parse(fileName, stringText, TypeScript.LanguageVersion.EcmaScript5, TypeScript.isDTSFile(fileName));

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

var andersTime = 0;
var cyrusTime = 0;

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
TypeScript.Environment.standardOut.WriteLine("Anders time: " + andersTime);
TypeScript.Environment.standardOut.WriteLine("Cyrus time : " + cyrusTime);
