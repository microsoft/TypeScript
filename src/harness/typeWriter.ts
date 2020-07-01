import { Node, SourceFile, TypeChecker, Program, SyntaxKind, TypeFlags, IntrinsicType, TypeFormatFlags } from "../compiler/types";
import { forEachChild } from "../compiler/parser";
import { isExpressionNode, isDeclarationName, isIntrinsicJsxName, getSourceTextOfNodeFromSourceFile, isPartOfTypeNode, isExpressionWithTypeArgumentsInClassExtendsClause, isGlobalScopeAugmentation } from "../compiler/utilities";
import { isImportSpecifier, isImportClause, isImportEqualsDeclaration, isExportAssignment, isExportSpecifier, isJsxOpeningElement, isJsxClosingElement, isJsxSelfClosingElement, isIdentifier, isTypeAliasDeclaration, isBindingElement, isPropertyAccessOrQualifiedName, isModuleDeclaration, isMetaProperty } from "../../built/local/compiler";
import { skipTrivia } from "../compiler/scanner";
import { getMeaningFromDeclaration, SemanticMeaning, isLabelName } from "../services/utilities";
import { getBaseFileName } from "../compiler/path";

    export interface TypeWriterTypeResult {
        line: number;
        syntaxKind: number;
        sourceText: string;
        type: string;
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
    }

    function* forEachASTNode(node: Node) {
        const work = [node];
        while (work.length) {
            const elem = work.pop()!;
            yield elem;

            const resChildren: Node[] = [];
            // push onto work queue in reverse order to maintain preorder traversal
            forEachChild(elem, c => { resChildren.unshift(c); });
            work.push(...resChildren);
        }
    }

    export class TypeWriterWalker {
        currentSourceFile!: SourceFile;

        private checker: TypeChecker;

        constructor(private program: Program, fullTypeCheck: boolean, private hadErrorBaseline: boolean) {
            // Consider getting both the diagnostics checker and the non-diagnostics checker to verify
            // they are consistent.
            this.checker = fullTypeCheck
                ? program.getDiagnosticsProducingTypeChecker()
                : program.getTypeChecker();
        }

        public *getSymbols(fileName: string): IterableIterator<TypeWriterSymbolResult> {
            const sourceFile = this.program.getSourceFile(fileName)!;
            this.currentSourceFile = sourceFile;
            const gen = this.visitNode(sourceFile, /*isSymbolWalk*/ true);
            for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
                yield value as TypeWriterSymbolResult;
            }
        }

        public *getTypes(fileName: string): IterableIterator<TypeWriterTypeResult> {
            const sourceFile = this.program.getSourceFile(fileName)!;
            this.currentSourceFile = sourceFile;
            const gen = this.visitNode(sourceFile, /*isSymbolWalk*/ false);
            for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
                yield value as TypeWriterTypeResult;
            }
        }

        private *visitNode(node: Node, isSymbolWalk: boolean): IterableIterator<TypeWriterResult> {
            const gen = forEachASTNode(node);
            let res = gen.next();
            for (; !res.done; res = gen.next()) {
                const {value: node} = res;
                if (isExpressionNode(node) || node.kind === SyntaxKind.Identifier || isDeclarationName(node)) {
                    const result = this.writeTypeOrSymbol(node, isSymbolWalk);
                    if (result) {
                        yield result;
                    }
                }
            }
        }

        private isImportStatementName(node: Node) {
            if (isImportSpecifier(node.parent) && (node.parent.name === node || node.parent.propertyName === node)) return true;
            if (isImportClause(node.parent) && node.parent.name === node) return true;
            if (isImportEqualsDeclaration(node.parent) && node.parent.name === node) return true;
            return false;
        }

        private isExportStatementName(node: Node) {
            if (isExportAssignment(node.parent) && node.parent.expression === node) return true;
            if (isExportSpecifier(node.parent) && (node.parent.name === node || node.parent.propertyName === node)) return true;
            return false;
        }

        private isIntrinsicJsxTag(node: Node) {
            const p = node.parent;
            if (!(isJsxOpeningElement(p) || isJsxClosingElement(p) || isJsxSelfClosingElement(p))) return false;
            if (p.tagName !== node) return false;
            return isIntrinsicJsxName(node.getText());
        }

        private writeTypeOrSymbol(node: Node, isSymbolWalk: boolean): TypeWriterResult | undefined {
            const actualPos = skipTrivia(this.currentSourceFile.text, node.pos);
            const lineAndCharacter = this.currentSourceFile.getLineAndCharacterOfPosition(actualPos);
            const sourceText = getSourceTextOfNodeFromSourceFile(this.currentSourceFile, node);

            if (!isSymbolWalk) {
                // Don't try to get the type of something that's already a type.
                // Exception for `T` in `type T = something` because that may evaluate to some interesting type.
                if (isPartOfTypeNode(node) || isIdentifier(node) && !(getMeaningFromDeclaration(node.parent) & SemanticMeaning.Value) && !(isTypeAliasDeclaration(node.parent) && node.parent.name === node)) {
                    return undefined;
                }

                // Workaround to ensure we output 'C' instead of 'typeof C' for base class expressions
                // let type = this.checker.getTypeAtLocation(node);
                let type = isExpressionWithTypeArgumentsInClassExtendsClause(node.parent) ? this.checker.getTypeAtLocation(node.parent) : undefined;
                if (!type || type.flags & TypeFlags.Any) type = this.checker.getTypeAtLocation(node);
                const typeString =
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
                    (!this.hadErrorBaseline &&
                        type.flags & TypeFlags.Any &&
                        !isBindingElement(node.parent) &&
                        !isPropertyAccessOrQualifiedName(node.parent) &&
                        !isLabelName(node) &&
                        !(isModuleDeclaration(node.parent) && isGlobalScopeAugmentation(node.parent)) &&
                        !isMetaProperty(node.parent) &&
                        !this.isImportStatementName(node) &&
                        !this.isExportStatementName(node) &&
                        !this.isIntrinsicJsxTag(node)) ?
                        (type as IntrinsicType).intrinsicName :
                        this.checker.typeToString(type, node.parent, TypeFormatFlags.NoTruncation | TypeFormatFlags.AllowUniqueESSymbolType);
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
                    const fileName = getBaseFileName(declSourceFile.fileName);
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

