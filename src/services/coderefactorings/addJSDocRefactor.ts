/* @internal */
namespace ts.coderefactoring {
    registerCodeRefactoring({
        getCodeActions: (context: CodeRefactoringContext): CodeAction[] => {
            const token = getTokenAtPosition(context.sourceFile, context.span.start);
            if (isModuleOrEnumDeclaration(token.parent)) {
                return getJSDocCodeRefactoring(context, Diagnostics.Add_JSDoc_Comments_to_Module);
            }
            else if (isClassLike(token.parent)) {
                return getJSDocCodeRefactoring(context, Diagnostics.Add_JSDoc_Comments_to_Class);
            }

            return undefined;

            function getJSDocCodeRefactoring(context: CodeRefactoringContext, diagnosticMessage: DiagnosticMessage) {
                const docCommentTemplate = ts.JsDoc.getDocCommentTemplateAtPosition(context.newLineCharacter, context.sourceFile, context.span.start);

                if (docCommentTemplate && docCommentTemplate.newText && docCommentTemplate.newText.length > 0) {
                    return [{
                        description: getLocaleSpecificMessage(diagnosticMessage),
                        changes: [{
                            fileName: context.sourceFile.fileName,
                            textChanges: [{
                                span: {
                                    start: context.span.start,
                                    length: 0
                                },
                                newText: docCommentTemplate.newText + context.newLineCharacter
                            }]
                        }]
                    }];
                }
            }
        }
    });
}
