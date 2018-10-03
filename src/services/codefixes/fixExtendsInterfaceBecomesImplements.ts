/* @internal */
namespace ts.codefix {
    const fixId = "extendsInterfaceBecomesImplements";
    const errorCodes = [Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const nodes = getNodes(sourceFile, context.span.start);
            if (!nodes) return undefined;
            const { extendsToken, heritageClauses } = nodes;
            const changes = textChanges.ChangeTracker.with(context, t => doChanges(t, sourceFile, extendsToken, heritageClauses));
            return [{ description: getLocaleSpecificMessage(Diagnostics.Change_extends_to_implements), changes, fixId }];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const nodes = getNodes(diag.file, diag.start!);
            if (nodes) doChanges(changes, diag.file, nodes.extendsToken, nodes.heritageClauses);
        }),
    });

    function getNodes(sourceFile: SourceFile, pos: number) {
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        const heritageClauses = getContainingClass(token)!.heritageClauses;
        const extendsToken = heritageClauses[0].getFirstToken();
        return extendsToken.kind === SyntaxKind.ExtendsKeyword ? { extendsToken, heritageClauses } : undefined;
    }

    function doChanges(changes: textChanges.ChangeTracker, sourceFile: SourceFile, extendsToken: Node, heritageClauses: ReadonlyArray<HeritageClause>): void {
        changes.replaceNode(sourceFile, extendsToken, createToken(SyntaxKind.ImplementsKeyword), textChanges.useNonAdjustedPositions);

        // If there is already an implements clause, replace the implements keyword with a comma.
        if (heritageClauses.length === 2 &&
            heritageClauses[0].token === SyntaxKind.ExtendsKeyword &&
            heritageClauses[1].token === SyntaxKind.ImplementsKeyword) {

            const implementsToken = heritageClauses[1].getFirstToken()!;
            const implementsFullStart = implementsToken.getFullStart();
            changes.replaceRange(sourceFile, { pos: implementsFullStart, end: implementsFullStart }, createToken(SyntaxKind.CommaToken));

            // Rough heuristic: delete trailing whitespace after keyword so that it's not excessive.
            // (Trailing because leading might be indentation, which is more sensitive.)
            const text = sourceFile.text;
            let end = implementsToken.end;
            while (end < text.length && isWhiteSpaceSingleLine(text.charCodeAt(end))) {
                end++;
            }

            changes.deleteRange(sourceFile, { pos: implementsToken.getStart(), end });
        }
    }
}
