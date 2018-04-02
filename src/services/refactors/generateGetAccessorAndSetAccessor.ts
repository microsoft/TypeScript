/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;
    registerRefactor(actionName, { getEditsForAction, getAvailableActions });

    type AccepedDeclaration = ParameterDeclaration | PropertyDeclaration;

    interface DeclarationInfo {
        classLikeContainer: ClassLikeDeclaration;
        isStatic: boolean;
    }

    interface Info extends DeclarationInfo {
        declaration: AccepedDeclaration;
        fieldName: string;
        accessorName: string;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const { file, startPosition } = context;

        const fieldInfo = getConvertibleFieldAtPosition(file, startPosition);
        if (!fieldInfo) return undefined;

        return [{
            name: actionName,
            description: actionDescription,
            actions: [
                {
                    name: actionName,
                    description: actionDescription
                }
            ]
        }];
    }

    function getEditsForAction(context: RefactorContext, _actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;

        const fieldInfo = getConvertibleFieldAtPosition(file, startPosition);
        if (!fieldInfo) return undefined;

        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        const { isStatic, fieldName, accessorName, classLikeContainer, declaration } = fieldInfo;

        const accessorModifiers = getAccessorModifiers(declaration, isStatic);
        const fieldModifiers = getFieldModifiers(isStatic);

        const getAccessor = generateGetAccessor(fieldName, accessorName, accessorModifiers, declaration, isStatic, classLikeContainer);
        const setAccessor = generateSetAccessor(fieldName, accessorName, accessorModifiers, declaration, isStatic, classLikeContainer);

        updateFieldDeclaration(changeTracker, file, declaration, fieldName, fieldModifiers, classLikeContainer);

        insertAccessor(changeTracker, file, getAccessor, declaration, classLikeContainer);
        insertAccessor(changeTracker, file, setAccessor, declaration, classLikeContainer);

        const edits = changeTracker.getChanges();
        const renameFilename = file.fileName;
        const renameLocation = getRenameLocation(edits, renameFilename, fieldName, /*isDeclaredBeforeUse*/ false);
        return { renameFilename, renameLocation, edits };
    }

    function getUniqueName(baseName: string, fileText: string): string {
        let nameText = baseName;
        for (let i = 1; stringContains(fileText, nameText); i++) {
            nameText = `${baseName}_${i}`;
        }
        return nameText;
    }

    function getRenameLocation(edits: ReadonlyArray<FileTextChanges>, renameFilename: string, fieldName: string, isDeclaredBeforeUse: boolean): number {
        let delta = 0;
        let lastPos = -1;
        for (const { fileName, textChanges } of edits) {
            Debug.assert(fileName === renameFilename);
            for (const change of textChanges) {
                const { span, newText } = change;
                const index = newText.indexOf(fieldName);
                if (index !== -1) {
                    lastPos = span.start + delta + index;

                    // If the reference comes first, return immediately.
                    if (!isDeclaredBeforeUse) {
                        return lastPos;
                    }
                }
                delta += newText.length - span.length;
            }
        }

        // If the declaration comes first, return the position of the last occurrence.
        Debug.assert(isDeclaredBeforeUse);
        Debug.assert(lastPos >= 0);
        return lastPos;
    }

    function getAccessorModifiers(declaration: AccepedDeclaration, isStatic: boolean): NodeArray<Modifier> {
        if (!declaration.modifiers || getModifierFlags(declaration) & ModifierFlags.Private) {
            return createNodeArray(
                append<Modifier>([createToken(SyntaxKind.PublicKeyword)],
                    isStatic ? createToken(SyntaxKind.StaticKeyword) : undefined));
        }
        return declaration.modifiers;
    }

    function getFieldModifiers(isStatic: boolean): NodeArray<Modifier> {
        return createNodeArray(
            append<Modifier>([createToken(SyntaxKind.PrivateKeyword)],
                isStatic ? createToken(SyntaxKind.StaticKeyword) : undefined));
    }

    function getPropertyDeclarationInfo(propertyDeclaration: PropertyDeclaration): DeclarationInfo | undefined {
        if (!propertyDeclaration || propertyDeclaration.name.kind !== SyntaxKind.Identifier) return undefined;
        if (!isClassLike(propertyDeclaration.parent) || !propertyDeclaration.parent.members) return undefined;

        return {
            isStatic: hasStaticModifier(propertyDeclaration),
            classLikeContainer: propertyDeclaration.parent
        };
    }

    function getParameterPropertyDeclarationInfo(parameterDeclaration: ParameterDeclaration): DeclarationInfo | undefined {
        if (!parameterDeclaration || !isIdentifier(parameterDeclaration.name) || !isClassLike(parameterDeclaration.parent.parent) || !parameterDeclaration.parent.parent.members) return undefined;

        return {
            isStatic: false,
            classLikeContainer: parameterDeclaration.parent.parent
        };
    }

    function getConvertibleFieldAtPosition(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        const declaration = <ParameterDeclaration | PropertyDeclaration>findAncestor(node.parent, or(isParameterPropertyDeclaration, isPropertyDeclaration));
        // make sure propertyDeclaration have AccessibilityModifier or Static Modifier
        const meaning = ModifierFlags.AccessibilityModifier | ModifierFlags.Static;
        if (!declaration || !isIdentifier(declaration.name) || (getModifierFlags(declaration) | meaning) !== meaning) return undefined;

        const accessorName = declaration.name.text;
        const fieldName = getUniqueName(`_${accessorName}`, file.text);

        const info = isPropertyDeclaration(declaration) ? getPropertyDeclarationInfo(declaration) : getParameterPropertyDeclarationInfo(declaration);

        return {
            ...info,
            fieldName,
            declaration,
            accessorName
        };
    }

    function generateGetAccessor(fieldName: string, accessorName: string, modifiers: ModifiersArray, propertyDeclaration: AccepedDeclaration, isStatic: boolean, classLikeContainer: ClassLikeDeclaration) {
        return createGetAccessor(
            /*decorators*/ undefined,
            modifiers,
            accessorName,
            /*parameters*/ undefined,
            propertyDeclaration.type,
            createBlock([
                createReturn(
                    createPropertyAccess(
                        isStatic ? classLikeContainer.name : createThis(),
                        fieldName
                    )
                )
            ], /*multiLine*/ true)
        );
    }

    function generateSetAccessor(fieldName: string, accessorName: string, modifiers: ModifiersArray, propertyDeclaration: AccepedDeclaration, isStatic: boolean, classLikeContainer: ClassLikeDeclaration) {
        return createSetAccessor(
            /*decorators*/ undefined,
            modifiers,
            accessorName,
            [createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                createIdentifier("value"),
                /*questionToken*/ undefined,
                propertyDeclaration.type
            )],
            createBlock([
                createStatement(
                    createAssignment(
                        createPropertyAccess(
                            isStatic ? classLikeContainer.name : createThis(),
                            fieldName
                        ),
                        createIdentifier("value")
                    )
                )
            ], /*multiLine*/ true)
        );
    }

    function updatePropertyDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: PropertyDeclaration, fieldName: string, modifiers: ModifiersArray) {
        const property = updateProperty(
            declaration,
            declaration.decorators,
            modifiers,
            fieldName,
            declaration.questionToken || declaration.exclamationToken,
            declaration.type,
            declaration.initializer
        );

        changeTracker.replaceNode(file, declaration, property, {
            suffix: changeTracker.newLineCharacter
        });
    }

    function updateParameterPropertyDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: ParameterDeclaration, fieldName: string, modifiers: ModifiersArray, classLikeContainer: ClassLikeDeclaration) {
        const property = createProperty(
            declaration.decorators,
            modifiers,
            fieldName,
            declaration.questionToken,
            declaration.type,
            declaration.initializer
        );

        changeTracker.insertNodeAtClassStart(file, classLikeContainer, property);
        changeTracker.deleteNodeInList(file, declaration);
    }


    function updateFieldDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: AccepedDeclaration, fieldName: string, modifiers: ModifiersArray, classLikeContainer: ClassLikeDeclaration) {
        isPropertyDeclaration(declaration)
            ? updatePropertyDeclaration(changeTracker, file, declaration, fieldName, modifiers)
            : updateParameterPropertyDeclaration(changeTracker, file, declaration, fieldName, modifiers, classLikeContainer);
    }

    function insertAccessor(changeTracker: textChanges.ChangeTracker, file: SourceFile, accessor: AccessorDeclaration, declaration: AccepedDeclaration, classLikeContainer: ClassLikeDeclaration) {
        isPropertyDeclaration(declaration) ? changeTracker.insertNodeAfter(file, declaration, accessor) : changeTracker.insertNodeAtClassStart(file, classLikeContainer, accessor);
    }
}
