/* @internal */
namespace ts.codeRefactor {
    registerCodeRefactor({
        name: "Convert Get Property to Method",
        nodeLabel: ts.SyntaxKind.GetAccessor,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            let textChanges: TextChange[] = [];
            let fileTextChanges: FileTextChanges[] = [];

            let getChild: Node = getChildOfType(token, SyntaxKind.GetKeyword);
            let identifierChild: Node = getChildOfType(token, SyntaxKind.Identifier);

            textChanges.push({ newText: context.newLineCharacter + "function", span: { start: getChild.pos, length: getChild.end - getChild.pos } });
            textChanges.push({ newText: "get", span: { start: identifierChild.getStart(), length: 0 } });

            fileTextChanges.push({
                fileName: context.sourceFile.fileName,
                textChanges: textChanges
            });

            processReferences(identifierChild, fileTextChanges, context, true, false);

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Convert_Get_property_to_Method),
                changes: fileTextChanges
            }];
        }
    });

    registerCodeRefactor({
        name: "Convert Set Property to Method",
        nodeLabel: ts.SyntaxKind.SetAccessor,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            let textChanges: TextChange[] = [];
            let fileTextChanges: FileTextChanges[] = [];

            let setChild: Node = getChildOfType(token, SyntaxKind.SetKeyword);
            let identifierChild: Node = getChildOfType(token, SyntaxKind.Identifier);

            textChanges.push({ newText: context.newLineCharacter + "function", span: { start: setChild.pos, length: setChild.end - setChild.pos } });
            textChanges.push({ newText: "set", span: { start: identifierChild.getStart(), length: 0 } });

            fileTextChanges.push({
                fileName: context.sourceFile.fileName,
                textChanges: textChanges
            });

            processReferences(identifierChild, fileTextChanges, context, false, true);

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Convert_Get_property_to_Method),
                changes: fileTextChanges
            }];
        }
    });

    registerCodeRefactor({
        name: "Encapsulate Field",
        nodeLabel: ts.SyntaxKind.Identifier,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            if (token.parent && token.parent.kind === SyntaxKind.PropertyDeclaration && // It is Property
                (token.parent.flags & NodeFlags.Public || token.parent.flags === 0) && // It has modifier public or none
                !(token.parent.flags & NodeFlags.Static)) // It is not static
            {
                let propertyDeclaration = <PropertyDeclaration>token.parent;
                let fileTextChanges: FileTextChanges[] = [];
                let textChanges: TextChange[] = [];

                if (propertyDeclaration.flags & NodeFlags.Public) { // There is a public modifier
                    for (const modifier of propertyDeclaration.modifiers) {
                        if (modifier.kind === SyntaxKind.PublicKeyword) {
                            textChanges.push({ newText: "", span: { start: modifier.pos, length: modifier.end - modifier.pos } });
                            textChanges.push({ newText: context.newLineCharacter + "private ", span: { start: token.pos, length: 0 } });
                            textChanges.push({ newText: "_", span: { start: token.getStart(), length: 0 } });
                            break;
                        }
                    }
                } else { //There is no public modifier
                    textChanges.push({ newText: context.newLineCharacter + "private _", span: { start: token.getStart(), length: 0 } });
                }

                let getterSetterText: string = getGetterSetterText(propertyDeclaration, token.getText(), context);

                textChanges.push({ newText: getterSetterText, span: { start: propertyDeclaration.end + 1, length: 0 } });

                fileTextChanges.push({
                    fileName: context.sourceFile.fileName,
                    textChanges: textChanges
                });

                if (context.sourceFile.languageVersion === ScriptTarget.ES3) {
                    processReferences(token, fileTextChanges, context, true, true);
                }

                return [{
                    description: getLocaleSpecificMessage(Diagnostics.Encapsulate_Field),
                    changes: fileTextChanges
                }];
            }

            Debug.fail("No refactor found.");
        }
    });

    function getGetterSetterText(propertyDeclaration: PropertyDeclaration, identifierText: string, context: CodeFixContext): string {
        const version = context.sourceFile.languageVersion;
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
        return getterSetterText;
    }

    function processReferences(identifierToken: Node, fileTextChanges: FileTextChanges[], context: CodeFixContext, processForGet: boolean, processForSet: boolean) {
        const referenceSymbols: ReferencedSymbol[] = context.service.findReferences(context.sourceFile.fileName, identifierToken.pos + 1);
        const program = context.service.getProgram();

        if (referenceSymbols) {
            for (const symbol of referenceSymbols) {
                for (const reference of symbol.references) {
                    if (!reference.isDefinition) {
                        let fileTextChangesEntry = getOrCreateFileTextChangesEntry(reference, fileTextChanges);
                        let node: Node = getTouchingPropertyName(program.getSourceFile(reference.fileName), reference.textSpan.start);

                        if (isInsideBinaryExpression(node)) {
                            let binaryExpression = <BinaryExpression>node.parent.parent;
                            let isNodeOnLeftSide: boolean = isNodeOnLeft(node, binaryExpression);

                            if (isNodeOnLeftSide && processForSet) {
                                processLeftSideForSet(binaryExpression, identifierToken.getText(), fileTextChangesEntry, context.newLineCharacter);
                            } 

                            if (!isNodeOnLeftSide && processForGet) {
                                processRightSideForGet(node, identifierToken.getText(), fileTextChangesEntry);
                            }
                        }
                    }
                }
            }
        }
    }

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

    export function getChildOfType(node: Node, kind: SyntaxKind): Node {
        for (let i = 0, n = node.getChildCount(); i < n; i++) {
            const child = node.getChildAt(i);
            if (child.kind === kind) {
                return child;
            }
        }
        return null;
    }

    export function getOrCreateFileTextChangesEntry(reference: ReferenceEntry, fileTextChanges: FileTextChanges[]): FileTextChanges {
        let fileTextChangesEntry = findEntry(reference.fileName, fileTextChanges);
        if (!fileTextChangesEntry) {
            fileTextChangesEntry = {
                fileName: reference.fileName,
                textChanges: []
            };
            fileTextChanges.push(fileTextChangesEntry);
        }
        return fileTextChangesEntry;
    }

    function isInsideBinaryExpression(node: Node) {
        return (node && node.kind === SyntaxKind.Identifier &&
            node.parent && node.parent.kind === SyntaxKind.PropertyAccessExpression &&
            node.parent.parent && node.parent.parent.kind === SyntaxKind.BinaryExpression);
    }

    function processRightSideForGet(node: Node, identifierText: string, fileTextChangesEntry: FileTextChanges) {
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

    function processLeftSideForSet(binaryExpression: BinaryExpression, identifierText: string, fileTextChangesEntry: FileTextChanges, newLineCharacter: string) {
        let right = binaryExpression.right;
        let setterText = binaryExpression.getText()
            .replace(right.getText(), "")
            .replace(identifierText, "set" + identifierText + "(" + right.getText() + ")")
            .trim();
        if (setterText.match(/.*=$/)) {
            setterText = setterText.substr(0, setterText.length - 1).trim();
        }
        setterText = newLineCharacter + setterText;

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
    }
}
