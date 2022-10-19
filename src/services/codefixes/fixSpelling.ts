import * as ts from "../_namespaces/ts";

const fixId = "fixSpelling";
const errorCodes = [
    ts.Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code,
    ts.Diagnostics.Property_0_may_not_exist_on_type_1_Did_you_mean_2.code,
    ts.Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
    ts.Diagnostics.Could_not_find_name_0_Did_you_mean_1.code,
    ts.Diagnostics.Cannot_find_namespace_0_Did_you_mean_1.code,
    ts.Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
    ts.Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code,
    ts.Diagnostics._0_has_no_exported_member_named_1_Did_you_mean_2.code,
    ts.Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0_Did_you_mean_1.code,
    ts.Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0_Did_you_mean_1.code,
    // for JSX class components
    ts.Diagnostics.No_overload_matches_this_call.code,
    // for JSX FC
    ts.Diagnostics.Type_0_is_not_assignable_to_type_1.code,
];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, errorCode } = context;
        const info = getInfo(sourceFile, context.span.start, context, errorCode);
        if (!info) return undefined;
        const { node, suggestedSymbol } = info;
        const target = ts.getEmitScriptTarget(context.host.getCompilationSettings());
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, node, suggestedSymbol, target));
        return [ts.codefix.createCodeFixAction("spelling", changes, [ts.Diagnostics.Change_spelling_to_0, ts.symbolName(suggestedSymbol)], fixId, ts.Diagnostics.Fix_all_detected_spelling_errors)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, diag.start, context, diag.code);
        const target = ts.getEmitScriptTarget(context.host.getCompilationSettings());
        if (info) doChange(changes, context.sourceFile, info.node, info.suggestedSymbol, target);
    }),
});

