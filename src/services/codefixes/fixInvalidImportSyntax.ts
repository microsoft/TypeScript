import {
    createCodeFixActionWithoutFixAll,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    addRange,
    CallExpression,
    CodeFixAction,
    CodeFixContext,
    Diagnostics,
    factory,
    findAncestor,
    getEmitModuleKind,
    getNamespaceDeclarationNode,
    getQuotePreference,
    getSourceFileOfNode,
    getTokenAtPosition,
    ImportDeclaration,
    isExpression,
    isImportCall,
    isNamedDeclaration,
    isTransientSymbol,
    makeImport,
    ModuleKind,
    NamespaceImport,
    NewExpression,
    Node,
    SourceFile,
    SyntaxKind,
    textChanges,
} from "../_namespaces/ts.js";

const fixName = "invalidImportSyntax";

function getCodeFixesForImportDeclaration(context: CodeFixContext, node: ImportDeclaration): CodeFixAction[] {
    const sourceFile = getSourceFileOfNode(node);
    const namespace = getNamespaceDeclarationNode(node) as NamespaceImport;
    const opts = context.program.getCompilerOptions();
    const variations: CodeFixAction[] = [];

    // import Bluebird from "bluebird";
    variations.push(createAction(context, sourceFile, node, makeImport(namespace.name, /*namedImports*/ undefined, node.moduleSpecifier, getQuotePreference(sourceFile, context.preferences))));

    if (getEmitModuleKind(opts) === ModuleKind.CommonJS) {
        // import Bluebird = require("bluebird");
        variations.push(createAction(
            context,
            sourceFile,
            node,
            factory.createImportEqualsDeclaration(
                /*modifiers*/ undefined,
                /*isTypeOnly*/ false,
                namespace.name,
                factory.createExternalModuleReference(node.moduleSpecifier),
            ),
        ));
    }

    return variations;
}

function createAction(context: CodeFixContext, sourceFile: SourceFile, node: Node, replacement: Node): CodeFixAction {
    const changes = textChanges.ChangeTracker.with(context, t => t.replaceNode(sourceFile, node, replacement));
    return createCodeFixActionWithoutFixAll(fixName, changes, [Diagnostics.Replace_import_with_0, changes[0].textChanges[0].newText]);
}

registerCodeFix({
    errorCodes: [
        Diagnostics.This_expression_is_not_callable.code,
        Diagnostics.This_expression_is_not_constructable.code,
    ],
    getCodeActions: getActionsForUsageOfInvalidImport,
});

function getActionsForUsageOfInvalidImport(context: CodeFixContext): CodeFixAction[] | undefined {
    const sourceFile = context.sourceFile;
    const targetKind = Diagnostics.This_expression_is_not_callable.code === context.errorCode ? SyntaxKind.CallExpression : SyntaxKind.NewExpression;
    const node = findAncestor(getTokenAtPosition(sourceFile, context.span.start), a => a.kind === targetKind) as CallExpression | NewExpression;
    if (!node) {
        return [];
    }
    const expr = node.expression;
    return getImportCodeFixesForExpression(context, expr);
}

registerCodeFix({
    errorCodes: [
        // The following error codes cover pretty much all assignability errors that could involve an expression
        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code,
        Diagnostics.Type_0_does_not_satisfy_the_constraint_1.code,
        Diagnostics.Type_0_is_not_assignable_to_type_1.code,
        Diagnostics.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated.code,
        Diagnostics.Type_predicate_0_is_not_assignable_to_1.code,
        Diagnostics.Property_0_of_type_1_is_not_assignable_to_2_index_type_3.code,
        Diagnostics._0_index_type_1_is_not_assignable_to_2_index_type_3.code,
        Diagnostics.Property_0_in_type_1_is_not_assignable_to_the_same_property_in_base_type_2.code,
        Diagnostics.Property_0_in_type_1_is_not_assignable_to_type_2.code,
        Diagnostics.Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property.code,
        Diagnostics.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1.code,
    ],
    getCodeActions: getActionsForInvalidImportLocation,
});

function getActionsForInvalidImportLocation(context: CodeFixContext): CodeFixAction[] | undefined {
    const sourceFile = context.sourceFile;
    const node = findAncestor(getTokenAtPosition(sourceFile, context.span.start), a => a.getStart() === context.span.start && a.getEnd() === (context.span.start + context.span.length));
    if (!node) {
        return [];
    }
    return getImportCodeFixesForExpression(context, node);
}

function getImportCodeFixesForExpression(context: CodeFixContext, expr: Node): CodeFixAction[] | undefined {
    const type = context.program.getTypeChecker().getTypeAtLocation(expr);
    if (!(type.symbol && isTransientSymbol(type.symbol) && type.symbol.links.originatingImport)) {
        return [];
    }
    const fixes: CodeFixAction[] = [];
    const relatedImport = type.symbol.links.originatingImport;
    if (!isImportCall(relatedImport)) {
        addRange(fixes, getCodeFixesForImportDeclaration(context, relatedImport));
    }
    if (isExpression(expr) && !(isNamedDeclaration(expr.parent) && expr.parent.name === expr)) {
        const sourceFile = context.sourceFile;
        const changes = textChanges.ChangeTracker.with(context, t => t.replaceNode(sourceFile, expr, factory.createPropertyAccessExpression(expr, "default"), {}));
        fixes.push(createCodeFixActionWithoutFixAll(fixName, changes, Diagnostics.Use_synthetic_default_member));
    }
    return fixes;
}
