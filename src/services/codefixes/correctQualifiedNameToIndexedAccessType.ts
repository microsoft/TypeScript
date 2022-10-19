import * as ts from "../_namespaces/ts";

const fixId = "correctQualifiedNameToIndexedAccessType";
const errorCodes = [ts.Diagnostics.Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const qualifiedName = getQualifiedName(context.sourceFile, context.span.start);
        if (!qualifiedName) return undefined;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, qualifiedName));
        const newText = `${qualifiedName.left.text}["${qualifiedName.right.text}"]`;
        return [ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Rewrite_as_the_indexed_access_type_0, newText], fixId, ts.Diagnostics.Rewrite_all_as_indexed_access_types)];
    },
    fixIds: [fixId],
    getAllCodeActions: (context) => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const q = getQualifiedName(diag.file, diag.start);
        if (q) {
            doChange(changes, diag.file, q);
        }
    }),
});

function getQualifiedName(sourceFile: ts.SourceFile, pos: number): ts.QualifiedName & { left: ts.Identifier } | undefined {
    const qualifiedName = ts.findAncestor(ts.getTokenAtPosition(sourceFile, pos), ts.isQualifiedName)!;
    ts.Debug.assert(!!qualifiedName, "Expected position to be owned by a qualified name.");
    return ts.isIdentifier(qualifiedName.left) ? qualifiedName as ts.QualifiedName & { left: ts.Identifier } : undefined;
}

function doChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, qualifiedName: ts.QualifiedName): void {
    const rightText = qualifiedName.right.text;
    const replacement = ts.factory.createIndexedAccessTypeNode(
        ts.factory.createTypeReferenceNode(qualifiedName.left, /*typeArguments*/ undefined),
        ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(rightText)));
    changeTracker.replaceNode(sourceFile, qualifiedName, replacement);
}
