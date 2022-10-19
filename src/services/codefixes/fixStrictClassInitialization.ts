/* @internal */
namespace ts.codefix {
const fixName = "strictClassInitialization";
const fixIdAddDefiniteAssignmentAssertions = "addMissingPropertyDefiniteAssignmentAssertions";
const fixIdAddUndefinedType = "addMissingPropertyUndefinedType";
const fixIdAddInitializer = "addMissingPropertyInitializer";
const errorCodes = [ts.Diagnostics.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsForStrictClassInitializationErrors(context) {
        const info = getInfo(context.sourceFile, context.span.start);
        if (!info) return;

        const result: ts.CodeFixAction[] = [];
        ts.append(result, getActionForAddMissingUndefinedType(context, info));
        ts.append(result, getActionForAddMissingDefiniteAssignmentAssertion(context, info));
        ts.append(result, getActionForAddMissingInitializer(context, info));
        return result;
    },
    fixIds: [fixIdAddDefiniteAssignmentAssertions, fixIdAddUndefinedType, fixIdAddInitializer],
    getAllCodeActions: context => {
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, diag.start);
            if (!info) return;

            switch (context.fixId) {
                case fixIdAddDefiniteAssignmentAssertions:
                    addDefiniteAssignmentAssertion(changes, diag.file, info.prop);
                    break;
                case fixIdAddUndefinedType:
                    addUndefinedType(changes, diag.file, info);
                    break;
                case fixIdAddInitializer:
                    const checker = context.program.getTypeChecker();
                    const initializer = getInitializer(checker, info.prop);
                    if (!initializer) return;
                    addInitializer(changes, diag.file, info.prop, initializer);
                    break;
                default:
                    ts.Debug.fail(JSON.stringify(context.fixId));
            }
        });
    },
});

interface Info {
    prop: ts.PropertyDeclaration;
    type: ts.TypeNode;
    isJs: boolean;
}

function getInfo(sourceFile: ts.SourceFile, pos: number): Info | undefined {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    if (ts.isIdentifier(token) && ts.isPropertyDeclaration(token.parent)) {
        const type = ts.getEffectiveTypeAnnotationNode(token.parent);
        if (type) {
            return { type, prop: token.parent, isJs: ts.isInJSFile(token.parent) };
        }
    }
    return undefined;
}

function getActionForAddMissingDefiniteAssignmentAssertion(context: ts.CodeFixContext, info: Info): ts.CodeFixAction | undefined {
    if (info.isJs) return undefined;
    const changes = ts.textChanges.ChangeTracker.with(context, t => addDefiniteAssignmentAssertion(t, context.sourceFile, info.prop));
    return ts.codefix.createCodeFixAction(fixName, changes, [ts.Diagnostics.Add_definite_assignment_assertion_to_property_0, info.prop.getText()], fixIdAddDefiniteAssignmentAssertions, ts.Diagnostics.Add_definite_assignment_assertions_to_all_uninitialized_properties);
}

function addDefiniteAssignmentAssertion(changeTracker: ts.textChanges.ChangeTracker, propertyDeclarationSourceFile: ts.SourceFile, propertyDeclaration: ts.PropertyDeclaration): void {
    ts.suppressLeadingAndTrailingTrivia(propertyDeclaration);
    const property = ts.factory.updatePropertyDeclaration(
        propertyDeclaration,
        propertyDeclaration.modifiers,
        propertyDeclaration.name,
        ts.factory.createToken(ts.SyntaxKind.ExclamationToken),
        propertyDeclaration.type,
        propertyDeclaration.initializer
    );
    changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
}

function getActionForAddMissingUndefinedType(context: ts.CodeFixContext, info: Info): ts.CodeFixAction {
    const changes = ts.textChanges.ChangeTracker.with(context, t => addUndefinedType(t, context.sourceFile, info));
    return ts.codefix.createCodeFixAction(fixName, changes, [ts.Diagnostics.Add_undefined_type_to_property_0, info.prop.name.getText()], fixIdAddUndefinedType, ts.Diagnostics.Add_undefined_type_to_all_uninitialized_properties);
}

