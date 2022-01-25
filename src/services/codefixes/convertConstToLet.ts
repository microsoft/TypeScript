/* @internal */
namespace ts.codefix {
    const fixId = "fixConvertConstToLet";
    const errorCodes = [Diagnostics.Cannot_assign_to_0_because_it_is_a_constant.code];

    registerCodeFix({
        errorCodes,
        getCodeActions: function getCodeActionsToConvertConstToLet(context) {
            const { sourceFile, span, program } = context;
            const range = getConstTokenRange(sourceFile, span.start, program);
            if (range === undefined) return;

            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, range));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_const_to_let, fixId, Diagnostics.Convert_const_to_let)];
        },
        fixIds: [fixId]
    });

    function getConstTokenRange(sourceFile: SourceFile, pos: number, program: Program) {
        const checker = program.getTypeChecker();
        const symbol = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, pos));
        const declaration = tryCast(symbol?.valueDeclaration?.parent, isVariableDeclarationList);
        if (declaration === undefined) return;

        const constToken = findChildOfKind(declaration, SyntaxKind.ConstKeyword, sourceFile);
        if (constToken === undefined) return;

        return createRange(constToken.pos, constToken.end);
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, range: TextRange) {
        changes.replaceRangeWithText(sourceFile, range, "let");
    }
}
