/* @internal */
namespace ts.codefix {
const fixId = "addMissingInvocationForDecorator";
const errorCodes = [ts.Diagnostics._0_accepts_too_few_arguments_to_be_used_as_a_decorator_here_Did_you_mean_to_call_it_first_and_write_0.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddMissingInvocationForDecorator(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Call_decorator_expression, fixId, ts.Diagnostics.Add_to_all_uncalled_decorators)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
});

function makeChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, pos: number) {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    const decorator = ts.findAncestor(token, ts.isDecorator)!;
    ts.Debug.assert(!!decorator, "Expected position to be owned by a decorator.");
    const replacement = ts.factory.createCallExpression(decorator.expression, /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
    changeTracker.replaceNode(sourceFile, decorator.expression, replacement);
}
}
