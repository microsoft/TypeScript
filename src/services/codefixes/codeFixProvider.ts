/* @internal */
namespace ts {
    export interface CodeFix {
        errorCodes: number[];
        getCodeActions(context: CodeFixContext): CodeAction[] | undefined;
    }

    export interface CodeFixContext {
        errorCode: number;
        sourceFile: SourceFile;
        span: TextSpan;
        program: Program;
        newLineCharacter: string;
    }

    export namespace codefix {
        const codeFixes = createMap<number, CodeFix[]>();

        export function registerCodeFix(action: CodeFix) {
            forEach(action.errorCodes, error => {
                multiMapAdd(codeFixes, error, action);
            });
        }

        export function getSupportedErrorCodes() {
            const supportedErrorCodes: string[] = [];
            codeFixes.forEach((_, key) => {
                supportedErrorCodes.push(key.toString());
            });
            return supportedErrorCodes;
        }

        export function getFixes(context: CodeFixContext): CodeAction[] {
            const fixes = codeFixes.get(context.errorCode);
            let allActions: CodeAction[] = [];

            forEach(fixes, f => {
                const actions = f.getCodeActions(context);
                if (actions && actions.length > 0) {
                    allActions = allActions.concat(actions);
                }
            });

            return allActions;
        }
    }
}
