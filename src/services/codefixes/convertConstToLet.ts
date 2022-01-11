import { Diagnostics, SourceFile, Program, getTokenAtPosition, tryCast, isVariableDeclarationList, findChildOfKind, SyntaxKind, createRange, TextRange } from "../ts";
import { registerCodeFix, createCodeFixAction } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "fixConvertConstToLet";
/* @internal */
const errorCodes = [Diagnostics.Cannot_assign_to_0_because_it_is_a_constant.code];

/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertConstToLet(context) {
        const { sourceFile, span, program } = context;
        const range = getConstTokenRange(sourceFile, span.start, program);
        if (range === undefined)
            return;
        const changes = ChangeTracker.with(context, t => doChange(t, sourceFile, range));
        return [createCodeFixAction(fixId, changes, Diagnostics.Convert_const_to_let, fixId, Diagnostics.Convert_const_to_let)];
    },
    fixIds: [fixId]
});

/* @internal */
function getConstTokenRange(sourceFile: SourceFile, pos: number, program: Program) {
    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, pos));
    const declaration = tryCast(symbol?.valueDeclaration?.parent, isVariableDeclarationList);
    if (declaration === undefined)
        return;

    const constToken = findChildOfKind(declaration, SyntaxKind.ConstKeyword, sourceFile);
    if (constToken === undefined)
        return;

    return createRange(constToken.pos, constToken.end);
}

/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, range: TextRange) {
    changes.replaceRangeWithText(sourceFile, range, "let");
}
