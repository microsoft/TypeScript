///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export const enum RuleAction {
        Ignore      = 0x00000001,
        Space       = 0x00000002,
        NewLine     = 0x00000004,
        Delete      = 0x00000008
    }
}