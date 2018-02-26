/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;
    registerRefactor(actionName, { getEditsForAction, getAvailableActions });

    interface Info {
        originalName: string;
        fieldName: string;
        accessorName: string;
        accessorType: TypeNode;
        propertyDeclaration: PropertyDeclaration;
        needUpdateName: boolean;
        hasModifiers: boolean;
        needUpdateModifiers: boolean;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const { file, startPosition } = context;

        const fieldInfo = getConvertibleFieldAtPosition(file, startPosition);
        if (!fieldInfo) return undefined;

        return [
            {
                name: actionName,
                description: actionDescription,
                actions: [
                    {
                        name: actionName,
                        description: actionDescription
                    }
                ]
            }
        ];
    }

    function getEditsForAction(context: RefactorContext, _actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;

        const fieldInfo = getConvertibleFieldAtPosition(file, startPosition);
        if (!fieldInfo) return undefined;

        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);

        const { fieldName, accessorName, accessorType, propertyDeclaration, needUpdateName, hasModifiers, needUpdateModifiers } = fieldInfo;
        const accessorModifiers = hasModifiers ? (
            (getModifierFlags(propertyDeclaration) & ModifierFlags.Private || !propertyDeclaration.modifiers) ? createNodeArray([createToken(SyntaxKind.PublicKeyword)]) : propertyDeclaration.modifiers
        ) : undefined;

        const getAccessor = generateGetAccessor(fieldName, accessorName, accessorType, accessorModifiers);
        const setAccessor = generateSetAccessor(fieldName, accessorName, accessorType, accessorModifiers);

        const modifiers = hasModifiers ? createNodeArray([createToken(SyntaxKind.PrivateKeyword)]) : undefined;
        if (needUpdateName || needUpdateModifiers) {
            changeTracker.replaceNode(file, propertyDeclaration, updateoriginalPropertyDeclaration(propertyDeclaration, fieldName, modifiers), {
                suffix: newLineCharacter
            });
        }

        changeTracker.insertNodeAfter(file, propertyDeclaration, getAccessor);
        changeTracker.insertNodeAfter(file, propertyDeclaration, setAccessor);

        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined,
        };
    }

    function getConvertibleFieldAtPosition(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        const propertyDeclaration = findAncestor(node.parent, isPropertyDeclaration);

        if (!propertyDeclaration || propertyDeclaration.name.kind !== SyntaxKind.Identifier) return undefined;
        // make sure propertyDeclaration have only AccessibilityModifier
        if ((getModifierFlags(propertyDeclaration) | ModifierFlags.AccessibilityModifier) !== ModifierFlags.AccessibilityModifier) return undefined;

        const containerClass = getContainingClass(propertyDeclaration);
        if (!containerClass) return undefined;

        const members = getMembersOfDeclaration(containerClass);
        if (!members) return undefined;

        const needUpdateName = propertyDeclaration.name.text.charCodeAt(0) !== CharacterCodes._;

        const accessorName = needUpdateName ? propertyDeclaration.name.text : propertyDeclaration.name.text.substring(1);
        const fieldName = `_${accessorName}`;

        if (find(members, member => needUpdateName ? member.name.getText() === fieldName : member.name.getText() === accessorName)) return undefined;

        const hasModifiers = !!find(members, member => !!member.modifiers);
        const needUpdateModifiers = hasModifiers && (!propertyDeclaration.modifiers || !hasModifier(propertyDeclaration, ModifierFlags.Private));
        const accessorType = propertyDeclaration.questionToken ? mergeTypeNodeToUnion(propertyDeclaration.type, createKeywordTypeNode(SyntaxKind.UndefinedKeyword)) : propertyDeclaration.type;

        return {
            originalName: propertyDeclaration.name.text,
            fieldName,
            accessorName,
            accessorType,
            propertyDeclaration,
            needUpdateName,
            hasModifiers,
            needUpdateModifiers
        };
    }

    function generateGetAccessor (fieldName: string, name: string, type: TypeNode, modifiers: ModifiersArray) {
        return createGetAccessor(
            /*decorators*/ undefined,
            modifiers,
            name,
            /*parameters*/ undefined,
            type,
            createBlock([
                createReturn(
                    createPropertyAccess(
                        createThis(),
                        fieldName
                    )
                )
            ], /*multiLine*/ true)
        );
    }

    function generateSetAccessor (fieldName: string, name: string, type: TypeNode, modifiers: ModifiersArray) {
        return createSetAccessor(
            /*decorators*/ undefined,
            modifiers,
            name,
            [createParameter(
                /*decorators*/ undefined,
                /*modifies*/ undefined,
                /*dotDotDotToken*/ undefined,
                createIdentifier("value"),
                /*questionToken*/ undefined,
                type
            )],
            createBlock([
                createStatement(
                    createAssignment(
                        createPropertyAccess(
                            createThis(),
                            fieldName
                        ),
                        createIdentifier("value")
                    )
                )
            ], /*multiLine*/ true)
        );
    }

    function updateoriginalPropertyDeclaration (propertyDeclaration: PropertyDeclaration, fieldName: string, modifiers: ModifiersArray) {
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