function getInfo(sourceFile: ts.SourceFile, pos: number, context: ts.CodeFixContextBase, errorCode: number): { node: ts.Node, suggestedSymbol: ts.Symbol } | undefined {
    // This is the identifier of the misspelled word. eg:
    // this.speling = 1;
    //      ^^^^^^^
    const node = ts.getTokenAtPosition(sourceFile, pos);
    const parent = node.parent;
    // Only fix spelling for No_overload_matches_this_call emitted on the React class component
    if ((
        errorCode === ts.Diagnostics.No_overload_matches_this_call.code ||
        errorCode === ts.Diagnostics.Type_0_is_not_assignable_to_type_1.code) &&
        !ts.isJsxAttribute(parent)) return undefined;
    const checker = context.program.getTypeChecker();

    let suggestedSymbol: ts.Symbol | undefined;
    if (ts.isPropertyAccessExpression(parent) && parent.name === node) {
        ts.Debug.assert(ts.isMemberName(node), "Expected an identifier for spelling (property access)");
        let containingType = checker.getTypeAtLocation(parent.expression);
        if (parent.flags & ts.NodeFlags.OptionalChain) {
            containingType = checker.getNonNullableType(containingType);
        }
        suggestedSymbol = checker.getSuggestedSymbolForNonexistentProperty(node, containingType);
    }
    else if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.InKeyword && parent.left === node && ts.isPrivateIdentifier(node)) {
        const receiverType = checker.getTypeAtLocation(parent.right);
        suggestedSymbol = checker.getSuggestedSymbolForNonexistentProperty(node, receiverType);
    }
    else if (ts.isQualifiedName(parent) && parent.right === node) {
        const symbol = checker.getSymbolAtLocation(parent.left);
        if (symbol && symbol.flags & ts.SymbolFlags.Module) {
            suggestedSymbol = checker.getSuggestedSymbolForNonexistentModule(parent.right, symbol);
        }
    }
    else if (ts.isImportSpecifier(parent) && parent.name === node) {
        ts.Debug.assertNode(node, ts.isIdentifier, "Expected an identifier for spelling (import)");
        const importDeclaration = ts.findAncestor(node, ts.isImportDeclaration)!;
        const resolvedSourceFile = getResolvedSourceFileFromImportDeclaration(sourceFile, context, importDeclaration);
        if (resolvedSourceFile && resolvedSourceFile.symbol) {
            suggestedSymbol = checker.getSuggestedSymbolForNonexistentModule(node, resolvedSourceFile.symbol);
        }
    }
    else if (ts.isJsxAttribute(parent) && parent.name === node) {
        ts.Debug.assertNode(node, ts.isIdentifier, "Expected an identifier for JSX attribute");
        const tag = ts.findAncestor(node, ts.isJsxOpeningLikeElement)!;
        const props = checker.getContextualTypeForArgumentAtIndex(tag, 0);
        suggestedSymbol = checker.getSuggestedSymbolForNonexistentJSXAttribute(node, props!);
    }
    else if (ts.hasSyntacticModifier(parent, ts.ModifierFlags.Override) && ts.isClassElement(parent) && parent.name === node) {
        const baseDeclaration = ts.findAncestor(node, ts.isClassLike);
        const baseTypeNode = baseDeclaration ? ts.getEffectiveBaseTypeNode(baseDeclaration) : undefined;
        const baseType = baseTypeNode ? checker.getTypeAtLocation(baseTypeNode) : undefined;
        if (baseType) {
            suggestedSymbol = checker.getSuggestedSymbolForNonexistentClassMember(ts.getTextOfNode(node), baseType);
        }
    }
    else {
        const meaning = ts.getMeaningFromLocation(node);
        const name = ts.getTextOfNode(node);
        ts.Debug.assert(name !== undefined, "name should be defined");
        suggestedSymbol = checker.getSuggestedSymbolForNonexistentSymbol(node, name, convertSemanticMeaningToSymbolFlags(meaning));
    }

    return suggestedSymbol === undefined ? undefined : { node, suggestedSymbol };
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, node: ts.Node, suggestedSymbol: ts.Symbol, target: ts.ScriptTarget) {
    const suggestion = ts.symbolName(suggestedSymbol);
    if (!ts.isIdentifierText(suggestion, target) && ts.isPropertyAccessExpression(node.parent)) {
        const valDecl = suggestedSymbol.valueDeclaration;
        if (valDecl && ts.isNamedDeclaration(valDecl) && ts.isPrivateIdentifier(valDecl.name)) {
            changes.replaceNode(sourceFile, node, ts.factory.createIdentifier(suggestion));
        }
        else {
            changes.replaceNode(sourceFile, node.parent, ts.factory.createElementAccessExpression(node.parent.expression, ts.factory.createStringLiteral(suggestion)));
        }
    }
    else {
        changes.replaceNode(sourceFile, node, ts.factory.createIdentifier(suggestion));
    }
}

function convertSemanticMeaningToSymbolFlags(meaning: ts.SemanticMeaning): ts.SymbolFlags {
    let flags = 0;
    if (meaning & ts.SemanticMeaning.Namespace) {
        flags |= ts.SymbolFlags.Namespace;
    }
    if (meaning & ts.SemanticMeaning.Type) {
        flags |= ts.SymbolFlags.Type;
    }
    if (meaning & ts.SemanticMeaning.Value) {
        flags |= ts.SymbolFlags.Value;
    }
    return flags;
}

function getResolvedSourceFileFromImportDeclaration(sourceFile: ts.SourceFile, context: ts.CodeFixContextBase, importDeclaration: ts.ImportDeclaration): ts.SourceFile | undefined {
    if (!importDeclaration || !ts.isStringLiteralLike(importDeclaration.moduleSpecifier)) return undefined;

    const resolvedModule = ts.getResolvedModule(sourceFile, importDeclaration.moduleSpecifier.text, ts.getModeForUsageLocation(sourceFile, importDeclaration.moduleSpecifier));
    if (!resolvedModule) return undefined;

    return context.program.getSourceFile(resolvedModule.resolvedFileName);
}
