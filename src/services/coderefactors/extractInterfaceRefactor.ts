/* @internal */
namespace ts.codeRefactor {
    registerCodeRefactor({
        name: "Extract Interface from Property",
        nodeLabel: ts.SyntaxKind.PropertyDeclaration,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {            
            if (token.kind == SyntaxKind.PropertyDeclaration) {
                let propertyDeclaration = <PropertyDeclaration>token;
                let textChanges: TextChange[] = [];
                if (propertyDeclaration.initializer) {
                    const interfaceName: string = "newInterface_" + propertyDeclaration.name.getText();
                    let interfaceText: string = getInterfaceBeginning(interfaceName, context.newLineCharacter);

                    let syntaxList: SyntaxList = getSyntaxList(propertyDeclaration);
                    if (syntaxList && syntaxList.getChildCount() > 0) {
                        for (let i = 0, n = syntaxList.getChildCount(); i < n; i++) {
                            const member = syntaxList.getChildAt(i);
                            if (member.kind === SyntaxKind.PropertyAssignment || member.kind === SyntaxKind.MethodDeclaration) {
                                if (member.kind === SyntaxKind.PropertyAssignment) {
                                    interfaceText += extractPropertySignature(<PropertyAssignment>member);
                                }
                                else if (member.kind === SyntaxKind.MethodDeclaration) {
                                    interfaceText += extractMethodSignature(<MethodDeclaration>member);
                                }
                                interfaceText += handleSemiColon(interfaceText, context.newLineCharacter);
                            }
                        }
                    }

                    interfaceText = getInterfaceEndAndRemoveSpaces(interfaceText, context.newLineCharacter);

                    if (token.parent.kind === SyntaxKind.ClassDeclaration) {
                        textChanges.push({ newText: interfaceText, span: { start: token.parent.pos, length: 0 } });
                    } else {
                        textChanges.push({ newText: interfaceText, span: { start: token.pos, length: 0 } });
                    }

                    let firstAssignmentPosition: number = getFirstPositionOf(propertyDeclaration, SyntaxKind.FirstAssignment);
                    textChanges.push({ newText: " : " + interfaceName, span: { start: firstAssignmentPosition, length: 0 } });

                    return [{
                        description: getLocaleSpecificMessage(Diagnostics.Extract_Interface_from_Property),
                        changes: [{
                            fileName: context.sourceFile.fileName,
                            textChanges: textChanges
                        }]
                    }];
                }
            }
            Debug.fail("No refactor found.");
        }
    });

