import {
    createCodeFixAction,
    createCombinedCodeActions,
    createImportAdder,
    eachDiagnostic,
    findAncestorMatchingSpan,
    getNoopSymbolTrackerWithResolver,
    registerCodeFix,
    typeToAutoImportableTypeNode,
} from "../_namespaces/ts.codefix.js";
import {
    addToSeen,
    createTextSpan,
    DiagnosticMessageChain,
    Diagnostics,
    factory,
    find,
    flattenDiagnosticMessageText,
    getEmitScriptTarget,
    getNodeId,
    getTokenAtPosition,
    isExpression,
    isIdentifier,
    isMappedTypeNode,
    isString,
    isTypeNode,
    isTypeParameterDeclaration,
    LanguageServiceHost,
    Node,
    Program,
    SourceFile,
    textChanges,
    TextSpan,
    Type,
    TypeChecker,
    TypeParameterDeclaration,
    UserPreferences,
} from "../_namespaces/ts.js";

const fixId = "addMissingConstraint";
const errorCodes = [
    // We want errors this could be attached to:
    // Diagnostics.This_type_parameter_probably_needs_an_extends_0_constraint
    Diagnostics.Type_0_is_not_comparable_to_type_1.code,
    Diagnostics.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated.code,
    Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
    Diagnostics.Type_0_is_not_assignable_to_type_1.code,
    Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
    Diagnostics.Property_0_is_incompatible_with_index_signature.code,
    Diagnostics.Property_0_in_type_1_is_not_assignable_to_type_2.code,
    Diagnostics.Type_0_does_not_satisfy_the_constraint_1.code,
];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span, program, preferences, host } = context;
        const info = getInfo(program, sourceFile, span);
        if (info === undefined) return;

        const changes = textChanges.ChangeTracker.with(context, t => addMissingConstraint(t, program, preferences, host, sourceFile, info));
        return [createCodeFixAction(fixId, changes, Diagnostics.Add_extends_constraint, fixId, Diagnostics.Add_extends_constraint_to_all_type_parameters)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        const { program, preferences, host } = context;
        const seen = new Set<number>();

        return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
            eachDiagnostic(context, errorCodes, diag => {
                const info = getInfo(program, diag.file, createTextSpan(diag.start, diag.length));
                if (info) {
                    if (addToSeen(seen, getNodeId(info.declaration))) {
                        return addMissingConstraint(changes, program, preferences, host, diag.file, info);
                    }
                }
                return undefined;
            });
        }));
    },
});

interface Info {
    constraint: Type | string;
    declaration: TypeParameterDeclaration;
    token: Node;
}

function getInfo(program: Program, sourceFile: SourceFile, span: TextSpan): Info | undefined {
    const diag = find(program.getSemanticDiagnostics(sourceFile), diag => diag.start === span.start && diag.length === span.length);
    if (diag === undefined || diag.relatedInformation === undefined) return;

    const related = find(diag.relatedInformation, related => related.code === Diagnostics.This_type_parameter_might_need_an_extends_0_constraint.code);
    if (related === undefined || related.file === undefined || related.start === undefined || related.length === undefined) return;

    let declaration = findAncestorMatchingSpan(related.file, createTextSpan(related.start, related.length));
    if (declaration === undefined) return;

    if (isIdentifier(declaration) && isTypeParameterDeclaration(declaration.parent)) {
        declaration = declaration.parent;
    }

    if (isTypeParameterDeclaration(declaration)) {
        // should only issue fix on type parameters written using `extends`
        if (isMappedTypeNode(declaration.parent)) return;

        const token = getTokenAtPosition(sourceFile, span.start);
        const checker = program.getTypeChecker();
        const constraint = tryGetConstraintType(checker, token) || tryGetConstraintFromDiagnosticMessage(related.messageText);

        return { constraint, declaration, token };
    }
    return undefined;
}

function addMissingConstraint(changes: textChanges.ChangeTracker, program: Program, preferences: UserPreferences, host: LanguageServiceHost, sourceFile: SourceFile, info: Info): void {
    const { declaration, constraint } = info;
    const checker = program.getTypeChecker();

    if (isString(constraint)) {
        changes.insertText(sourceFile, declaration.name.end, ` extends ${constraint}`);
    }
    else {
        const scriptTarget = getEmitScriptTarget(program.getCompilerOptions());
        const tracker = getNoopSymbolTrackerWithResolver({ program, host });
        const importAdder = createImportAdder(sourceFile, program, preferences, host);
        const typeNode = typeToAutoImportableTypeNode(checker, importAdder, constraint, /*contextNode*/ undefined, scriptTarget, /*flags*/ undefined, /*internalFlags*/ undefined, tracker);
        if (typeNode) {
            changes.replaceNode(sourceFile, declaration, factory.updateTypeParameterDeclaration(declaration, /*modifiers*/ undefined, declaration.name, typeNode, declaration.default));
            importAdder.writeFixes(changes);
        }
    }
}

function tryGetConstraintFromDiagnosticMessage(messageText: string | DiagnosticMessageChain) {
    const [, constraint] = flattenDiagnosticMessageText(messageText, "\n", 0).match(/`extends (.*)`/) || [];
    return constraint;
}

function tryGetConstraintType(checker: TypeChecker, node: Node) {
    if (isTypeNode(node.parent)) {
        return checker.getTypeArgumentConstraint(node.parent);
    }
    const contextualType = isExpression(node) ? checker.getContextualType(node) : undefined;
    return contextualType || checker.getTypeAtLocation(node);
}
