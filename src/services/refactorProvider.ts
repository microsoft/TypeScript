import {
    ApplicableRefactorInfo,
    arrayFrom,
    flatMapIterator,
    Refactor,
    RefactorContext,
    RefactorEditInfo,
} from "./_namespaces/ts";
import { refactorKindBeginsWith } from "./_namespaces/ts.refactor";

// A map with the refactor code as key, the refactor itself as value
// e.g.  nonSuggestableRefactors[refactorCode] -> the refactor you want
const refactors = new Map<string, Refactor>();

/**
 * @param name An unique code associated with each refactor. Does not have to be human-readable.
 *
 * @internal
 */
export function registerRefactor(name: string, refactor: Refactor) {
    refactors.set(name, refactor);
}

/** @internal */
export function getApplicableRefactors(context: RefactorContext): ApplicableRefactorInfo[] {
    return arrayFrom(flatMapIterator(refactors.values(), refactor =>
        context.cancellationToken && context.cancellationToken.isCancellationRequested() ||
        !refactor.kinds?.some(kind => refactorKindBeginsWith(kind, context.kind)) ? undefined :
        refactor.getAvailableActions(context)));
}

/** @internal */
export function getEditsForRefactor(context: RefactorContext, refactorName: string, actionName: string): RefactorEditInfo | undefined {
    const refactor = refactors.get(refactorName);
    return refactor && refactor.getEditsForAction(context, actionName);
}
