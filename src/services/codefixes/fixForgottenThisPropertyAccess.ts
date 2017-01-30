/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const token = getTokenAtPosition(sourceFile, context.span.start);
            const start = token.getStart(sourceFile);

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Add_this_to_unresolved_variable),
                changes: [{ fileName: sourceFile.fileName, textChanges: [{ newText: "this.", span: { start, length: 0 } }] }]
            }];
        }
    });
}