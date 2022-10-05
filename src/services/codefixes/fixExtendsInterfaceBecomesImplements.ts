/* @internal */
namespace ts.codefix {
const fixId = "extendsInterfaceBecomesImplements";
const errorCodes = [ts.Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const nodes = getNodes(sourceFile, context.span.start);
        if (!nodes) return undefined;
        const { extendsToken, heritageClauses } = nodes;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChanges(t, sourceFile, extendsToken, heritageClauses));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Change_extends_to_implements, fixId, ts.Diagnostics.Change_all_extended_interfaces_to_implements)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const nodes = getNodes(diag.file, diag.start);
        if (nodes) doChanges(changes, diag.file, nodes.extendsToken, nodes.heritageClauses);
    }),
});

function getNodes(sourceFile: ts.SourceFile, pos: number) {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    const heritageClauses = ts.getContainingClass(token)!.heritageClauses!;
    const extendsToken = heritageClauses[0].getFirstToken()!;
    return extendsToken.kind === ts.SyntaxKind.ExtendsKeyword ? { extendsToken, heritageClauses } : undefined;
}

function doChanges(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, extendsToken: ts.Node, heritageClauses: readonly ts.HeritageClause[]): void {
    changes.replaceNode(sourceFile, extendsToken, ts.factory.createToken(ts.SyntaxKind.ImplementsKeyword));

    // If there is already an implements clause, replace the implements keyword with a comma.
    if (heritageClauses.length === 2 &&
        heritageClauses[0].token === ts.SyntaxKind.ExtendsKeyword &&
        heritageClauses[1].token === ts.SyntaxKind.ImplementsKeyword) {

        const implementsToken = heritageClauses[1].getFirstToken()!;
        const implementsFullStart = implementsToken.getFullStart();
        changes.replaceRange(sourceFile, { pos: implementsFullStart, end: implementsFullStart }, ts.factory.createToken(ts.SyntaxKind.CommaToken));

        // Rough heuristic: delete trailing whitespace after keyword so that it's not excessive.
        // (Trailing because leading might be indentation, which is more sensitive.)
        const text = sourceFile.text;
        let end = implementsToken.end;
        while (end < text.length && ts.isWhiteSpaceSingleLine(text.charCodeAt(end))) {
            end++;
        }

        changes.deleteRange(sourceFile, { pos: implementsToken.getStart(), end });
    }
}
}
