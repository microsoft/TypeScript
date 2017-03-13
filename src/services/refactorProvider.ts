/* @internal */
namespace ts {
    interface BaseRefactor {
        /** Description of the refactor to display in the UI of the editor */
        description: string;

        /** An unique code associated with each refactor */
        refactorCode: number;

        /** Compute the associated code actions */
        getCodeActions(range: TextRange, context: RefactorContext): CodeAction[];
    }

    export interface SuggestableRefactor extends BaseRefactor {
        canBeSuggested: true;
        isApplicableForNode(node: Node, context: RefactorContext): boolean;
    }

    export interface NonSuggestableRefactor extends BaseRefactor {
        canBeSuggested: false;

        /** A fast syntactic check to see if the refactor is applicable at given position. */
        isApplicableForRange(range: TextRange, context: LightRefactorContext): boolean;
    }

    export type Refactor = SuggestableRefactor | NonSuggestableRefactor;

    export interface LightRefactorContext {
        nonBoundSourceFile: SourceFile;
        newLineCharacter: string;
    }

    export interface RefactorContext {
        boundSourceFile: SourceFile;
        program: Program;
        newLineCharacter: string;
        rulesProvider: formatting.RulesProvider;
    }

    export namespace refactor {
        // A map with the refactor code as key, the refactor itself as value
        const suggestableRefactors: SuggestableRefactor[] = [];
        const nonSuggestableRefactors: NonSuggestableRefactor[] = [];

        export function registerRefactor(refactor: Refactor) {
            switch (refactor.canBeSuggested) {
                case true:
                    suggestableRefactors[refactor.refactorCode] = refactor;
                    break;
                case false:
                    nonSuggestableRefactors[refactor.refactorCode] = refactor;
                    break;
            }
        }

        export function getRefactorDiagnosticsForRange(range: TextRange, context: LightRefactorContext) {
            const results: RefactorDiagnostic[] = [];
            for (const code in nonSuggestableRefactors) {
                const refactor = nonSuggestableRefactors[code];
                if (refactor && refactor.isApplicableForRange(range, context)) {
                    results.push(createRefactorDiagnostic(refactor, range));
                }
            }
            return results;
        }

        export function getSuggestedRefactorDiagnosticsForNode(node: Node, context: RefactorContext) {
            const result: RefactorDiagnostic[] = [];
            for (const code in suggestableRefactors) {
                const refactor = suggestableRefactors[code];
                if (refactor.isApplicableForNode(node, context)) {
                    result.push(createRefactorDiagnostic(refactor, node));
                }
            }
            return result;
        }

        function createRefactorDiagnostic(refactor: Refactor, range: TextRange) {
            return <RefactorDiagnostic>{
                code: refactor.refactorCode,
                start: range.pos,
                end: range.end,
                text: refactor.description
            };
        }

        export function getCodeActionsForRefactor(refactorCode: number, range: TextRange, context: RefactorContext): CodeAction[] {
            const refactor = suggestableRefactors[refactorCode] || nonSuggestableRefactors[refactorCode];
            return refactor && refactor.getCodeActions(range, context);
        }
    }
}
