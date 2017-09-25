/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics.Cannot_find_name_0.code,
        ],
        getCodeActions: context => {
            const { sourceFile } = context;
            const { start } = context.span;

            const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
            if (!isIdentifier(token)) {
                throw Debug.fail(); // These errors should only happen on identifiers.
            }

            if (token.text !== "nonsense") {
                return undefined;
            }

            const action: CodeAction = {
                description: `Add declaration file for 'nonsense'`,
                changes: [],
                commands: [{
                    type: "nonsense",
                }],
            };
            return [action];
        },
    });
}
