import * as ts from "../_namespaces/ts";

const fixId = "fixNaNEquality";
const errorCodes = [
    ts.Diagnostics.This_condition_will_always_return_0.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span, program } = context;
        const info = getInfo(program, sourceFile, span);
        if (info === undefined) return;

        const { suggestion, expression, arg } = info;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, arg, expression));
        return [ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Use_0, suggestion], fixId, ts.Diagnostics.Use_Number_isNaN_in_all_conditions)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(context.program, diag.file, ts.createTextSpan(diag.start, diag.length));
            if (info) {
                doChange(changes, diag.file, info.arg, info.expression);
            }
        });
    }
});

interface Info {
    suggestion: string;
    expression: ts.BinaryExpression;
    arg: ts.Expression;
}

function getInfo(program: ts.Program, sourceFile: ts.SourceFile, span: ts.TextSpan): Info | undefined {
    const diag = ts.find(program.getSemanticDiagnostics(sourceFile), diag => diag.start === span.start && diag.length === span.length);
    if (diag === undefined || diag.relatedInformation === undefined) return;

    const related = ts.find(diag.relatedInformation, related => related.code === ts.Diagnostics.Did_you_mean_0.code);
    if (related === undefined || related.file === undefined || related.start === undefined || related.length === undefined) return;

    const token = ts.codefix.findAncestorMatchingSpan(related.file, ts.createTextSpan(related.start, related.length));
    if (token === undefined) return;

    if (ts.isExpression(token) && ts.isBinaryExpression(token.parent)) {
        return { suggestion: getSuggestion(related.messageText), expression: token.parent, arg: token };
    }
    return undefined;
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, arg: ts.Expression, expression: ts.BinaryExpression) {
    const callExpression = ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier("Number"), ts.factory.createIdentifier("isNaN")), /*typeArguments*/ undefined, [arg]);
    const operator = expression.operatorToken.kind ;
    changes.replaceNode(sourceFile, expression,
        operator === ts.SyntaxKind.ExclamationEqualsEqualsToken || operator === ts.SyntaxKind.ExclamationEqualsToken
            ? ts.factory.createPrefixUnaryExpression(ts.SyntaxKind.ExclamationToken, callExpression) : callExpression);
}

function getSuggestion(messageText: string | ts.DiagnosticMessageChain) {
    const [_, suggestion] = ts.flattenDiagnosticMessageText(messageText, "\n", 0).match(/\'(.*)\'/) || [];
    return suggestion;
}
