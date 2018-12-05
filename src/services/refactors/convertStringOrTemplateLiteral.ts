/* @internal */
namespace ts.refactor.convertStringOrTemplateLiteral {
    const refactorName = "Convert string concatenation or template literal";
    // const toTemplateLiteralActionName = "Convert to template literal";
    // const toStringConcatenationActionName = "Convert to string concatenation";

    // const refactorDescription = getLocaleSpecificMessage(Diagnostics.Convert_string_concatenation_or_template_literal);
    // const toTemplateLiteralDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_template_literal);
    // const toStringConcatenationDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_string_concatenation);

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, startPosition } = context; file; startPosition;
        
        return emptyArray;
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context; file; startPosition; actionName;
        return undefined;
    }

}
