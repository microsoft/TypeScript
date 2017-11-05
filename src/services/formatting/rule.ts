///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class Rule {
        readonly leftTokenRange: TokenRange;
        readonly rightTokenRange: TokenRange;
        constructor(
            // Used for debugging to identify each rule based on the property name it's assigned to.
            readonly debugName: string,
            left: SyntaxKind | TokenRange,
            right: SyntaxKind | TokenRange,
            readonly context: ReadonlyArray<ContextPredicate>,
            readonly action: RuleAction,
            readonly flags: RuleFlags = RuleFlags.None) {
            this.leftTokenRange = typeof left === "number" ? TokenRange.FromToken(left) : left;
            this.rightTokenRange = typeof right === "number" ? TokenRange.FromToken(right) : right;
        }
    }

    export type ContextPredicate = (context: FormattingContext) => boolean;
    export const AnyContext: ReadonlyArray<ContextPredicate> = emptyArray;

    export const enum RuleAction {
        Ignore = 1 << 0,
        Space = 1 << 1,
        NewLine = 1 << 2,
        Delete = 1 << 3,
    }

    export const enum RuleFlags {
        None,
        CanDeleteNewLines,
    }
}