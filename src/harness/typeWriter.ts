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
        const sourceFile = this.program.getSourceFile(fileName);
        this.currentSourceFile = sourceFile;
        this.results = [];
        this.visitNode(sourceFile);
        return this.results;
    }

    private visitNode(node: ts.Node): void {
        if (ts.isPartOfExpression(node) || node.kind === ts.SyntaxKind.Identifier) {
            this.logTypeAndSymbol(node);
        }

        ts.forEachChild(node, child => this.visitNode(child));
    }

    private logTypeAndSymbol(node: ts.Node): void {
        const actualPos = ts.skipTrivia(this.currentSourceFile.text, node.pos);
        const lineAndCharacter = this.currentSourceFile.getLineAndCharacterOfPosition(actualPos);
        const sourceText = ts.getTextOfNodeFromSourceText(this.currentSourceFile.text, node);

        // Workaround to ensure we output 'C' instead of 'typeof C' for base class expressions
        // let type = this.checker.getTypeAtLocation(node);
        const type = node.parent && ts.isExpressionWithTypeArgumentsInClassExtendsClause(node.parent) && this.checker.getTypeAtLocation(node.parent) || this.checker.getTypeAtLocation(node);

        ts.Debug.assert(type !== undefined, "type doesn't exist");
        const symbol = this.checker.getSymbolAtLocation(node);

        const typeString = this.checker.typeToString(type, node.parent, ts.TypeFormatFlags.NoTruncation);
        let symbolString: string;
        if (symbol) {
            symbolString = "Symbol(" + this.checker.symbolToString(symbol, node.parent);
            if (symbol.declarations) {
                for (const declaration of symbol.declarations) {
                    symbolString += ", ";
                    const declSourceFile = declaration.getSourceFile();
                    const declLineAndCharacter = declSourceFile.getLineAndCharacterOfPosition(declaration.pos);
                    const fileName = ts.getBaseFileName(declSourceFile.fileName);
                    const isLibFile = /lib(.*)\.d\.ts/i.test(fileName);
                    symbolString += `Decl(${ fileName }, ${ isLibFile ? "--" : declLineAndCharacter.line }, ${ isLibFile ? "--" : declLineAndCharacter.character })`;
                }
            }
            symbolString += ")";
        }

        this.results.push({
            line: lineAndCharacter.line,
            syntaxKind: node.kind,
            sourceText,
            type: typeString,
            symbol: symbolString
        });
    }
}