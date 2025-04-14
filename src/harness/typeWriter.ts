import * as ts from "./_namespaces/ts.js";
import {
    createPrinter,
    createTextWriter,
    memoize,
} from "./_namespaces/ts.js";

export interface TypeWriterTypeResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    type: string;
    underline?: string;
}

export interface TypeWriterSymbolResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    symbol: string;
}

export interface TypeWriterResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    symbol?: string;
    type?: string;
    underline?: string;
}

function* forEachASTNode(node: ts.Node) {
    const work = [node];
    while (work.length) {
        const elem = work.pop()!;
        yield elem;

        const resChildren: ts.Node[] = [];
        // push onto work queue in reverse order to maintain preorder traversal
        ts.forEachChild(elem, c => {
            resChildren.unshift(c);
        });
        work.push(...resChildren);
    }
}

function nodeIsFullySynthetic(node: ts.Node) {
    return ts.nodeIsSynthesized(node) && !ts.getParseTreeNode(node);
}

const createSyntheticNodeUnderliningPrinter = memoize((): { printer: ts.Printer; writer: ts.EmitTextWriter; underliner: ts.EmitTextWriter; reset(): void; } => {
    let underlining = false;
    const printer = createPrinter({ removeComments: true }, {
        onEmitNode: (hint, node, cb) => {
            if (nodeIsFullySynthetic(node) !== underlining) {
                // either node is synthetic and underlining needs to be enabled, or node is not synthetic and
                // underlining needs to be disabled
                underlining = !underlining;
                const result = cb(hint, node);
                underlining = !underlining;
                return result;
            }
            // underlining does not need to change
            return cb(hint, node);
        },
    });
    const baseWriter = createTextWriter("");
    const underliner = createTextWriter("");

    return {
        printer,
        writer: {
            write(s: string): void {
                baseWriter.write(s);
                underliner.write(underlineFor(s));
            },
            writeTrailingSemicolon(text: string): void {
                baseWriter.writeTrailingSemicolon(text);
                underliner.writeTrailingSemicolon(underlineFor(text));
            },
            writeComment(text: string): void {
                baseWriter.writeComment(text);
                underliner.writeComment(underlineFor(text));
            },
            getText(): string {
                return baseWriter.getText();
            },
            rawWrite(s: string): void {
                baseWriter.rawWrite(s);
                underliner.rawWrite(underlineFor(s));
            },
            writeLiteral(s: string): void {
                baseWriter.writeLiteral(s);
                underliner.writeLiteral(underlineFor(s));
            },
            getTextPos(): number {
                return baseWriter.getTextPos();
            },
            getLine(): number {
                return baseWriter.getLine();
            },
            getColumn(): number {
                return baseWriter.getColumn();
            },
            getIndent(): number {
                return baseWriter.getIndent();
            },
            isAtStartOfLine(): boolean {
                return baseWriter.isAtStartOfLine();
            },
            hasTrailingComment(): boolean {
                return baseWriter.hasTrailingComment();
            },
            hasTrailingWhitespace(): boolean {
                return baseWriter.hasTrailingWhitespace();
            },
            writeKeyword(text: string): void {
                baseWriter.writeKeyword(text);
                underliner.writeKeyword(underlineFor(text));
            },
            writeOperator(text: string): void {
                baseWriter.writeOperator(text);
                underliner.writeOperator(underlineFor(text));
            },
            writePunctuation(text: string): void {
                baseWriter.writePunctuation(text);
                underliner.writePunctuation(underlineFor(text));
            },
            writeSpace(text: string): void {
                baseWriter.writeSpace(text);
                underliner.writeSpace(underlineFor(text));
            },
            writeStringLiteral(text: string): void {
                baseWriter.writeStringLiteral(text);
                underliner.writeStringLiteral(underlineFor(text));
            },
            writeParameter(text: string): void {
                baseWriter.writeParameter(text);
                underliner.writeParameter(underlineFor(text));
            },
            writeProperty(text: string): void {
                baseWriter.writeProperty(text);
                underliner.writeProperty(underlineFor(text));
            },
            writeSymbol(text: string, symbol: ts.Symbol): void {
                baseWriter.writeSymbol(text, symbol);
                underliner.writeSymbol(underlineFor(text), symbol);
            },
            writeLine(force?: boolean | undefined): void {
                baseWriter.writeLine(force);
                underliner.writeLine(force);
            },
            increaseIndent(): void {
                baseWriter.increaseIndent();
                underliner.increaseIndent();
            },
            decreaseIndent(): void {
                baseWriter.decreaseIndent();
                underliner.decreaseIndent();
            },
            clear(): void {
                baseWriter.clear();
                underliner.clear();
            },
        },
        underliner,
        reset() {
            underlining = false;
            baseWriter.clear();
            underliner.clear();
        },
    };

    function underlineFor(s: string) {
        return s.length === 0 ? s : (underlining ? "^" : " ").repeat(s.length);
    }
});

