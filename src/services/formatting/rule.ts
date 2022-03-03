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
        StopProcessingSpaceActions = 1 << 0,
        StopProcessingTokenActions = 1 << 1,
        InsertSpace                = 1 << 2,
        InsertNewLine              = 1 << 3,
        DeleteSpace                = 1 << 4,
        DeleteToken                = 1 << 5,
        InsertTrailingSemicolon    = 1 << 6,

        StopAction = StopProcessingSpaceActions | StopProcessingTokenActions,
        ModifySpaceAction = InsertSpace | InsertNewLine | DeleteSpace,
        ModifyTokenAction = DeleteToken | InsertTrailingSemicolon,
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
