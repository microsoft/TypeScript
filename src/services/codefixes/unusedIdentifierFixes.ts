/* @internal */
namespace ts.codeFix {
    registerCodeFix({
        name: "Remove Unused Identifiers",
        errorCodes: ["TS6133"],
        getTextChanges: (context: CodeActionContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            if (token.kind === ts.SyntaxKind.Identifier) {

                if (token.parent.kind === ts.SyntaxKind.VariableDeclaration) {
                    if (token.parent.parent.parent.kind === SyntaxKind.ForStatement) {
                        const forStatement = <ForStatement>token.parent.parent.parent;
                        const initializer = <VariableDeclarationList>forStatement.initializer;
                        if (initializer.declarations.length === 1) {
                            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: initializer.pos, length: initializer.end - initializer.pos } }] }];
                        }
                        else {
                            if (initializer.declarations[0] === token.parent) {
                                return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos + 1 } }] }];
                            }
                            else {
                                return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }] }];
                            }
                        }
                    }
                    else if (token.parent.parent.parent.kind === SyntaxKind.ForInStatement) {
                        const forInStatement = <ForInStatement>token.parent.parent.parent;
                        const initializer = <VariableDeclarationList>forInStatement.initializer;
                        return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "{}", span: { start: initializer.declarations[0].pos, length: initializer.declarations[0].end - initializer.declarations[0].pos } }] }];
                    }
                    else if (token.parent.parent.parent.kind === SyntaxKind.ForOfStatement) {
                        const forOfStatement = <ForOfStatement>token.parent.parent.parent;
                        const initializer = <VariableDeclarationList>forOfStatement.initializer;
                        return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "{}", span: { start: initializer.declarations[0].pos, length: initializer.declarations[0].end - initializer.declarations[0].pos } }] }];
                    }
                    else if (token.parent.parent.kind === SyntaxKind.CatchClause) {
                        const catchClause = <CatchClause>token.parent.parent;
                        const parameter = catchClause.variableDeclaration.getChildren()[0];
                        return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: parameter.pos, length: parameter.end - parameter.pos } }] }];
                    }
                    else {
                        const variableStatement = <VariableStatement>token.parent.parent.parent;
                        if (variableStatement.declarationList.declarations.length === 1) {
                            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: variableStatement.pos, length: variableStatement.end - variableStatement.pos } }] }];
                        }
                        else {
                            const declarations = variableStatement.declarationList.declarations;
                            if (declarations[0].name === token) {
                                return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos + 1, length: token.parent.end - token.parent.pos } }] }];
                            }
                            else {
                                return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }] }];
                            }
                        }
                    }
                }

                if (token.parent.kind === SyntaxKind.FunctionDeclaration ||
                    token.parent.kind === SyntaxKind.ClassDeclaration ||
                    token.parent.kind === SyntaxKind.InterfaceDeclaration ||
                    token.parent.kind === SyntaxKind.MethodDeclaration ||
                    token.parent.kind === SyntaxKind.ModuleDeclaration ||
                    token.parent.kind === SyntaxKind.PropertyDeclaration ||
                    token.parent.kind === SyntaxKind.ArrowFunction) {
                    return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }] }];
                }

                if (token.parent.kind === SyntaxKind.TypeParameter) {
                    const typeParameters = (<ClassDeclaration>token.parent.parent).typeParameters;
                    if (typeParameters.length === 1) {
                        return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 2 } }] }];
                    }
                    else {
                        if (typeParameters[0] === token.parent) {
                            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos + 1 } }] }];
                        }
                        else {
                            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }] }];
                        }
                    }
                }

                if (token.parent.kind === ts.SyntaxKind.Parameter) {
                    const functionDeclaration = <FunctionDeclaration>token.parent.parent;
                    if (functionDeclaration.parameters.length === 1) {
                        return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }] }];
                    }
                    else {
                        if (functionDeclaration.parameters[0] === token.parent) {
                            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos + 1 } }] }];
                        }
                        else {
                            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }] }];
                        }
                    }
                }

                if (token.parent.kind === SyntaxKind.ImportSpecifier) {
                    const namedImports = <NamedImports>token.parent.parent;
                    const elements = namedImports.elements;
                    if (elements.length === 1) {
                        // Only 1 import and it is unused. So the entire line could be removed.
                        return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }] }];
                    }
                    else {
                        if (elements[0] === token.parent) {
                            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos + 1 } }] }];
                        }
                        else {
                            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }] }];
                        }
                    }
                }

                if (token.parent.parent.kind === SyntaxKind.ImportClause || token.parent.parent.kind === SyntaxKind.ImportDeclaration) {
                    return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "{}", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }] }];
                }

                if (token.parent.kind === SyntaxKind.ImportEqualsDeclaration) {
                    return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "{}", span: { start: token.pos, length: token.end - token.pos } }] }];
                }

                if (token.parent.kind === SyntaxKind.EnumDeclaration) {
                    return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }] }];
                }
            }

            if (token.kind === SyntaxKind.PrivateKeyword && token.parent.kind === SyntaxKind.PropertyDeclaration) {
                return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }] }];
            }

            if (token.kind === SyntaxKind.AsteriskToken && token.parent.kind === SyntaxKind.NamespaceImport) {
                return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "{}", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }] }];
            }

            Debug.fail("No Quick fix found.");
        }
    });
}
