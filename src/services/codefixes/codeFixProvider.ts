/* @internal */
namespace ts {
    export interface CodeFix {
        errorCodes: number[];
        getCodeActions(context: CodeFixContext, cancellationToken?: CancellationToken): CodeAction[] | undefined;
    }

    export interface CodeFixContext {
        errorCode: number;
        sourceFile: SourceFile;
        span: TextSpan;
        program: Program;
        newLineCharacter: string;
        host: LanguageServiceHost;
    }

    export namespace codefix {
        const codeFixes = createMap<CodeFix[]>();

        export function registerCodeFix(action: CodeFix) {
            forEach(action.errorCodes, error => {
                let fixes = codeFixes[error];
                if (!fixes) {
                    fixes = [];
                    codeFixes[error] = fixes;
                }
                fixes.push(action);
            });
        }

        export function getSupportedErrorCodes() {
            return Object.keys(codeFixes);
        }

        export function getFixes(context: CodeFixContext, cancellationToken: CancellationToken): CodeAction[] {
            const fixes = codeFixes[context.errorCode];
            let allActions: CodeAction[] = [];

            forEach(fixes, f => {
                const actions = f.getCodeActions(context, cancellationToken);
                if (actions && actions.length > 0) {
                    allActions = allActions.concat(actions);
                }
            });

            return allActions;
        }
    }
}
