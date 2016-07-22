/* @internal */
namespace ts.codeRefactor {
    registerCodeRefactor({
        name: "Encapsulate Field",
        nodeLabel: ts.SyntaxKind.Identifier,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            if (token.kind === SyntaxKind.Identifier && // It is an Identifier
                token.parent && token.parent.kind === SyntaxKind.PropertyDeclaration && // It is Property
                (token.parent.flags & NodeFlags.Public || token.parent.flags === 0) && // It has modifier public or none
                !(token.parent.flags & NodeFlags.Static)) // It is not static
            {
                let propertyDeclaration = <PropertyDeclaration>token.parent;
                let textChanges: TextChange[] = [];


                if (propertyDeclaration.flags & NodeFlags.Public) { // There is a public modifier
                    for (const modifier of propertyDeclaration.modifiers) {
                        if (modifier.kind === SyntaxKind.PublicKeyword) {
                            textChanges.push({ newText: "", span: { start: modifier.pos, length: modifier.end - modifier.pos } });
                            textChanges.push({ newText: context.newLineCharacter + "private ", span: { start: token.pos, length: 0 } });
                            textChanges.push({ newText: "_", span: { start: token.getStart(), length: 0 } });
                        }
                    }
                } else { //There is no public modifier
                    textChanges.push({ newText: context.newLineCharacter + "private _", span: { start: token.getStart(), length: 0 } });
                }

                const version = context.sourceFile.languageVersion;
                const identifierText: string = token.getText();
                let getterSetterText: string = getSetterBeginning(version, identifierText);
                getterSetterText += "(new" + identifierText;
                getterSetterText += (propertyDeclaration.type) ? ": " + propertyDeclaration.type.getText() : "";
                getterSetterText += ") {" + context.newLineCharacter;
                getterSetterText += "this._" + identifierText + " = new" + identifierText;
                getterSetterText += ";" + context.newLineCharacter + "}" + context.newLineCharacter;

                getterSetterText += getGetterBeginning(version, identifierText);
                getterSetterText += "()";
                getterSetterText += (propertyDeclaration.type) ? ": " + propertyDeclaration.type.getText() : "";
                getterSetterText += " {" + context.newLineCharacter;
                getterSetterText += "return this._" + identifierText;
                getterSetterText += ";" + context.newLineCharacter + "}" + context.newLineCharacter;

                textChanges.push({ newText: getterSetterText, span: { start: propertyDeclaration.end + 1, length: 0 } });
                let fileTextChanges: FileTextChanges[] = [];
                fileTextChanges.push({
                    fileName: context.sourceFile.fileName,
                    textChanges: textChanges
                });

                if (version === ScriptTarget.ES3) {
                    const referenceSymbols: ReferencedSymbol[] = context.service.findReferences(context.sourceFile.fileName, token.pos + 1);
                    const program = context.service.getProgram();

                    if (referenceSymbols) {
                        for (const symbol of referenceSymbols) {
                            for (const reference of symbol.references) {
                                if (!reference.isDefinition) {
                                    let fileTextChangesEntry = findEntry(reference.fileName, fileTextChanges);
                                    if (!fileTextChangesEntry) {
                                        fileTextChangesEntry = {
                                            fileName: reference.fileName,
                                            textChanges: []
                                        };
                                        fileTextChanges.push(fileTextChangesEntry);
                                    }

                                    let node: Node = getTouchingPropertyName(program.getSourceFile(reference.fileName), reference.textSpan.start);
                                    if (node.kind === SyntaxKind.Identifier) {
                                        if (node.parent.kind === SyntaxKind.PropertyAccessExpression && node.parent.parent.kind === SyntaxKind.BinaryExpression) {
                                            let binaryExpression = <BinaryExpression>node.parent.parent;
                                            let left = binaryExpression.left;
                                            let right = binaryExpression.right;

                                            if (isNodeOnLeft(node, binaryExpression)) {
                                                let setterText = binaryExpression.getText()
                                                    .replace(right.getText(), "")
                                                    .replace(token.getText(), "set" + identifierText + "(" + right.getText() + ")")
                                                    .trim();
                                                if (setterText.match(/.*=$/)) {
                                                    setterText = setterText.substr(0, setterText.length - 1).trim();
                                                }
                                                setterText = context.newLineCharacter + setterText;

                                                fileTextChangesEntry.textChanges.push({
                                                    newText: setterText,
                                                    span: {
                                                        start: binaryExpression.pos,
                                                        length: 0
                                                    }
                                                });
                                                fileTextChangesEntry.textChanges.push({
                                                    newText: "",
                                                    span: {
                                                        start: binaryExpression.pos,
                                                        length: binaryExpression.end - binaryExpression.pos
                                                    }
                                                });
                                            } else {
                                                let getterText = node.parent.getText()
                                                    .replace("." + identifierText, ".get" + identifierText + "()");

                                                fileTextChangesEntry.textChanges.push({
                                                    newText: getterText,
                                                    span: {
                                                        start: node.parent.pos,
                                                        length: 0
                                                    }
                                                });

                                                fileTextChangesEntry.textChanges.push({
                                                    newText: "",
                                                    span: {
                                                        start: node.parent.pos,
                                                        length: node.parent.end - node.parent.pos
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                return [{
                    description: getLocaleSpecificMessage(Diagnostics.Encapsulate_Field),
                    changes: fileTextChanges
                }];
            }

            Debug.fail("No refactor found.");
        }
    });

    function findEntry(fileName: string, fileTextChanges: FileTextChanges[]): FileTextChanges {
        if (fileTextChanges && fileTextChanges.length > 0) {
            for (const entry of fileTextChanges) {
                if (entry.fileName === fileName) {
                    return entry;
                }
            }
        }
        return null;
    }

    function isNodeOnLeft(node: Node, binaryExpression: BinaryExpression): boolean {        
        let posToCompare: number = -1;
        for (let i = 0, n = binaryExpression.getChildCount(); i < n; i++) {
            const child = binaryExpression.getChildAt(i);
            if (child.kind === SyntaxKind.FirstAssignment) {
                posToCompare = child.pos;
            }
        }
        if (posToCompare != -1) {
            if (node.pos < posToCompare) {
                return true;
            }
        }
        return false;
    }

    function getSetterBeginning(version: ScriptTarget, accessorName: string): string {
        if (version === ScriptTarget.ES6) {
            return "set " + accessorName;
        }
        return "function set" + accessorName;
    }

    function getGetterBeginning(version: ScriptTarget, accessorName: string): string {
        if (version === ScriptTarget.ES6) {
            return "get " + accessorName;
        } else {
            return "function get" + accessorName;
        }
    }
}
