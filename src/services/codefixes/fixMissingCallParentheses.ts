import * as ts from "../_namespaces/ts";

const fixId = "fixMissingCallParentheses";
const errorCodes = [
    ts.Diagnostics.This_condition_will_always_return_true_since_this_function_is_always_defined_Did_you_mean_to_call_it_instead.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const callName = getCallName(sourceFile, span.start);
        if (!callName) return;

        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, callName));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_missing_call_parentheses, fixId, ts.Diagnostics.Add_all_missing_call_parentheses)];
    },
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const callName = getCallName(diag.file, diag.start);
        if (callName) doChange(changes, diag.file, callName);
    })
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, name: ts.Identifier | ts.PrivateIdentifier): void {
    changes.replaceNodeWithText(sourceFile, name, `${ name.text }()`);
}

function getCallName(sourceFile: ts.SourceFile, start: number): ts.Identifier | ts.PrivateIdentifier | undefined {
    const token = ts.getTokenAtPosition(sourceFile, start);
    if (ts.isPropertyAccessExpression(token.parent)) {
        let current: ts.PropertyAccessExpression = token.parent;
        while (ts.isPropertyAccessExpression(current.parent)) {
            current = current.parent;
        }
        return current.name;
    }

    if (ts.isIdentifier(token)) {
        return token;
    }

    return undefined;
}
