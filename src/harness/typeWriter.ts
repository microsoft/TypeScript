interface TypeWriterResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    type: string;
    symbol: string;
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

    public getTypeAndSymbols(fileName: string): TypeWriterResult[] {
        let sourceFile = this.program.getSourceFile(fileName);
        this.currentSourceFile = sourceFile;
        this.results = [];
        this.visitNode(sourceFile);
        return this.results;
    }

    private visitNode(node: ts.Node): void {
        if (ts.isExpression(node) || node.kind === ts.SyntaxKind.Identifier) {
            this.logTypeAndSymbol(node);
        }

        ts.forEachChild(node, child => this.visitNode(child));
    }

    private logTypeAndSymbol(node: ts.Node): void {
        let actualPos = ts.skipTrivia(this.currentSourceFile.text, node.pos);
        let lineAndCharacter = this.currentSourceFile.getLineAndCharacterOfPosition(actualPos);
        let sourceText = ts.getTextOfNodeFromSourceText(this.currentSourceFile.text, node);

        // Workaround to ensure we output 'C' instead of 'typeof C' for base class expressions
        // let type = this.checker.getTypeAtLocation(node);
        let type = node.parent && ts.isExpressionWithTypeArgumentsInClassExtendsClause(node.parent) && this.checker.getTypeAtLocation(node.parent) || this.checker.getTypeAtLocation(node);

        ts.Debug.assert(type !== undefined, "type doesn't exist");
        let symbol = this.checker.getSymbolAtLocation(node);

        let typeString = this.checker.typeToString(type, node.parent, ts.TypeFormatFlags.NoTruncation);
        let symbolString: string;
        if (symbol) {
            symbolString = "Symbol(" + this.checker.symbolToString(symbol, node.parent);
            if (symbol.declarations) {
                for (let declaration of symbol.declarations) {
                    symbolString += ", ";
                    let declSourceFile = declaration.getSourceFile();
                    let declLineAndCharacter = declSourceFile.getLineAndCharacterOfPosition(declaration.pos);
                    symbolString += `Decl(${ ts.getBaseFileName(declSourceFile.fileName) }, ${ declLineAndCharacter.line }, ${ declLineAndCharacter.character })`;
                }
            }
            symbolString += ")";
        }

        this.results.push({
            line: lineAndCharacter.line,
            syntaxKind: node.kind,
            sourceText: sourceText,
            type: typeString,
            symbol: symbolString
        });
    }
}
