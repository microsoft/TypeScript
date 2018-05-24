/* @internal */
namespace ts {
    export interface Refactor {
        /** Compute the associated code actions */
        getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined;

        /** Compute (quickly) which actions are available here */
        getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined;
    }

    export interface RefactorContext extends textChanges.TextChangesContext {
        file: SourceFile;
        startPosition: number;
        endPosition?: number;
        program: Program;
        cancellationToken?: CancellationToken;
        preferences: UserPreferences;
    }

    export namespace refactor {
        // A map with the refactor code as key, the refactor itself as value
        // e.g.  nonSuggestableRefactors[refactorCode] -> the refactor you want
        const refactors: Map<Refactor> = createMap<Refactor>();

        /** @param name An unique code associated with each refactor. Does not have to be human-readable. */
        export function registerRefactor(name: string, refactor: Refactor) {
            refactors.set(name, refactor);
        }

        export function getApplicableRefactors(context: RefactorContext): ApplicableRefactorInfo[] {
            return arrayFrom(flatMapIterator(refactors.values(), refactor =>
                context.cancellationToken && context.cancellationToken.isCancellationRequested() ? undefined : refactor.getAvailableActions(context)));
        }

        export function getEditsForRefactor(context: RefactorContext, refactorName: string, actionName: string): RefactorEditInfo | undefined {
            const refactor = refactors.get(refactorName);
            return refactor && refactor.getEditsForAction(context, actionName);
        }
    }

    export function getRefactorContextSpan({ startPosition, endPosition }: RefactorContext): TextSpan {
        return createTextSpanFromBounds(startPosition, endPosition === undefined ? startPosition : endPosition);
    }
}
