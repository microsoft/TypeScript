/* @internal */
namespace ts {
    export interface CodeRefactoring {
        getCodeActions(context: CodeChangeContext): CodeAction[];
    }

    export namespace coderefactoring {
        var refactorings: CodeRefactoring[] = [];

        export function registerCodeRefactor(refactoring: CodeRefactoring) {
            refactorings.push(refactoring);
        }

        export function getCodeRefactorings(context: CodeChangeContext): CodeAction[] {
            let allActions: CodeAction[] = [];

            forEach(refactorings, r => {
                const actions = r.getCodeActions(context);
                if (actions && actions.length > 0) {
                    allActions = allActions.concat(actions);
                }
            });

            return allActions;
        }
    }
}
