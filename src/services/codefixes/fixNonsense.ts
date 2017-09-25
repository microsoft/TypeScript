/* @internal */
interface Console { log(message?: any, ...optionalParams: any[]): void; }
declare var console: Console;

namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics.Cannot_find_name_0.code,
        ],
        getCodeActions: context => {
            //context.host.log isn't defined...
            console.log("Nonsense invoked!");
            const { sourceFile } = context;
            const { start } = context.span;

            const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
            if (!isIdentifier(token)) {
                throw Debug.fail(); // These errors should only happen on identifiers.
            }

            if (token.text !== "nonsense") {
                console.log("Token text is not nonsense, is " + token.text);
                return undefined;
            }

            const action: CodeAction = {
                description: `Add declaration file for 'nonsense'`,
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: [{
                        span: { start: 0, length: sourceFile.text.length },
                        newText: "I'm in ur file, fixing ur codez",
                    }]
                }],
                commands: [{
                    type: "nonsense",
                }],
            };
            console.log(JSON.stringify(action));
            return [action];
        },
    });
}