    registerCodeRefactor({
        name: "Extract Interface from Variable Declaration",
        nodeLabel: ts.SyntaxKind.VariableDeclaration,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            if (token.kind == SyntaxKind.VariableDeclaration) {
                let declaration = <VariableDeclaration>token;
                let textChanges: TextChange[] = [];

                if (declaration.initializer) {
                    const interfaceName: string = "newInterface_" + declaration.name.getText();
                    let interfaceText: string = getInterfaceBeginning(interfaceName, context.newLineCharacter);
                    let syntaxList: SyntaxList = getSyntaxList(declaration);
                    if (syntaxList && syntaxList.getChildCount() > 0) {
                        for (let i = 0, n = syntaxList.getChildCount(); i < n; i++) {
                            const member = syntaxList.getChildAt(i);
                            if (member.kind === SyntaxKind.PropertyAssignment || member.kind === SyntaxKind.MethodDeclaration) {
                                if (member.kind === SyntaxKind.PropertyAssignment) {
                                    interfaceText += extractPropertySignature(<PropertyAssignment>member);
                                }
                                else if (member.kind === SyntaxKind.MethodDeclaration) {
                                    interfaceText += extractMethodSignature(<MethodDeclaration>member);
                                }
                                interfaceText += handleSemiColon(interfaceText, context.newLineCharacter);
                            }
                        }
                    }

                    interfaceText = getInterfaceEndAndRemoveSpaces(interfaceText, context.newLineCharacter)

                    if (token.parent.kind === SyntaxKind.ClassDeclaration || token.parent.kind === SyntaxKind.VariableDeclarationList) {
                        textChanges.push({ newText: interfaceText, span: { start: token.parent.pos, length: 0 } });
                    } else {
                        textChanges.push({ newText: interfaceText, span: { start: token.pos, length: 0 } });
                    }

                    let firstAssignmentPosition: number = getFirstPositionOf(declaration, SyntaxKind.FirstAssignment);
                    textChanges.push({ newText: " : " + interfaceName, span: { start: firstAssignmentPosition, length: 0 } });

                    return [{
                        description: getLocaleSpecificMessage(Diagnostics.Extract_Interface_from_Variable),
                        changes: [{
                            fileName: context.sourceFile.fileName,
                            textChanges: textChanges
                        }]
                    }];
                }
            }
            Debug.fail("No refactor found.");
        }
    });

    registerCodeRefactor({
        name: "Extract Interface from Class",
        nodeLabel: ts.SyntaxKind.ClassDeclaration,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            if (token.kind == SyntaxKind.ClassDeclaration) {
                let classDeclaration = <ClassDeclaration>token;
                let textChanges: TextChange[] = [];

                const interfaceName: string = "newInterface_" + classDeclaration.name.getText();
                let interfaceText: string = getInterfaceBeginning(interfaceName, context.newLineCharacter);
                for (const member of classDeclaration.members) {
                    if ((member.flags & NodeFlags.Public || member.flags & NodeFlags.None) &&
                        !(member.flags & NodeFlags.Static) &&
                         (member.kind === SyntaxKind.PropertyDeclaration ||
                          member.kind === SyntaxKind.MethodDeclaration)
                    ) {
                        if (member.kind === SyntaxKind.PropertyDeclaration) {
                            interfaceText += extractPropertySignature(<PropertyDeclaration>member);
                        }
                        else if (member.kind === SyntaxKind.MethodDeclaration) {
                            interfaceText += extractMethodSignature(<MethodDeclaration>member);
                        }
                        interfaceText += handleSemiColon(interfaceText, context.newLineCharacter);
                    }
                }

                interfaceText = getInterfaceEndAndRemoveSpaces(interfaceText, context.newLineCharacter)

                textChanges.push({ newText: interfaceText, span: { start: token.pos, length: 0 } });

                let firstPunctuationPosition: number = getFirstPositionOf(classDeclaration, SyntaxKind.FirstPunctuation);
                textChanges.push({ newText: " implements " + interfaceName, span: { start: firstPunctuationPosition, length: 0 } });

                return [{
                    description: getLocaleSpecificMessage(Diagnostics.Extract_Interface_from_Class),
                    changes: [{
                        fileName: context.sourceFile.fileName,
                        textChanges: textChanges
                    }]
                }];
            }
            Debug.fail("No refactor found.");
        }
    });

    function getInterfaceBeginning(interfaceName: string, newLineCharacter: string) {
        return "interface " + interfaceName + "{" + newLineCharacter;
    }

    function getInterfaceEndAndRemoveSpaces(interfaceText: string, newLineCharacter: string) {
        return (interfaceText + "}" + newLineCharacter).replace(/  +/g, " ");
    }

    function handleSemiColon(interfaceText: string, newLineCharacter: string): string {
        return (interfaceText.match(/.*;$/)) ? newLineCharacter : ";" + newLineCharacter;
    }

    function extractPropertySignature(declaration: PropertyDeclaration | PropertyAssignment) {
        let wholePropertyText = declaration.getText();
        let modifierMethodText: string = getModifierText(declaration);
        wholePropertyText = wholePropertyText.replace(modifierMethodText.trim(), "");
        wholePropertyText = removeInitializerText(declaration, wholePropertyText);
        return wholePropertyText;
    }

    function extractMethodSignature(declaration: MethodDeclaration): string {
        let wholeMethodText = declaration.getText();
        const bodyMethodText = declaration.body.getText();
        let modifierMethodText: string = getModifierText(declaration);
        wholeMethodText = wholeMethodText.replace(bodyMethodText, "").trim();
        wholeMethodText = wholeMethodText.replace(modifierMethodText.trim(), "").trim();
        return wholeMethodText;
    }

    function getModifierText(declaration: PropertyDeclaration | MethodDeclaration | PropertyAssignment): string {
        let modifierMethodText: string = "";
        if (declaration.modifiers) {
            for (const modifier of declaration.modifiers) {
                modifierMethodText += modifier.getText() + " ";
            }
        }
        return modifierMethodText;
    }

    function removeInitializerText(declaration: PropertyDeclaration | PropertyAssignment, wholeText: string) {
        if (declaration.initializer) {
            const initializerPropertyText = declaration.initializer.getText();
            let textToBeAdded = wholeText.replace(initializerPropertyText, "");
            textToBeAdded = textToBeAdded.replace("=", "").trim();
            textToBeAdded = (textToBeAdded.match(/.*;$/)) ?
                textToBeAdded.substr(0, textToBeAdded.length - 1) : textToBeAdded;
            textToBeAdded = (textToBeAdded.match(/.*:$/)) ?
                textToBeAdded.substr(0, textToBeAdded.length - 1) : textToBeAdded;
            return textToBeAdded;
        }
        return wholeText;
    }

    function getFirstPositionOf(declaration: PropertyDeclaration | ClassDeclaration | VariableDeclaration, requiredSyntaxKind: SyntaxKind) {
        for (let i = 0, n = declaration.getChildCount(); i < n; i++) {
            const child = declaration.getChildAt(i);
            if (child.kind === requiredSyntaxKind) {
                return child.pos;
            }
        }
        return -1;
    }

    function getSyntaxList(declaration: PropertyDeclaration | VariableDeclaration): SyntaxList {
        for (let i = 0, n1 = declaration.getChildCount(); i < n1; i++) {
            if (declaration.getChildAt(i).kind === SyntaxKind.ObjectLiteralExpression) {
                const objectLiteralExpression = <ObjectLiteralExpression>declaration.getChildAt(i);
                for (let j = 0, n2 = objectLiteralExpression.getChildCount(); j < n2; j++) {
                    if (objectLiteralExpression.getChildAt(j).kind === SyntaxKind.SyntaxList) {
                        return <SyntaxList>objectLiteralExpression.getChildAt(j);
                    }
                }
            }
        }
        return null;
    }
}
