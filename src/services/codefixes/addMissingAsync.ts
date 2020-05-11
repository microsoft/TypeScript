/* @internal */
namespace ts.codefix {
    type ContextualTrackChangesFunction = (cb: (changeTracker: textChanges.ChangeTracker) => void) => FileTextChanges[];
    const fixId = "addMissingAsync";
    const errorCodes = [
        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code,
        Diagnostics.Type_0_is_not_assignable_to_type_1.code,
        Diagnostics.Type_0_is_not_comparable_to_type_1.code
    ];

    registerCodeFix({
        fixIds: [fixId],
        errorCodes,
        getCodeActions: context => {
            const { sourceFile, errorCode, cancellationToken, program, span } = context;
            const diagnostic = find(program.getDiagnosticsProducingTypeChecker().getDiagnostics(sourceFile, cancellationToken), getIsMatchingAsyncError(span, errorCode));
            const directSpan = diagnostic && diagnostic.relatedInformation && find(diagnostic.relatedInformation, r => r.code === Diagnostics.Did_you_mean_to_mark_this_function_as_async.code) as TextSpan | undefined;

            const decl = getFixableErrorSpanDeclaration(sourceFile, directSpan);
            if (!decl) {
                return;
            }

            const trackChanges: ContextualTrackChangesFunction = cb => textChanges.ChangeTracker.with(context, cb);
            return [getFix(context, decl, trackChanges)];
        },
        getAllCodeActions: context => {
            const { sourceFile } = context;
            const fixedDeclarations = createMap<true>();
            return codeFixAll(context, errorCodes, (t, diagnostic) => {
                const span = diagnostic.relatedInformation && find(diagnostic.relatedInformation, r => r.code === Diagnostics.Did_you_mean_to_mark_this_function_as_async.code) as TextSpan | undefined;
                const decl = getFixableErrorSpanDeclaration(sourceFile, span);
                if (!decl) {
                    return;
                }
                const trackChanges: ContextualTrackChangesFunction = cb => (cb(t), []);
                return getFix(context, decl, trackChanges, fixedDeclarations);
            });
        },
    });

    type FixableDeclaration = ArrowFunction | FunctionDeclaration | FunctionExpression | MethodDeclaration;
    function getFix(context: CodeFixContext | CodeFixAllContext, decl: FixableDeclaration, trackChanges: ContextualTrackChangesFunction, fixedDeclarations?: Map<true>) {
        const changes = trackChanges(t => makeChange(t, context.sourceFile, decl, fixedDeclarations));
        return createCodeFixAction(fixId, changes, Diagnostics.Add_async_modifier_to_containing_function, fixId, Diagnostics.Add_all_missing_async_modifiers);
    }

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, insertionSite: FixableDeclaration, fixedDeclarations?: Map<true>) {
        if (fixedDeclarations) {
            if (fixedDeclarations.has(getNodeId(insertionSite).toString())) {
                return;
            }
        }
        fixedDeclarations?.set(getNodeId(insertionSite).toString(), true);
        const cloneWithModifier = getSynthesizedDeepClone(insertionSite, /*includeTrivia*/ true);
        cloneWithModifier.modifiers = createNodeArray(createModifiersFromModifierFlags(getSyntacticModifierFlags(insertionSite) | ModifierFlags.Async));
        cloneWithModifier.modifierFlagsCache = 0;
        changeTracker.replaceNode(
            sourceFile,
            insertionSite,
            cloneWithModifier);
    }

    function getFixableErrorSpanDeclaration(sourceFile: SourceFile, span: TextSpan | undefined): FixableDeclaration | undefined {
        if (!span) return undefined;
        const token = getTokenAtPosition(sourceFile, span.start);
        // Checker has already done work to determine that async might be possible, and has attached
        // related info to the node, so start by finding the signature that exactly matches up
        // with the diagnostic range.
        const decl = findAncestor(token, node => {
            if (node.getStart(sourceFile) < span.start || node.getEnd() > textSpanEnd(span)) {
                return "quit";
            }
            return (isArrowFunction(node) || isMethodDeclaration(node) || isFunctionExpression(node) || isFunctionDeclaration(node)) && textSpansEqual(span, createTextSpanFromNode(node, sourceFile));
        }) as FixableDeclaration | undefined;

        return decl;
    }

    function getIsMatchingAsyncError(span: TextSpan, errorCode: number) {
        return ({ start, length, relatedInformation, code }: Diagnostic) =>
            isNumber(start) && isNumber(length) && textSpansEqual({ start, length }, span) &&
            code === errorCode &&
            !!relatedInformation &&
            some(relatedInformation, related => related.code === Diagnostics.Did_you_mean_to_mark_this_function_as_async.code);
    }
}
