/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics._0_is_declared_but_never_used.code,
            Diagnostics.Property_0_is_declared_but_never_used.code
        ],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);

            switch (token.kind) {
                case ts.SyntaxKind.Identifier:
                    switch (token.parent.kind) {
                        case ts.SyntaxKind.VariableDeclaration:
                            switch (token.parent.parent.parent.kind) {
                                case SyntaxKind.ForStatement:
                                    const forStatement = <ForStatement>token.parent.parent.parent;
                                    const forInitializer = <VariableDeclarationList>forStatement.initializer;
                                    if (forInitializer.declarations.length === 1) {
                                        return createCodeFix("", forInitializer.pos, forInitializer.end - forInitializer.pos);
                                    }
                                    else {
                                        return removeSingleItem(forInitializer.declarations, token);
                                    }

                                case SyntaxKind.ForOfStatement:
                                    const forOfStatement = <ForOfStatement>token.parent.parent.parent;
                                    if (forOfStatement.initializer.kind === SyntaxKind.VariableDeclarationList) {
                                        const forOfInitializer = <VariableDeclarationList>forOfStatement.initializer;
                                        return createCodeFix("{}", forOfInitializer.declarations[0].pos, forOfInitializer.declarations[0].end - forOfInitializer.declarations[0].pos);
                                    }
                                    break;

                                case SyntaxKind.ForInStatement:
                                    // There is no valid fix in the case of:
                                    //  for .. in
                                    return undefined;

                                case SyntaxKind.CatchClause:
                                    const catchClause = <CatchClause>token.parent.parent;
                                    const parameter = catchClause.variableDeclaration.getChildren()[0];
                                    return createCodeFix("", parameter.pos, parameter.end - parameter.pos);

                                default:
                                    const variableStatement = <VariableStatement>token.parent.parent.parent;
                                    if (variableStatement.declarationList.declarations.length === 1) {
                                        return createCodeFix("", variableStatement.pos, variableStatement.end - variableStatement.pos);
                                    }
                                    else {
                                        const declarations = variableStatement.declarationList.declarations;
                                        return removeSingleItem(declarations, token);
                                    }
                            }

                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.ClassDeclaration:
                        case SyntaxKind.InterfaceDeclaration:
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.ModuleDeclaration:
                        case SyntaxKind.PropertyDeclaration:
                            return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);

                        case SyntaxKind.TypeParameter:
                            const typeParameters = (<DeclarationWithTypeParameters>token.parent.parent).typeParameters;
                            if (typeParameters.length === 1) {
                                return createCodeFix("", token.parent.pos - 1, token.parent.end - token.parent.pos + 2);
                            }
                            else {
                                return removeSingleItem(typeParameters, token);
                            }

                        case ts.SyntaxKind.Parameter:
                            const functionDeclaration = <FunctionDeclaration>token.parent.parent;
                            if (functionDeclaration.parameters.length === 1) {
                                return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);
                            }
                            else {
                                return removeSingleItem(functionDeclaration.parameters, token);
                            }

                        case SyntaxKind.ImportSpecifier:
                            const namedImports = <NamedImports>token.parent.parent;
                            const elements = namedImports.elements;
                            if (elements.length === 1) {
                                // Only 1 import and it is unused. So the entire line could be removed.
                                return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);
                            }
                            else {
                                return removeSingleItem(elements, token);
                            }

                        // handle case where 'import a = A;'
                        case SyntaxKind.ImportEqualsDeclaration:
                            return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);

                        // handle case where 'import d from './file'
                        case SyntaxKind.ImportClause:
                            return createCodeFix("", token.parent.parent.pos, token.parent.parent.end - token.parent.parent.pos);

                        // handle case where 'import * as a from './file'
                        case SyntaxKind.NamespaceImport:
                            return createCodeFix("", token.parent.parent.parent.pos, token.parent.parent.parent.end - token.parent.parent.parent.pos);

                        case SyntaxKind.EnumDeclaration:
                            return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);
                    }
                    break;

                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.PropertyDeclaration:
                    return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);

                case SyntaxKind.AsteriskToken:
                case SyntaxKind.NamespaceImport:
                    return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos);
            }

            return undefined;

            function createCodeFix(newText: string, start: number, length: number): CodeAction[] {
                return [{
                    description: getLocaleSpecificMessage(Diagnostics.Remove_unused_identifiers),
                    changes: [{
                        fileName: sourceFile.fileName,
                        textChanges: [{ newText, span: { start, length } }]
                    }]
                }];
            }

            function removeSingleItem<T extends Node>(elements: NodeArray<T>, token: T): CodeAction[] {
                if (elements[0] === token.parent) {
                    return createCodeFix("", token.parent.pos, token.parent.end - token.parent.pos + 1);
                }
                else {
                    return createCodeFix("", token.parent.pos - 1, token.parent.end - token.parent.pos + 1);
                }
            }
        }
    });
}
