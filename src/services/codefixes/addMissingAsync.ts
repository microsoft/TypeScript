import * as ts from "../_namespaces/ts";

type ContextualTrackChangesFunction = (cb: (changeTracker: ts.textChanges.ChangeTracker) => void) => ts.FileTextChanges[];
const fixId = "addMissingAsync";
const errorCodes = [
    ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code,
    ts.Diagnostics.Type_0_is_not_assignable_to_type_1.code,
    ts.Diagnostics.Type_0_is_not_comparable_to_type_1.code
];

ts.codefix.registerCodeFix({
    fixIds: [fixId],
    errorCodes,
    getCodeActions: function getCodeActionsToAddMissingAsync(context) {
        const { sourceFile, errorCode, cancellationToken, program, span } = context;
        const diagnostic = ts.find(program.getTypeChecker().getDiagnostics(sourceFile, cancellationToken), getIsMatchingAsyncError(span, errorCode));
        const directSpan = diagnostic && diagnostic.relatedInformation && ts.find(diagnostic.relatedInformation, r => r.code === ts.Diagnostics.Did_you_mean_to_mark_this_function_as_async.code) as ts.TextSpan | undefined;

        const decl = getFixableErrorSpanDeclaration(sourceFile, directSpan);
        if (!decl) {
            return;
        }

        const trackChanges: ContextualTrackChangesFunction = cb => ts.textChanges.ChangeTracker.with(context, cb);
        return [getFix(context, decl, trackChanges)];
    },
    getAllCodeActions: context => {
        const { sourceFile } = context;
        const fixedDeclarations = new ts.Set<number>();
        return ts.codefix.codeFixAll(context, errorCodes, (t, diagnostic) => {
            const span = diagnostic.relatedInformation && ts.find(diagnostic.relatedInformation, r => r.code === ts.Diagnostics.Did_you_mean_to_mark_this_function_as_async.code) as ts.TextSpan | undefined;
            const decl = getFixableErrorSpanDeclaration(sourceFile, span);
            if (!decl) {
                return;
            }
            const trackChanges: ContextualTrackChangesFunction = cb => (cb(t), []);
            return getFix(context, decl, trackChanges, fixedDeclarations);
        });
    },
});

type FixableDeclaration = ts.ArrowFunction | ts.FunctionDeclaration | ts.FunctionExpression | ts.MethodDeclaration;
function getFix(context: ts.CodeFixContext | ts.CodeFixAllContext, decl: FixableDeclaration, trackChanges: ContextualTrackChangesFunction, fixedDeclarations?: ts.Set<number>) {
    const changes = trackChanges(t => makeChange(t, context.sourceFile, decl, fixedDeclarations));
    return ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_async_modifier_to_containing_function, fixId, ts.Diagnostics.Add_all_missing_async_modifiers);
}

function makeChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, insertionSite: FixableDeclaration, fixedDeclarations?: ts.Set<number>) {
    if (fixedDeclarations) {
        if (fixedDeclarations.has(ts.getNodeId(insertionSite))) {
            return;
        }
    }
    fixedDeclarations?.add(ts.getNodeId(insertionSite));
    const cloneWithModifier = ts.factory.updateModifiers(
        ts.getSynthesizedDeepClone(insertionSite, /*includeTrivia*/ true),
        ts.factory.createNodeArray(ts.factory.createModifiersFromModifierFlags(ts.getSyntacticModifierFlags(insertionSite) | ts.ModifierFlags.Async)));
    changeTracker.replaceNode(
        sourceFile,
        insertionSite,
        cloneWithModifier);
}

function getFixableErrorSpanDeclaration(sourceFile: ts.SourceFile, span: ts.TextSpan | undefined): FixableDeclaration | undefined {
    if (!span) return undefined;
    const token = ts.getTokenAtPosition(sourceFile, span.start);
    // Checker has already done work to determine that async might be possible, and has attached
    // related info to the node, so start by finding the signature that exactly matches up
    // with the diagnostic range.
    const decl = ts.findAncestor(token, node => {
        if (node.getStart(sourceFile) < span.start || node.getEnd() > ts.textSpanEnd(span)) {
            return "quit";
        }
        return (ts.isArrowFunction(node) || ts.isMethodDeclaration(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node)) && ts.textSpansEqual(span, ts.createTextSpanFromNode(node, sourceFile));
    }) as FixableDeclaration | undefined;

    return decl;
}

function getIsMatchingAsyncError(span: ts.TextSpan, errorCode: number) {
    return ({ start, length, relatedInformation, code }: ts.Diagnostic) =>
        ts.isNumber(start) && ts.isNumber(length) && ts.textSpansEqual({ start, length }, span) &&
        code === errorCode &&
        !!relatedInformation &&
        ts.some(relatedInformation, related => related.code === ts.Diagnostics.Did_you_mean_to_mark_this_function_as_async.code);
}
