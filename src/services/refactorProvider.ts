/* @internal */
namespace ts {
    export interface Refactor {
        /** An unique code associated with each refactor */
        name: string;

        /** Description of the refactor to display in the UI of the editor */
        description: string;

        /** Compute the associated code actions */
        getCodeActions(context: RefactorContext): CodeAction[];

        /** A fast syntactic check to see if the refactor is applicable at given position. */
        isApplicable(context: RefactorContext): boolean;
    }

    export interface RefactorContext {
        file: SourceFile;
        startPosition: number;
        endPosition?: number;
        program: Program;
        newLineCharacter: string;
        rulesProvider?: formatting.RulesProvider;
        cancellationToken?: CancellationToken;
    }

    export namespace refactor {
        // A map with the refactor code as key, the refactor itself as value
        // e.g.  nonSuggestableRefactors[refactorCode] -> the refactor you want
        const refactors: Map<Refactor> = createMap<Refactor>();

        export function registerRefactor(refactor: Refactor) {
            refactors.set(refactor.name, refactor);
        }

        export function getApplicableRefactors(context: RefactorContext): ApplicableRefactorInfo[] | undefined {

            let results: ApplicableRefactorInfo[];
            const refactorList: Refactor[] = [];
            refactors.forEach(refactor => {
                refactorList.push(refactor);
            });
            for (const refactor of refactorList) {
                if (context.cancellationToken && context.cancellationToken.isCancellationRequested()) {
                    return results;
                }
                if (refactor.isApplicable(context)) {
                    (results || (results = [])).push({ name: refactor.name, description: refactor.description });
                }
            }
            return results;
        }

        export function getRefactorCodeActions(context: RefactorContext, refactorName: string): CodeAction[] | undefined {
            const refactor = refactors.get(refactorName);
            return refactor && refactor.getCodeActions(context);
        }
    }
}
