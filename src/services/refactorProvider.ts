import {
    ApplicableRefactorInfo,
    arrayFrom,
    flatMapIterator,
    InteractiveRefactorArguments,
    Refactor,
    RefactorContext,
    RefactorEditInfo,
} from "./_namespaces/ts.js";
import { refactorKindBeginsWith } from "./_namespaces/ts.refactor.js";

// A map with the refactor code as key, the refactor itself as value
// e.g.  nonSuggestableRefactors[refactorCode] -> the refactor you want
const refactors = new Map<string, Refactor>();

/**
 * @param name An unique code associated with each refactor. Does not have to be human-readable.
 *
 * @internal
 */
export function registerRefactor(name: string, refactor: Refactor): void {
    refactors.set(name, refactor);
}

/** @internal */
export function getApplicableRefactors(context: RefactorContext, includeInteractiveActions?: boolean): ApplicableRefactorInfo[] {
    return arrayFrom(flatMapIterator(refactors.values(), refactor =>
        context.cancellationToken && context.cancellationToken.isCancellationRequested() ||
            !refactor.kinds?.some(kind => refactorKindBeginsWith(kind, context.kind)) ? undefined :
            refactor.getAvailableActions(context, includeInteractiveActions)));
}

/** @internal */
export function getEditsForRefactor(context: RefactorContext, refactorName: string, actionName: string, interactiveRefactorArguments?: InteractiveRefactorArguments): RefactorEditInfo | undefined {
    const refactor = refactors.get(refactorName);
    return refactor && refactor.getEditsForAction(context, actionName, interactiveRefactorArguments);
}