export class TypeWriterWalker {
    currentSourceFile!: ts.SourceFile;

    private checker: ts.TypeChecker;

    constructor(private program: ts.Program, private hadErrorBaseline: boolean) {
        // Consider getting both the diagnostics checker and the non-diagnostics checker to verify
        // they are consistent.
        this.checker = program.getTypeChecker();
    }

    public *getSymbols(fileName: string): IterableIterator<TypeWriterSymbolResult> {
        const sourceFile = this.program.getSourceFile(fileName)!;
        this.currentSourceFile = sourceFile;
        const gen = this.visitNode(sourceFile, /*isSymbolWalk*/ true);
        yield* gen as IterableIterator<TypeWriterSymbolResult>;
    }

    public *getTypes(fileName: string): IterableIterator<TypeWriterTypeResult> {
        const sourceFile = this.program.getSourceFile(fileName)!;
        this.currentSourceFile = sourceFile;
        const gen = this.visitNode(sourceFile, /*isSymbolWalk*/ false);
        yield* gen as IterableIterator<TypeWriterTypeResult>;
    }

    private *visitNode(node: ts.Node, isSymbolWalk: boolean): IterableIterator<TypeWriterResult> {
        const gen = forEachASTNode(node);
        for (const node of gen) {
            if (ts.isExpressionNode(node) || node.kind === ts.SyntaxKind.Identifier || ts.isDeclarationName(node)) {
                const result = this.writeTypeOrSymbol(node, isSymbolWalk);
                if (result) {
                    yield result;
                }
            }
        }
    }

    private isImportStatementName(node: ts.Node) {
        if (ts.isImportSpecifier(node.parent) && (node.parent.name === node || node.parent.propertyName === node)) return true;
        if (ts.isImportClause(node.parent) && node.parent.name === node) return true;
        if (ts.isImportEqualsDeclaration(node.parent) && node.parent.name === node) return true;
        return false;
    }

    private isExportStatementName(node: ts.Node) {
        if (ts.isExportAssignment(node.parent) && node.parent.expression === node) return true;
        if (ts.isExportSpecifier(node.parent) && (node.parent.name === node || node.parent.propertyName === node)) return true;
        return false;
    }

    private isIntrinsicJsxTag(node: ts.Node) {
        const p = node.parent;
        if (!(ts.isJsxOpeningElement(p) || ts.isJsxClosingElement(p) || ts.isJsxSelfClosingElement(p))) return false;
        if (p.tagName !== node) return false;
        return ts.isIntrinsicJsxName(node.getText());
    }

