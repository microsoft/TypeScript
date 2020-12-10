/* @internal */
namespace ts.refactor {
    // A map with the refactor code as key, the refactor itself as value
    // e.g.  nonSuggestableRefactors[refactorCode] -> the refactor you want
    const refactors = new Map<string, Refactor>();

    /** @param name An unique code associated with each refactor. Does not have to be human-readable. */
    export function registerRefactor(name: string, refactor: Refactor) {
        refactors.set(name, refactor);
    }

    export function getApplicableRefactors(context: RefactorContext): ApplicableRefactorInfo[] {
        return arrayFrom(flatMapIterator(refactors.values(), refactor =>
            context.cancellationToken && context.cancellationToken.isCancellationRequested() ?
            undefined : context.refactorKind && !hasMatchingRefactorKind(refactor.refactorKinds, context.refactorKind) ?
            undefined : refactor.getAvailableActions(context)));
    }

    export function getEditsForRefactor(context: RefactorContext, refactorName: string, actionName: string): RefactorEditInfo | undefined {
        const refactor = refactors.get(refactorName);
        return refactor && refactor.getEditsForAction(context, actionName);
    }

    export function hasMatchingRefactorKind(refactorKinds: string[] | undefined, match: string | undefined): boolean {
        if (!refactorKinds || !match) return false;
        return refactorKinds.some(refactorKind => refactorKind.substr(0, match.length) === match);
    }
}
