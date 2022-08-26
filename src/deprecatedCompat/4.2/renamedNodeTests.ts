// DEPRECATION: Renamed node tests
// DEPRECATION PLAN:
//     - soft: 4.2
//     - warn: 4.3
//     - error: 5.0
namespace ts {
    /**
     * @deprecated Use `isMemberName` instead.
     */
    export const isIdentifierOrPrivateIdentifier = Debug.deprecate(function isIdentifierOrPrivateIdentifier(node: Node): node is MemberName {
        return isMemberName(node);
    }, {
        since: "4.2",
        warnAfter: "4.3",
        message: "Use `isMemberName` instead."
    });
}