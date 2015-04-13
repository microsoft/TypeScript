interface TypeWriterResult {
    line: number;
    column: number;
    syntaxKind: number;
    sourceText: string;
    type: string;
}

class TypeWriterWalker {
    results: TypeWriterResult[];
    currentSourceFile: ts.SourceFile;

    private checker: ts.TypeChecker;

    constructor(private program: ts.Program, fullTypeCheck: boolean) {
        // Consider getting both the diagnostics checker and the non-diagnostics checker to verify 
        // they are consistent.
        this.checker = fullTypeCheck
            ? program.getDiagnosticsProducingTypeChecker()
            : program.getTypeChecker();
    }

    public getTypes(fileName: string): TypeWriterResult[] {
        var sourceFile = this.program.getSourceFile(fileName);
        this.currentSourceFile = sourceFile;
        this.results = [];
        this.visitNode(sourceFile);
        return this.results;
    }

    private visitNode(node: ts.Node): void {
        if (ts.isExpression(node) || node.kind === ts.SyntaxKind.Identifier) {
            this.log(node, this.getTypeOfNode(node));
        }

        ts.forEachChild(node, child => this.visitNode(child));
    }

    private log(node: ts.Node, type: ts.Type): void {
        var actualPos = ts.skipTrivia(this.currentSourceFile.text, node.pos);
        var lineAndCharacter = this.currentSourceFile.getLineAndCharacterOfPosition(actualPos);
        var sourceText = ts.getTextOfNodeFromSourceText(this.currentSourceFile.text, node);
        
        // If we got an unknown type, we temporarily want to fall back to just pretending the name
        // (source text) of the node is the type. This is to align with the old typeWriter to make
        // baseline comparisons easier. In the long term, we will want to just call typeToString
        this.results.push({
            line: lineAndCharacter.line,
            // todo(cyrusn): Not sure why column is one-based for type-writer.  But I'm preserving 
            // that behavior to prevent having a lot of baselines to fix up.
            column: lineAndCharacter.character + 1,
            syntaxKind: node.kind,
            sourceText: sourceText,
            type: this.checker.typeToString(type, node.parent, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.WriteOwnNameForAnyLike)
        });
    }

    private getTypeOfNode(node: ts.Node): ts.Type {
        var type = this.checker.getTypeAtLocation(node);
        ts.Debug.assert(type !== undefined, "type doesn't exist");
        return type;
    }
}
