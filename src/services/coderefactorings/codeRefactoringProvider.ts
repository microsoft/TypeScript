/* @internal */
namespace ts {
    export interface CodeRefactoring {
        getCodeActions(context: CodeRefactoringContext): CodeAction[];
    }

    export interface CodeRefactoringContext extends CodeChangeContext {
        languageService: LanguageService;
    }

    export namespace coderefactoring {
        const refactorings: CodeRefactoring[] = [];

        export function registerCodeRefactoring(refactoring: CodeRefactoring) {
            refactorings.push(refactoring);
        }

        export function getCodeRefactorings(context: CodeRefactoringContext): CodeAction[] {
            let allActions: CodeAction[] = [];

            forEach(refactorings, r => {
                const actions = r.getCodeActions(context);
                if (actions && actions.length > 0) {
                    allActions = allActions.concat(actions);
                }
            });

            return allActions;
        }

        /* @interal */
        function findEntry(fileName: string, fileTextChanges: FileTextChanges[]): FileTextChanges | undefined {
            if (fileTextChanges && fileTextChanges.length > 0) {
                for (const entry of fileTextChanges) {
                    if (entry.fileName === fileName) {
                        return entry;
                    }
                }
            }
            return undefined;
        }

        /* @interal */
        export function getOrCreateFileTextChangesEntry(reference: ReferenceEntry, fileTextChanges: FileTextChanges[]): FileTextChanges {
            let fileTextChangesEntry = findEntry(reference.fileName, fileTextChanges);
            if (!fileTextChangesEntry) {
                fileTextChangesEntry = {
                    fileName: reference.fileName,
                    textChanges: []
                };
                fileTextChanges.push(fileTextChangesEntry);
            }
            return fileTextChangesEntry;
        }

        /* @interal */
        export function getOrCreateFileTextChangesEntryFileName(fileName: string, fileTextChanges: FileTextChanges[]): FileTextChanges {
            let fileTextChangesEntry = findEntry(fileName, fileTextChanges);
            if (!fileTextChangesEntry) {
                fileTextChangesEntry = {
                    fileName: fileName,
                    textChanges: []
                };
                fileTextChanges.push(fileTextChangesEntry);
            }
            return fileTextChangesEntry;
        }

        /* @interal */
        export function isNodeOnLeft(node: Node, binaryExpression: BinaryExpression): boolean {
            let posToCompare: number = -1;
            for (let i = 0, n = binaryExpression.getChildCount(); i < n; i++) {
                const child = binaryExpression.getChildAt(i);
                if (child.kind === SyntaxKind.FirstAssignment) {
                    posToCompare = child.pos;
                }
            }
            if (posToCompare != -1) {
                if (node.pos < posToCompare) {
                    return true;
                }
            }
            return false;
        }
    }
}
