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

    constructor(private program: ts.Program) {
        // Consider getting both the diagnostics checker and the non-diagnostics checker to verify 
        // they are consistent.
        this.checker = program.getTypeChecker(/*produceDiagnostics:*/ true);
    }

    public getTypes(fileName: string): TypeWriterResult[] {
        var sourceFile = this.program.getSourceFile(fileName);
        this.currentSourceFile = sourceFile;
        this.results = [];
        this.visitNode(sourceFile);
        return this.results;
    }

    private visitNode(node: ts.Node): void {
        switch (node.kind) {
            // Should always log expressions that are not tokens
            // Also, always log the "this" keyword
            // TODO: Ideally we should log all expressions, but to compare to the
            // old typeWriter baselines, suppress tokens
            case ts.SyntaxKind.ThisKeyword:
            case ts.SyntaxKind.SuperKeyword:
            case ts.SyntaxKind.ArrayLiteralExpression:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ElementAccessExpression:
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression:
            case ts.SyntaxKind.TypeAssertionExpression:
            case ts.SyntaxKind.ParenthesizedExpression:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.TypeOfExpression:
            case ts.SyntaxKind.VoidExpression:
            case ts.SyntaxKind.DeleteExpression:
            case ts.SyntaxKind.PrefixUnaryExpression:
            case ts.SyntaxKind.PostfixUnaryExpression:
            case ts.SyntaxKind.BinaryExpression:
            case ts.SyntaxKind.ConditionalExpression:
                this.log(node, this.getTypeOfNode(node));
                break;

            // Should not change expression status (maybe expressions)
            // TODO: Again, ideally should log number and string literals too,
            // but to be consistent with the old typeWriter, just log identifiers
            case ts.SyntaxKind.Identifier:
                var identifier = <ts.Identifier>node;
                if (!this.isLabel(identifier)) {
                    var type = this.getTypeOfNode(identifier);
                    this.log(node, type);
                }
                break;
        }

        ts.forEachChild(node, child => this.visitNode(child));
    }

    private isLabel(identifier: ts.Identifier): boolean {
        var parent = identifier.parent;
        switch (parent.kind) {
            case ts.SyntaxKind.ContinueStatement:
            case ts.SyntaxKind.BreakStatement:
                return (<ts.BreakOrContinueStatement>parent).label === identifier;
            case ts.SyntaxKind.LabeledStatement:
                return (<ts.LabeledStatement>parent).label === identifier;
        }
        return false;
    }

    private log(node: ts.Node, type: ts.Type): void {
        var actualPos = ts.skipTrivia(this.currentSourceFile.text, node.start);
        var lineAndCharacter = this.currentSourceFile.getLineAndCharacterFromPosition(actualPos);
        var sourceText = ts.getTextOfNodeFromSourceText(this.currentSourceFile.text, node);
        
        // If we got an unknown type, we temporarily want to fall back to just pretending the name
        // (source text) of the node is the type. This is to align with the old typeWriter to make
        // baseline comparisons easier. In the long term, we will want to just call typeToString
        this.results.push({
            line: lineAndCharacter.line - 1,
            column: lineAndCharacter.character,
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
