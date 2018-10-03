interface TypeWriterTypeResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    type: string;
}

interface TypeWriterSymbolResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    symbol: string;
}

interface TypeWriterResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    symbol?: string;
    type?: string;
}

class TypeWriterWalker {
    currentSourceFile: ts.SourceFile;

    private checker: ts.TypeChecker;

    constructor(private program: ts.Program, fullTypeCheck: boolean) {
        // Consider getting both the diagnostics checker and the non-diagnostics checker to verify
        // they are consistent.
        this.checker = fullTypeCheck
            ? program.getDiagnosticsProducingTypeChecker()
            : program.getTypeChecker();
    }

    public *getSymbols(fileName: string): IterableIterator<TypeWriterSymbolResult> {
        const sourceFile = this.program.getSourceFile(fileName);
        this.currentSourceFile = sourceFile;
        const gen = this.visitNode(sourceFile, /*isSymbolWalk*/ true);
        for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
            yield value as TypeWriterSymbolResult;
        }
    }

    public *getTypes(fileName: string): IterableIterator<TypeWriterTypeResult> {
        const sourceFile = this.program.getSourceFile(fileName);
        this.currentSourceFile = sourceFile;
        const gen = this.visitNode(sourceFile, /*isSymbolWalk*/ false);
        for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
            yield value as TypeWriterTypeResult;
        }
    }

    private *visitNode(node: ts.Node, isSymbolWalk: boolean): IterableIterator<TypeWriterResult> {
        if (ts.isExpressionNode(node) || node.kind === ts.SyntaxKind.Identifier || ts.isDeclarationName(node)) {
            const result = this.writeTypeOrSymbol(node, isSymbolWalk);
            if (result) {
                yield result;
            }
        }

        const children: ts.Node[] = [];
        ts.forEachChild(node, child => void children.push(child));
        for (const child of children) {
            const gen = this.visitNode(child, isSymbolWalk);
            for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
                yield value;
            }
        }
    }

    private writeTypeOrSymbol(node: ts.Node, isSymbolWalk: boolean): TypeWriterResult {
        const actualPos = ts.skipTrivia(this.currentSourceFile.text, node.pos);
        const lineAndCharacter = this.currentSourceFile.getLineAndCharacterOfPosition(actualPos);
        const sourceText = ts.getSourceTextOfNodeFromSourceFile(this.currentSourceFile, node);

        if (!isSymbolWalk) {
            // Workaround to ensure we output 'C' instead of 'typeof C' for base class expressions
            // let type = this.checker.getTypeAtLocation(node);
            const type = node.parent && ts.isExpressionWithTypeArgumentsInClassExtendsClause(node.parent) && this.checker.getTypeAtLocation(node.parent) || this.checker.getTypeAtLocation(node);
            const typeString = type ? this.checker.typeToString(type, node.parent, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.AllowUniqueESSymbolType) : "No type information available!";
            return {
                line: lineAndCharacter.line,
                syntaxKind: node.kind,
                sourceText,
                type: typeString
            };
        }
        const symbol = this.checker.getSymbolAtLocation(node);
        if (!symbol) {
            return;
        }
        let symbolString = "Symbol(" + this.checker.symbolToString(symbol, node.parent);
        if (symbol.declarations) {
            let count = 0;
            for (const declaration of symbol.declarations) {
                if (count >= 5) {
                    symbolString += ` ... and ${symbol.declarations.length - count} more`;
                    break;
                }
                count++;
                symbolString += ", ";
                if ((declaration as any).__symbolTestOutputCache) {
                    symbolString += (declaration as any).__symbolTestOutputCache;
                    continue;
                }
                const declSourceFile = declaration.getSourceFile();
                const declLineAndCharacter = declSourceFile.getLineAndCharacterOfPosition(declaration.pos);
                const fileName = ts.getBaseFileName(declSourceFile.fileName);
                const isLibFile = /lib(.*)\.d\.ts/i.test(fileName);
                const declText = `Decl(${ fileName }, ${ isLibFile ? "--" : declLineAndCharacter.line }, ${ isLibFile ? "--" : declLineAndCharacter.character })`;
                symbolString += declText;
                (declaration as any).__symbolTestOutputCache = declText;
            }
        }
        symbolString += ")";
        return {
            line: lineAndCharacter.line,
            syntaxKind: node.kind,
            sourceText,
            symbol: symbolString
        };
    }
}
