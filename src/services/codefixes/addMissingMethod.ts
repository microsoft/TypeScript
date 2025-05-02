import * as ts from "../../_namespaces/ts";
import {
    createCodeFixAction,
    registerCodeFix,
    CodeFixContext,
    textChanges,
} from "../_utils";

const fixName = "addMissingPrivateMethod";

registerCodeFix({
    errorCodes: [],
    getCodeActions: function getCodeActionsToAddPrivateMethod(context: CodeFixContext) {
        const changes = textChanges.ChangeTracker.with(context, t => {
            t.insertNodeAtEndOfFile(context.sourceFile, ts.factory.createExpressionStatement(
                ts.factory.createStringLiteral("Placeholder fix for missing private method")
            ));
        });

        return [createCodeFixAction(fixName, changes, "Add missing private method", fixName, undefined)];
    },
});
