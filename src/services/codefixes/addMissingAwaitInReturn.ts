import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    CodeFixContext,
    Debug,
    Diagnostics,
    factory,
    getSynthesizedDeepClone,
    getTokenAtPosition,
    isReturnStatement,
    SourceFile,
    textChanges,
} from "../_namespaces/ts.js";

const fixId = "addMissingAwaitInReturn";
const errorCodes = [Diagnostics.This_may_need_await_keyword_Otherwise_the_enclosing_try_statement_won_t_handle_this.code];

registerCodeFix({
    errorCodes,
    getCodeActions(context: CodeFixContext) {
        const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
        return [createCodeFixAction(fixId, changes, Diagnostics.Add_missing_await, fixId, Diagnostics.Add_all_missing_awaits)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
});

function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number) {
    const token = getTokenAtPosition(sourceFile, pos);
    Debug.assertNode(token.parent, isReturnStatement);
    Debug.assertIsDefined(token.parent.expression);
    const expression = token.parent.expression;
    changeTracker.replaceNode(
        sourceFile,
        expression,
        factory.createAwaitExpression(getSynthesizedDeepClone(expression, /*includeTrivia*/ true)),
    );
}
