/* @internal */
namespace ts.coderefactoring {
    registerCodeRefactoring({
        getCodeActions: (context: CodeRefactoringContext): CodeAction[] => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const variableDeclaration = <VariableDeclaration>getTokenAtPosition(sourceFile, start);

            if (isValidDeclarationForInlineTempRefactor(variableDeclaration)) {
                const fileTextChanges: FileTextChanges[] = [];
                const namePos: number = variableDeclaration.name.pos;
                let variableInitializerText: string = variableDeclaration.initializer.getText();
                const program = context.program;
                const referenceSymbols: ReferencedSymbol[] = context.languageService.findReferences(context.sourceFile.fileName, namePos + 1);

                if (referenceSymbols) {
                    for (const symbol of referenceSymbols) {
                        for (const reference of symbol.references) {
                            if (!reference.isDefinition) {
                                const fileTextChangesEntry = getOrCreateFileTextChangesEntry(reference, fileTextChanges);
                                const node: Node = getTouchingPropertyName(program.getSourceFile(reference.fileName), reference.textSpan.start);

                                if (node.kind === SyntaxKind.Identifier) {
                                    if (node.parent.kind === SyntaxKind.BinaryExpression) {
                                        const binaryExpression: BinaryExpression = <BinaryExpression>node.parent;
                                        if (isNodeOnLeft(node, binaryExpression)) {
                                            variableInitializerText = binaryExpression.right.getText();
                                            handleBinaryExpression(binaryExpression, fileTextChangesEntry);
                                        }
                                        else {
                                            fileTextChangesEntry.textChanges.push({
                                                newText: "(" + variableInitializerText + ")",
                                                span: {
                                                    start: node.pos,
                                                    length: node.end - node.pos
                                                }
                                            });
                                        }
                                    }
                                    else if (node.parent.kind === SyntaxKind.PropertyAccessExpression || node.parent.kind === SyntaxKind.CallExpression || node.parent.kind === SyntaxKind.VariableDeclaration) {
                                        fileTextChangesEntry.textChanges.push({
                                            newText: "(" + variableInitializerText + ")",
                                            span: {
                                                start: node.pos,
                                                length: node.end - node.pos
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }

                if (variableDeclaration.parent.kind === SyntaxKind.VariableDeclarationList) {
                    const variableDeclarationList: VariableDeclarationList = <VariableDeclarationList>variableDeclaration.parent;
                    const fileTextChangesEntry = getOrCreateFileTextChangesEntryFileName(context.sourceFile.fileName, fileTextChanges);
                    let startPos: number = -1;
                    let length: number = -1;

                    if (variableDeclarationList.declarations.length === 1) {
                        // There is only declaration. The whole list could be removed.
                        startPos = variableDeclarationList.parent.pos;
                        length = variableDeclarationList.parent.end - variableDeclarationList.parent.pos;
                    }
                    else {
                        if (variableDeclarationList.declarations[0] === variableDeclaration) {
                            // It is the first declaration. So, the following comma also must be removed
                            startPos = variableDeclaration.pos;
                            length = variableDeclaration.end - variableDeclaration.pos + 1;
                        }
                        else {
                            startPos = variableDeclaration.pos - 1;
                            length = variableDeclaration.end - variableDeclaration.pos + 1;
                        }
                    }

                    fileTextChangesEntry.textChanges.push({
                        newText: "",
                        span: {
                            start: startPos,
                            length: length
                        }
                    });
                }

                return [{
                    description: getLocaleSpecificMessage(Diagnostics.Inline_temporary_variable),
                    changes: fileTextChanges
                }];
            }
        }
    });

    function handleBinaryExpression(binaryExpression: BinaryExpression, fileTextChangesEntry: FileTextChanges) {
        let startPos: number = -1, length: number = -1;

        if (binaryExpression.parent.kind === SyntaxKind.ExpressionStatement) {
            startPos = binaryExpression.parent.pos;
            length = binaryExpression.parent.end - binaryExpression.parent.pos;
        }
        else if (binaryExpression.parent.kind === SyntaxKind.BinaryExpression) {
            const parentBinaryExpression: BinaryExpression = <BinaryExpression>binaryExpression.parent;
            if (parentBinaryExpression.left === binaryExpression) {
                startPos = binaryExpression.pos;
                length = binaryExpression.end - binaryExpression.pos + 1;
            }
            else {
                startPos = binaryExpression.pos - 1;
                length = binaryExpression.end - binaryExpression.pos + 1;
            }
        }

        fileTextChangesEntry.textChanges.push({
            newText: "",
            span: {
                start: startPos,
                length: length
            }
        });
    }

    function isValidDeclarationForInlineTempRefactor(variableDeclaration: VariableDeclaration): boolean {
        if (variableDeclaration.parent.kind === SyntaxKind.VariableDeclarationList &&
            variableDeclaration.parent.parent.kind === SyntaxKind.VariableStatement &&
            variableDeclaration.parent.parent.parent.kind === SyntaxKind.Block) {
            return true;
        }
        return false;
    }
}
