import {
    codeFixAll,
    createCodeFixAction,
    findAncestorMatchingSpan,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    BinaryExpression,
    createTextSpan,
    DiagnosticMessageChain,
    Diagnostics,
    Expression,
    factory,
    find,
    flattenDiagnosticMessageText,
    isBinaryExpression,
    isExpression,
    Program,
    SourceFile,
    SyntaxKind,
    textChanges,
    TextSpan,
} from "../_namespaces/ts.js";

const fixId = "fixNaNEquality";
const errorCodes = [
    Diagnostics.This_condition_will_always_return_0.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span, program } = context;
        const info = getInfo(program, sourceFile, span);
        if (info === undefined) return;

        const { suggestion, expression, arg } = info;
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, arg, expression));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Use_0, suggestion], fixId, Diagnostics.Use_Number_isNaN_in_all_conditions)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        return codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(context.program, diag.file, createTextSpan(diag.start, diag.length));
            if (info) {
                doChange(changes, diag.file, info.arg, info.expression);
            }
        });
    },
});

interface Info {
    suggestion: string;
    expression: BinaryExpression;
    arg: Expression;
}

function getInfo(program: Program, sourceFile: SourceFile, span: TextSpan): Info | undefined {
    const diag = find(program.getSemanticDiagnostics(sourceFile), diag => diag.start === span.start && diag.length === span.length);
    if (diag === undefined || diag.relatedInformation === undefined) return;

    const related = find(diag.relatedInformation, related => related.code === Diagnostics.Did_you_mean_0.code);
    if (related === undefined || related.file === undefined || related.start === undefined || related.length === undefined) return;

    const token = findAncestorMatchingSpan(related.file, createTextSpan(related.start, related.length));
    if (token === undefined) return;

    if (isExpression(token) && isBinaryExpression(token.parent)) {
        return { suggestion: getSuggestion(related.messageText), expression: token.parent, arg: token };
    }
    return undefined;
}

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, arg: Expression, expression: BinaryExpression) {
    const callExpression = factory.createCallExpression(
        factory.createPropertyAccessExpression(factory.createIdentifier("Number"), factory.createIdentifier("isNaN")),
        /*typeArguments*/ undefined,
        [arg],
    );
    const operator = expression.operatorToken.kind;
    changes.replaceNode(
        sourceFile,
        expression,
        operator === SyntaxKind.ExclamationEqualsEqualsToken || operator === SyntaxKind.ExclamationEqualsToken
            ? factory.createPrefixUnaryExpression(SyntaxKind.ExclamationToken, callExpression) : callExpression,
    );
}

function getSuggestion(messageText: string | DiagnosticMessageChain) {
    const [, suggestion] = flattenDiagnosticMessageText(messageText, "\n", 0).match(/'(.*)'/) || [];
    return suggestion;
}
