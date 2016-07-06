/* @internal */
namespace ts {
    export interface CodeRefactorAction {
        name: string;
        nodeLabel: ts.SyntaxKind;
        getTextChanges(token: Node, context: CodeFixContext): TextChange[];
    }

    export interface CodeFixContext {
        errorCode: string;
        sourceFile: SourceFile;
        span: TextSpan;
        checker: TypeChecker;
        newLineCharacter: string;
    }

    export namespace codeRefactor {
        var codeActions: Map<CodeRefactorAction[]> = {};

        export function registerCodeRefactor(refactor: CodeRefactorAction) {
            let refactors = codeActions[refactor.nodeLabel];
            if(!refactors) {
                refactors = [];
                codeActions[refactor.nodeLabel] = refactors;
            }
            refactors.push(refactor);
        }

        export class CodeRefactorProvider {

            public getCodeRefactors(context: CodeFixContext): CodeFix[] {
                const refactors: CodeFix[] = [];
                const token = getTokenAtRange(context.sourceFile, context.span.start, context.span.length + context.span.start);
                const actions = codeActions[token.kind];

                if (!actions || actions.length == 0) {
                    throw new Error("No refactors found.");
                }

                actions.forEach(a => {
                    const textChanges = a.getTextChanges(token, context);
                    if (textChanges && textChanges.length > 0) {
                        refactors.push({ name: a.name, textChanges: textChanges });
                    }
                });

                return refactors;
            }
        }
    }
}