    private writeTypeOrSymbol(node: ts.Node, isSymbolWalk: boolean): TypeWriterResult | undefined {
        const actualPos = ts.skipTrivia(this.currentSourceFile.text, node.pos);
        const lineAndCharacter = this.currentSourceFile.getLineAndCharacterOfPosition(actualPos);
        const sourceText = ts.getSourceTextOfNodeFromSourceFile(this.currentSourceFile, node);

        if (!isSymbolWalk) {
            // Don't try to get the type of something that's already a type.
            // Exception for `T` in `type T = something` because that may evaluate to some interesting type.
            if (ts.isPartOfTypeNode(node) || ts.isIdentifier(node) && !(ts.getMeaningFromDeclaration(node.parent) & ts.SemanticMeaning.Value) && !(ts.isTypeAliasDeclaration(node.parent) && node.parent.name === node)) {
                return undefined;
            }

            // Workaround to ensure we output 'C' instead of 'typeof C' for base class expressions
            // let type = this.checker.getTypeAtLocation(node);
            let type = ts.isExpressionWithTypeArgumentsInClassExtendsClause(node.parent) ? this.checker.getTypeAtLocation(node.parent) : undefined;
            if (!type || type.flags & ts.TypeFlags.Any) type = this.checker.getTypeAtLocation(node);
            // Distinguish `errorType`s from `any`s; but only if the file has no errors.
            // Additionally,
            // * the LHS of a qualified name
            // * a binding pattern name
            // * labels
            // * the "global" in "declare global"
            // * the "target" in "new.target"
            // * names in import statements
            // * type-only names in export statements
            // * and intrinsic jsx tag names
            // return `error`s via `getTypeAtLocation`
            // But this is generally expected, so we don't call those out, either
            let typeString: string;
            let underline: string | undefined;
            if (
                !this.hadErrorBaseline &&
                type.flags & ts.TypeFlags.Any &&
                !ts.isBindingElement(node.parent) &&
                !ts.isPropertyAccessOrQualifiedName(node.parent) &&
                !ts.isLabelName(node) &&
                !(ts.isModuleDeclaration(node.parent) && ts.isGlobalScopeAugmentation(node.parent)) &&
                !ts.isMetaProperty(node.parent) &&
                !this.isImportStatementName(node) &&
                !this.isExportStatementName(node) &&
                !this.isIntrinsicJsxTag(node)
            ) {
                typeString = (type as ts.IntrinsicType).intrinsicName;
            }
            else {
                const typeFormatFlags = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.AllowUniqueESSymbolType | ts.TypeFormatFlags.GenerateNamesForShadowedTypeParams;
                let typeNode = this.checker.typeToTypeNode(type, node.parent, (typeFormatFlags & ts.TypeFormatFlags.NodeBuilderFlagsMask) | ts.NodeBuilderFlags.IgnoreErrors, ts.InternalNodeBuilderFlags.AllowUnresolvedNames)!;
                if (ts.isIdentifier(node) && ts.isTypeAliasDeclaration(node.parent) && node.parent.name === node && ts.isIdentifier(typeNode) && ts.idText(typeNode) === ts.idText(node)) {
                    // for a complex type alias `type T = ...`, showing "T : T" isn't very helpful for type tests. When the type produced is the same as
                    // the name of the type alias, recreate the type string without reusing the alias name
                    typeNode = this.checker.typeToTypeNode(type, node.parent, ((typeFormatFlags | ts.TypeFormatFlags.InTypeAlias) & ts.TypeFormatFlags.NodeBuilderFlagsMask) | ts.NodeBuilderFlags.IgnoreErrors)!;
                }

                const { printer, writer, underliner, reset } = createSyntheticNodeUnderliningPrinter();
                printer.writeNode(ts.EmitHint.Unspecified, typeNode, this.currentSourceFile, writer);
                typeString = writer.getText();
                underline = underliner.getText();
                reset();
            }
            return {
                line: lineAndCharacter.line,
                syntaxKind: node.kind,
                sourceText,
                type: typeString,
                underline,
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
                const isLibFile = /lib.*\.d\.ts/i.test(fileName);
                const declText = `Decl(${fileName}, ${isLibFile ? "--" : declLineAndCharacter.line}, ${isLibFile ? "--" : declLineAndCharacter.character})`;
                symbolString += declText;
                (declaration as any).__symbolTestOutputCache = declText;
            }
        }
        symbolString += ")";
        return {
            line: lineAndCharacter.line,
            syntaxKind: node.kind,
            sourceText,
            symbol: symbolString,
        };
    }
}
