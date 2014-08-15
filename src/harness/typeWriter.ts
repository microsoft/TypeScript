interface TypeWriterResult {
    line: number;
    column: number;
    syntaxKind: string;
    identifierName: string;
    type: string;
}

class TypeWriterWalker {
    results: TypeWriterResult[];
    currentSourceFile: ts.SourceFile;

    constructor(public checker: ts.TypeChecker) {
    }

    public getTypes(fileName: string): TypeWriterResult[] {
        var sourceFile = this.checker.getProgram().getSourceFile(fileName);
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
            case ts.SyntaxKind.RegularExpressionLiteral:
            case ts.SyntaxKind.ArrayLiteral:
            case ts.SyntaxKind.ObjectLiteral:
            case ts.SyntaxKind.PropertyAccess:
            case ts.SyntaxKind.IndexedAccess:
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression:
            case ts.SyntaxKind.TypeAssertion:
            case ts.SyntaxKind.ParenExpression:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.PrefixOperator:
            case ts.SyntaxKind.PostfixOperator:
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
            case ts.SyntaxKind.LabelledStatement:
                return (<ts.LabelledStatement>parent).label === identifier;
        }
        return false;
    }

    private log(node: ts.Node, type: ts.Type): void {
        var actualPos = ts.skipTrivia(this.currentSourceFile.text, node.pos);
        var lineAndCharacter = this.currentSourceFile.getLineAndCharacterFromPosition(actualPos);
        var name = ts.getSourceTextOfNodeFromSourceText(this.currentSourceFile.text, node);
        var isUnkownType = (<ts.IntrinsicType>type).intrinsicName === "unknown";
        
        this.results.push({
            line: lineAndCharacter.line - 1,
            column: lineAndCharacter.character,
            syntaxKind: ts.SyntaxKind[node.kind],
            identifierName: name,
            type: isUnkownType ? name : this.checker.typeToString(type)
        });
    }

    private getTypeOfNode(node: ts.Node): ts.Type {
        var type = this.checker.getTypeOfNode(node);
        ts.Debug.assert(type, "type doesn't exist");
        return type;
    }
}
