/* @internal */
namespace ts.refactor.convertStringOrTemplateLiteral {
    const refactorName = "Convert string concatenation or template literal";
    const refactorDescription = "Convert string concatenation or template literal";
    const toTemplateLiteralActionName = "Convert to template literal";
    const toStringConcatenationActionName = "Convert to string concatenation";
    const toTemplateLiteralDescription = "Convert to template literal";
    const toStringConcatenationDescription = "Convert to string concatenation";

    // TODO convert Description to DiagnosticMsg
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, startPosition } = context; file; startPosition;
        
        return emptyArray;
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context; file; startPosition;
        return undefined;
    }

}
