///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class Rule {
        constructor(
            public Descriptor: RuleDescriptor,
            public Operation: RuleOperation,
            public Flag: RuleFlags = RuleFlags.None) {
        }

        public toString() {
            return "[desc=" + this.Descriptor + "," +
                "operation=" + this.Operation + "," +
                "flag=" + this.Flag + "]";
        }
    }
}