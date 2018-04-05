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

            const result = [
                getActionForAddMissingUndefinedType(context, propertyDeclaration),
                getActionForAddMissingDefiniteAssignmentAssertion(context, propertyDeclaration)
            ];

            append(result, getActionForAddMissingInitializer(context, propertyDeclaration));

            return result;
        },
        fixIds: [fixIdAddDefiniteAssignmentAssertions, fixIdAddUndefinedType, fixIdAddInitializer],
        getAllCodeActions: context => {
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const propertyDeclaration = getPropertyDeclaration(diag.file, diag.start);
                if (!propertyDeclaration) return;

                switch (context.fixId) {
                    case fixIdAddDefiniteAssignmentAssertions:
                        addDefiniteAssignmentAssertion(changes, diag.file, propertyDeclaration);
                        break;
                    case fixIdAddUndefinedType:
                        addUndefinedType(changes, diag.file, propertyDeclaration);
                        break;
                    case fixIdAddInitializer:
                        const checker = context.program.getTypeChecker();
                        const initializer = getInitializer(checker, propertyDeclaration);
                        if (!initializer) return;

                        addInitializer(changes, diag.file, propertyDeclaration, initializer);
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

    function getActionForAddMissingDefiniteAssignmentAssertion (context: CodeFixContext, propertyDeclaration: PropertyDeclaration): CodeFixAction {
        const changes = textChanges.ChangeTracker.with(context, t => addDefiniteAssignmentAssertion(t, context.sourceFile, propertyDeclaration));
        return createCodeFixAction(changes, [Diagnostics.Add_definite_assignment_assertion_to_property_0, propertyDeclaration.getText()], fixIdAddDefiniteAssignmentAssertions, Diagnostics.Add_definite_assignment_assertions_to_all_uninitialized_properties);
    }

    function addDefiniteAssignmentAssertion(changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration): void {
        const property = updateProperty(
            propertyDeclaration,
            propertyDeclaration.decorators,
            propertyDeclaration.modifiers,
            propertyDeclaration.name,
            createToken(SyntaxKind.ExclamationToken),
            propertyDeclaration.type,
            propertyDeclaration.initializer
        );
        changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
    }

    function getActionForAddMissingUndefinedType (context: CodeFixContext, propertyDeclaration: PropertyDeclaration): CodeFixAction {
        const changes = textChanges.ChangeTracker.with(context, t => addUndefinedType(t, context.sourceFile, propertyDeclaration));
        return createCodeFixAction(changes, [Diagnostics.Add_undefined_type_to_property_0, propertyDeclaration.name.getText()], fixIdAddUndefinedType, Diagnostics.Add_undefined_type_to_all_uninitialized_properties);
    }

    function addUndefinedType(changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration): void {
        const undefinedTypeNode = createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
        const types = isUnionTypeNode(propertyDeclaration.type) ? propertyDeclaration.type.types.concat(undefinedTypeNode) : [propertyDeclaration.type, undefinedTypeNode];
        changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration.type, createUnionTypeNode(types));
    }

    function getActionForAddMissingInitializer(context: CodeFixContext, propertyDeclaration: PropertyDeclaration): CodeFixAction | undefined {
        const checker = context.program.getTypeChecker();
        const initializer = getInitializer(checker, propertyDeclaration);
        if (!initializer) return undefined;

        const changes = textChanges.ChangeTracker.with(context, t => addInitializer(t, context.sourceFile, propertyDeclaration, initializer));
        return createCodeFixAction(changes, [Diagnostics.Add_initializer_to_property_0, propertyDeclaration.name.getText()], fixIdAddInitializer, Diagnostics.Add_initializers_to_all_uninitialized_properties);
    }

    function addInitializer (changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration, initializer: Expression): void {
        const property = updateProperty(
            propertyDeclaration,
            propertyDeclaration.decorators,
            propertyDeclaration.modifiers,
            propertyDeclaration.name,
            propertyDeclaration.questionToken,
            propertyDeclaration.type,
            initializer
        );
        changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
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
        else if (type.isLiteral()) {
            return createLiteral(type.value);
        }
        else if (type.isUnion()) {
            return firstDefined(type.types, t => getDefaultValueFromType(checker, t));
        }
        else if (type.isClass()) {
            const classDeclaration = getClassLikeDeclarationOfSymbol(type.symbol);
            if (!classDeclaration || hasModifier(classDeclaration, ModifierFlags.Abstract)) return undefined;

            const constructorDeclaration = find<ClassElement, ConstructorDeclaration>(classDeclaration.members, (m): m is ConstructorDeclaration => isConstructorDeclaration(m) && !!m.body)!;
            if (constructorDeclaration && constructorDeclaration.parameters.length) return undefined;

            return createNew(createIdentifier(type.symbol.name), /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
        }
        return undefined;
    }
}
