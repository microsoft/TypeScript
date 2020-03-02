import { Diagnostics, SourceFile, getTokenAtPosition, findAncestor, isDecorator, Debug, createCall } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "addMissingInvocationForDecorator";
/* @internal */
const errorCodes = [Diagnostics._0_accepts_too_few_arguments_to_be_used_as_a_decorator_here_Did_you_mean_to_call_it_first_and_write_0.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: (context) => {
        const changes = ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
        return [createCodeFixAction(fixId, changes, Diagnostics.Call_decorator_expression, fixId, Diagnostics.Add_to_all_uncalled_decorators)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
});
/* @internal */
function makeChange(changeTracker: ChangeTracker, sourceFile: SourceFile, pos: number) {
    const token = getTokenAtPosition(sourceFile, pos);
    const decorator = (findAncestor(token, isDecorator)!);
    Debug.assert(!!decorator, "Expected position to be owned by a decorator.");
    const replacement = createCall(decorator.expression, /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
    changeTracker.replaceNode(sourceFile, decorator.expression, replacement);
}
