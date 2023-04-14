import {
    ApplicableRefactorInfo,
    arrayFrom,
    flatMapIterator,
    InteractiveRefactor,
    InteractiveRefactorName,
    NonInteractiveRefactor,
    NonInteractiveRefactorName,
    Refactor,
    RefactorContext,
    RefactorEditInfo,
    RefactorName,
} from "./_namespaces/ts";
import { refactorKindBeginsWith } from "./_namespaces/ts.refactor";

// A map with the refactor code as key, the refactor itself as value
// e.g.  nonSuggestableRefactors[refactorCode] -> the refactor you want
const refactors = new Map<RefactorName, Refactor>();

/**
 * @param name An unique code associated with each refactor. Does not have to be human-readable.
 *
 * @internal
 */
export function registerRefactor<Name extends InteractiveRefactorName>(name: Name, refactor: InteractiveRefactor<Name>): void;
/** @internal */
export function registerRefactor(name: NonInteractiveRefactorName, refactor: NonInteractiveRefactor): void;
/** @internal */
export function registerRefactor(name: RefactorName, refactor: Refactor) {
    refactors.set(name, refactor);
}

/** @internal */
export function getApplicableRefactors(context: RefactorContext, includeInteractive?: boolean): ApplicableRefactorInfo[] {
    return arrayFrom(flatMapIterator(refactors.values(), refactor =>
        context.cancellationToken && context.cancellationToken.isCancellationRequested() ||
        (!refactor.kinds?.some(kind => refactorKindBeginsWith(kind, context.kind)) || refactor.isInteractive && !includeInteractive) ? undefined :
        refactor.getAvailableActions(context)));
}

/** @internal */
export function getEditsForRefactor(context: RefactorContext, refactorName: RefactorName, actionName: string, ...args: unknown[]): RefactorEditInfo | undefined {
    const refactor = refactors.get(refactorName);
    return refactor && refactor.getEditsForAction(context, actionName, ...args);
}
