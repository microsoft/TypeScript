/* @internal */
namespace ts.codefix {
    const fixId = "addMissingConstInForLoop";
    const errorCodes = [Diagnostics.Cannot_find_name_0.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
            return [createCodeFixAction(fixId, changes, Diagnostics.Add_const_modifier_to_unresolved_variable, fixId, Diagnostics.Add_const_modifiers_to_all_unresolved_variables)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
    });

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number) {
        const token = getTokenAtPosition(sourceFile, pos);
        // fails on 'for ([x, y] of [[1,2]]) {}' when called for y
        // since findPrecedingMatchingToken does not return the open paren here after iterating over another identifier (x)
        const openParenToken = <Node>findPrecedingMatchingToken(token, SyntaxKind.OpenParenToken, sourceFile);
        Debug.assert(!!openParenToken, "openParenToken must be defined");
        changeTracker.insertNodeAt(sourceFile, openParenToken.getEnd(), createToken(SyntaxKind.ConstKeyword), { suffix: " " });
    }
}
