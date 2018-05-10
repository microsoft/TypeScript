/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;
    registerRefactor(actionName, { getEditsForAction, getAvailableActions });

    type AcceptedDeclaration = ParameterPropertyDeclaration | PropertyDeclaration | PropertyAssignment;
    type AcceptedNameType = Identifier | StringLiteral;
    type ContainerDeclaration = ClassLikeDeclaration | ObjectLiteralExpression;

    interface Info {
        container: ContainerDeclaration;
        isStatic: boolean;
        isReadonly: boolean;
        type: TypeNode | undefined;
        declaration: AcceptedDeclaration;
        fieldName: AcceptedNameType;
        accessorName: AcceptedNameType;
        originalName: AcceptedNameType;
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
        const { isStatic, isReadonly, fieldName, accessorName, originalName, type, container, declaration } = fieldInfo;

        suppressLeadingAndTrailingTrivia(fieldName);
        suppressLeadingAndTrailingTrivia(declaration);
        suppressLeadingAndTrailingTrivia(container);

        const isInClassLike = isClassLike(container);
        // avoid Readonly modifier because it will convert to get accessor
        const modifierFlags = getModifierFlags(declaration) & ~ModifierFlags.Readonly;
        const accessorModifiers = isInClassLike
            ? !modifierFlags || modifierFlags & ModifierFlags.Private
                ? getModifiers(isJS, isStatic, SyntaxKind.PublicKeyword)
                : createNodeArray(createModifiersFromModifierFlags(modifierFlags))
            : undefined;
        const fieldModifiers = isInClassLike ? getModifiers(isJS, isStatic, SyntaxKind.PrivateKeyword) : undefined;

        updateFieldDeclaration(changeTracker, file, declaration, fieldName, fieldModifiers);

        const getAccessor = generateGetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);
        suppressLeadingAndTrailingTrivia(getAccessor);
        insertAccessor(changeTracker, file, getAccessor, declaration, container);

        if (isReadonly) {
            // readonly modifier only existed in classLikeDeclaration
            const constructor = getFirstConstructorWithBody(<ClassLikeDeclaration>container);
            if (constructor) {
                updateReadonlyPropertyInitializerStatementConstructor(changeTracker, context, constructor, fieldName, originalName);
            }
        }
        else {
            const setAccessor = generateSetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);
            suppressLeadingAndTrailingTrivia(setAccessor);
            insertAccessor(changeTracker, file, setAccessor, declaration, container);
        }

        const edits = changeTracker.getChanges();
        const renameFilename = file.fileName;
        const renameLocationOffset = isIdentifier(fieldName) ? 0 : -1;
        const renameLocation = renameLocationOffset + getRenameLocation(edits, renameFilename, fieldName.text, /*preferLastLocation*/ isParameter(declaration));
        return { renameFilename, renameLocation, edits };
    }

    function isConvertableName (name: DeclarationName): name is AcceptedNameType {
        return isIdentifier(name) || isStringLiteral(name);
    }

    function isAcceptedDeclaration(node: Node): node is AcceptedDeclaration {
        return isParameterPropertyDeclaration(node) || isPropertyDeclaration(node) || isPropertyAssignment(node);
    }

    function createPropertyName (name: string, originalName: AcceptedNameType) {
        return isIdentifier(originalName) ? createIdentifier(name) : createLiteral(name);
    }

    function createAccessorAccessExpression (fieldName: AcceptedNameType, isStatic: boolean, container: ContainerDeclaration) {
        const leftHead = isStatic ? (<ClassLikeDeclaration>container).name : createThis();
        return isIdentifier(fieldName) ? createPropertyAccess(leftHead, fieldName) : createElementAccess(leftHead, createLiteral(fieldName));
    }

    function getModifiers(isJS: boolean, isStatic: boolean, accessModifier: SyntaxKind.PublicKeyword | SyntaxKind.PrivateKeyword): NodeArray<Modifier> {
        const modifiers = append<Modifier>(
            !isJS ? [createToken(accessModifier) as Token<SyntaxKind.PublicKeyword> | Token<SyntaxKind.PrivateKeyword>] : undefined,
            isStatic ? createToken(SyntaxKind.StaticKeyword) : undefined
        );
        return modifiers && createNodeArray(modifiers);
    }

    function getConvertibleFieldAtPosition(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        const declaration = findAncestor(node.parent, isAcceptedDeclaration);
        // make sure declaration have AccessibilityModifier or Static Modifier or Readonly Modifier
        const meaning = ModifierFlags.AccessibilityModifier | ModifierFlags.Static | ModifierFlags.Readonly;
        if (!declaration || !isConvertableName(declaration.name) || (getModifierFlags(declaration) | meaning) !== meaning) return undefined;

        const fieldName = createPropertyName(getUniqueName(`_${declaration.name.text}`, file.text), declaration.name);
        const accessorName = createPropertyName(declaration.name.text, declaration.name);
        return {
            isStatic: hasStaticModifier(declaration),
            isReadonly: hasReadonlyModifier(declaration),
            type: getTypeAnnotationNode(declaration),
            container: declaration.kind === SyntaxKind.Parameter ? declaration.parent.parent : declaration.parent,
            originalName: <AcceptedNameType>declaration.name,
            declaration,
            fieldName,
            accessorName,
        };
    }

    function generateGetAccessor(fieldName: AcceptedNameType, accessorName: AcceptedNameType, type: TypeNode, modifiers: ModifiersArray | undefined, isStatic: boolean, container: ContainerDeclaration) {
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

    function generateSetAccessor(fieldName: AcceptedNameType, accessorName: AcceptedNameType, type: TypeNode, modifiers: ModifiersArray | undefined, isStatic: boolean, container: ContainerDeclaration) {
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

    function updatePropertyDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: PropertyDeclaration, fieldName: AcceptedNameType, modifiers: ModifiersArray | undefined) {
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

    function updatePropertyAssignmentDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: PropertyAssignment, fieldName: AcceptedNameType) {
        const assignment = updatePropertyAssignment(declaration, fieldName, declaration.initializer);
        changeTracker.replacePropertyAssignment(file, declaration, assignment);
    }

    function updateFieldDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: AcceptedDeclaration, fieldName: AcceptedNameType, modifiers: ModifiersArray | undefined) {
        if (isPropertyDeclaration(declaration)) {
            updatePropertyDeclaration(changeTracker, file, declaration, fieldName, modifiers);
        }
        else if (isPropertyAssignment(declaration)) {
            updatePropertyAssignmentDeclaration(changeTracker, file, declaration, fieldName);
        }
        else {
            changeTracker.replaceNode(file, declaration,
                updateParameter(declaration, declaration.decorators, modifiers, declaration.dotDotDotToken, cast(fieldName, isIdentifier), declaration.questionToken, declaration.type, declaration.initializer));
        }
    }

    function insertAccessor(changeTracker: textChanges.ChangeTracker, file: SourceFile, accessor: AccessorDeclaration, declaration: AcceptedDeclaration, container: ContainerDeclaration) {
        isParameterPropertyDeclaration(declaration)
            ? changeTracker.insertNodeAtClassStart(file, <ClassLikeDeclaration>container, accessor)
            : changeTracker.insertNodeAfter(file, declaration, accessor);
    }

    function updateReadonlyPropertyInitializerStatementConstructor(changeTracker: textChanges.ChangeTracker, context: RefactorContext, constructor: ConstructorDeclaration, fieldName: AcceptedNameType, originalName: AcceptedNameType) {
        if (!constructor.body) return;
        const { file, program, cancellationToken } = context;

        const referenceEntries = mapDefined(FindAllReferences.getReferenceEntriesForNode(originalName.parent.pos, originalName, program, [file], cancellationToken), entry => (
            (entry.type === "node" && rangeContainsRange(constructor, entry.node) && isIdentifier(entry.node) && isWriteAccess(entry.node)) ? entry.node : undefined
        ));

        forEach(referenceEntries, entry => {
            const parent = entry.parent;
            const accessorName = createIdentifier(fieldName.text);
            const node = isBinaryExpression(parent)
                ? updateBinary(parent, accessorName, parent.right, parent.operatorToken)
                : isPropertyAccessExpression(parent)
                    ? updatePropertyAccess(parent, parent.expression, accessorName)
                    : Debug.fail("Unexpected write access token");
            changeTracker.replaceNode(file, parent, node);
        });
    }
}
