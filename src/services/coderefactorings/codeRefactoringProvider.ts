/* @internal */
namespace ts {
    export interface CodeRefactoringFactory {
        refactoringId: string;
        getAvailableRefactorings(context: CodeRefactoringContext): CodeRefactoring[];
        getChangesForRefactoring(context: CodeRefactoringContext): CodeAction[];
    }

    export interface CodeRefactoringContext extends CodeChangeContext {
        languageService: LanguageService;
        refactoringId?: string;
        userInput?: any;
    }

    export namespace coderefactoring {
        const refactorings = createMap<CodeRefactoringFactory>();

        export function registerCodeRefactoringFactory(refactoring: CodeRefactoringFactory) {
            const existing = refactorings[refactoring.refactoringId];
            if (!existing) {
                refactorings[refactoring.refactoringId] = refactoring;
            }
            else {
                Debug.fail("Trying to add a duplicate refactoring.");
            }
        }

        export function getAvailableCodeRefactorings(context: CodeRefactoringContext): CodeRefactoring[] {
            let allRefactorings: CodeRefactoring[] = [];

            for (const key in refactorings) {
                const factory = refactorings[key];
                const current = factory.getAvailableRefactorings(context);
                if (current && current.length > 0) {
                    allRefactorings = allRefactorings.concat(current);
                }
            }
            return allRefactorings;
        }

        export function getTextChangesForRefactoring(context: CodeRefactoringContext): CodeAction[] {
            const factory = refactorings[context.refactoringId];
            return factory.getChangesForRefactoring(context);
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