function addUndefinedType(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, info: Info): void {
    const undefinedTypeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword);
    const types = ts.isUnionTypeNode(info.type) ? info.type.types.concat(undefinedTypeNode) : [info.type, undefinedTypeNode];
    const unionTypeNode = ts.factory.createUnionTypeNode(types);
    if (info.isJs) {
        changeTracker.addJSDocTags(sourceFile, info.prop, [ts.factory.createJSDocTypeTag(/*tagName*/ undefined, ts.factory.createJSDocTypeExpression(unionTypeNode))]);
    }
    else {
        changeTracker.replaceNode(sourceFile, info.type, unionTypeNode);
    }
}

function getActionForAddMissingInitializer(context: ts.CodeFixContext, info: Info): ts.CodeFixAction | undefined {
    if (info.isJs) return undefined;

    const checker = context.program.getTypeChecker();
    const initializer = getInitializer(checker, info.prop);
    if (!initializer) return undefined;

    const changes = ts.textChanges.ChangeTracker.with(context, t => addInitializer(t, context.sourceFile, info.prop, initializer));
    return ts.codefix.createCodeFixAction(fixName, changes, [ts.Diagnostics.Add_initializer_to_property_0, info.prop.name.getText()], fixIdAddInitializer, ts.Diagnostics.Add_initializers_to_all_uninitialized_properties);
}

function addInitializer(changeTracker: ts.textChanges.ChangeTracker, propertyDeclarationSourceFile: ts.SourceFile, propertyDeclaration: ts.PropertyDeclaration, initializer: ts.Expression): void {
    ts.suppressLeadingAndTrailingTrivia(propertyDeclaration);
    const property = ts.factory.updatePropertyDeclaration(
        propertyDeclaration,
        propertyDeclaration.modifiers,
        propertyDeclaration.name,
        propertyDeclaration.questionToken,
        propertyDeclaration.type,
        initializer
    );
    changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
}

function getInitializer(checker: ts.TypeChecker, propertyDeclaration: ts.PropertyDeclaration): ts.Expression | undefined {
    return getDefaultValueFromType(checker, checker.getTypeFromTypeNode(propertyDeclaration.type!)); // TODO: GH#18217
}

function getDefaultValueFromType(checker: ts.TypeChecker, type: ts.Type): ts.Expression | undefined {
    if (type.flags & ts.TypeFlags.BooleanLiteral) {
        return (type === checker.getFalseType() || type === checker.getFalseType(/*fresh*/ true)) ? ts.factory.createFalse() : ts.factory.createTrue();
    }
    else if (type.isStringLiteral()) {
        return ts.factory.createStringLiteral(type.value);
    }
    else if (type.isNumberLiteral()) {
        return ts.factory.createNumericLiteral(type.value);
    }
    else if (type.flags & ts.TypeFlags.BigIntLiteral) {
        return ts.factory.createBigIntLiteral((type as ts.BigIntLiteralType).value);
    }
    else if (type.isUnion()) {
        return ts.firstDefined(type.types, t => getDefaultValueFromType(checker, t));
    }
    else if (type.isClass()) {
        const classDeclaration = ts.getClassLikeDeclarationOfSymbol(type.symbol);
        if (!classDeclaration || ts.hasSyntacticModifier(classDeclaration, ts.ModifierFlags.Abstract)) return undefined;

        const constructorDeclaration = ts.getFirstConstructorWithBody(classDeclaration);
        if (constructorDeclaration && constructorDeclaration.parameters.length) return undefined;

        return ts.factory.createNewExpression(ts.factory.createIdentifier(type.symbol.name), /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
    }
    else if (checker.isArrayLikeType(type)) {
        return ts.factory.createArrayLiteralExpression();
    }
    return undefined;
}
}
