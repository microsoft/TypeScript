/* @internal */
namespace ts {
    export interface CodeRefactor {
        name: string;
        nodeLabel: ts.SyntaxKind;
        getTextChanges(token: Node, context: CodeFixContext): CodeAction[];
    }

    export namespace codeRefactor {
        var codeActions: Map<CodeRefactor[]> = {};

        export function registerCodeRefactor(refactor: CodeRefactor) {
            let refactors = codeActions[refactor.nodeLabel];
            if(!refactors) {
                refactors = [];
                codeActions[refactor.nodeLabel] = refactors;
            }
            refactors.push(refactor);
        }

        export class CodeRefactorProvider {

            public getCodeRefactors(context: CodeFixContext): CodeAction[] {
                let refactors: CodeAction[] = [];
                const token = getTokenAtRange(context.sourceFile, context.span.start, context.span.length + context.span.start);
                const actions = codeActions[token.kind];

                if (!actions || actions.length == 0) {
                    throw new Error("No refactors found.");
                }

                actions.forEach(a => {
                    const textChanges = a.getTextChanges(token, context);
                    if (textChanges && textChanges.length > 0) {
                        refactors = refactors.concat(textChanges);
                    }
                });

                return refactors;
            }
        }
    }
}