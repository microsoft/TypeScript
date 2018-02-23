/* @internal */
namespace ts.codefix {
    const fixIdAddDefiniteAssignmentAssertions = "addMissingPropertyDefiniteAssignmentAssertions";
    const fixIdAddUndefinedType = "addMissingPropertyUndefinedType";
    const fixIdAddInitializer = "addMissingPropertyInitializer";
    const errorCodes = [Diagnostics.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const propertyDeclaration = getPropertyDeclaration(context.sourceFile, context.span.start);
            if (!propertyDeclaration) return;

            const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);
            const result = [
                getActionForAddMissingUndefinedType(context, propertyDeclaration),
                getActionForAddMissingDefiniteAssignmentAssertion(context, propertyDeclaration, newLineCharacter)
            ];

            append(result, getActionForAddMissingInitializer(context, propertyDeclaration, newLineCharacter));

            return result;
        },
        fixIds: [fixIdAddDefiniteAssignmentAssertions, fixIdAddUndefinedType, fixIdAddInitializer],
        getAllCodeActions: context => {
            const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);

            return codeFixAll(context, errorCodes, (changes, diag) => {
                const propertyDeclaration = getPropertyDeclaration(diag.file, diag.start);
                if (!propertyDeclaration) return;

                switch (context.fixId) {
                    case fixIdAddDefiniteAssignmentAssertions:
                        addDefiniteAssignmentAssertion(changes, diag.file, propertyDeclaration, newLineCharacter);
                        break;
                    case fixIdAddUndefinedType:
                        addUndefinedType(changes, diag.file, propertyDeclaration);
                        break;
                    case fixIdAddInitializer:
                        const checker = context.program.getTypeChecker();
                        const initializer = getInitializer(checker, propertyDeclaration);
                        if (!initializer) return;

                        addInitializer(changes, diag.file, propertyDeclaration, initializer, newLineCharacter);
                        break;
                    default:
                        Debug.fail(JSON.stringify(context.fixId));
                }
            });
        },
    });

    function getPropertyDeclaration (sourceFile: SourceFile, pos: number): PropertyDeclaration | undefined {
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        return isIdentifier(token) ? cast(token.parent, isPropertyDeclaration) : undefined;
    }

    function getActionForAddMissingDefiniteAssignmentAssertion (context: CodeFixContext, propertyDeclaration: PropertyDeclaration, newLineCharacter: string): CodeFixAction {
        const description = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_definite_assignment_assertion_to_property_0), [propertyDeclaration.getText()]);
        const changes = textChanges.ChangeTracker.with(context, t => addDefiniteAssignmentAssertion(t, context.sourceFile, propertyDeclaration, newLineCharacter));
        return { description, changes, fixId: fixIdAddDefiniteAssignmentAssertions };
    }

    function addDefiniteAssignmentAssertion(changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration, newLineCharacter: string): void {
        const property = updateProperty(
            propertyDeclaration,
            propertyDeclaration.decorators,
            propertyDeclaration.modifiers,
            propertyDeclaration.name,
            createToken(SyntaxKind.ExclamationToken),
            propertyDeclaration.type,
            propertyDeclaration.initializer
        );
        changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property, { suffix: newLineCharacter });
    }

    function getActionForAddMissingUndefinedType (context: CodeFixContext, propertyDeclaration: PropertyDeclaration): CodeFixAction {
        const description = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_undefined_type_to_property_0), [propertyDeclaration.name.getText()]);
        const changes = textChanges.ChangeTracker.with(context, t => addUndefinedType(t, context.sourceFile, propertyDeclaration));
        return { description, changes, fixId: fixIdAddUndefinedType };
    }

    function addUndefinedType(changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration): void {
        const undefinedTypeNode = createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
        const types = isUnionTypeNode(propertyDeclaration.type) ? propertyDeclaration.type.types.concat(undefinedTypeNode) : [propertyDeclaration.type, undefinedTypeNode];
        changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration.type, createUnionTypeNode(types));
    }

    function getActionForAddMissingInitializer (context: CodeFixContext, propertyDeclaration: PropertyDeclaration, newLineCharacter: string): CodeFixAction | undefined {
        const checker = context.program.getTypeChecker();
        const initializer = getInitializer(checker, propertyDeclaration);
        if (!initializer) return undefined;

        const description = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_initializer_to_property_0), [propertyDeclaration.name.getText()]);
        const changes = textChanges.ChangeTracker.with(context, t => addInitializer(t, context.sourceFile, propertyDeclaration, initializer, newLineCharacter));
        return { description, changes, fixId: fixIdAddInitializer };
    }

    function addInitializer (changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration, initializer: Expression, newLineCharacter: string): void {
        const property = updateProperty(
            propertyDeclaration,
            propertyDeclaration.decorators,
            propertyDeclaration.modifiers,
            propertyDeclaration.name,
            propertyDeclaration.questionToken,
            propertyDeclaration.type,
            initializer
        );
        changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property, { suffix: newLineCharacter });
    }

    function getInitializer(checker: TypeChecker, propertyDeclaration: PropertyDeclaration): Expression | undefined {
        return getDefaultValueFromType(checker, checker.getTypeFromTypeNode(propertyDeclaration.type));
    }

    function getDefaultValueFromType (checker: TypeChecker, type: Type): Expression | undefined {
        if (type.flags & TypeFlags.String) {
            return createLiteral("");
        }
        else if (type.flags & TypeFlags.Number) {
            return createNumericLiteral("0");
        }
        else if (type.flags & TypeFlags.Boolean) {
            return createFalse();
        }
        else if (type.flags & TypeFlags.Literal) {
            return createLiteral((<LiteralType>type).value);
        }
        else if (type.flags & TypeFlags.Union) {
            return firstDefined((<UnionType>type).types, t => getDefaultValueFromType(checker, t));
        }
        else if (getObjectFlags(type) & ObjectFlags.Class) {
            const classDeclaration = getClassLikeDeclarationOfSymbol(type.symbol);
            if (!classDeclaration || hasModifier(classDeclaration, ModifierFlags.Abstract)) return undefined;

            const constructorDeclaration = find<ClassElement, ConstructorDeclaration>(classDeclaration.members, (m): m is ConstructorDeclaration => isConstructorDeclaration(m) && !!m.body)!;
            if (constructorDeclaration && constructorDeclaration.parameters.length) return undefined;

            return createNew(createIdentifier(type.symbol.name), /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
        }
        return undefined;
    }
}
