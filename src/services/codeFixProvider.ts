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
        formatInfo: CodeFixFormatInfo
    }

    export class CodeFixFormatInfo {
        /**
         * Has one level of indentation beyond the indentation at the error span.
         */
        public newLineAndIndentationStr: string;
        /**
         * @param indentationlevel The indentation, in columns, for the beginning of the span where the error is reported.
         */
        constructor(public editorSettings: EditorSettings, public indentationlevel: number) {
            this.newLineAndIndentationStr = editorSettings.newLineCharacter + ts.formatting.getIndentationString(indentationlevel + editorSettings.tabSize, editorSettings);
        }
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

        export function getFixes(context: CodeFixContext): CodeAction[] {
            const fixes = codeFixes[context.errorCode];
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
