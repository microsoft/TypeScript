/* @internal */
namespace ts.formatting {
    export interface Rule {
        // Used for debugging to identify each rule based on the property name it's assigned to.
        readonly debugName: string;
        readonly context: readonly ContextPredicate[];
        readonly action: RuleAction;
        readonly flags: RuleFlags;
    }

    export type ContextPredicate = (context: FormattingContext) => boolean;
    export const anyContext: readonly ContextPredicate[] = emptyArray;

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

    export interface TokenRange {
        readonly tokens: readonly SyntaxKind[];
        readonly isSpecific: boolean;
    }
}