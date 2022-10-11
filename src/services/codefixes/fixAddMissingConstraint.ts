/* @internal */
namespace ts.codefix {
const fixId = "addMissingConstraint";
const errorCodes = [
    // We want errors this could be attached to:
    // Diagnostics.This_type_parameter_probably_needs_an_extends_0_constraint
    ts.Diagnostics.Type_0_is_not_comparable_to_type_1.code,
    ts.Diagnostics.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated.code,
    ts.Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
    ts.Diagnostics.Type_0_is_not_assignable_to_type_1.code,
    ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
    ts.Diagnostics.Property_0_is_incompatible_with_index_signature.code,
    ts.Diagnostics.Property_0_in_type_1_is_not_assignable_to_type_2.code,
    ts.Diagnostics.Type_0_does_not_satisfy_the_constraint_1.code,
];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span, program, preferences, host } = context;
        const info = getInfo(program, sourceFile, span);
        if (info === undefined) return;

        const changes = ts.textChanges.ChangeTracker.with(context, t => addMissingConstraint(t, program, preferences, host, sourceFile, info));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_extends_constraint, fixId, ts.Diagnostics.Add_extends_constraint_to_all_type_parameters)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        const { program, preferences, host } = context;
        const seen = new ts.Map<number, true>();

        return ts.codefix.createCombinedCodeActions(ts.textChanges.ChangeTracker.with(context, changes => {
            ts.codefix.eachDiagnostic(context, errorCodes, diag => {
                const info = getInfo(program, diag.file, ts.createTextSpan(diag.start, diag.length));
                if (info) {
                    if (ts.addToSeen(seen, ts.getNodeId(info.declaration))) {
                        return addMissingConstraint(changes, program, preferences, host, diag.file, info);
                    }
                }
                return undefined;
            });
        }));
    }
});

interface Info {
    constraint: ts.Type | string;
    declaration: ts.TypeParameterDeclaration;
    token: ts.Node;
}

function getInfo(program: ts.Program, sourceFile: ts.SourceFile, span: ts.TextSpan): Info | undefined {
    const diag = ts.find(program.getSemanticDiagnostics(sourceFile), diag => diag.start === span.start && diag.length === span.length);
    if (diag === undefined || diag.relatedInformation === undefined) return;

    const related = ts.find(diag.relatedInformation, related => related.code === ts.Diagnostics.This_type_parameter_might_need_an_extends_0_constraint.code);
    if (related === undefined || related.file === undefined || related.start === undefined || related.length === undefined) return;

    let declaration = ts.codefix.findAncestorMatchingSpan(related.file, ts.createTextSpan(related.start, related.length));
    if (declaration === undefined) return;

    if (ts.isIdentifier(declaration) && ts.isTypeParameterDeclaration(declaration.parent)) {
        declaration = declaration.parent;
    }

    if (ts.isTypeParameterDeclaration(declaration)) {
        // should only issue fix on type parameters written using `extends`
        if (ts.isMappedTypeNode(declaration.parent)) return;

        const token = ts.getTokenAtPosition(sourceFile, span.start);
        const checker = program.getTypeChecker();
        const constraint = tryGetConstraintType(checker, token) || tryGetConstraintFromDiagnosticMessage(related.messageText);

        return { constraint, declaration, token };
    }
    return undefined;
}

function addMissingConstraint(changes: ts.textChanges.ChangeTracker, program: ts.Program, preferences: ts.UserPreferences, host: ts.LanguageServiceHost, sourceFile: ts.SourceFile, info: Info): void {
    const { declaration, constraint } = info;
    const checker = program.getTypeChecker();

    if (ts.isString(constraint)) {
        changes.insertText(sourceFile, declaration.name.end, ` extends ${constraint}`);
    }
    else {
        const scriptTarget = ts.getEmitScriptTarget(program.getCompilerOptions());
        const tracker = ts.codefix.getNoopSymbolTrackerWithResolver({ program, host });
        const importAdder = ts.codefix.createImportAdder(sourceFile, program, preferences, host);
        const typeNode = ts.codefix.typeToAutoImportableTypeNode(checker, importAdder, constraint, /*contextNode*/ undefined, scriptTarget, /*flags*/ undefined, tracker);
        if (typeNode) {
            changes.replaceNode(sourceFile, declaration, ts.factory.updateTypeParameterDeclaration(declaration, /*modifiers*/ undefined, declaration.name, typeNode, declaration.default));
            importAdder.writeFixes(changes);
        }
    }
}

function tryGetConstraintFromDiagnosticMessage(messageText: string | ts.DiagnosticMessageChain) {
    const [_, constraint] = ts.flattenDiagnosticMessageText(messageText, "\n", 0).match(/`extends (.*)`/) || [];
    return constraint;
}

function tryGetConstraintType(checker: ts.TypeChecker, node: ts.Node) {
    if (ts.isTypeNode(node.parent)) {
        return checker.getTypeArgumentConstraint(node.parent);
    }
    const contextualType = ts.isExpression(node) ? checker.getContextualType(node) : undefined;
    return contextualType || checker.getTypeAtLocation(node);
}
}
