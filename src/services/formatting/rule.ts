import { FormattingContext } from "../_namespaces/ts.formatting.js";
import {
    emptyArray,
    SyntaxKind,
} from "../_namespaces/ts.js";

/** @internal */
export interface Rule {
    // Used for debugging to identify each rule based on the property name it's assigned to.
    readonly debugName: string;
    readonly context: readonly ContextPredicate[];
    readonly action: RuleAction;
    readonly flags: RuleFlags;
}

/** @internal */
export type ContextPredicate = (context: FormattingContext) => boolean;
/** @internal */
export const anyContext: readonly ContextPredicate[] = emptyArray;

// dprint-ignore
/** @internal */
export const enum RuleAction {
    None                       = 0,
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

/** @internal */
export const enum RuleFlags {
    None,
    CanDeleteNewLines,
}

/** @internal */
export interface TokenRange {
    readonly tokens: readonly SyntaxKind[];
    readonly isSpecific: boolean;
}
