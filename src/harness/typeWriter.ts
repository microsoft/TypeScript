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
        if (node.kind === ts.SyntaxKind.Identifier) {
            var identifier = <ts.Identifier>node;
            if (!this.isLabel(identifier)) {
                var type = this.getTypeOfIdentifier(identifier);
                this.log(node, type);
            }
        }
        else if (node.kind === ts.SyntaxKind.ThisKeyword) {
            this.log(node, undefined);
        }
        else {
            ts.forEachChild(node, child => this.visitNode(child));
        }
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
        
        this.results.push({
            line: lineAndCharacter.line - 1,
            column: lineAndCharacter.character,
            syntaxKind: ts.SyntaxKind[node.kind],
            identifierName: name,
            type: this.checker.typeToString(type)
        });
    }

    private getTypeOfIdentifier(node: ts.Identifier): ts.Type {
        var identifierSymbol = this.checker.getSymbolInfo(node);
        ts.Debug.assert(identifierSymbol, "symbol doesn't exist");
        var type = this.checker.getTypeOfSymbol(identifierSymbol);
        ts.Debug.assert(type, "type doesn't exist");
        return type;
    }
}
