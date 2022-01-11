import { Diagnostics, append, Debug, SourceFile, PropertyDeclaration, getTokenAtPosition, isIdentifier, cast, isPropertyDeclaration, CodeFixContext, CodeFixAction, factory, SyntaxKind, isUnionTypeNode, Expression, TypeChecker, Type, TypeFlags, BigIntLiteralType, firstDefined, getClassLikeDeclarationOfSymbol, hasSyntacticModifier, ModifierFlags, getFirstConstructorWithBody } from "../ts";
import { registerCodeFix, codeFixAll, createCodeFixAction } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixName = "strictClassInitialization";
/* @internal */
const fixIdAddDefiniteAssignmentAssertions = "addMissingPropertyDefiniteAssignmentAssertions";
/* @internal */
const fixIdAddUndefinedType = "addMissingPropertyUndefinedType";
/* @internal */
const fixIdAddInitializer = "addMissingPropertyInitializer";
/* @internal */
const errorCodes = [Diagnostics.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsForStrictClassInitializationErrors(context) {
        const propertyDeclaration = getPropertyDeclaration(context.sourceFile, context.span.start);
        if (!propertyDeclaration)
            return;

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
            if (!propertyDeclaration)
                return;

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
                    if (!initializer)
                        return;

                    addInitializer(changes, diag.file, propertyDeclaration, initializer);
                    break;
                default:
                    Debug.fail(JSON.stringify(context.fixId));
            }
        });
    },
});

/* @internal */
function getPropertyDeclaration(sourceFile: SourceFile, pos: number): PropertyDeclaration | undefined {
    const token = getTokenAtPosition(sourceFile, pos);
    return isIdentifier(token) ? cast(token.parent, isPropertyDeclaration) : undefined;
}

/* @internal */
function getActionForAddMissingDefiniteAssignmentAssertion(context: CodeFixContext, propertyDeclaration: PropertyDeclaration): CodeFixAction {
    const changes = ChangeTracker.with(context, t => addDefiniteAssignmentAssertion(t, context.sourceFile, propertyDeclaration));
    return createCodeFixAction(fixName, changes, [Diagnostics.Add_definite_assignment_assertion_to_property_0, propertyDeclaration.getText()], fixIdAddDefiniteAssignmentAssertions, Diagnostics.Add_definite_assignment_assertions_to_all_uninitialized_properties);
}

/* @internal */
function addDefiniteAssignmentAssertion(changeTracker: ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration): void {
    const property = factory.updatePropertyDeclaration(propertyDeclaration, propertyDeclaration.decorators, propertyDeclaration.modifiers, propertyDeclaration.name, factory.createToken(SyntaxKind.ExclamationToken), propertyDeclaration.type, propertyDeclaration.initializer);
    changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
}

/* @internal */
function getActionForAddMissingUndefinedType(context: CodeFixContext, propertyDeclaration: PropertyDeclaration): CodeFixAction {
    const changes = ChangeTracker.with(context, t => addUndefinedType(t, context.sourceFile, propertyDeclaration));
    return createCodeFixAction(fixName, changes, [Diagnostics.Add_undefined_type_to_property_0, propertyDeclaration.name.getText()], fixIdAddUndefinedType, Diagnostics.Add_undefined_type_to_all_uninitialized_properties);
}

/* @internal */
function addUndefinedType(changeTracker: ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration): void {
    const undefinedTypeNode = factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
    const type = propertyDeclaration.type!; // TODO: GH#18217
    const types = isUnionTypeNode(type) ? type.types.concat(undefinedTypeNode) : [type, undefinedTypeNode];
    changeTracker.replaceNode(propertyDeclarationSourceFile, type, factory.createUnionTypeNode(types));
}

/* @internal */
function getActionForAddMissingInitializer(context: CodeFixContext, propertyDeclaration: PropertyDeclaration): CodeFixAction | undefined {
    const checker = context.program.getTypeChecker();
    const initializer = getInitializer(checker, propertyDeclaration);
    if (!initializer)
        return undefined;
    const changes = ChangeTracker.with(context, t => addInitializer(t, context.sourceFile, propertyDeclaration, initializer));
    return createCodeFixAction(fixName, changes, [Diagnostics.Add_initializer_to_property_0, propertyDeclaration.name.getText()], fixIdAddInitializer, Diagnostics.Add_initializers_to_all_uninitialized_properties);
}

/* @internal */
function addInitializer(changeTracker: ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration, initializer: Expression): void {
    const property = factory.updatePropertyDeclaration(propertyDeclaration, propertyDeclaration.decorators, propertyDeclaration.modifiers, propertyDeclaration.name, propertyDeclaration.questionToken, propertyDeclaration.type, initializer);
    changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
}

/* @internal */
function getInitializer(checker: TypeChecker, propertyDeclaration: PropertyDeclaration): Expression | undefined {
    return getDefaultValueFromType(checker, checker.getTypeFromTypeNode(propertyDeclaration.type!)); // TODO: GH#18217
}

/* @internal */
function getDefaultValueFromType(checker: TypeChecker, type: Type): Expression | undefined {
    if (type.flags & TypeFlags.BooleanLiteral) {
        return (type === checker.getFalseType() || type === checker.getFalseType(/*fresh*/ true)) ? factory.createFalse() : factory.createTrue();
    }
    else if (type.isStringLiteral()) {
        return factory.createStringLiteral(type.value);
    }
    else if (type.isNumberLiteral()) {
        return factory.createNumericLiteral(type.value);
    }
    else if (type.flags & TypeFlags.BigIntLiteral) {
        return factory.createBigIntLiteral((type as BigIntLiteralType).value);
    }
    else if (type.isUnion()) {
        return firstDefined(type.types, t => getDefaultValueFromType(checker, t));
    }
    else if (type.isClass()) {
        const classDeclaration = getClassLikeDeclarationOfSymbol(type.symbol);
        if (!classDeclaration || hasSyntacticModifier(classDeclaration, ModifierFlags.Abstract))
            return undefined;

        const constructorDeclaration = getFirstConstructorWithBody(classDeclaration);
        if (constructorDeclaration && constructorDeclaration.parameters.length)
            return undefined;

        return factory.createNewExpression(factory.createIdentifier(type.symbol.name), /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
    }
    else if (checker.isArrayLikeType(type)) {
        return factory.createArrayLiteralExpression();
    }
    return undefined;
}
