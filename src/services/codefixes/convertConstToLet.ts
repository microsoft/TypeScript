import { Diagnostics, SourceFile, Program, getTokenAtPosition, VariableStatement } from "../ts";
import { registerCodeFix, createCodeFixAction } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "fixConvertConstToLet";
/* @internal */
const errorCodes = [Diagnostics.Cannot_assign_to_0_because_it_is_a_constant.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: context => {
        const { sourceFile, span, program } = context;
        const variableStatement = getVariableStatement(sourceFile, span.start, program);
        const changes = ChangeTracker.with(context, t => doChange(t, sourceFile, variableStatement));
        return [createCodeFixAction(fixId, changes, Diagnostics.Convert_const_to_let, fixId, Diagnostics.Convert_const_to_let)];
    },
    fixIds: [fixId]
});
/* @internal */
function getVariableStatement(sourceFile: SourceFile, pos: number, program: Program) {
    const token = getTokenAtPosition(sourceFile, pos);
    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(token);
    if (symbol) {
        return symbol.valueDeclaration.parent.parent as VariableStatement;
    }
}
/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, variableStatement?: VariableStatement) {
    if (!variableStatement) {
        return;
    }
    const start = variableStatement.getStart();
    changes.replaceRangeWithText(sourceFile, { pos: start, end: start + 5 }, "let");
}
