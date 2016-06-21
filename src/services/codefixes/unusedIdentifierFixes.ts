/* @internal */
namespace ts.codeFix {
    registerCodeFix({
        name: "Remove Unused Identifiers",
        errorCodes: ["TS6133"],
        getTextChanges: (sourceFile: SourceFile, start: number, end: number) => {
            const token = getTokenAtPosition(sourceFile, start);
            if (token.kind === ts.SyntaxKind.Identifier) {

                if (token.parent.kind === ts.SyntaxKind.VariableDeclaration) {
                    var variableStatement = <VariableStatement>token.parent.parent.parent;
                    if (variableStatement.declarationList.declarations.length === 1) {
                        return [{ newText: "", span: { start: variableStatement.pos, length: variableStatement.end - variableStatement.pos} }];
                    } else {
                        var declarations = variableStatement.declarationList.declarations;
                        if (declarations[0].name === token) {
                            return [{ newText: "", span: { start: token.parent.pos + 1, length: token.parent.end - token.parent.pos } }];
                        } else {
                            return [{ newText: "", span: { start: token.parent.pos - 1, length: token.parent.end - token.parent.pos + 1 } }];
                        }
                    }
                }

                if (token.parent.kind === SyntaxKind.FunctionDeclaration  ||
                    token.parent.kind === SyntaxKind.ClassDeclaration     ||
                    token.parent.kind === SyntaxKind.InterfaceDeclaration ||
                    token.parent.kind === SyntaxKind.MethodDeclaration    ||
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
            }

            if(token.kind === SyntaxKind.PrivateKeyword && token.parent.kind === SyntaxKind.PropertyDeclaration) {
                return [{ newText: "", span: { start: token.parent.pos, length: token.parent.end - token.parent.pos}}];
            }

            throw new Error("No Quick Fix found");
        }
    });
}
