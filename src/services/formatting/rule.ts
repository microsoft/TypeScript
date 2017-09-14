///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class Rule {
        // Used for debugging to identify each rule based on the property name it's assigned to.
        public debugName?: string;
        constructor(
            readonly Descriptor: RuleDescriptor,
            readonly Operation: RuleOperation,
            readonly Flag: RuleFlags = RuleFlags.None) {
        }
    }
}