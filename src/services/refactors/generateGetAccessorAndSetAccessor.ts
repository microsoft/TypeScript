/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;
    registerRefactor(actionName, { getEditsForAction, getAvailableActions });

    interface Info {
        isStatic?: boolean;
        fieldName: Identifier;
        accessorName: string;
        classLikeContainer?: ClassLikeDeclaration;
        declaration: PropertyDeclaration;
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

        const { isStatic, fieldName, accessorName, classLikeContainer, propertyDeclaration } = fieldInfo;
        const accessorModifiers = (!propertyDeclaration.modifiers || getModifierFlags(propertyDeclaration) & ModifierFlags.Private)
            ? createNodeArray([createToken(SyntaxKind.PublicKeyword)])
            : propertyDeclaration.modifiers;

        const getAccessor = generateGetAccessor(fieldName, accessorName, accessorModifiers, propertyDeclaration, isStatic, classLikeContainer);
        const setAccessor = generateSetAccessor(fieldName, accessorName, accessorModifiers, propertyDeclaration, isStatic, classLikeContainer);

        const fieldModifiers = createNodeArray<Modifier>([createToken(SyntaxKind.PrivateKeyword)]);
        if (isStatic) append(fieldModifiers, createToken(SyntaxKind.StaticKeyword));

        changeTracker.replaceNode(file, propertyDeclaration, updateoriginalPropertyDeclaration(propertyDeclaration, fieldName, fieldModifiers), {
            suffix: changeTracker.newLineCharacter
        });

        changeTracker.insertNodeAfter(file, propertyDeclaration, getAccessor);
        changeTracker.insertNodeAfter(file, propertyDeclaration, setAccessor);

        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined,
        };
    }

    function getPropertyDeclarationInfo(propertyDeclaration: PropertyDeclaration): Info | undefined {
        if (!propertyDeclaration || propertyDeclaration.name.kind !== SyntaxKind.Identifier) return undefined;
        // make sure propertyDeclaration have AccessibilityModifier or Static Modifier
        const meaning = ModifierFlags.AccessibilityModifier | ModifierFlags.Static;
        if ((getModifierFlags(propertyDeclaration) | meaning) !== meaning) return undefined;

        if(!isClassLike(propertyDeclaration.parent) || !propertyDeclaration.parent.members) return undefined;

        const accessorName = propertyDeclaration.name.text;

        return {
            accessorName,
            propertyDeclaration,
            fieldName: createUniqueName(accessorName),
            isStatic: hasStaticModifier(propertyDeclaration),
            classLikeContainer: propertyDeclaration.parent
        };
    }

    function getParameterPropertyDeclarationInfo(parameterDeclaration: ParameterDeclaration): Info | undefined {
        if (!parameterDeclaration || !isIdentifier(parameterDeclaration.name) || (<ClassLikeDeclaration>parameterDeclaration.parent.parent).members) return undefined;

        const accessorName = parameterDeclaration.name.text;

        return {
            accessorName,
            propertyDeclaration,
            fieldName: createUniqueName(accessorName),
            isStatic: hasStaticModifier(propertyDeclaration),
            classLikeContainer: propertyDeclaration.parent
        };
        return undefined
    }

    function getConvertibleFieldAtPosition(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        
        const declaration = <ParameterDeclaration | PropertyDeclaration>findAncestor(node.parent, or(isParameterPropertyDeclaration, isPropertyDeclaration));

        if (isPropertyDeclaration(declaration)) return getPropertyDeclarationInfo(declaration);

        return getParameterPropertyDeclarationInfo(declaration);
    }

    function generateGetAccessor (fieldName: Identifier, accessorName: string, modifiers: ModifiersArray, propertyDeclaration: PropertyDeclaration, isStatic: boolean, classLikeContainer: ClassLikeDeclaration) {
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

    function generateSetAccessor (fieldName: Identifier, accessorName: string, modifiers: ModifiersArray, propertyDeclaration: PropertyDeclaration, isStatic: boolean, classLikeContainer: ClassLikeDeclaration) {
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

    function updateoriginalPropertyDeclaration (propertyDeclaration: PropertyDeclaration, fieldName: Identifier, modifiers: ModifiersArray) {
        return updateProperty(
            propertyDeclaration,
            propertyDeclaration.decorators,
            modifiers,
            fieldName,
            propertyDeclaration.questionToken || propertyDeclaration.exclamationToken,
            propertyDeclaration.type,
            propertyDeclaration.initializer
        );
    }
}
