/* @internal */
namespace ts.refactor.GenerateGetterAndSetter {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;

    registerRefactor(actionName, { getEditsForAction, getAvailableActions });

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

        const { fieldName, accessorName, propertyDeclaration, needUpdateName, hasModifiers, needUpdateModifiers } = fieldInfo;
        const accessorModifiers = hasModifiers ? createNodeArray([createToken(SyntaxKind.PublicKeyword)]) : undefined;

        const getAccessor = generateGetAccessor(propertyDeclaration, fieldName, accessorName, accessorModifiers);
        const setAccessor = generateSetAccessor(propertyDeclaration, fieldName, accessorName, accessorModifiers);

        const modifiers = needUpdateModifiers ? createNodeArray([createToken(SyntaxKind.PrivateKeyword)]) : propertyDeclaration.modifiers;
        if (needUpdateName || needUpdateModifiers) {
            changeTracker.replaceNode(file, propertyDeclaration, updateOriginPropertyDeclaration(propertyDeclaration, fieldName, modifiers), {
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

    interface Info { originName: string; fieldName: string; accessorName: string; propertyDeclaration: PropertyDeclaration; needUpdateName: boolean; hasModifiers: boolean; needUpdateModifiers: boolean; }
    function getConvertibleFieldAtPosition(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        const propertyDeclaration = findAncestor(node.parent, isPropertyDeclaration);

        if (!(propertyDeclaration && propertyDeclaration.name.kind === SyntaxKind.Identifier &&
            (getModifierFlags(propertyDeclaration) | ModifierFlags.AccessibilityModifier) === ModifierFlags.AccessibilityModifier)) return undefined;

        const containerClass = getContainingClass(propertyDeclaration);
        if (!containerClass) return undefined;

        const members = getMembersOfDeclaration(containerClass);
        if (!members) return undefined;

        const needUpdateName = propertyDeclaration.name.text.charCodeAt(0) !== CharacterCodes._;

        const accessorName = needUpdateName ? propertyDeclaration.name.text : propertyDeclaration.name.text.substring(1);
        const fieldName = `_${accessorName}`;

        if (find(members, member => needUpdateName ? member.name.getText() === fieldName : member.name.getText() === accessorName)) return undefined;

        const hasModifiers = !!find(members, member => !!member.modifiers);
        const needUpdateModifiers = hasModifiers && (!propertyDeclaration.modifiers || hasModifier(propertyDeclaration, ModifierFlags.Public));

        return {
            originName: propertyDeclaration.name.text,
            fieldName,
            accessorName,
            propertyDeclaration,
            needUpdateName,
            hasModifiers,
            needUpdateModifiers
        };
    }

    function generateGetAccessor (propertyDeclaration: PropertyDeclaration, fieldName: string, name: string, modifiers: ModifiersArray) {
        return createGetAccessor(
            /*decorators*/ undefined,
            modifiers,
            name,
            /*parameters*/ undefined,
            propertyDeclaration.type,
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

    function generateSetAccessor (propertyDeclaration: PropertyDeclaration, fieldName: string, name: string, modifiers: ModifiersArray) {
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
                propertyDeclaration.type
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

    function updateOriginPropertyDeclaration (propertyDeclaration: PropertyDeclaration, fieldName: string, modifiers: ModifiersArray) {
        return updateProperty(
            propertyDeclaration,
            /*decorators*/ undefined,
            modifiers,
            fieldName,
            /*questionOrExclamationToken*/ undefined,
            propertyDeclaration.type,
            propertyDeclaration.initializer,
        );
    }
}
