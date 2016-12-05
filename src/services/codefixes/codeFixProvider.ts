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
        host: LanguageServiceHost;
        cancellationToken: CancellationToken;
    }

    export namespace codefix {
        const codeFixes = createMap<CodeFix[]>();

        export function registerCodeFix(action: CodeFix) {
            forEach(action.errorCodes, error => {
                let fixes = codeFixes.get(error);
                if (!fixes) {
                    fixes = [];
                    codeFixes.set(error, fixes);
                }
                fixes.push(action);
            });
        }

        export function getSupportedErrorCodes() {
            return keysOfMap(codeFixes);
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
