/* @internal */
namespace ts.codeFix {
    registerCodeFix({
        name: "Remove Unused Identifiers",
        errorCodes: ["TS6133"],
        getTextChanges: (sourceFile: SourceFile, start: number, end: number) => {
            const token = getTokenAtPosition(sourceFile, start);
            if (token.kind === ts.SyntaxKind.Identifier) {

                if (token.parent.kind === ts.SyntaxKind.VariableDeclaration) {
                    if (token.parent.parent.parent.kind === SyntaxKind.ForStatement) {
                        var forStatement = <ForStatement>token.parent.parent.parent;
                        var initializer = <VariableDeclarationList>forStatement.initializer;
                        if (initializer.declarations.length === 1) {
                            return [{ newText: "", span: { start: initializer.pos, length: initializer.end - initializer.pos } }];
                        } else {
                            if (initializer.declarations[0] === token.parent) {
                                return [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos + 1 } }];
                            } else {
                                return [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }];
                            }
                        }
                    }
                    else if (token.parent.parent.parent.kind === SyntaxKind.ForInStatement) {
                        var forInStatement = <ForInStatement>token.parent.parent.parent;
                        var initializer = <VariableDeclarationList>forInStatement.initializer;
                        return [{ newText: "{}", span: { start: initializer.declarations[0].pos, length: initializer.declarations[0].end - initializer.declarations[0].pos } }];
                    }
                    else if (token.parent.parent.parent.kind === SyntaxKind.ForOfStatement) {
                        var forOfStatement = <ForOfStatement>token.parent.parent.parent;
                        var initializer = <VariableDeclarationList>forOfStatement.initializer;
                        return [{ newText: "{}", span: { start: initializer.declarations[0].pos, length: initializer.declarations[0].end - initializer.declarations[0].pos } }];
                    }
                    else {
                        var variableStatement = <VariableStatement>token.parent.parent.parent;
                        if (variableStatement.declarationList.declarations.length === 1) {
                            return [{ newText: "", span: { start: variableStatement.pos, length: variableStatement.end - variableStatement.pos } }];
                        } else {
                            var declarations = variableStatement.declarationList.declarations;
                            if (declarations[0].name === token) {
                                return [{ newText: "", span: { start: token.parent.pos + 1, length: token.parent.end - token.parent.pos } }];
                            } else {
                                return [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }];
                            }
                        }
                    }
                }

                if (token.parent.kind === SyntaxKind.FunctionDeclaration  ||
                    token.parent.kind === SyntaxKind.ClassDeclaration     ||
                    token.parent.kind === SyntaxKind.InterfaceDeclaration ||
                    token.parent.kind === SyntaxKind.MethodDeclaration    ||
                    token.parent.kind === SyntaxKind.ModuleDeclaration    ||
                    token.parent.kind === SyntaxKind.ArrowFunction) {
                    return [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos}}];
                }

                if (token.parent.kind === SyntaxKind.TypeParameter) {
                    var typeParameters = (<ClassDeclaration>token.parent.parent).typeParameters;
                    if (typeParameters.length === 1) {
                        return [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 2 } }];
                    } else {
                        if(typeParameters[0] === token.parent) {

                        } else {
                            return [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }];
                        }
                    }
                }

                if (token.parent.kind === ts.SyntaxKind.Parameter) {
                    var functionDeclaration = <FunctionDeclaration>token.parent.parent;
                    if(functionDeclaration.parameters.length === 1) {
                        return [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos} }];
                    } else {
                        if (functionDeclaration.parameters[0] === token.parent) {
                            return [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos + 1 } }];
                        } else {
                            return [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }];
                        }
                    }
                }

                if (token.parent.kind === SyntaxKind.ImportSpecifier) {
                    var namedImports = <NamedImports>token.parent.parent;
                    var elements = namedImports.elements;
                    if (elements.length === 1) {
                        //Only 1 import and it is unused. So the entire line could be removed.
                        return [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }];
                    } else {
                        if (elements[0] === token.parent) {
                            return [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos + 1 } }];
                        } else {
                            return [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }];
                        }
                    }
                }

                if(token.parent.kind === SyntaxKind.ImportClause) {
                    return [{ newText: "{}", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }];
                }

                if(token.parent.kind === SyntaxKind.ImportEqualsDeclaration) {
                    return [{ newText: "{}", span: { start: token.pos, length: token.end - token.pos } }];
                }
            }

            if(token.kind === SyntaxKind.PrivateKeyword && token.parent.kind === SyntaxKind.PropertyDeclaration) {
                return [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos}}];
            }

            if(token.kind === SyntaxKind.AsteriskToken && token.parent.kind === SyntaxKind.NamespaceImport) {
                return [{ newText: "{}", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos } }];
            }

            throw new Error("No Quick Fix found");
        }
    });
}
