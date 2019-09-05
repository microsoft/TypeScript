/* @internal */
namespace ts.formatting {
    export interface Rule {
        // Used for debugging to identify each rule based on the property name it's assigned to.
        readonly debugName: string;
        readonly context: ReadonlyArray<ContextPredicate>;
        readonly action: RuleAction;
        readonly flags: RuleFlags;
    }

    export type ContextPredicate = (context: FormattingContext) => boolean;
    export const anyContext: ReadonlyArray<ContextPredicate> = emptyArray;

    export const enum RuleAction {
        Ignore            = 1 << 0,
        Space             = 1 << 1,
        NewLine           = 1 << 2,
        DeleteTrivia      = 1 << 3,
        DeleteToken       = 1 << 4,
        TrailingSemicolon = 1 << 5,

        TriviaAction = Space | NewLine | DeleteTrivia,
        TokenAction = DeleteToken | TrailingSemicolon
    }

    export const enum RuleFlags {
        None,
        CanDeleteNewLines,
    }

    export interface TokenRange {
        readonly tokens: ReadonlyArray<SyntaxKind>;
        readonly isSpecific: boolean;
    }
}
