///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class Rule {
        // Used for debugging to identify each rule based on the property name it's assigned to.
        public debugName?: string;
        constructor(
            readonly descriptor: RuleDescriptor,
            readonly operation: RuleOperation,
            readonly flag: RuleFlags = RuleFlags.None) {
        }
    }
}