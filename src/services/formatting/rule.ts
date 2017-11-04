///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class Rule {
        // Used for debugging to identify each rule based on the property name it's assigned to.
        public debugName?: string;
        readonly leftTokenRange: Shared.TokenRange;
        readonly rightTokenRange: Shared.TokenRange;
        constructor(
            left: SyntaxKind | Shared.TokenRange,
            right: SyntaxKind | Shared.TokenRange,
            readonly context: ReadonlyArray<ContextPredicate>,
            readonly action: RuleAction,
            readonly flags: RuleFlags = RuleFlags.None) {
            this.leftTokenRange = typeof left === "number" ? Shared.TokenRange.FromToken(left) : left;
            this.rightTokenRange = typeof right === "number" ? Shared.TokenRange.FromToken(right) : right;
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