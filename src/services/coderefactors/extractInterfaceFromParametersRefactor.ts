/* @internal */
namespace ts.codeRefactor {
    registerCodeRefactor({
        name: "Extract Interface from Parameters",
        nodeLabel: ts.SyntaxKind.Parameter,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            for (let i = 0, n = token.parent.getChildCount(); i < n; i++) {
                const child = token.parent.getChildAt(i);
                if (child.kind === SyntaxKind.SyntaxList) {
                    return getExtractInterfaceFromParameterRefactorChanges(child, context);
                }
            }
            Debug.fail("No refactor found.");
        }
    });    

    registerCodeRefactor({
        name: "Extract Interface from Parameters",
        nodeLabel: ts.SyntaxKind.SyntaxList,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            return getExtractInterfaceFromParameterRefactorChanges(token, context);
        }
    });

    function getExtractInterfaceFromParameterRefactorChanges(token: Node, context: CodeFixContext): CodeAction[] {
        if (token.getChildCount() > 0 && isSyntaxListAParameterList(token) && isAValidParent(token) && !(token.getSourceFile().flags & NodeFlags.JavaScriptFile)) {
            let textChanges: TextChange[] = [];
            let fileTextChanges: FileTextChanges[] = [];

            let interfaceName: string = getInterfaceName(token);
            textChanges.push({ newText: "iObj : " + interfaceName, span: { start: token.pos, length: token.end - token.pos } });

            let interfaceInsertionPos: number = getInterfaceInsertionPos(token);
            let interfaceText: string = "";
            interfaceText += getInterfaceBeginning(interfaceName, context.newLineCharacter);
            interfaceText += token.getText().replace(",", ";" + context.newLineCharacter).trim();
            interfaceText += handleSemiColon(interfaceText, context.newLineCharacter);
            interfaceText = getInterfaceEndAndRemoveSpaces(interfaceText, context.newLineCharacter);            
            textChanges.push({ newText: interfaceText, span: { start: interfaceInsertionPos, length: 0 } });

            let parameterNames: string[] = processAndGetParameterReferences(token, context, textChanges);

            fileTextChanges.push({
                fileName: context.sourceFile.fileName,
                textChanges: textChanges
            });

            processCallingLocations(token, fileTextChanges, parameterNames, context);
            
            return [{
                description: getLocaleSpecificMessage(Diagnostics.Extract_Interface_from_Parameters),
                changes: fileTextChanges
            }];
        }
        Debug.fail("No refactor found.");
    }

    function processCallingLocations(token: Node, fileTextChanges: FileTextChanges[], parameterNames: string[], context: CodeFixContext) {
        const program = context.service.getProgram();
        let referenceSymbols: ReferencedSymbol[] = context.service.findReferences(context.sourceFile.fileName, getParentNamePos(token) + 1);
        if (referenceSymbols) {
            for (const symbol of referenceSymbols) {
                for (const reference of symbol.references) {
                    if (!reference.isDefinition) {
                        let fileTextChangesEntry = getOrCreateFileTextChangesEntry(reference, fileTextChanges);
                        let node: Node = getTouchingPropertyName(program.getSourceFile(reference.fileName), reference.textSpan.start);
                        if (node.kind === SyntaxKind.Identifier && node.parent.kind === SyntaxKind.CallExpression) {
                            let callExpression = <CallExpression>node.parent;

                            let expressionText: string = "";
                            expressionText += "{";

                            for (let i = 0; i < callExpression.arguments.length; i++) {
                                expressionText += parameterNames[i];
                                expressionText += " : ";
                                expressionText += callExpression.arguments[i].getText();
                                if (i != callExpression.arguments.length - 1) {
                                    expressionText += ",";
                                }
                            }

                            expressionText += "}";

                            const syntaxList = getChildOfType(callExpression, SyntaxKind.SyntaxList);

                            fileTextChangesEntry.textChanges.push({
                                newText: expressionText,
                                span: {
                                    start: syntaxList.pos,
                                    length: syntaxList.end - syntaxList.pos
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    function getInterfaceInsertionPos(token: Node): number {
        if (token.parent.kind === SyntaxKind.MethodDeclaration) {
            return token.parent.parent.pos;
        }
        else if (token.parent.kind === SyntaxKind.FunctionDeclaration) {
            return token.parent.pos;
        }
        return -1;
    }

    function isAValidParent(token: Node) {
        if (token.parent.kind === SyntaxKind.Constructor || token.parent.kind === SyntaxKind.ArrowFunction) {
            return false;
        }
        return true;
    }

    function getParentNamePos(token: Node): number {
        if (token.parent.kind === SyntaxKind.MethodDeclaration) {
            return (<MethodDeclaration>token.parent).name.pos;
        }
        else if (token.parent.kind === SyntaxKind.FunctionDeclaration) {
            return (<FunctionDeclaration>token.parent).name.pos;
        }
        return -1;
    }

    function processAndGetParameterReferences(token: Node, context: CodeFixContext, textChanges: TextChange[]): string[]  {
        const program = context.service.getProgram();
        let parameterNames: string[] = [];
        for (let i = 0, n = token.getChildCount(); i < n; i++) {
            const child = token.getChildAt(i);
            if (child.kind === SyntaxKind.Parameter) {
                let parameterDeclaration = <ParameterDeclaration>child;
                parameterNames.push(parameterDeclaration.name.getText().trim());
                const referenceSymbols: ReferencedSymbol[] = context.service.findReferences(context.sourceFile.fileName, parameterDeclaration.name.pos + 1);
                if (referenceSymbols) {
                    for (const symbol of referenceSymbols) {
                        for (const reference of symbol.references) {
                            if (!reference.isDefinition) {
                                let node: Node = getTouchingPropertyName(program.getSourceFile(reference.fileName), reference.textSpan.start);
                                textChanges.push({ newText: "iObj.", span: { start: node.getStart(), length: 0 } });
                            }
                        }
                    }
                }
            }
        }
        return parameterNames;
    }

    function isSyntaxListAParameterList(token: Node): boolean {
        for (let i = 0, n = token.getChildCount(); i < n; i++) {
            const child = token.getChildAt(i);
            if (child.kind !== SyntaxKind.Parameter && child.kind !== SyntaxKind.CommaToken) {
                return false;
            }
        }
        return true;
    }

    function getInterfaceName(token: Node): string {
        if (token.parent.kind === SyntaxKind.MethodDeclaration) {
            return "newInterface" + (<MethodDeclaration>token.parent).name.getText();
        }

        if (token.parent.kind === SyntaxKind.FunctionDeclaration) {
            return "newInterface" + (<FunctionDeclaration>token.parent).name.getText();
        }
    }
}
