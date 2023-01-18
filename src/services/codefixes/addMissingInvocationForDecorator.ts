import * as Debug from "../../compiler/debug";
import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { factory } from "../../compiler/factory/nodeFactory";
import { isDecorator } from "../../compiler/factory/nodeTests";
import { SourceFile } from "../../compiler/types";
import { findAncestor } from "../../compiler/utilitiesPublic";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../codeFixProvider";
import { ChangeTracker } from "../textChanges";
import { getTokenAtPosition } from "../utilities";

const fixId = "addMissingInvocationForDecorator";
const errorCodes = [Diagnostics._0_accepts_too_few_arguments_to_be_used_as_a_decorator_here_Did_you_mean_to_call_it_first_and_write_0.code];
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddMissingInvocationForDecorator(context) {
        const changes = ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
        return [createCodeFixAction(fixId, changes, Diagnostics.Call_decorator_expression, fixId, Diagnostics.Add_to_all_uncalled_decorators)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
});

function makeChange(changeTracker: ChangeTracker, sourceFile: SourceFile, pos: number) {
    const token = getTokenAtPosition(sourceFile, pos);
    const decorator = findAncestor(token, isDecorator)!;
    Debug.assert(!!decorator, "Expected position to be owned by a decorator.");
    const replacement = factory.createCallExpression(decorator.expression, /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
    changeTracker.replaceNode(sourceFile, decorator.expression, replacement);
}
