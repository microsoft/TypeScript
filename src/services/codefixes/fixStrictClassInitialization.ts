import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    append,
    BigIntLiteralType,
    CodeFixAction,
    CodeFixContext,
    Debug,
    Diagnostics,
    Expression,
    factory,
    firstDefined,
    getClassLikeDeclarationOfSymbol,
    getEffectiveTypeAnnotationNode,
    getFirstConstructorWithBody,
    getTokenAtPosition,
    hasSyntacticModifier,
    isIdentifier,
    isInJSFile,
    isPropertyDeclaration,
    isUnionTypeNode,
    ModifierFlags,
    PropertyDeclaration,
    SourceFile,
    suppressLeadingAndTrailingTrivia,
    SyntaxKind,
    textChanges,
    Type,
    TypeChecker,
    TypeFlags,
    TypeNode,
} from "../_namespaces/ts.js";

const fixName = "strictClassInitialization";
const fixIdAddDefiniteAssignmentAssertions = "addMissingPropertyDefiniteAssignmentAssertions";
const fixIdAddUndefinedType = "addMissingPropertyUndefinedType";
const fixIdAddInitializer = "addMissingPropertyInitializer";
const errorCodes = [Diagnostics.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor.code];
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsForStrictClassInitializationErrors(context) {
        const info = getInfo(context.sourceFile, context.span.start);
        if (!info) return;

        const result: CodeFixAction[] = [];
        append(result, getActionForAddMissingUndefinedType(context, info));
        append(result, getActionForAddMissingDefiniteAssignmentAssertion(context, info));
        append(result, getActionForAddMissingInitializer(context, info));
        return result;
    },
    fixIds: [fixIdAddDefiniteAssignmentAssertions, fixIdAddUndefinedType, fixIdAddInitializer],
    getAllCodeActions: context => {
        return codeFixAll(context, errorCodes, (changes, diag) => {
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
                    Debug.fail(JSON.stringify(context.fixId));
            }
        });
    },
});

interface Info {
    prop: PropertyDeclaration;
    type: TypeNode;
    isJs: boolean;
}

function getInfo(sourceFile: SourceFile, pos: number): Info | undefined {
    const token = getTokenAtPosition(sourceFile, pos);
    if (isIdentifier(token) && isPropertyDeclaration(token.parent)) {
        const type = getEffectiveTypeAnnotationNode(token.parent);
        if (type) {
            return { type, prop: token.parent, isJs: isInJSFile(token.parent) };
        }
    }
    return undefined;
}

function getActionForAddMissingDefiniteAssignmentAssertion(context: CodeFixContext, info: Info): CodeFixAction | undefined {
    if (info.isJs) return undefined;
    const changes = textChanges.ChangeTracker.with(context, t => addDefiniteAssignmentAssertion(t, context.sourceFile, info.prop));
    return createCodeFixAction(fixName, changes, [Diagnostics.Add_definite_assignment_assertion_to_property_0, info.prop.getText()], fixIdAddDefiniteAssignmentAssertions, Diagnostics.Add_definite_assignment_assertions_to_all_uninitialized_properties);
}

function addDefiniteAssignmentAssertion(changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration): void {
    suppressLeadingAndTrailingTrivia(propertyDeclaration);
    const property = factory.updatePropertyDeclaration(
        propertyDeclaration,
        propertyDeclaration.modifiers,
        propertyDeclaration.name,
        factory.createToken(SyntaxKind.ExclamationToken),
        propertyDeclaration.type,
        propertyDeclaration.initializer,
    );
    changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
}

function getActionForAddMissingUndefinedType(context: CodeFixContext, info: Info): CodeFixAction {
    const changes = textChanges.ChangeTracker.with(context, t => addUndefinedType(t, context.sourceFile, info));
    return createCodeFixAction(fixName, changes, [Diagnostics.Add_undefined_type_to_property_0, info.prop.name.getText()], fixIdAddUndefinedType, Diagnostics.Add_undefined_type_to_all_uninitialized_properties);
}

function addUndefinedType(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, info: Info): void {
    const undefinedTypeNode = factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
    const types = isUnionTypeNode(info.type) ? info.type.types.concat(undefinedTypeNode) : [info.type, undefinedTypeNode];
    const unionTypeNode = factory.createUnionTypeNode(types);
    if (info.isJs) {
        changeTracker.addJSDocTags(sourceFile, info.prop, [factory.createJSDocTypeTag(/*tagName*/ undefined, factory.createJSDocTypeExpression(unionTypeNode))]);
    }
    else {
        changeTracker.replaceNode(sourceFile, info.type, unionTypeNode);
    }
}

function getActionForAddMissingInitializer(context: CodeFixContext, info: Info): CodeFixAction | undefined {
    if (info.isJs) return undefined;

    const checker = context.program.getTypeChecker();
    const initializer = getInitializer(checker, info.prop);
    if (!initializer) return undefined;

    const changes = textChanges.ChangeTracker.with(context, t => addInitializer(t, context.sourceFile, info.prop, initializer));
    return createCodeFixAction(fixName, changes, [Diagnostics.Add_initializer_to_property_0, info.prop.name.getText()], fixIdAddInitializer, Diagnostics.Add_initializers_to_all_uninitialized_properties);
}

function addInitializer(changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration, initializer: Expression): void {
    suppressLeadingAndTrailingTrivia(propertyDeclaration);
    const property = factory.updatePropertyDeclaration(
        propertyDeclaration,
        propertyDeclaration.modifiers,
        propertyDeclaration.name,
        propertyDeclaration.questionToken,
        propertyDeclaration.type,
        initializer,
    );
    changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property);
}

function getInitializer(checker: TypeChecker, propertyDeclaration: PropertyDeclaration): Expression | undefined {
    return getDefaultValueFromType(checker, checker.getTypeFromTypeNode(propertyDeclaration.type!)); // TODO: GH#18217
}

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
        if (!classDeclaration || hasSyntacticModifier(classDeclaration, ModifierFlags.Abstract)) return undefined;

        const constructorDeclaration = getFirstConstructorWithBody(classDeclaration);
        if (constructorDeclaration && constructorDeclaration.parameters.length) return undefined;

        return factory.createNewExpression(factory.createIdentifier(type.symbol.name), /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
    }
    else if (checker.isArrayLikeType(type)) {
        return factory.createArrayLiteralExpression();
    }
    return undefined;
}
