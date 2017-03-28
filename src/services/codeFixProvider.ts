/* @internal */
namespace ts {
    export interface CodeFix {
        errorCodes: number[];
        getCodeActions(context: CodeFixContext): CodeAction[] | undefined;
        createCodeFixDiagnosticIfApplicable?(node: Node, context: CodeFixDiagnoseContext): Diagnostic | undefined;
    }

    export interface CodeFixDiagnoseContext {
        boundSourceFile: SourceFile;
        program: Program;
        newLineCharacter: string;
        rulesProvider: formatting.RulesProvider;
    }

    export interface CodeFixContext {
        errorCode: number;
        sourceFile: SourceFile;
        span: TextSpan;
        program: Program;
        newLineCharacter: string;
        host: LanguageServiceHost;
        cancellationToken: CancellationToken;
        rulesProvider: formatting.RulesProvider;
    }

    export namespace codefix {
        const codeFixes: CodeFix[][] = [];
        const diagnosticGeneratingCodeFixes: CodeFix[] = [];

        export function registerCodeFix(codeFix: CodeFix) {
            forEach(codeFix.errorCodes, error => {
                let fixes = codeFixes[error];
                if (!fixes) {
                    fixes = [];
                    codeFixes[error] = fixes;
                }
                fixes.push(codeFix);
            });

            if (codeFix.createCodeFixDiagnosticIfApplicable) {
                diagnosticGeneratingCodeFixes.push(codeFix);
            }
        }

        export function getSupportedErrorCodes() {
            return Object.keys(codeFixes);
        }

        export function getCodeFixDiagnosticsForNode(context: CodeFixDiagnoseContext, node: Node): Diagnostic[] | undefined {
            let result: Diagnostic[];
            for (const codeFix of diagnosticGeneratingCodeFixes) {
                const newDiag = codeFix.createCodeFixDiagnosticIfApplicable(node, context);
                if (newDiag) {
                    (result || (result = [])).push(newDiag);
                }
            }
            return result;
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
