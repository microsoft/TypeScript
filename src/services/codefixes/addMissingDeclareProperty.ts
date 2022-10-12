/* @internal */
namespace ts.codefix {
const fixId = "addMissingDeclareProperty";
const errorCodes = [
    ts.Diagnostics.Property_0_will_overwrite_the_base_property_in_1_If_this_is_intentional_add_an_initializer_Otherwise_add_a_declare_modifier_or_remove_the_redundant_declaration.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddMissingDeclareOnProperty(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
        if (changes.length > 0) {
            return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Prefix_with_declare, fixId, ts.Diagnostics.Prefix_all_incorrect_property_declarations_with_declare)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        const fixedNodes = new ts.Set<ts.Node>();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start, fixedNodes));
    },
});

function makeChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, pos: number, fixedNodes?: ts.Set<ts.Node>) {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    if (!ts.isIdentifier(token)) {
        return;
    }
    const declaration = token.parent;
    if (declaration.kind === ts.SyntaxKind.PropertyDeclaration &&
        (!fixedNodes || ts.tryAddToSet(fixedNodes, declaration))) {
        changeTracker.insertModifierBefore(sourceFile, ts.SyntaxKind.DeclareKeyword, declaration);
    }
}
}
