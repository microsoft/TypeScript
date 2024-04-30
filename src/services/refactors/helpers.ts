import {
    ClassLikeDeclaration,
    FunctionLikeDeclaration,
    getUniqueName,
    identifierToKeywordKind,
    isClassLike,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    ModuleBlock,
    Node,
    SourceFile,
    SymbolFlags,
    TypeChecker,
} from "../_namespaces/ts";

/**
 * Returned by refactor functions when some error message needs to be surfaced to users.
 *
 * @internal
 */
export interface RefactorErrorInfo {
    error: string;
}

/**
 * Checks if some refactor info has refactor error info.
 *
 * @internal
 */
export function isRefactorErrorInfo(info: unknown): info is RefactorErrorInfo {
    return (info as RefactorErrorInfo).error !== undefined;
}

/**
 * Checks if string "known" begins with string "requested".
 * Used to match requested kinds with a known kind.
 *
 * @internal
 */
export function refactorKindBeginsWith(known: string, requested: string | undefined): boolean {
    if (!requested) return true;
    return known.substr(0, requested.length) === requested;
}

/**
 * Try to come up with a unique name for a given node within the scope for the
 * use of being used as a property/variable name.
 *
 * @internal
 */
export function getIdentifierForNode(node: Node, scope: FunctionLikeDeclaration | SourceFile | ModuleBlock | ClassLikeDeclaration, checker: TypeChecker, file: SourceFile) {
    return isPropertyAccessExpression(node) && !isClassLike(scope) && !checker.resolveName(node.name.text, node, SymbolFlags.Value, /*excludeGlobals*/ false) && !isPrivateIdentifier(node.name) && !identifierToKeywordKind(node.name)
        ? node.name.text
        : getUniqueName(isClassLike(scope) ? "newProperty" : "newLocal", file);
}
