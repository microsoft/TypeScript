/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;
    registerRefactor(actionName, { getEditsForAction, getAvailableActions });

    type AccepedDeclaration = ParameterDeclaration | PropertyDeclaration | PropertyAssignment;
    type AccepedNameType = Identifier | StringLiteral;
    type ContainerDeclation = ClassLikeDeclaration | ObjectLiteralExpression;

    interface DeclarationInfo {
        container: ContainerDeclation;
        isStatic: boolean;
        type: TypeNode | undefined;
    }

    interface Info extends DeclarationInfo {
        declaration: AccepedDeclaration;
        fieldName: AccepedNameType;
        accessorName: AccepedNameType;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const { file, startPosition } = context;
        if (!getConvertibleFieldAtPosition(file, startPosition)) return undefined;

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

        const isJS = isSourceFileJavaScript(file);
        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        const { isStatic, fieldName, accessorName, type, container, declaration } = fieldInfo;

        const isInClassLike = isClassLike(container);
        const accessorModifiers = getAccessorModifiers(isJS, declaration, isStatic, isInClassLike);
        const fieldModifiers = getFieldModifiers(isJS, isStatic, isInClassLike);

        updateFieldDeclaration(changeTracker, file, declaration, fieldName, fieldModifiers, container);

        const getAccessor = generateGetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);
        const setAccessor = generateSetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);

        insertAccessor(changeTracker, file, getAccessor, declaration, container);
        insertAccessor(changeTracker, file, setAccessor, declaration, container);

        const edits = changeTracker.getChanges();
        const renameFilename = file.fileName;
        const renameLocationOffset = isIdentifier(fieldName) ? 0 : -1;
        const renameLocation = renameLocationOffset + getRenameLocation(edits, renameFilename, fieldName.text, /*isDeclaredBeforeUse*/ false);
        return { renameFilename, renameLocation, edits };
    }

    function isConvertableName (name: DeclarationName): name is AccepedNameType {
        return isIdentifier(name) || isStringLiteral(name);
    }

    function createPropertyName (name: string, originalName: AccepedNameType) {
        return isIdentifier(originalName) ? createIdentifier(name) : createLiteral(name);
    }

    function createAccessorAccessExpression (fieldName: AccepedNameType, isStatic: boolean, container: ContainerDeclation) {
        const leftHead = isStatic ? (<ClassLikeDeclaration>container).name : createThis();
        return isIdentifier(fieldName) ? createPropertyAccess(leftHead, fieldName) : createElementAccess(leftHead, createLiteral(fieldName));
    }

    function getAccessorModifiers(isJS: boolean, declaration: AccepedDeclaration, isStatic: boolean, isClassLike: boolean): NodeArray<Modifier> | undefined {
        if (!isClassLike) return undefined;

        if (!declaration.modifiers || getModifierFlags(declaration) & ModifierFlags.Private) {
            const modifiers = append<Modifier>(
                !isJS ? [createToken(SyntaxKind.PublicKeyword)] : undefined,
                isStatic ? createToken(SyntaxKind.StaticKeyword) : undefined
            );
            return modifiers && createNodeArray(modifiers);
        }
        return declaration.modifiers;
    }

    function getFieldModifiers(isJS: boolean, isStatic: boolean, isClassLike: boolean): NodeArray<Modifier> | undefined {
        if (!isClassLike) return undefined;

        const modifiers = append<Modifier>(
            !isJS ? [createToken(SyntaxKind.PrivateKeyword)] : undefined,
            isStatic ? createToken(SyntaxKind.StaticKeyword) : undefined
        );
        return modifiers && createNodeArray(modifiers);
    }

    function getPropertyDeclarationInfo(propertyDeclaration: PropertyDeclaration): DeclarationInfo | undefined {
        if (!isClassLike(propertyDeclaration.parent) || !propertyDeclaration.parent.members) return undefined;

        return {
            isStatic: hasStaticModifier(propertyDeclaration),
            type: propertyDeclaration.type,
            container: propertyDeclaration.parent
        };
    }

    function getParameterPropertyDeclarationInfo(parameterDeclaration: ParameterDeclaration): DeclarationInfo | undefined {
        if (!isClassLike(parameterDeclaration.parent.parent) || !parameterDeclaration.parent.parent.members) return undefined;

        return {
            isStatic: false,
            type: parameterDeclaration.type,
            container: parameterDeclaration.parent.parent
        };
    }

    function getPropertyAssignmentDeclarationInfo(propertyAssignment: PropertyAssignment): DeclarationInfo | undefined {
        return {
            isStatic: false,
            type: undefined,
            container: propertyAssignment.parent
        };
    }

    function getDeclarationInfo(declaration: AccepedDeclaration) {
        if (isPropertyDeclaration(declaration)) {
            return getPropertyDeclarationInfo(declaration);
        }
        else if (isPropertyAssignment(declaration)) {
            return getPropertyAssignmentDeclarationInfo(declaration);
        }
        else {
            return getParameterPropertyDeclarationInfo(declaration);
        }
    }

    function getConvertibleFieldAtPosition(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        const declaration = <AccepedDeclaration>findAncestor(node.parent, or(isParameterPropertyDeclaration, isPropertyDeclaration, isPropertyAssignment));
        // make sure propertyDeclaration have AccessibilityModifier or Static Modifier
        const meaning = ModifierFlags.AccessibilityModifier | ModifierFlags.Static;
        if (!declaration || !isConvertableName(declaration.name) || (getModifierFlags(declaration) | meaning) !== meaning) return undefined;

        const info = getDeclarationInfo(declaration);
        const fieldName = createPropertyName(getUniqueName(`_${declaration.name.text}`, file.text), declaration.name);
        suppressLeadingAndTrailingTrivia(fieldName);
        suppressLeadingAndTrailingTrivia(declaration);
        return {
            ...info,
            declaration,
            fieldName,
            accessorName: createPropertyName(declaration.name.text, declaration.name)
        };
    }

    function generateGetAccessor(fieldName: AccepedNameType, accessorName: AccepedNameType, type: TypeNode, modifiers: ModifiersArray | undefined, isStatic: boolean, container: ContainerDeclation) {
        return createGetAccessor(
            /*decorators*/ undefined,
            modifiers,
            accessorName,
            /*parameters*/ undefined,
            type,
            createBlock([
                createReturn(
                    createAccessorAccessExpression(fieldName, isStatic, container)
                )
            ], /*multiLine*/ true)
        );
    }

    function generateSetAccessor(fieldName: AccepedNameType, accessorName: AccepedNameType, type: TypeNode, modifiers: ModifiersArray | undefined, isStatic: boolean, container: ContainerDeclation) {
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
                type
            )],
            createBlock([
                createStatement(
                    createAssignment(
                        createAccessorAccessExpression(fieldName, isStatic, container),
                        createIdentifier("value")
                    )
                )
            ], /*multiLine*/ true)
        );
    }

    function updatePropertyDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: PropertyDeclaration, fieldName: AccepedNameType, modifiers: ModifiersArray | undefined) {
        const property = updateProperty(
            declaration,
            declaration.decorators,
            modifiers,
            fieldName,
            declaration.questionToken || declaration.exclamationToken,
            declaration.type,
            declaration.initializer
        );

        changeTracker.replaceNode(file, declaration, property);
    }

    function updateParameterPropertyDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: ParameterDeclaration, fieldName: AccepedNameType, modifiers: ModifiersArray | undefined, classLikeContainer: ClassLikeDeclaration) {
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

    function updatePropertyAssignmentDeclaration (changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: PropertyAssignment, fieldName: AccepedNameType) {
        const assignment = updatePropertyAssignment(declaration, fieldName, declaration.initializer);
        changeTracker.replacePropertyAssignment(file, declaration, assignment);
    }

    function updateFieldDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: AccepedDeclaration, fieldName: AccepedNameType, modifiers: ModifiersArray | undefined, container: ContainerDeclation) {
        if (isPropertyDeclaration(declaration)) {
            updatePropertyDeclaration(changeTracker, file, declaration, fieldName, modifiers);
        }
        else if (isPropertyAssignment(declaration)) {
            updatePropertyAssignmentDeclaration(changeTracker, file, declaration, fieldName);
        }
        else {
            updateParameterPropertyDeclaration(changeTracker, file, declaration, fieldName, modifiers, <ClassLikeDeclaration>container);
        }
    }

    function insertAccessor(changeTracker: textChanges.ChangeTracker, file: SourceFile, accessor: AccessorDeclaration, declaration: AccepedDeclaration, container: ContainerDeclation) {
        isParameterPropertyDeclaration(declaration)
            ? changeTracker.insertNodeAtClassStart(file, <ClassLikeDeclaration>container, accessor)
            : changeTracker.insertNodeAfter(file, declaration, accessor);
    }
}
