/* @internal */
namespace ts {
    export interface Refactor {
        /** An unique code associated with each refactor */
        name: string;

        /** Description of the refactor to display in the UI of the editor */
        description: string;

        /** Compute the associated code actions */
        getCodeActions(context: RefactorContext, positionOrRange: number | TextRange): CodeAction[];

        /** A fast syntactic check to see if the refactor is applicable at given position. */
        isApplicableForPositionOrRange(context: LightRefactorContext, positionOrRange: number | TextRange): boolean;
    }

    /**
     * The `GetApplicableRefactor` API call is supposed to be fast, therefore only syntactic checks should be conducted
     * to see if a refactor is applicable. The `LightRefactorContent` limits the context information accesable to the
     * refactor to enforce such design. Such context should not provide a bound source file with symbols.
     */
    export interface LightRefactorContext {
        /**
         * The AST that was not bound, so the symbols associated with the nodes are not accessible.
         * Such a source file should be cheap to get.
         */
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
        // e.g.  nonSuggestableRefactors[refactorCode] -> the refactor you want
        const refactors: Map<Refactor> = createMap<Refactor>();

        export function registerRefactor(refactor: Refactor) {
            refactors.set(refactor.name, refactor);
        }

        export function getApplicableRefactors(
            context: LightRefactorContext,
            positionOrRange: number | TextRange): ApplicableRefactorInfo[] | undefined {

            let results: ApplicableRefactorInfo[];
            refactors.forEach(refactor => {
                if (refactor.isApplicableForPositionOrRange(context, positionOrRange)) {
                    (results || (results = [])).push({ refactorName: refactor.name, description: refactor.description });
                }
            });
            return results;
        }

        export function getRefactorCodeActions(
            context: RefactorContext,
            positionOrRange: number | TextRange,
            refactorName: string): CodeAction[] | undefined {

            let result: CodeAction[];
            const refactor = refactors.get(refactorName);
            if (!refactor) {
                return undefined;
            }

            const codeActions = refactor.getCodeActions(context, positionOrRange);
            if (codeActions) {
                addRange((result || (result = [])), codeActions);
            }
            return result;
        }
    }
}
