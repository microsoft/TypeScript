///<reference path='..\..\..\src\compiler\typescript.ts'/>
///<reference path='..\..\..\src\compiler\Syntax\Parser.ts'/>
///<reference path='..\..\..\src\services\pullLanguageService.ts'/>
///<reference path='.\quotedLib.ts'/>
///<reference path='.\quotedCompiler.ts'/>

class DiagnosticsLogger implements TypeScript.ILogger {

    public information(): boolean { return false; }
    public debug(): boolean { return false; }
    public warning(): boolean { return false; }
    public error(): boolean { return false; }
    public fatal(): boolean { return false; }
    public log(s: string): void {
        console.log(s);
    }
}

var libraryFileName = "lib.d.ts";
var compilerFileName = "compiler.ts";

class BatchCompiler {
    public compiler: TypeScript.TypeScriptCompiler;
    private simpleText = TypeScript.SimpleText.fromString(compilerString);
    private libScriptSnapshot = TypeScript.ScriptSnapshot.fromString(libString);
    private compilerScriptSnapshot = TypeScript.ScriptSnapshot.fromString(compilerString);

    public compile() {
        var settings = new TypeScript.CompilationSettings();
        settings.generateDeclarationFiles = true;
        settings.outFileOption = "Output.ts";

        this.compiler = new TypeScript.TypeScriptCompiler(new DiagnosticsLogger(),
            TypeScript.ImmutableCompilationSettings.fromCompilationSettings(settings));

        this.compiler.addFile("lib.d.ts", this.libScriptSnapshot, TypeScript.ByteOrderMark.None, 0, false, []);
        this.compiler.addFile("compiler.ts", this.compilerScriptSnapshot, TypeScript.ByteOrderMark.None, 0, false, []);

        this.compiler.getSyntacticDiagnostics("lib.d.ts");
        this.compiler.getSyntacticDiagnostics("compiler.ts");
        this.compiler.getSemanticDiagnostics("compiler.ts");
    }

    public newParse(): TypeScript.SyntaxTree {
        return TypeScript.Parser.parse(compilerFileName, this.simpleText, false,
            TypeScript.getParseOptions(TypeScript.ImmutableCompilationSettings.defaultSettings()));
    }

    public newIncrementalParse(tree: TypeScript.SyntaxTree): TypeScript.SyntaxTree {
        var width = 100;
        var span = new TypeScript.TextSpan(TypeScript.IntegerUtilities.integerDivide(compilerString.length - width, 2), width);
        var range = new TypeScript.TextChangeRange(span, width);
        return TypeScript.Parser.incrementalParse(tree, range, this.simpleText);
    }
}

function compile() {
    var batch = new BatchCompiler();
    batch.compile();
}

// for (var i = 0; i < 2; i++) {
//    var tree = batch.newParse();
//    TypeScript.SyntaxTreeToAstVisitor.visit(tree.sourceUnit(), "", 0);
// }