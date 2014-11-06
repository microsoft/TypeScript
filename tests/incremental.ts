/// <reference path="..\src\compiler\types.ts" />
/// <reference path="..\src\compiler\parser.ts" />
/// <reference path="..\src\compiler\checker.ts" />
/// <reference path="..\src\services\services.ts" />
/// <reference path="..\src\services\compiler\precompile.ts" />
/// <reference path="..\src\services\syntax\incrementalParser.ts" />
/// <reference path="..\src\compiler\sys.ts" />

function prepareTestRunner(text: string, writeOutput: (s: string) => void): () => void {
    var start = new Date().getTime();
    var oldSyntaxTree = TypeScript.Parser.parse("file.ts", TypeScript.SimpleText.fromString(text), ts.ScriptTarget.ES5, /*isDeclaration*/ false);
    writeOutput("initial:" + (new Date().getTime() - start) + "\r\n");

    var insertIndex = text.indexOf("/**  */") + "/** ".length;

    return run;

    function run(): void {
        var incrementalTotal = 0;
        var oldParseTotal = 0;
        var newParseTotal = 0;
        for (var i = 0; i < 10; i++) {
            var textChangeRange = new TypeScript.TextChangeRange(new TypeScript.TextSpan(insertIndex, 0), 1);
            var newText = text.substring(0, insertIndex) + " " + text.substring(insertIndex);

            var start = new Date().getTime();
            ts.createSourceFile("x", newText, ts.ScriptTarget.ES6, "0");
            newParseTotal += (new Date().getTime() - start);

            var simpleText = TypeScript.SimpleText.fromString(newText);
            simpleText.lineMap().lineStarts();

            var start = new Date().getTime();
            TypeScript.Parser.parse("x", simpleText, ts.ScriptTarget.ES6, false);
            oldParseTotal += (new Date().getTime() - start);

            var start = new Date().getTime();
            var newSyntaxTree = TypeScript.IncrementalParser.parse(oldSyntaxTree, textChangeRange, simpleText);
            incrementalTotal += (new Date().getTime() - start);

            //var start = new Date().getTime();
            //ts.createSourceFile("checker.ts", newText, ts.ScriptTarget.ES5, "0", true);
            //writeOutput("full: " + (new Date().getTime() - start) + "\r\n");

            text = newText;
            oldSyntaxTree = newSyntaxTree;
        }
        writeOutput("old parse  : " + oldParseTotal + "\r\n");
        writeOutput("new parse  : " + newParseTotal + "\r\n");
        writeOutput("incremental: " + incrementalTotal + "\r\n");
    }
}

if (sys && sys.args.length) {
    var file = sys.readFile(sys.args[0]);
    var json = JSON.stringify({ text: file });
    sys.writeFile(ts.combinePaths(sys.getCurrentDirectory(), "file.ts.js"), "var text = " + json);
}