/* @internal */
namespace ts.refactor {
    /**
     * Returned by refactor functions when some error message needs to be surfaced to users.
     */
    export interface RefactorErrorInfo {
        error: string;
    }

    /**
     * Checks if some refactor info has refactor error info.
     */
    export function isRefactorErrorInfo(info: unknown): info is RefactorErrorInfo {
        return (info as RefactorErrorInfo).error !== undefined;
    }

    /**
     * Checks if string "known" begins with string "requested".
     * Used to match requested kinds with a known kind.
     */
    export function refactorKindBeginsWith(known: string, requested: string | undefined): boolean {
        if(!requested) return true;
        return known.substr(0, requested.length) === requested;
    }
}
